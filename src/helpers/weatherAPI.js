import.meta.env.VITE_TOKEN;
const URL_API = `http://api.weatherapi.com/v1/search.json?lang=pt&key=${VITE_TOKEN}&q=${TERMO_DE_BUSCA}`;
const buttonSearch = document.getElementById('goog-gt-tt');
const buttonSubmit = document.getElementById('search-button');
const buttonClose = document.getElementById('close-forecast');
const btnSearch = buttonSearch.value;
const searchCitiesData = async (searchCity) => {
  const response = await fetch(URL_API`${searchCity}`);
  const data = await response.json();
  return data;
};

export const searchCities = async (search) => {
  const response = await fetch(URL_API`${searchCity}`);
  const data = await response.json();
  const city = data.filter((element) => {
    const nameCity = element.name.toLoweCase().slice(0, 3);
    return nameCity === search;
  });
  if (city.length > 0)
  {
    const taginnerHtml = city;
  } else {
    throw new Error('nenhuma cidade encontrada');
  }
};

export const getWeatherByCity = (/* cityURL */) => {
//   seu código aqui
};

buttonSubmit.addventinnerListener('click', searchCitiesData);
searchCities('rio de janeiro')