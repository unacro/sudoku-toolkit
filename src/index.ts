import { SudokuSolver } from "./sudoku_solver";
import sudokuBoards from "../data/sudoku_boards.json";

const solver = new SudokuSolver();

const sampleBoard = sudokuBoards[0].board;
solver.init(sampleBoard);
solver.printBoard();
console.timeEnd("运行结束");

export { SudokuSolver };
