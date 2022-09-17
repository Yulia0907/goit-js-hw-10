import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';


const DEBOUNCE_DELAY = 300;
const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');


input.addEventListener('input', debounce (e => {
    const trimValue = input.value.trim();
    removeHtml(); 
    if (trimValue !== '') {
        fetchCountries(trimValue).then(foundData => {
              if (foundData.length > 10) {
                Notiflix.Notify.info ('Too many matches found. Please enter a more specific name.');
            } else if (foundData.length === 0) {
                Notiflix.Notify.failure('Oops, there is no country with that name');
            } else if (foundData.length >= 2 && foundData.length <= 10) {
                 listCountries(foundData);
            } else if (foundData.length === 1) {
                 cardOneCountry(foundData);
            }
        });
    }
}, DEBOUNCE_DELAY)
);

function listCountries(countries) {
    const markup = countries
      .map(country => {
        return `<li>
        <img src="${country.flags.svg}" alt="Flag of ${country.name.official}" width="20" hight="20"> 
        <p>${country.name.official}</p>
        </li>`;
      })
      .join('');
    countryList.innerHTML = markup;
  }
  
function cardOneCountry(countries) {
      const markup = countries
        .map(country => {
          return `<li>
          <div class="country">
              <img src="${country.flags.svg}" alt="Flag of ${country.name.official}" width="20" hight="20">
               <p><b>${country.name.official}</b></p>
          </div>
          <p><b>Capital:</b> ${country.capital}</p>
          <p><b>Population:</b> ${country.population}</p>
          <p><b>Languages:</b> ${Object.values(country.languages)} </p>
          </li>`;
          })
        .join('');
      countryInfo.innerHTML = markup;
  }

function removeHtml() {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
  }


