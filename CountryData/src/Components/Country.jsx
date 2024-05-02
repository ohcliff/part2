import React, { useState } from 'react';
import View from './View'

const Country = ({ countriesToDisplay }) => {
    const [expandedCountry, setExpandedCountry] = useState(null);

    const toggleCountry = (countryName) => {
        if (expandedCountry === countryName) {
            setExpandedCountry(null); 
        } else {
            setExpandedCountry(countryName); 
        }
    };

    if (countriesToDisplay.length !== 0) {
        if (countriesToDisplay.length > 10) {
            return <div>Too many matches, specify another filter</div>
        } else if (countriesToDisplay.length === 1) {
            return (
                <div>
                    <View featureCountry={countriesToDisplay[0]} />
                </div>
            )
        } else return (
            <div>
                {countriesToDisplay.map((country) =>
                    <div key={country.name.official}>
                        {country.name.common}
                        <button onClick={() => toggleCountry(country.name.common)}>
                            {expandedCountry === country.name.common ? 'Hide' : 'Show'}
                        </button>
                        {expandedCountry === country.name.common && <View featureCountry={country} />}
                    </div>)}
            </div>
        )
    }
}

export default Country; // Export Country once