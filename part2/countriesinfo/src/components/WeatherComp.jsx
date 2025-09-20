import axios from 'axios'
import { useEffect, useState } from 'react'
const api_key = import.meta.env.VITE_WEATHER_API_KEY

function WeatherComp({countryName, capital}) {
    const [temperature, setTemperature] = useState(null)
    const [wind, setWind] = useState(null)
    useEffect(() => {
        if(countryName === undefined || capital === undefined){
            return
        }
        // console.log(api_key, countryName, capital) 
        axios.get('http://api.openweathermap.org/data/2.5/weather?q='+ capital + ',' + countryName + '&APPID=' + api_key)
        .then(response => {
            setTemperature(response.data.main.temp)
            setWind(response.data.wind.speed)
        })
    }, [countryName, capital])
    
  return (
    <div>
      <h2>Weather in {capital}</h2>
      <p>Temperature: {temperature} °F</p>
      <img src="https://openweathermap.org/img/wn/02d@2x.png" alt="Weather icon" />
      <p>Wind: {wind} m/s</p>
    </div>
  )
}

export default WeatherComp