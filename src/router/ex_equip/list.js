import Database from '../../db';
import { MESSAGES } from '../../utils/Constants';
import {
	mountApiErrorResponse,
	mountApiResponse,
	getCurrentLanguage,
	nodeTimer,
	asyncRoute,
} from '../../utils/Utility';

export default asyncRoute(async (req, res, next) => {
	const TIME_START = process.hrtime();

	try {
		const requestedLanguage = getCurrentLanguage(req);
		const collection = Database.getCollection('ex_equip', requestedLanguage);

		if (!collection || !requestedLanguage) {
			throw new Error('!collection || !requestedLanguage');
		}

		const exEquipList = await collection
			.aggregate([
				{
					$lookup: {
						from: `hero-${requestedLanguage}`,
						localField: 'unit',
						foreignField: 'id',
						as: 'unit',
					},
				},
				{
					$addFields: {
						unit: {
							$arrayElemAt: ['$unit', 0],
						},
					},
				},
				{
					$project: {
						_id: 1,
						name: 1,
						role: 1,
						unit: {
							_id: 1,
							id: 1,
							name: 1,
							rarity: 1,
							attribute: 1,
							role: 1,
							zodiac: 1,
						},
						assets: 1,
					},
				},
			])
			.sort({
				rarity: -1,
				_id: 1,
			})
			.toArray();

		if (exEquipList && exEquipList.length) {
			nodeTimer(TIME_START);
			return mountApiResponse({}, res, null, exEquipList);
		}
		return mountApiErrorResponse(res, MESSAGES.query.invalid);
	} catch (error) {
		console.error(JSON.stringify(error, null, 4));
		return mountApiErrorResponse(res, MESSAGES.db.dbConnectionQuery);
	}
});
