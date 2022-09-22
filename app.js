const bodyParser = require("body-parser");

const express = require("express");

const userRouter = require("./Routes/userRoutes");
const clothesRouter = require("./Routes/clothesThingsRoutes");
const houseRouter = require("./Routes/houseThingsRoutes");
const otherRouter = require("./Routes/otherThingsRoutes");
const schoolRouter = require("./Routes/schoolThingsRoutes");
const transportRouter = require("./Routes/transportsThingsRoutes");
const PcAndPhoneRouter = require("./Routes/PcAndPhone");
const foodRouter = require("./Routes/foodRoutes");

app = express();

// parse requests of content-Type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-Type - application/json
app.use(bodyParser.json());

app.use("/MediumSell/Users", userRouter);
app.use("/MediumSell/Clothes", clothesRouter);
app.use("/MediumSell/House", houseRouter);
app.use("/MediumSell/Other", otherRouter);
app.use("/MediumSell/School", schoolRouter);
app.use("/MediumSell/Transport", transportRouter);
app.use("/MediumSell/PcAndPhone", PcAndPhoneRouter);
app.use("/MediumSell/Food", foodRouter);

module.exports = app;
