import React from 'react';

import { Display } from './Display';
import { Form } from './Form';
import getProperties from './weather-fetch';

class App extends React.Component {
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
        <div className='app container'>
          <h1>Weather App</h1>
          <Display data={this.state}/>
          <Form setData={this.setData}/>
        </div>
      );
    }
  }

  export { App }