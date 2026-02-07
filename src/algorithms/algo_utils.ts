import type { CellIndex, Graph } from "../types";

export const getNeighbors = <T extends CellIndex>(
	graph: Graph,
	cell: T,
	rows: number,
	cols: number,
	isDiagonal: boolean,
) => {
	const neighbors = [];
	const row = cell.row;
	const col = cell.col;
	if (col + 1 < cols) neighbors.push(graph[row][col + 1]); // right
	if (row + 1 < rows) neighbors.push(graph[row + 1][col]); // bot
	if (col - 1 >= 0) neighbors.push(graph[row][col - 1]); // left
	if (row - 1 >= 0) neighbors.push(graph[row - 1][col]); // top
	if (!isDiagonal) return neighbors;

	if (row - 1 >= 0 && col - 1 >= 0) neighbors.push(graph[row - 1][col - 1]); // top left
	if (row - 1 >= 0 && col + 1 < cols) neighbors.push(graph[row - 1][col + 1]); // top right
	if (row + 1 < rows && col - 1 >= 0) neighbors.push(graph[row + 1][col - 1]); // bot left
	if (row + 1 < rows && col + 1 < cols)
		neighbors.push(graph[row + 1][col + 1]); // bot right
	return neighbors;
};
