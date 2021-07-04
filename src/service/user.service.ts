import { PER_PAGE } from "../constants";

type fetchUserProps = {
  sort: string;
  q: string;
  page: number;
  per_page?: number;
};

async function fetchUsers({
  sort,
  q,
  page,
  per_page = PER_PAGE,
}: fetchUserProps) {
  const response = await fetch(
    `https://api.github.com/search/users?sort=${sort}&q=${q}&page=${page}&per_page=${per_page}&in:login`
  );

  const data = await response.json();
  return data;
}

export default fetchUsers;
