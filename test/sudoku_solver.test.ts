import { expect, test } from "bun:test";
import { SudokuSolver } from "../src/sudoku_solver";
import sudokuBoards from "../data/sudoku_boards.json";

const sudokuSolver = new SudokuSolver();

test("Input Sudoku Boards", () => {
	const simpleBoard = sudokuBoards[0].board;
	const expectedBoard = [
		[8, 7, 2, "_", 9, 5, "_", "_", 1],
		["_", 5, 3, "_", "_", 8, 6, "_", "_"],
		[4, "_", "_", 7, 1, "_", 2, "_", 8],
		[9, 4, "_", "_", "_", "_", 1, "_", 3],
		["_", 2, "_", "_", "_", 6, "_", 8, 4],
		[6, "_", 8, "_", "_", "_", "_", "_", "_"],
		["_", "_", "_", "_", "_", 7, "_", "_", "_"],
		[3, "_", 4, 8, "_", "_", 5, "_", "_"],
		[7, 1, 5, 3, 2, 9, 8, "_", 6],
	];
	/**
	 * @todo TypeError: Bun.inspect.table is not a function.
	 * @see https://bun.sh/docs/api/utils#bun-inspect-table-tabulardata-properties-options
	 */
	// console.log(Bun.inspect.table(expectedBoard));

	expect(sudokuSolver.init(simpleBoard)).toBe(true);
	let board = sudokuSolver.getBoard();
	expect(Bun.deepEquals(board, expectedBoard, true)).toBe(true);
	console.error();

	expect(sudokuSolver.init(simpleBoard.split(""))).toBe(true);
	board = sudokuSolver.getBoard();
	expect(Bun.deepEquals(board, expectedBoard, true)).toBe(true);
});
