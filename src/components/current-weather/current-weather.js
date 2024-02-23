import "./current-weather.css";

const CurrentWeather = ({ data }) => {
  return (
    <div className="weather">
      <div className="top">
        <div>
          <p className="city">{data.city}</p>
          <p className="weather-desc">{data.weather[0].description}</p>
        </div>

        <img
          alt="weather"
          className="weather-icon"
          src={`icons/${data.weather[0].icon}.png`}
        />
      </div>

      <div className="bottom">
        <p className="temp">{Math.round(data.main.temp)}°C</p>
        <div className="details">
          <div className="paramter-row">
            <span className="label top">Details</span>
          </div>

          <div className="paramter-row">
            <span className="label">Feels like</span>
            <span className="value">{Math.round(data.main.feels_like)}°C</span>
          </div>

          <div className="paramter-row">
            <span className="label">Wind</span>
            <span className="value">{data.wind.speed} m/s</span>
          </div>

          <div className="paramter-row">
            <span className="label">Humidity</span>
            <span className="value">{data.main.humidity}%</span>
          </div>

          <div className="paramter-row">
            <span className="label">Pressure</span>
            <span className="value">{data.main.pressure} hPa</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
