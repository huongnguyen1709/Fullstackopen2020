import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {

    const [countries, setCountries] = useState([])
    const [filterName, setFilterName] = useState('')
    var [filterList, setFilterList] = useState([])
    const [currentWeather, setCurrentWeather] = useState({})
    var [capital, setCapital] = useState('')

    const api_key = process.env.REACT_APP_WEATHER_API_KEY;
    const currentWeatherUrl = 'http://api.weatherstack.com/current'

    // Fetching countries
    useEffect(() => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(res => {
                setCountries(res.data)
            })
    }, [])

    const onHandleClick = (countryName) => {
        setFilterName(countryName)
    }

    // Filter List of countries
    if (filterName && filterName !== '') {
        filterList = countries && countries.filter(country => {
            return country.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
        })

        if (filterList && filterList.length === 1) {
            capital = filterList[0].capital
        }
    }

    // fetching API Weather
    useEffect(() => {
        axios
            .get(`${currentWeatherUrl}?access_key=${api_key}&query=${capital}`)
            .then(res => {
                setCurrentWeather(res.data.current)
            })
    }, [capital])


    const onFilter = () => {
        if (filterList.length > 10) return <p>Too many matches, specify another filter</p>
        else if (filterList.length === 1 && currentWeather) {
            return filterList && filterList.map(country => {
                return (
                    <div key={country.name}>
                        <h2>{country.name}</h2>
                        <p>Capital: {country.capital}</p>
                        <p>Population: {country.population}</p>
                        <h3>Languages</h3>
                        <ul>
                            {
                                country.languages && country.languages.map(language => {
                                    return <li key={language.name}>{language.name}</li>
                                })
                            }
                        </ul>
                        <img style={{ width: '20%', height: '20%' }} src={country.flag} alt={country.name} />

                        <div>
                            <h3> Weather in {country.capital}</h3>
                            <p>
                                <span style={{ fontWeight: '600' }}>temperature: </span>
                                {currentWeather.temperature} Celcius
                             </p>
                            <img style={{ width: '8%', height: '8%' }} src={currentWeather.weather_icons} alt={country.capital} />
                            <p>
                                <span style={{ fontWeight: '600' }}>wind: </span>
                                {currentWeather.wind_speed} mph direction {currentWeather.wind_dir}
                            </p>
                        </div>

                    </div>
                )
            })
        }
        else {
            return filterList && filterList.map(country => {
                return (
                    <div key={country.name}>
                        <p style={{ display: 'inline-block' }}>{country.name}</p>
                        &nbsp; <button onClick={() => onHandleClick(country.name)}>show</button>
                    </div>
                )
            })
        }
    }

    return (
        <div style={{ marginLeft: '10px', fontSize: '18px' }}>
            <div style={{ marginBottom: '20px' }}>
                find countries: <input
                    type='text'
                    value={filterName}
                    onChange={e => setFilterName(e.target.value)}
                />
            </div>
            {onFilter()}
        </div>
    );
}

export default App;