import axios from 'axios';

const BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY =
  'live_3QdbBGoB9DsmMqy9memhYHCvcCxLkbMXp7OsEhRbi11estAuihRtnNRQmeiQjBwb';

export async function fetchBreeds(params) {
  return (await axios.get(`${BASE_URL}/breeds?api_key=${API_KEY}`)).data;
}

export async function fetchCatByBreed(breedId) {
  return (
    await axios.get(
      `${BASE_URL}/images/search?api_key=${API_KEY}&breed_id=${breedId}`
    )
  ).data;
}
