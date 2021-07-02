export function pickXPages(currentPage: number, lastPage: number) {
  const pages = [currentPage, currentPage + 1, currentPage + 2];

  return pages.includes(lastPage)
    ? [currentPage, currentPage + 1, currentPage + 2]
    : pages;
}
