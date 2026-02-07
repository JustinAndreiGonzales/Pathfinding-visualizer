import type { CellIndex, CellType } from "../../types";
import { createNewGrid } from "../../utilities/createNewGrid";
import { getNeighbors } from "../algo_utils";

export const getRandomIndex = (rows: number, cols: number) => {
	const row = Math.floor(Math.random() * rows);
	const col = Math.floor(Math.random() * cols);
	return { row, col };
};

export const primMazeGenerator = (
	rows: number,
	cols: number,
	isDiagonal: boolean,
) => {
	const wallCreation: CellIndex[] = [];
	const newGrid = createNewGrid(rows, cols, "wall");

	const { row, col } = getRandomIndex(rows, cols);

	const start = newGrid[row][col];
	start.state = "unvisited";
	wallCreation.push({ row, col });

	const frontier: CellType[] = [];

	getNeighbors<CellType>(newGrid, start, rows, cols, isDiagonal).forEach(
		(neighbor) => {
			if (neighbor.state === "wall") frontier.push(neighbor);
		},
	);

	while (frontier.length !== 0) {
		const randomIndex = Math.floor(Math.random() * frontier.length);
		const [current] = frontier.splice(randomIndex, 1);

		const neighbors = getNeighbors<CellType>(
			newGrid,
			current,
			rows,
			cols,
			false,
		);
		const paths = neighbors.filter(
			(neighbor) => neighbor.state === "unvisited",
		);

		if (paths.length === 1) {
			current.state = "unvisited";
			wallCreation.push({ row: current.row, col: current.col });

			neighbors.forEach((neighbor) => {
				if (neighbor.state === "wall" && !frontier.includes(neighbor))
					frontier.push(neighbor);
			});
		}
	}
	return wallCreation;
};
