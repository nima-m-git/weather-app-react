import React from 'react';

import getProperties from './weather-fetch';

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
      this.setState({...this.initialState});
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
              value={this.state.city}
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


  export { Form }