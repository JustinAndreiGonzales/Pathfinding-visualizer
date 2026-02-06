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

const indexToObject = (i: number, j: number, dist: number) => {
    return { i, j, dist };
};

const getNeighbors = (
    graph: Graph,
    index: { i: number; j: number },
    rows: number,
    cols: number
) => {
    let neighbors = [];
    if (index.j + 1 < cols && graph[index.i][index.j + 1].state !== 'wall')
        neighbors.push({ i: index.i, j: index.j + 1 }); // right
    if (index.i + 1 < rows && graph[index.i + 1][index.j].state !== 'wall')
        neighbors.push({ i: index.i + 1, j: index.j }); // bot
    if (index.j - 1 >= 0 && graph[index.i][index.j - 1].state !== 'wall')
        neighbors.push({ i: index.i, j: index.j - 1 }); // left
    if (index.i - 1 >= 0 && graph[index.i - 1][index.j].state !== 'wall')
        neighbors.push({ i: index.i - 1, j: index.j }); // top
    return neighbors;
};

const getPrevCell = (
    cellData: CellData[][],
    cell: { i: number; j: number }
) => {
    const prev = cellData[cell.i][cell.j].prev;
    if (prev === null) return null;
    return { i: prev.i, j: prev.j };
};

export const useDijkstra = (graph: Graph, start: CellType, end: CellType) => {
    const [rows, cols] = [graph.length, graph[0].length];

    const { cellData, cellsVisited } = dijkstra(graph, start, rows, cols);
    const path = reconstructPath(graph, cellData, end);

    return { cellsVisited, path };
};

const cellTypeToIndex = (cellType: CellType) => {
    return { i: cellType.row, j: cellType.col };
};

const reconstructPath = (
    nextGrid: Graph,
    prev: CellData[][],
    end: CellType
) => {
    const path: { i: number; j: number }[] = [];
    let current: { i: number; j: number } | null = cellTypeToIndex(end);
    while (current !== null) {
        path.push(current);
        current = getPrevCell(prev, current);
    }

    path.reverse();

    if (nextGrid[path[0].i][path[0].j].state === 'start') {
        return path;
    } else {
        throw new Error('path not found');
    }
};

const dijkstra = (
    graph: Graph,
    start: CellType,
    rows: number,
    cols: number
) => {
    const cellsVisited = [];
    const cellData = Array.from({ length: rows }, () =>
        Array.from(
            { length: cols },
            () => ({ dist: Infinity, prev: null, isVisited: false }) as CellData
        )
    );

    cellData[start.row][start.col].dist = 0;

    const pq = new MinHeap<{ i: number; j: number; dist: number }>(
        (a, b) => a.dist - b.dist
    );

    pq.insert(
        indexToObject(start.row, start.col, cellData[start.row][start.col].dist)
    );

    while (!pq.isEmpty()) {
        let u = pq.extractMin();
        if (!u) break;

        if (cellData[u.i][u.j].isVisited) continue;
        cellData[u.i][u.j].isVisited = true;
        cellsVisited.push({ i: u.i, j: u.j });

        if (graph[u.i][u.j].state === 'end') break;

        const neighbors = getNeighbors(graph, u, rows, cols);
        neighbors.forEach((v) => {
            if (cellData[v.i][v.j].isVisited) return;

            const alt = cellData[u.i][u.j].dist + 1;
            if (alt < cellData[v.i][v.j].dist) {
                cellData[v.i][v.j].dist = alt;
                cellData[v.i][v.j].prev = u;
                pq.insert(indexToObject(v.i, v.j, alt));
            }
        });
    }

    return { cellData, cellsVisited };
};
