import "./forecast.css";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemPanel,
  AccordionItemButton,
} from "react-accessible-accordion";

const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const Forecast = ({ data, unit }) => {
  const dayInAWeek = new Date().getDay();
  const forecastDays = weekDays
    .slice(dayInAWeek)
    .concat(weekDays.slice(0, dayInAWeek));
  const next5Days = forecastDays.slice(1, 6);

  const filteredData = data.list.filter((item) => {
    const forecastDateTime = new Date(item.dt_txt);
    return forecastDateTime.getHours() === 12; // Assuming noon
  });

  return (
    <div className="forecasts">
      <label className="title">Next 5 days forecasts</label>
      <Accordion allowZeroExpanded>
        {filteredData.slice(0, 5).map((item, idx) => (
          <AccordionItem key={idx}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <div className="daily-item">
                  <img
                    alt="weather"
                    className="icon-small"
                    src={`icons/${item.weather[0].icon}.png`}
                  />
                  <label className="day">{next5Days[idx]}</label>
                  <label className="description">
                    {item.weather[0].description}
                  </label>
                  <label className="min-max">
                    {Math.round(item.main.temp_min)}
                    {unit === "metric" ? "°C" : "°F"} /{" "}
                    {Math.round(item.main.temp_max)}
                    {unit === "metric" ? "°C" : "°F"}
                  </label>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <div className="daily-details-grid">
                <div className="daily-details-grid-item">
                  <label>Pressure</label>
                  <label>{item.main.pressure} hPa</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Humidity</label>
                  <label>{item.main.humidity}%</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Cloudiness</label>
                  <label>{item.clouds.all}%</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Wind Speed</label>
                  <label>
                    {item.wind.speed} {unit === "metric" ? " m/s" : " miles/hr"}
                  </label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Sea Level</label>
                  <label>{item.main.sea_level} hPa</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Feels like</label>
                  <label>
                    {item.main.feels_like} {unit === "metric" ? "°C" : "°F"}
                  </label>
                </div>
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Forecast;
