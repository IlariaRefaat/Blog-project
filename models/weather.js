const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const weatherSchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const Weather = mongoose.model("Weather", weatherSchema);
module.exports = Weather;
