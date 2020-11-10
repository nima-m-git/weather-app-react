import React from 'react';

import { Display } from './Display';
import { Form } from './Form';


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
        <div>
            <h1>Weather App</h1>
            <div className='app container'>
            <Display data={this.state}/>
            <Form setData={this.setData}/>
            </div>
        </div>
      );
    }
  }

  export { App }