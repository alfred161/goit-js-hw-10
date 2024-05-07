import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { Notify } from 'notiflix';

const breedSelectEl = document.querySelector('.breed-select');
const catInfoEl = document.querySelector('.cat-info');
const loaderInfoEl = document.querySelector('.loader');

function createBreedOptions() {
  breedSelectEl.classList.add('is-hidden');

  fetchBreeds()
    .then(data => {
      let optionsEl = data.map(({ id, name }) => {
        return `<option value="${id}">${name}</option>`;
      });

      breedSelectEl.insertAdjacentHTML('beforeend', optionsEl);
      new SlimSelect({
        select: '.breed-select',
      });

      breedSelectEl.classList.remove('is-hidden');
      loaderInfoEl.classList.add('is-hidden');
    })
    .catch(onError);
}

function createBreedMarkup(e) {
  loaderInfoEl.classList.replace('is-hidden', 'loader');
  catInfoEl.classList.add('is-hidden');

  fetchCatByBreed(e.target.value)
    .then(data => {
      const { url, breeds } = data[0];
      const { name, description, temperament } = breeds[0];

      catInfoEl.innerHTML = `
        <img src="${url}" alt="${name}"/>
        <div class="box">
        <h2>${name}</h2>
        <p>${description}</p>
        <p><span>Temperament: </span>${temperament}</p>
        </div>
    `;

      loaderInfoEl.classList.replace('loader', 'is-hidden');
      catInfoEl.classList.remove('is-hidden');
    })
    .catch(onError);
}

function onError() {
  Notify.failure('Oops! Something went wrong! Try reloading the page!');

  breedSelectEl.classList.add('is-hidden');
  loaderInfoEl.classList.add('is-hidden');
  catInfoEl.classList.add('is-hidden');
}

createBreedOptions();

breedSelectEl.addEventListener('change', createBreedMarkup);
