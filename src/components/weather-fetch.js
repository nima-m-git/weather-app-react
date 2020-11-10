const weatherURL = (city) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b3bd6f49f5db753d46c6a24720f1fda7`;

const processData = (data) => {
  return {
      tempMin: formatTempKToC(data.main.temp_min),
      tempMax: formatTempKToC(data.main.temp_max),
      tempCurrent: formatTempKToC(data.main.temp),
      tempFeelsLike: formatTempKToC(data.main.feels_like),
      mainDescription: data.weather[0].main,
      description: data.weather[0].description,
      iconURL: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
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
