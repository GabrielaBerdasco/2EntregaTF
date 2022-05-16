export const lastIdFunction = (data) => {
    let lastId = 0;
    let itemsOnArray = data.length;
    if (itemsOnArray > 0) {
        lastId = data[itemsOnArray - 1].id;
        lastId++;
    } else {
        lastId++;
    }
    return lastId;
}