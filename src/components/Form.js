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
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(e) {
      if (!this.state.valid) {
        this.setState({valid: true})
      }
      this.setState({city: e.target.value})
    }
  
    handleSubmit = async (e) => {
      e.preventDefault()
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
        <form onSubmit={this.handleSubmit}>
          <label>
            City: 
            <input 
              name='city'
              type='text'
              onChange={this.handleChange}
              value={this.state.city}
              required
            />
            </label>
            <input type='submit' value='Check'/>
              {this.state.valid === false && 
                <div id='invalidCity'>
                  Invalid Request
                </div>
              }

        </form>
      )
    }
  }


  export { Form }