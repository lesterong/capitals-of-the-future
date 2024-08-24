export const getPages = (length: number, start: number = 1) =>
  Array(length)
    .fill(start)
    .map((prev, idx) => prev + idx);

export const getPagination = (
  currentPage: number,
  totalPages: number,
): Array<number | "..."> => {
  if (totalPages <= 5) {
    return getPages(totalPages);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, 4, "...", totalPages];
  }

  if (currentPage < totalPages - 2) {
    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  }

  return [1, "...", ...getPages(4, totalPages - 3)];
};
