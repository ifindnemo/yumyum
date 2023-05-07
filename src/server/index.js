import express from 'express';
import device from 'express-device';
import helmet from 'helmet';
import nocache from 'nocache';
import cors from 'cors';
// import cron from 'node-cron';
import bodyParser from 'body-parser';
import { MESSAGES } from '../utils/Constants';
import { getDateNow, cLog } from '../utils/Utility';

export default class Server {
	constructor(options = {}) {
		const { Database } = options;

		this.app = express();
		this.port = process.env.PORT || 8069;

		this.app.use(device.capture());
		this.app.use(bodyParser.json());
		this.app.use(helmet());
		this.app.use(helmet.permittedCrossDomainPolicies());
		this.app.use(nocache());
		this.app.use(cors());
		this.app.options('*', cors());
		this.app.use(
			helmet.contentSecurityPolicy({
				directives: {
					defaultSrc: ["'self'"],
					imgSrc: ["'self'", 'data:'],
					scriptSrc: ["'self'", "'unsafe-inline'"],
					fontSrc: ["'self'", '*.fontawesome.com', '*.googleapis.com', '*.gstatic.com'],
					styleSrc: ["'self'", "'unsafe-inline'", '*.fontawesome.com', '*.googleapis.com'],
				},
			})
		);

		this.app.get('/status', (req, res) => {
			res.sendStatus(200);
		});

		this.start = async () => {
			if (process?.env?.DB_CONNECT === 'false') {
				return this.serverStart();
			}
			try {
				await Database.connect();
				// await Database.processHashes();
				// cron.schedule('* 12 * * *', () => {
				// 	Database.processHashes();
				// });
				return this.serverStart();
			} catch (error) {
				cLog('error', MESSAGES.db.dbConnectionServer);
				cLog('error', error.stack);
				process.exit(1);
			}
		};
	}

	serverStart() {
		this.app.listen(this.port, () => {
			cLog('log', `${MESSAGES.server.start} ${this.port} @ ${getDateNow()}`);
		});
	}
}
