import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [countriesLabel, setCountriesLabel] = useState(['Type a name'])
  const [countries, setCountries] = useState([''])
  const [search, setSearch] = useState('')
  const [country, setCountry] = useState([])

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        const countriesAll = response.data.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))
        // console.log(countriesAll.map(country => country.name.common))
        setCountries(countriesAll.map(country => country.name.common))
      })
  }, [])

  const searchCountry = (name) => {
    axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
      .then(response => {
        const country = response.data
        // console.log(country)
        setCountry(country)
      })
  }

  const handleSearchField = (event) => {
    setCountry([])
    setSearch(event.target.value)
    const countriesRes = countries.filter(country => country.toLowerCase().includes(event.target.value.toLowerCase()))
    //console.log(countriesRes.length)
    if(countriesRes.length > 10){
      setCountriesLabel(['Too many matches, specify another filter'])
    }else if(countriesRes.length === 1){
      setCountriesLabel([])
      searchCountry(countriesRes[0])
    }else if(countriesRes.length === 0){
      setCountriesLabel(['No matches'])
    } else { 
      setCountriesLabel(countriesRes.map(country => country))
    }
    
  }
  

  return (
    <>
      <div>
        <span>Find countries: </span>
        <input type="text" onChange={handleSearchField} />
      </div>
      {countriesLabel.map(country => <p key={country}> {country} </p> )}
      
      {country && Object.keys(country).length > 0 && (
        <div>
          <h3>Country information:</h3>
          <div style={{marginTop: '20px', padding: '10px', border: '1px solid #ccc'}}>
            <h2> {country.name?.common}</h2>
            <p><strong>Capital:</strong> {country.capital?.[0]}</p>
            <p><strong>Area:</strong> {country.area ? country.area : 'N/A'}</p>
            <div>
              <p><strong>Languages:</strong></p>
              <ul>
                {country.languages
                  ? Object.values(country.languages).map((element) => (
                      <li key={element}>{element}</li>
                    ))
                  : <li>N/A</li>
                }
              </ul>
            </div>
            {country.flags && <img src={country.flags.png} alt={`Flag of ${country.name?.common}`} width="100" />}
          </div>
        </div>
      )}
      
    </>
  )
}

export default App
