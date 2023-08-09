const token = import.meta.env.VITE_TOKEN;

export const searchCities = async (search) => {
  const response = await fetch(`http://api.weatherapi.com/v1/search.json?lang=pt&key=${token}&q=${search}`);
  const data = await response.json();
  return data;
};
export const getWeatherByCity = async (cityURL) => {
  const response = await fetch(`http://api.weatherapi.com/v1/current.json?lang=pt&key=${token}&q=${cityURL}`);
  const data = await response.json();
  const dataObject = {
    name: data.location.name,
    country: data.location.country,
    temp: data.current.temp_c,
    condition: data.current.condition.text,
    icon: data.current.condition.icon,
    url: data.location.tz_id,
  };
  return dataObject;
};
