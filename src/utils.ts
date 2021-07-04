export function pickXPages(currentPage: number, lastPage: number) {
  const pages = [currentPage, currentPage + 1, currentPage + 2];

  return pages.includes(lastPage)
    ? [currentPage, currentPage + 1, currentPage + 2]
    : pages;
}

export function dataSorter(data: any) {
  return {
    ...data,
    items: data.items.sort((a: any, b: any) => {
      if (a > b) return -1;
      if (b > a) return 1;
      return 0;
    }),
  };
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat("en-Us", {}).format(value)
}