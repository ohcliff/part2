
const Country = ({countriesToDisplay}) => {
    const [expandedCountry, setExpandedCountry] = useState(null);

    const toggleCountry = (countryName) => {
        if (expandedCountry === countryName) {
            setExpandedCountry(null); // Close the view if already expanded
        } else {
            setExpandedCountry(countryName); // Expand the view
        }
    };

    if (countriesToDisplay.length !== 0) {
        if (countriesToDisplay.length > 10)  {
            return <div>Too many matches, specify another filter</div>
        }
        else if (countriesToDisplay.length === 1) {
            return (
                <div>
                    <View featureCountry={countriesToDisplay[0]}/>
                </div>
            )
        }
        else return (
            <div>
                {countriesToDisplay.map((country) => 
                <div key={country.name.official}>
                    {country.name.common} 
                    <button onClick={() => toggleCountry(country.name.common)}>
                        {expandedCountry === country.name.common ? 'Hide' : 'Show'}
                    </button>
                    {expandedCountry === country.name.common && <View featureCountry={country}/>}
                </div>)}
            </div>
        )
    }
}


export default Country
