import React from 'react';

import { weatherGifs } from './weatherGifs';

const Display = (props) => {
    const {
      city,
      tempCurrent,
      tempFeelsLike,
      tempMax,
      tempMin,
      description,
      mainDescription,
      iconURL
    } = props.data;
  
  
    return (
        <div>
            {city && 
                <div id='statsDisplay'>
                <h2>{city}</h2>
                <div className='weather-graphic' style={{'backgroundImage': `url(${weatherGifs[mainDescription]})`}}>
                    <img src={iconURL} style={{opacity: 1}} alt='weather icon'></img>
                </div>
                <p>{description}</p>
                <p>Temperature: {tempCurrent}</p>
                <p>Feels like: {tempFeelsLike}</p>
                <p>Max: {tempMax}</p>
                <p>Min: {tempMin}</p>
                </div>
            }
        </div>

    )
  }


  export { Display }