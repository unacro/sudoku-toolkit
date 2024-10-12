import { Sudoku, type rawSudokuCell } from "./sudoku";

type sudokuCell = string | number;

class SudokuSolver extends Sudoku {
	protected rawBoard?: rawSudokuCell[]; // 原始题面，仅有已确定数字的最小题面

	constructor() {
		super();
		console.time("运行结束");
	}

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	init(anyBoard: any): boolean {
		const normalizedBoard = Sudoku.getNormalizedBoard(anyBoard);
		if (normalizedBoard.length !== 81) return false;
		this.rawBoard = normalizedBoard;
		return true;
	}

	getBoard(): sudokuCell[][] {
		if (!this.rawBoard) {
			console.error("Not initialized yet");
			return [];
		}
		const board = [];
		for (let i = 0; i < 9; i++) {
			const row = [];
			for (let j = 0; j < 9; j++) {
				const cell = this.rawBoard[i * 9 + j];
				row.push(cell ? cell : "_");
			}
			board.push(row);
		}
		return board;
	}

	printBoard(style = "simple"): void {
		switch (style) {
			case "details": {
				console.error("TODO: 标注候选数字");
				break;
			}

			default: {
				console.table(this.getBoard());
				break;
			}
		}
	}

	#initializeCandidates(): boolean {
		/**
		 * @todo 获取候选数字可能性并顺便简化题面
		 */
		return false;
	}

	// #dfsRecursive(): {};
	// #dfsIterative(): {};

	#solve(): boolean {
		/**
		 * @todo 入口主函数
		 */
		return false;
	}

	getAnswer(): rawSudokuCell[] {
		/**
		 * @todo 获取最终答案
		 */
		return [];
	}
}

export { SudokuSolver };
