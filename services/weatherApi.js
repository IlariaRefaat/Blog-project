const axios = require("axios").default;
const getWeatherData = async () => {
  const options = {
    method: "GET",
    url: "https://community-open-weather-map.p.rapidapi.com/forecast/daily",
    params: {
      q: "Cairo",
      lat: "Cairo",
      lon: "Cairo",
      cnt: "10",
      units: "metric or imperial",
    },
    headers: {
      "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
      "x-rapidapi-key": "5371a2716bmsh5f6ab9b3eef3e5bp1b28c1jsn6d077d071cf4",
    },
  };
  try {
    const result = await axios.request(options);
    return result.data.list.map((item) => {
      return {
        date: toDate(item.dt),
        description: item.weather[0].description,
      };
    });
  } catch (err) {
    console.log(err);
  }
};

const toDate = (epochTime) => {
  const d = new Date(0);
  d.setUTCSeconds(epochTime);
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[d.getDay()];
};
module.exports = {
  getWeatherData,
};
