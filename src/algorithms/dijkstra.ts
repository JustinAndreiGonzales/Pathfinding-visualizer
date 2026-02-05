import type { CellType } from '../types';

type Graph = CellType[][];

type CellData = {
    dist: number;
    prev: { i: number; j: number } | null;
    isVisited: boolean;
};

class MinHeap<T> {
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
                this.heap[this.getParentIndex(index)]
            )
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
                    this.heap[smallerChildIndex]
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

const indexToObject = (i: number, j: number) => {
    return { i: i, j: j };
};

const getNeighbors = (
    index: { i: number; j: number },
    rows: number,
    cols: number
) => {
    let neighbors = [];
    if (index.j + 1 < cols) neighbors.push({ i: index.i, j: index.j + 1 }); // right
    if (index.i + 1 < rows) neighbors.push({ i: index.i + 1, j: index.j }); // bot
    if (index.j - 1 >= 0) neighbors.push({ i: index.i, j: index.j - 1 }); // left
    if (index.i - 1 >= 0) neighbors.push({ i: index.i - 1, j: index.j }); // top
    return neighbors;
};

export const dijkstra = (graph: Graph, start: CellType) => {
    const [rows, cols] = [graph.length, graph[0].length];
    let cellData = Array.from({ length: rows }, () =>
        Array.from(
            { length: cols },
            () => ({ dist: Infinity, prev: null, isVisited: false }) as CellData
        )
    );

    cellData[start.row][start.col].dist = 0;

    const pq = new MinHeap<{ i: number; j: number }>(
        (a, b) => cellData[a.i][a.j].dist - cellData[b.i][b.j].dist
    );

    pq.insert(indexToObject(start.row, start.col));

    while (!pq.isEmpty()) {
        let u = pq.extractMin()!;
        if (cellData[u.i][u.j].isVisited) continue;
        cellData[u.i][u.j].isVisited = true;

        const neighbors = getNeighbors(u, rows, cols);
        neighbors.forEach((v) => {
            const alt = cellData[u.i][u.j].dist + 1;
            console.log(alt, cellData[v.i][v.j].dist);
            if (alt < cellData[v.i][v.j].dist) {
                cellData[v.i][v.j].dist = alt;
                cellData[v.i][v.j].prev = u;
                pq.insert(indexToObject(v.i, v.j));
            }
        });
    }
    return cellData;
};
