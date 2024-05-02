import Weather from './Weather'
import axios from 'axios'
import React, { useState, useEffect } from 'react';

const View = ({featureCountry}) => {
    const [weather, setWeather] = useState({});
    useEffect(() => {
        const api_key = import.meta.env.VITE_SOME_KEY;
        const { lat, long } = featureCountry.latlng; 
        axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${long}&appid=${api_key}`)
        .then((response) => setWeather(response.data))
    },[featureCountry])
    return (
        <div>
            <h2><strong>{featureCountry.name.common}</strong></h2>
            <div>capital {featureCountry.capital}</div>
            <div>area {featureCountry.area}</div>
            <h3><strong>languages:</strong></h3>
            <ul>
                {Object.values(featureCountry.languages).map((language) => (
                    <li key={language}>{language}</li>
                ))}
            </ul>
            <img src={featureCountry.flags["png"]} alt="Country Flag"/>
            <h3><strong>Weather in {featureCountry.capital}</strong></h3>
            <div>temperature</div>
            <Weather weather={weather}/>
        </div>
    )    
}

export default View