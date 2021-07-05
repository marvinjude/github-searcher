
import { PER_PAGE } from './constants';


export function paginationListGenerator(currentPage: number, totalCount: number) {

  if (Math.ceil(totalCount / PER_PAGE) === 1) {
    return [1]
  }

  if (Math.ceil(totalCount / PER_PAGE) === 2) {
    return [1, 2]
  }

  if (Math.ceil(totalCount / PER_PAGE) === 3) {
    return [1, 2, 3]
  }

  const pages = [currentPage, currentPage + 1, currentPage + 2];
  const lastPage =  Math.ceil(totalCount / PER_PAGE)

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