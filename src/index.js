import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import getProperties from './weather-fetch'


class Form extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      city: '',
      valid: true,
    };
    this.state = {...this.initialState};

    this.handleChange = this.handleChange.bind(this);
    this.submitData = this.submitData.bind(this);
  }

  handleChange(e) {
    if (!this.state.valid) {
      this.setState({valid: true})
    }

    this.setState({city: e.target.value})
  }

  submitData = async () => {
    try {
      const properties = await getProperties(this.state.city);
      const city = this.state.city;
      this.props.setData({city, ...properties});
    } catch(err) {
      console.log({err, })
      this.setState({valid: false})
    }
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
            {this.state.valid === false && 
              <div id='invalidCity'>
                Invalid Request
              </div>
            }
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
