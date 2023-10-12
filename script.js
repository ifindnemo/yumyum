// script.js

// Game logic and variables
let currentPlayer = 1;
const players = {
  1: {
    name: "Player 1",
    grid: [],
    opponentGrid: [],
    ships: [],
  },
  2: {
    name: "Player 2",
    grid: [],
    opponentGrid: [],
    ships: [],
  },
};

// Function to initialize the game
function initializeGame() {
  // Create grids for each player
  for (let playerNum = 1; playerNum <= 2; playerNum++) {
    createGrid(playerNum);
  }

  // Place ships for each player
  for (let playerNum = 1; playerNum <= 2; playerNum++) {
    placeShips(playerNum);
  }

  // Set current player
  currentPlayer = 1;

  // Display initial game state
  displayGameState();
}

// Function to create a grid for a player
function createGrid(playerNum) {
  const grid = [];
  for (let row = 0; row < 3; row++) {
    const rowArray = [];
    for (let col = 0; col < 3; col++) {
      rowArray.push(0); // 0 represents an empty cell
    }
    grid.push(rowArray);
  }
  players[playerNum].grid = grid;
  players[playerNum].opponentGrid = JSON.parse(JSON.stringify(grid)); // Copy the grid for the opponent
}

// Function to place ships for a player
function placeShips(playerNum) {
  // Add your logic to allow players to place their ships on the grid
}

// Function to handle a shot fired by a player
function fireShot(row, col) {
  const currentPlayerObj = players[currentPlayer];
  const opponentPlayerObj = players[3 - currentPlayer]; // Get the opponent player object

  // Check if the shot hits a ship
  if (opponentPlayerObj.grid[row][col] === 1) {
    opponentPlayerObj.grid[row][col] = 2; // Set the cell as a hit
    currentPlayerObj.opponentGrid[row][col] = 2; // Update the opponent grid for the current player
    console.log("Hit!");
  } else {
    currentPlayerObj.opponentGrid[row][col] = 3; // Set the cell as a miss
    console.log("Miss!");
  }

  // Switch to the next player
  currentPlayer = 3 - currentPlayer;

  // Display the updated game state
  displayGameState();
}

// Function to display the game state
function displayGameState() {
  console.log("Current Player:", players[currentPlayer].name);
  console.log("Current Player Grid:", players[currentPlayer].grid);
  console.log("Current Player Opponent Grid:", players[currentPlayer].opponentGrid);
}

// Call the initializeGame() function to start the game
initializeGame();