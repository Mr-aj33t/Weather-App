import sun from '../assets/sun.png'
import sunset from '../assets/sunset.png'
import sunrise from '../assets/sunrise.png'
import air from '../assets/Air.png'
import humidity from '../assets/humidity.png'
import pressure from '../assets/pressure.png'
import uv from '../assets/uv.png'
import Clock from './Clock'
import ForCast from './ForeCast'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'

const CityAndTime = ({ cityName, lat, lon, setLat, setLon }) => {
  const [weatherData, setWeatherData] = useState(null)
  const [forecastData, setForecastData] = useState(null)
  const [uvIndex, setUVIndex] = useState('N/A')

  const fetchUVIndex = async (latitude, longitude) => {
    try {
      const res = await axios.get('https://api.openuv.io/api/v1/uv', {
        params: { lat: latitude, lng: longitude },
        headers: { 'x-access-token': 'openuv-1rmfhrmcfbancb-io' },
      })

      const uv = res.data.result.uv_max || res.data.result.uv
      setUVIndex(uv.toFixed(2))
    } catch (error) {
      console.error('UV fetch error:', error)
      setUVIndex('N/A')
    }
  }

  const fetchData = async (queryLat, queryLon, city = '') => {
    try {
      let url = ''

      if (city) {
        const encodedCity = encodeURIComponent(city)
        url = `https://api.openweathermap.org/data/2.5/weather?q=${encodedCity}&units=metric&appid=3788f42dc54302449078dbc1f3cc0ee3`
      } else if (queryLat && queryLon) {
        url = `https://api.openweathermap.org/data/2.5/weather?lat=${queryLat}&lon=${queryLon}&units=metric&appid=3788f42dc54302449078dbc1f3cc0ee3`
      } else {
        toast.error('Missing city name or coordinates')
        return
      }

      const weatherRes = await axios.get(url)
      const weather = weatherRes.data
      setWeatherData(weather)

      if (setLat && setLon) {
        setLat(weather.coord.lat)
        setLon(weather.coord.lon)
      }

      fetchUVIndex(weather.coord.lat, weather.coord.lon)

      const forecastRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${weather.coord.lat}&lon=${weather.coord.lon}&units=metric&appid=3788f42dc54302449078dbc1f3cc0ee3`
      )
      setForecastData(forecastRes.data)

    } catch (err) {
      console.error(err)
      toast.error('Could not fetch weather data. Please try again.')
    }
  }

  useEffect(() => {
    if (cityName) {
      fetchData(null, null, cityName)
    } else {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords
          fetchData(latitude, longitude)
        },
        (err) => {
          console.error(err)
          toast.error('Location access denied. Please enter a city.')
        }
      )
    }
  }, [cityName])

  if (!weatherData || !forecastData) {
    return <div className='flex items-center justify-center text-white text-2xl md:text-6xl'>Loading...</div>
  }

  const { main, weather, sys, wind } = weatherData

  return (
    <>
      <div className="flex flex-col xl:flex-row gap-4">

        {/* City & Time Box */}
        <div className="w-full xl:w-1/3 h-auto md:h-72 bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl shadow-black rounded-lg text-black p-4 flex flex-col justify-between items-center ml-5">
          <h1 className="text-2xl md:text-3xl font-bold">{cityName || weatherData.name}</h1>
          <img src={sun} alt="weather time" className='w-14 select-none' />
          <Clock />
        </div>

        {/* Weather Info Box */}
        <div className='flex-grow h-auto md:h-72 bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl rounded-lg text-black p-4 flex flex-col justify-around md:flex-row items-center md:items-stretch gap-4 mr-5'>
          {/* Left: Temp + Sunrise/Sunset */}
          <div className='flex flex-col items-center justify-between xl:justify-center gap-6 md:gap-4'>
            <h1 className='text-5xl md:text-7xl font-bold'>{main.temp}&#8451;</h1>
            <p className='text-center'>
              Feels Like: <span className='text-lg md:text-xl ml-2 font-bold'>{main.feels_like}&#8451;</span>
            </p>
            <div className='flex xl:flex-col md:flex-row items-center gap-4'>
              <div className='flex items-center gap-2'>
                <img src={sunrise} alt="sunrise" className='h-8 md:h-10 select-none' />
                <div className='text-center'>
                  <h6>Sunrise</h6>
                  <p>{new Date(sys.sunrise * 1000).toLocaleTimeString()}</p>
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <img src={sunset} alt="sunset" className='h-8 md:h-10 select-none' />
                <div className='text-center'>
                  <h6>Sunset</h6>
                  <p>{new Date(sys.sunset * 1000).toLocaleTimeString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Center: Weather Icon */}
          <div className='flex flex-col justify-center items-center'>
            <img
              src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
              alt={weather[0].description}
              className='w-32 h-32 md:w-48 md:h-48 select-none'
            />
            <p className='font-bold text-lg md:text-3xl'>{weather[0].description}</p>
          </div>

          {/* Right: Stats */}
          <div className='md:grid md:grid-cols-2 flex flex-row justify-between gap-4 md:p-4'>
            <div className='flex flex-col items-center gap-2'>
              <img src={humidity} alt="humidity" className='h-8 md:h-10 select-none' />
              <p>{main.humidity}%</p>
              <h6>Humidity</h6>
            </div>
            <div className='flex flex-col items-center gap-2'>
              <img src={air} alt="Wind Speed" className='h-8 md:h-10 select-none' />
              <p>{wind.speed} km/h</p>
              <h6>Wind Speed</h6>
            </div>
            <div className='flex flex-col items-center gap-2'>
              <img src={pressure} alt="Pressure" className='h-8 md:h-10 select-none' />
              <p>{main.pressure} hPa</p>
              <h6>Pressure</h6>
            </div>
            <div className='flex flex-col items-center gap-2'>
              <img src={uv} alt="UV" className='h-8 md:h-10 select-none' />
              <p>{uvIndex}</p>
              <h6>UV</h6>
            </div>
          </div>
        </div>
      </div>

      {/* Forecast Cards */}
      <ForCast forecastData={forecastData} />
    </>
  )
}

export default CityAndTime
