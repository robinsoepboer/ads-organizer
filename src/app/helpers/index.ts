export function getNextId(array: any[]): number {
    let nextId = 0;
    array.forEach((item) => {
        if (!item.id)
            throw new Error('getNextId: Objects in array doesn\'t have \'id\' property!');

        if (item.id > nextId)
            nextId = item.id;
    });

    return nextId + 1;
}