import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


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
  try {
    const url = weatherURL(city);
    const response = await fetch(url, {mode: 'cors'});
    const weatherData = await response.json();
    const processedData = processData(weatherData);
    return processedData
} catch(err) {
    if (err instanceof TypeError) {
        console.log(err) //TODO: show error in form if invalid city
    }
    console.log({ err, })
  }
}



class Form extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      city: ''
    };
    this.state = {...this.initialState};

    this.handleChange = this.handleChange.bind(this);
    this.submitData = this.submitData.bind(this);
  }

  handleChange(e) {
    this.setState({city: e.target.value})
  }

  submitData = async () => {
    const properties = await getProperties(this.state.city);
    const city = this.state.city;
    this.props.setData({city, ...properties});
  }


  render() {
    return (
      <form id='cityForm'>
        <label>
          City: 
          <input 
            name='city'
            type='text'
            onChange={this.handleChange}
            required
          >
          </input>
          <input 
            type='button' 
            value='Submit' 
            onClick={this.submitData}
            >
            </input>
        </label>
      </form>
    )
  }
}

const Display = (props) => {
  const {
    city,
    tempCurrent,
    tempFeelsLike,
    tempMax,
    tempMin,
    description
  } = props.data;

  if(!city) {
    return null
  }

  return (
    <div id='statsDisplay'>
      <p>City: {city}</p>
      <p>Temperature: {tempCurrent}</p>
      <p>Feels like: {tempFeelsLike}</p>
      <p>Max: {tempMax}</p>
      <p>Min: {tempMin}</p>
      <p>{description}</p>
    </div>
  )
}


class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      city: '',
      tempCurrent: '',
      tempFeelsLike: '',
      tempMax: '',
      tempMin: '',
      description: ''
    }
    this.state = {...this.initialState};
    this.setData = this.setData.bind(this);
  }

  setData({...data}) {
    this.setState({...data})
  }

  render() {
    return (
      <div>
        <h1>Weather App</h1>
        <Display data={this.state}/>
        <Form setData={this.setData}/>
      </div>
    );
  }
}


ReactDOM.render(
  <React.StrictMode>
    <Weather />
  </React.StrictMode>,
  document.getElementById('root')
);
