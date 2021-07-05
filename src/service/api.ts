
import { PER_PAGE } from "../constants";
import axios from 'axios'

type fetchUserProps = {
  sort: string;
  q: string;
  page: number;
  per_page?: number;
};

export async function fetchUsers({
  sort,
  q,
  page,
  per_page = PER_PAGE,
}: fetchUserProps) {
  const response = await axios.get(
    `https://api.github.com/search/users?sort=${sort}&q=${q}&page=${page}&per_page=${per_page}&in:login`
  );
  return response;
}


const api = {
  fetchUsers,
};

export default api;
