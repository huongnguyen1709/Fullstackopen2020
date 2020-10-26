import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
    const [countries, setCountries] = useState([])
    const [filterName, setFilterName] = useState('')
    var [filterList, setFilterList] = useState([])

    useEffect(() => {
        console.log('effect')
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(res => {
                console.log('promise fulfilled')
                setCountries(res.data)
            })
    }, [])

    const onHandleClick = (countryName) => {
        setFilterName(countryName)
    }

    if (filterName && filterName !== '') {
        filterList = countries && countries.filter(country => {
            return country.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
        })
    }

    const onFilter = () => {
        if (filterList.length > 10) return <p>Too many matches, specify another filter</p>
        else if (filterList.length === 1) {
            return filterList && filterList.map(country => {
                return (
                    <div key={country.name}>
                        <h2>{country.name}</h2>
                        <p>Capital: {country.capital}</p>
                        <p>Population: {country.population}</p>
                        <h4>Languages</h4>
                        <ul>
                            {
                                country.languages && country.languages.map(language => {
                                    return <li key={language.name}>{language.name}</li>
                                })
                            }
                        </ul>
                        <img style={{ width: '20%', height: '20%' }} src={country.flag} alt={country.name} />
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
        <div style={{ marginLeft: '10px', fontSize: '20px' }}>
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