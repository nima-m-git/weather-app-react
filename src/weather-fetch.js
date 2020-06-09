const weatherURL = (city) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b3bd6f49f5db753d46c6a24720f1fda7`;

const processData = (data) => {
  return {
      tempMin: formatTempKToC(data.main.temp_max),
      tempMax: formatTempKToC(data.main.temp_min),
      tempCurrent: formatTempKToC(data.main.temp),
      tempFeelsLike: formatTempKToC(data.main.feels_like),
      description: data.weather[0].description
  }
}

const formatTempKToC = (kalvin) => (kalvin - 273.15).toFixed(1) + ' ˚C';

async function getProperties(city) {
    const url = weatherURL(city);
    const response = await fetch(url, {mode: 'cors'});
    const weatherData = await response.json();
    const processedData = processData(weatherData);
    return processedData
}

export default getProperties;
