const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const { getWeatherData } = require("./services/weatherApi");

const blogRoutes = require("./routes/blogRoutes");
const { render } = require("ejs");
const app = express();
const dbURI =
  "mongodb+srv://IlariaRefaat:test123@nodetuts.0sabb.mongodb.net/node-tuts?retryWrites=true&w=majority";

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(process.env.PORT||3000))
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

app.get("/weather", async (req, res) => {
  const weatherList = await getWeatherData();
  res.render("weather", {
    title: "Weather",
    weatherList,
  });
});
app.use("/blogs", blogRoutes);
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
