export class MinHeap<T> {
	private heap: T[] = [];
	private compare: (a: T, b: T) => number;

	constructor(compare: (a: T, b: T) => number) {
		this.compare = compare;
	}

	private getParentIndex(index: number): number {
		return Math.floor((index - 1) / 2);
	}

	private getLeftChildIndex(index: number): number {
		return index * 2 + 1;
	}

	private getRightChildIndex(index: number): number {
		return index * 2 + 2;
	}

	private swap(i: number, j: number) {
		[this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
	}

	insert(value: T) {
		this.heap.push(value);
		this.heapifyUp();
	}

	private heapifyUp() {
		let index = this.heap.length - 1;

		while (
			index > 0 &&
			this.compare(
				this.heap[index],
				this.heap[this.getParentIndex(index)],
			) < 0
		) {
			this.swap(index, this.getParentIndex(index));
			index = this.getParentIndex(index);
		}
	}

	extractMin(): T | undefined {
		if (this.heap.length === 0) return undefined;
		if (this.heap.length === 1) return this.heap.pop();

		const min = this.heap[0];
		this.heap[0] = this.heap.pop()!;
		this.heapifyDown();
		return min;
	}

	private heapifyDown() {
		let index = 0;

		while (this.getLeftChildIndex(index) < this.heap.length) {
			let smallerChildIndex = this.getLeftChildIndex(index);
			const getRightChildIndex = this.getRightChildIndex(index);

			if (
				getRightChildIndex < this.heap.length &&
				this.compare(
					this.heap[getRightChildIndex],
					this.heap[smallerChildIndex],
				) < 0
			) {
				smallerChildIndex = getRightChildIndex;
			}

			if (
				this.compare(this.heap[index], this.heap[smallerChildIndex]) <=
				0
			)
				break;

			this.swap(index, smallerChildIndex);
			index = smallerChildIndex;
		}
	}

	peek(): T | undefined {
		return this.heap[0];
	}

	size(): number {
		return this.heap.length;
	}

	isEmpty(): boolean {
		return this.heap.length === 0;
	}
}
