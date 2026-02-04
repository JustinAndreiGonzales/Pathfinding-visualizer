export const getGridDimension = (gridSize: string) => {
    const newSize = gridSize.match(/\((\d+)x(\d+)\)/);
    if (!newSize) {
        throw new Error('Invalid format');
    }
    return [Number(newSize[1]), Number(newSize[2])];
};
