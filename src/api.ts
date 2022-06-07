import axios from 'axios'

const BASE_URL = 'http://localhost:4000'

export const fetcher = async (endpoint: string) => {
  return await axios.get(`${BASE_URL}/${endpoint}`);
}