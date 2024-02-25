import { useState, useEffect } from "react";
import { WEATHER_API_KEY, WEATHER_API_URL } from "./api";
import "./App.css";
import CurrentWeather from "./components/current-weather/current-weather";
import Forecast from "./components/forecast/Forecast";
import Search from "./components/search/Search";
import Toggle from "./components/toggle/toggle";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [currUnit, setCurrentUnit] = useState("metric");
  const [searchData, setSearchData] = useState(null);

  const handleOnSearchChange = (searchData) => {
    setSearchData(searchData);
  };

  useEffect(() => {
    if (searchData) {
      const [lat, long] = searchData.value.split("");

      const currentWeatherFetch = fetch(
        `${WEATHER_API_URL}/weather?lat=${lat}&lon=${long}&units=${currUnit}&appid=${WEATHER_API_KEY}`
      );

      const forecastFetch = fetch(
        `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${long}&units=${currUnit}&appid=${WEATHER_API_KEY}`
      );

      Promise.all([currentWeatherFetch, forecastFetch])
        .then(async (response) => {
          const weatherResponse = await response[0].json();
          const forecastResponse = await response[1].json();

          setCurrentWeather({ city: searchData.label, ...weatherResponse });
          setForecast({ city: searchData.label, ...forecastResponse });
        })
        .catch((err) => console.log(err));
    }
  }, [searchData, currUnit]);

  return (
    <div className="container">
      <h1>Weather App</h1>
      <Toggle changeUnits={setCurrentUnit} />
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && (
        <CurrentWeather data={currentWeather} unit={currUnit} />
      )}
      {forecast && <Forecast data={forecast} unit={currUnit} />}
    </div>
  );
}
export default App;
