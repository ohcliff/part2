import React, { useState, useEffect } from 'react';
import Filter from './Components/Filter'
import Country from './Components/Country'
import axios from 'axios';


const App = () => {
    const [countries, setCountries] = useState([]);
    const [filter, setFilter] = useState('');
    const [filteredCountries, setFilteredCountries] = useState([]);

    useEffect(() => {
        axios.get("https://studies.cs.helsinki.fi/restcountries/api/all")
        .then((response) => {
            setCountries(response.data);
        });
    },[]);


    const handleFilter = (event) => {
        const searchTarget = event.target.value
        setFilter(searchTarget)

        const matchingCountries = countries.filter((country) => 
        country.name.common.toString().toLowerCase()
        .includes(searchTarget.toLowerCase())
        )
        setFilteredCountries(matchingCountries)
    };

    return (
        <div>
            <Filter filter={filter} handleFilter={handleFilter}/>
            <Country countriesToDisplay={filteredCountries}/>
        </div>
    )
}

export default App;
