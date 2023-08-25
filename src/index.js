// import SlimSelect from 'slim-select';

// new SlimSelect({
//   select: '#selectElement',
// });
import { fetchBreeds, fetchBreedById } from './js/cat-api.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const select = document.querySelector('#selectElement');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
select.classList.add('is-hidden');

fetchBreeds()
  .then(result => {
    console.log(result);
    select.classList.remove('is-hidden');
    removeLoader();
    renderBreeds(result);
  })
  .catch(error => {
    console.log(error);
    removeLoader();
    Notify.failure('Oops! Something went wrong! Try reloading the page!');
  });

// select.addEventListener('change', e => {
//   addLoader();
//   clearCatInfo();
//   fetchBreedById(select.value)
//     .then(result => {
//       removeLoader();
//       renderBreedById(result);
//     })
//     .catch(error => {
//       console.log(error);
//       Notify.failure('Oops! Something went wrong! Try reloading the page!');
//     });
// });
select.addEventListener('change', onSelectChange);

async function onSelectChange(e) {
  addLoader();
  clearCatInfo();
  try {
    const breedsId = await fetchBreedById(select.value);
    removeLoader();
    return renderBreedById(breedsId);
  } catch (error) {
    Notify.failure('Oops! Something went wrong! Try reloading the page!');
  }
}

function renderBreeds(array) {
  return array.map(arr => {
    select.insertAdjacentHTML(
      'beforeend',
      `<option value = ${arr.id}>${arr.name}</option>`
    );
  });
}

function renderBreedById(data) {
  return data.map(({ breeds, url }) => {
    catInfo.insertAdjacentHTML(
      'beforeend',
      `<img src="${url}" alt="${breeds[0].name}" width="900" height = "450">
    <div class = "cat-info__container">
      <h1>${breeds[0].name}</h1>
      <p>${breeds[0].description}</p>
      <b>Temperament</b>
      <p>${breeds[0].temperament}</p>
    </div>`
    );
  });
}

function clearCatInfo() {
  catInfo.innerHTML = '';
}

function addLoader() {
  loader.classList.add('loader');
}
function removeLoader() {
  loader.classList.remove('loader');
}

// function numberToSumString(number) {
//   const numberStr = number.toString();
//   const length = numberStr.length;
//   let sumString = '';

//   for (let i = 0; i < length; i++) {
//     const digit = parseInt(numberStr[i]);
//     if (digit !== 0) {
//       if (sumString !== '') {
//         sumString += '+';
//       }
//       sumString += digit * 10 ** (length - i - 1);
//     }
//   }

//   return sumString;
// }

// const number = 5681;
// const result = numberToSumString(number);
// console.log(result);
