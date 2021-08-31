const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const axios = require("axios").default;

const blogRoutes = require("./routes/blogRoutes");
const { render } = require("ejs");
const app = express();
const dbURI =
  "mongodb+srv://IlariaRefaat:test123@nodetuts.0sabb.mongodb.net/node-tuts?retryWrites=true&w=majority";

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));
//register view engine
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/weather", (req, res) => {
  // fetch data from weather API using Axios.
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
  axios
    .request(options)
    .then((result) => {
      console.log(result.data.list[0].weather);
      const weatherList = result.data.list.map((item) => {
        return {
          date: toDate(item.dt),
          weatherDescription: item.weather[0].description,
        };
      });
      res.render("weather", {
        title: "Weather",
        weatherList,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
app.use("/blogs", blogRoutes);
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});

const toDate = (epochTime) => {
  const d = new Date(0);
  d.setUTCSeconds(epochTime);
  console.log(d);
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return  days[d.getDay()];
};
