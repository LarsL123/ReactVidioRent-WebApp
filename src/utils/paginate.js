//import _ from "lodash";

export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  let paginatedData = [];
  for (let j = 0, i = startIndex; i < startIndex + pageSize; i++) {
    if (items[i] !== undefined) {
      paginatedData[j++] = items[i];
    }
  }
  return paginatedData;
}
