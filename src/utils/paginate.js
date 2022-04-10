export function paginate(items, pageNumber, pageSize) {
    let startIndex = (pageNumber - 1) * pageSize;
    return [...items].splice(startIndex, pageSize);
}
