import React from 'react';

const Display = (props) => {
    const {
      city,
      tempCurrent,
      tempFeelsLike,
      tempMax,
      tempMin,
      description,
      iconURL
    } = props.data;
  
    if(!city) {
      return null
    }
  
    return (
      <div id='statsDisplay'>
        <p>{city}</p>
        <img src={iconURL} alt='weather icon'></img>
        <p className='city'>{description}</p>
        <p>Temperature: {tempCurrent}</p>
        <p>Feels like: {tempFeelsLike}</p>
        <p>Max: {tempMax}</p>
        <p>Min: {tempMin}</p>
      </div>
    )
  }


  export { Display }