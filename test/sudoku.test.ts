import { expect, test } from "bun:test";
import { Sudoku } from "../src/sudoku";

class SudokuProxy extends Sudoku {
	constructor() {
		super();
		console.debug("创建代理类");
	}

	static getRelatedCells(cellIndex: number) {
		return Sudoku.getRelatedCells(cellIndex);
	}

	static printRelatedCells(relatedCells: number[]): void {
		let display = "";
		for (let i = 0; i < 9; i++) {
			display += "\n";
			for (let j = 0; j < 9; j++) {
				// display += relatedCells.includes(i * 9 + j) ? "■" : "□";
				display += relatedCells.includes(i * 9 + j) ? "龘" : "〇";
			}
		}
		console.log(display);
	}
}

function getRandomInteger(min: number, max: number): number {
	const [minNumber, maxNumber] = min < max ? [min, max] : [max, min];
	return Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
}

test("Class Sudoku {} Functions", () => {
	const relatedCells = SudokuProxy.getRelatedCells(getRandomInteger(0, 80));
	SudokuProxy.printRelatedCells(relatedCells);
	expect(0b1 + 0o2 + 3 + 0x4).toBe(1e1);
});
