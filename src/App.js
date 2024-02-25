import { useState, useEffect } from "react";
import { WEATHER_API_KEY, WEATHER_API_URL } from "./api";
import "./App.css";
import CurrentWeather from "./components/current-weather/current-weather";
import Forecast from "./components/forecast/Forecast";
import Search from "./components/search/Search";
import LocationToggle from "./components/toggle/LocationToggle";
import Toggle from "./components/toggle/Toggle";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [currUnit, setCurrentUnit] = useState("metric");
  const [searchData, setSearchData] = useState(null);
  const [locationChecked, setLocationChecked] = useState(false);

  const handleCheckboxChange = () => {
    setCurrentUnit((prevUnit) =>
      prevUnit === "metric" ? "imperial" : "metric"
    );
  };

  const handleOnSearchChange = (searchData) => {
    setSearchData(searchData);
  };

  useEffect(() => {
    if (locationChecked) {
      setSearchData(false);
      navigator.geolocation.getCurrentPosition(function (position) {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;

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

            setCurrentWeather({
              city: weatherResponse.name,
              ...weatherResponse,
            });
            setForecast({ city: weatherResponse.name, ...forecastResponse });
          })
          .catch((err) => console.log(err));
      });
    } else if (searchData) {
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
  }, [searchData, currUnit, locationChecked]);

  console.log(currentWeather);

  return (
    <div className="container">
      <h1>Weather App</h1>
      <div className="menu">
        <Toggle
          isChecked={currUnit === "imperial"}
          handleCheckboxChange={handleCheckboxChange}
        />
        <LocationToggle
          isChecked={locationChecked}
          onChange={(isChecked) => setLocationChecked(isChecked)}
        />
      </div>
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && (
        <CurrentWeather data={currentWeather} unit={currUnit} />
      )}
      {forecast && <Forecast data={forecast} unit={currUnit} />}
    </div>
  );
}
export default App;
