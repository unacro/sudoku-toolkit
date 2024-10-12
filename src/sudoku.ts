type PossibleSudokuNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type RawSudokuCell = PossibleSudokuNumber | undefined;
type CandidateFlag = number;

abstract class Sudoku {
	protected constructor() {
		// Cannot create an instance of an abstract class. ts(2511)
	}

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	protected static getNormalizedBoard(...args: any[]): RawSudokuCell[] {
		/**
		 * @todo 输入数独题面，参数归一化解析为标准格式的题面
		 */
		const validNumberRange = Array.from({ length: 9 }, (_, i) => i + 1);
		const getVaildCell = (cell: number): RawSudokuCell => {
			return (
				validNumberRange.includes(cell) ? cell : undefined
			) as RawSudokuCell;
		};
		const normalizedBoard: RawSudokuCell[] = [];
		switch (args.length) {
			case 81: {
				args.map((cell) => {
					const num = typeof cell === "number" ? cell : Number.parseInt(cell);
					normalizedBoard.push(getVaildCell(num));
				});
				break;
			}

			case 9: {
				throw new Error("TODO: 处理 9 个参数");
				// biome-ignore lint/correctness/noUnreachable: <explanation>
				break;
			}

			case 1: {
				if (Array.isArray(args[0])) {
					if (args[0].length === 81) {
						args[0].map((cell) => {
							const num =
								typeof cell === "number" ? cell : Number.parseInt(cell);
							normalizedBoard.push(getVaildCell(num));
						});
					} else if (args[0].length === 9) {
						throw new Error("TODO: 处理 1 个二维数组参数");
					} else {
						throw new Error("Invalid argument length");
					}
				} else if (typeof args[0] === "string") {
					args[0].split("").map((char) => {
						const num = Number.parseInt(char);
						normalizedBoard.push(getVaildCell(num));
					});
				} else {
					throw new Error("Invalid argument type");
				}
				break;
			}

			default: {
				throw new Error("Invalid arguments count");
			}
		}
		return normalizedBoard;
	}

	protected static getSameRowCells(cellIndex: number): number[] {
		const [row, col] = [Math.floor(cellIndex / 9), cellIndex % 9];
		const sameRowIndex = Array.from({ length: 9 }, (_, index) => index)
			.filter((index) => index !== col)
			.map((index) => row * 9 + index);
		return sameRowIndex;
	}

	protected static getSameColumnCells(cellIndex: number): number[] {
		const [row, col] = [Math.floor(cellIndex / 9), cellIndex % 9];
		const sameColumnIndex = Array.from({ length: 9 }, (_, index) => index)
			.filter((index) => index !== row)
			.map((index) => index * 9 + col);
		return sameColumnIndex;
	}

	protected static getSameBlockCells(cellIndex: number): number[] {
		const [row, col] = [Math.floor(cellIndex / 9), cellIndex % 9];
		const [blockRow, blockCol] = [Math.floor(row / 3), Math.floor(col / 3)];
		const sameBlockIndex = [];
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				if (blockRow * 3 + i === row || blockCol * 3 + j === col) continue;
				sameBlockIndex.push((blockRow * 3 + i) * 9 + blockCol * 3 + j);
			}
		}
		return sameBlockIndex;
	}

	protected static getRelatedCells(targetCell: number): number[] {
		const relatedCellList: number[] = [
			...Sudoku.getSameRowCells(targetCell),
			...Sudoku.getSameColumnCells(targetCell),
			...Sudoku.getSameBlockCells(targetCell),
		];
		console.assert(new Set(relatedCellList).size === 20); // 无重复元素, 长度固定为 20
		return relatedCellList;
	}

	protected static countOnes(rawNumber: number): number {
		let [count, tempNumber] = [0, rawNumber];
		while (tempNumber) {
			tempNumber &= tempNumber - 1; // Brian Kernighan 算法
			count++;
		}
		return count;
	}

	protected static limitSudokuCell(
		rawCellNumber: number,
		impossibleNumber: PossibleSudokuNumber,
	): number {
		// if (rawCellNumber < 0b1_000_000_000) return rawCellNumber;
		return rawCellNumber & ~(1 << (9 - impossibleNumber));
	}

	protected static getCandidates(board: RawSudokuCell[]): CandidateFlag[] {
		/**
		 * @todo 获取可行的数字候选，结果是 Uint16Array 的稀疏数组
		 */
		return [];
	}

	protected static findBestCell(candidates: CandidateFlag[]): number {
		/**
		 * @todo 获取候选数字数量越少的格子，返回格子下标 cellIndex
		 */
		return -1;
	}

	protected static isCellValid(
		board: RawSudokuCell[],
		cellIndex: number,
	): boolean {
		/**
		 * @todo 验证格子可行性
		 */
		return false;
	}

	protected static isAnswerValid(board: RawSudokuCell[]): boolean {
		/**
		 * @todo 验证答案可行性
		 * 1 填满九宫格且数字合法（1～9 整数）
		 * 2 所有宫列行都符合互不冲突规则（`new Set()`，验证 cell 查表 or 判断类型和大小并 `set.add()`，最终 `set.size === 9`）
		 */
		return false;
	}
}

export { Sudoku, type RawSudokuCell as rawSudokuCell };
