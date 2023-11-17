const nameCountry = document.getElementById('name');
const regionCountry = document.getElementById('region');
const capitalCountry = document.getElementById('capital');
const flagImage = document.getElementById('flagImage');
const languagesCountry = document.getElementById('language');
const currencyCountry = document.getElementById('money');
const populationCountry = document.getElementById('population');
const borderCountry = document.getElementById('border');
const mapCountry = document.getElementById('map');

const search = document.getElementById('search');
const searchDiv = document.getElementById('searchDiv');

let countriesData;

const searchCountry = async () => {
  try {
    const res = await fetch('https://restcountries.com/v3.1/all');

    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }

    const data = await res.json();
    countriesData = data;

    // Display a default country (you can change this logic)
    const randomCountry = Math.floor(Math.random() * data.length);
    displayCountry(data[randomCountry]);
  } catch (error) {
    console.error(error);
  }
};

const displayCountry = (country) => {
  const { flags, name, region, capital, languages, borders, currencies, maps, population } = country;

  nameCountry.textContent = name.common;
  regionCountry.textContent = region;
  capitalCountry.textContent = capital[0];
  flagImage.src = flags.png;

  const languageList = Object.values(languages).join(', '); 
  languagesCountry.textContent = languageList;
  
  const currencyList = Object.values(currencies).map(currency => `${currency.name}, ${currency.symbol}`).join(', ');
  currencyCountry.textContent = currencyList;

  populationCountry.textContent = population.toLocaleString()

  borderCountry.textContent = borders.length > 0 ? borders.join(', ') : 'None';
  
  mapCountry.href = maps.googleMaps;

};


search.addEventListener('input', (e) => {
  const inputValue = search.value.trim();
  searchCountryName(inputValue);
});



const searchCountryName = (inputValue) => {
  searchDiv.innerHTML = '';

  const filteredCountries = countriesData.filter((country) => {
    const countryName = country.name.common.toLowerCase();
    return countryName.includes(inputValue.toLowerCase());
  });

  displaySearchResults(filteredCountries);
};



const displaySearchResults = (data) => {
  data.forEach((item) => {
    const { name } = item;

    const span = document.createElement('span');
    span.textContent = name.common;
    span.classList.add('text-white')


    span.addEventListener('click', () => {
      displayCountry(item);
      searchDiv.innerHTML = '';
      search.value = name.common;
      search.value =''
    });

    searchDiv.appendChild(span);
  });
};




searchCountry();


