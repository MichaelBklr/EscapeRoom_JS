/*
Assignment:
From a starting point, find a key and then search for the exit.
Allowed to move left, right, up or down.

Write a function that gets a "room" parameter and returns true if you can exit the room and false otherwise.
The room parameter is an array of characters, each represents a different element:
's' - starting point.
'o' - open passage.
'x' - wall.
'k' - key.
'e' - exit.

Examples:
Input: [{'s', 'x', 'x'}, {'o', 'x', 'x'}, {'k', 'o', 'e'}]
Output: true

Input: [{'s', 'o', 'o'}, {'x', 'x', 'o'}, {'k', 'x', 'e'}]
Output: false
*/

const escapeRoom = (room) => {
  console.log("Searching in room", room);

  const startRow = 0;
  const startCol = 0;
  const searchResult = { keyFound: false, exitFound: false, visited: new Set() };

  search(room, startRow, startCol, searchResult);

  if (searchResult.keyFound && searchResult.exitFound) return true;

  return false;
};


const search = (room, row, col, searchResult) => {

  numberOfIterations++;

  const rowInBounds = 0 <= row && row < room.length;
  const colInBounds = 0 <= col && col < room[0].length;

  if (!rowInBounds || !colInBounds) return;

  const currentNode = room[row][col];
  const currentNodeCoordinates = `${row},${col}`;

  if (searchResult.visited.has(currentNodeCoordinates)) return;

  searchResult.visited.add(currentNodeCoordinates);

  const wall = "x";
  if (currentNode === wall) return;

  const key = "k";
  const exit = "e";

  if (currentNode === key) searchResult.keyFound = true;
  if (currentNode === exit) searchResult.exitFound = true;
  if (searchResult.keyFound && searchResult.exitFound) return;

  search(room, row, col + 1, searchResult);
  search(room, row + 1, col, searchResult);
  search(room, row, col - 1, searchResult);
  search(room, row - 1, col, searchResult);
};



// const roomOfFreedom = [['s', 'x', 'e'], ['o', 'x', 'o'], ['k', 'o', 'o']];
// const roomOfDoom = [['s', 'o', 'o'], ['x', 'x', 'o'], ['k', 'x', 'e']];
const roomOfFreedom = [['s', 'o', 'o', 'o'], ['x', 'x', 'o', 'x'], ['k', 'o', 'o', 'e'], ['o', 'x', 'x', 'x']];
const roomOfDoom = [['s', 'o', 'o', 'o'], ['x', 'o', 'o', 'o'], ['k', 'o', 'x', 'x'], ['o', 'x', 'x', 'e']];

let numberOfIterations = 0;

const roomFreed = escapeRoom(roomOfFreedom);
console.log("Room Pass:", roomFreed);
console.log("Number of iterations:", numberOfIterations);

console.log("");

numberOfIterations = 0;
const roomDoomed = escapeRoom(roomOfDoom);
console.log("Room Failed:", roomDoomed);
console.log("Number of iterations:", numberOfIterations);

