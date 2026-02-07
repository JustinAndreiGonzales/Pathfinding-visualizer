import type { CellIndex, CellType, Graph } from "../../types";
import { getNeighbors } from "../algo_utils";
import { MinHeap } from "../minheap";

type CellData = {
	row: number;
	col: number;
	dist: number;
	prev: CellIndex | null;
	isVisited: boolean;
};

const getPrevCell = (cellData: CellData[][], cell: CellIndex) => {
	const prev = cellData[cell.row][cell.col].prev;
	if (prev === null) return null;
	return { row: prev.row, col: prev.col };
};

export const useDijkstra = (
	graph: Graph,
	start: CellType,
	end: CellType,
	isDiagonal: boolean,
) => {
	const [rows, cols] = [graph.length, graph[0].length];

	const { cellData, cellsVisited } = dijkstra(
		graph,
		start,
		rows,
		cols,
		isDiagonal,
	);
	const path = reconstructPath(graph, cellData, end);

	return { cellsVisited, path };
};

const cellTypeToIndex = (cellType: CellType) => {
	return { row: cellType.row, col: cellType.col };
};

const createGrid = (
	rows: number,
	cols: number,
	value: (row: number, col: number) => CellData,
) => {
	return Array.from({ length: rows }, (_, i) =>
		Array.from({ length: cols }, (_, j) => value(i, j)),
	);
};

const reconstructPath = (
	nextGrid: Graph,
	prev: CellData[][],
	end: CellType,
) => {
	const path: CellIndex[] = [];
	let current: CellIndex | null = cellTypeToIndex(end);
	while (current !== null) {
		path.push(current);
		current = getPrevCell(prev, current);
	}

	path.reverse();

	if (nextGrid[path[0].row][path[0].col].state === "start") {
		return path;
	} else {
		throw new Error("path not found");
	}
};

const dijkstra = (
	graph: Graph,
	start: CellType,
	rows: number,
	cols: number,
	isDiagonal: boolean,
) => {
	const cellsVisited: CellIndex[] = [];
	const cellData = createGrid(rows, cols, (row: number, col: number) => ({
		row,
		col,
		dist: Infinity,
		prev: null,
		isVisited: false,
	}));

	cellData[start.row][start.col].dist = 0;

	const pq = new MinHeap<CellData>((a, b) => a.dist - b.dist);

	pq.insert(cellData[start.row][start.col]);

	while (!pq.isEmpty()) {
		let u = pq.extractMin();
		if (!u) break;
		const row = u.row;
		const col = u.col;

		if (cellData[row][col].isVisited) continue;
		cellData[row][col].isVisited = true;
		cellsVisited.push({ row, col });

		if (graph[row][col].state === "end") break;

		const neighbors = getNeighbors<CellData>(
			graph,
			u,
			rows,
			cols,
			isDiagonal,
		).filter((neighbor) => neighbor.state !== "wall");
		neighbors.forEach((v) => {
			const nrow = v.row;
			const ncol = v.col;
			if (cellData[nrow][ncol].isVisited) return;

			const alt = cellData[row][col].dist + 1;
			if (alt < cellData[nrow][ncol].dist) {
				cellData[nrow][ncol].dist = alt;
				cellData[nrow][ncol].prev = { row, col };
				pq.insert(cellData[nrow][ncol]);
			}
		});
	}

	return { cellData, cellsVisited };
};
