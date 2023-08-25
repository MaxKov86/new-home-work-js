const url = `https://api.thecatapi.com/v1/breeds`;
const api_key =
  'api_key=live_nfKTGHChHyOfgoDR6oopBuHIze3HjkphJRUPhFIYkI3hfYlzOVlqDyj7dvmhx4sN';

//  function fetchBreeds() {
//   return fetch(`${url}?${api_key}`).then(response => {
//     if (!response.ok) {
//       throw new Error(response.status);
//     }

//     return response.json();
//   });
// }

async function fetchBreeds() {
  const response = await fetch(`${url}?${api_key}`);
  const breeds = await response.json();

  if (!response.ok) {
    throw new Error(response.status);
  }
  return breeds;
}

function fetchBreedById(breedsId) {
  return fetch(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${breedsId}&${api_key}`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }

    return response.json();
  });
}

export { fetchBreeds, fetchBreedById };
