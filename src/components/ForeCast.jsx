import React from 'react';

const ForeCast = ({ forecastData }) => {
  const forecast = forecastData?.list || [];

  const dailyForeCast = forecast.reduce((acc, item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString();
    if (!acc.find(f => f.date === date)) {
      acc.push({
        temperature: `${item.main.temp}°C`,
        day: new Date(item.dt * 1000).toLocaleDateString("en-US", { weekday: 'short' }),
        date: date,
        icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`
      });
    }
    return acc;
  }, []).slice(0, 5);

  const hourlyForeCast = forecast.slice(0, 5).map(item => ({
    time: new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
    degree: `${item.main.temp}°C`,
    windSpeed: `${item.wind.speed} km/h`
  }));

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Daily Forecast */}
      <div className="xl:w-1/3 w-full h-auto px-4 py-4 m-4 mt-10 ml-5 rounded-lg text-white 
                      bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl shadow-black">
        <h2 className="text-xl font-bold mb-4">5 Days Forecast</h2>
        {dailyForeCast.map((cast, index) => (
          <div key={index} className="flex flex-row justify-between items-center p-2">
            <img src={cast.icon} alt="weather-icon" className="w-10 h-10" />
            <p className="font-bold">{cast.temperature}</p>
            <p className="font-bold">{cast.day}, {cast.date}</p>
          </div>
        ))}
      </div>

      {/* Hourly Forecast */}
      <div className="flex-grow h-auto px-4 py-6 m-4 mt-10 mr-5 rounded-lg text-white hidden lg:block 
                      bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl shadow-black">
        <h1 className="text-2xl font-bold mb-6 text-center">Hourly Forecast</h1>
        <div className="flex justify-around items-center gap-4 mt-6">
          {hourlyForeCast.map((hourCast, index) => (
            <div key={index} className="flex flex-col items-center gap-3 
                                        bg-[#1c2938]/80 backdrop-blur-md rounded-xl p-4 w-28 text-center shadow-md">
              <p className="text-sm font-medium">{hourCast.time}</p>
              <img src={hourCast.icon} alt="weather-icon" className="w-10 h-10" />
              <p className="text-sm">{hourCast.degree}</p>
              <p className="text-sm">{hourCast.windSpeed}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ForeCast;
