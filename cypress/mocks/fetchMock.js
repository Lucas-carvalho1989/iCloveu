import { RioSearchData, currentData, RioForecastData } from './dataMock';

export const fetchMock = (url) => Promise.resolve({
  json: () => {
    if (url.startsWith('http://api.weatherapi.com/v1/search.json')) {
      if (url.includes('q=Rio')) return Promise.resolve(RioSearchData);
      return Promise.resolve([]);
    }

    if (url.startsWith('http://api.weatherapi.com/v1/current.json')) {
      const cityURL = url.replace(/.+q=((\w|-)+)(\&|$).*/, '$1');
      return Promise.resolve(currentData[cityURL]);
    }

    if (url.startsWith('http://api.weatherapi.com/v1/forecast.json') && url.includes('days=7')) {
      return Promise.resolve(RioForecastData);
    }

    return Promise.reject(new Error('URL não mapeada'));
  }
});
