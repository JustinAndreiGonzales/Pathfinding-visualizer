import type { CellState, CellType } from "../types";

export const createNewGrid = (
	x: number,
	y: number,
	state: CellState,
): CellType[][] => {
	return Array.from({ length: x }, (_, i) =>
		Array.from(
			{ length: y },
			(_, j) =>
				({
					row: i,
					col: j,
					state: state,
				}) as CellType,
		),
	);
};
