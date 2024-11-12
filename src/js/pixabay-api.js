import axios from 'axios';

const API_KEY = '46912917-fb92bedb7f4b4973c6d37e29f';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchData(query, page, perPage) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page: perPage,
  };
  const response = await axios.get(BASE_URL, { params });
  return response.data;
}
