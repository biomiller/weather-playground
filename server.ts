import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import 'dotenv/config';

const port = 3001;
const apiKeyString = `&appid=${process.env.OPEN_WEATHER_API_KEY}`;
const openWeatherURI = "http://api.openweathermap.org/data/2.5/weather?q="

const app = express();
app.use(bodyParser.json());

export const server = app.listen(port, () => console.log(`App running on port ${port}`));

app.post("/tempFromCities", async (request, resolve) => {

    const cities: string[] = request.body.cities;

    let temps: { [x: string]: string | number; } = {};

    cities.forEach(async (city: string) => {
        await axios
            .get(`${openWeatherURI}${city}${apiKeyString}`)
            .then(response => {
                temps[city] = response.data.main.temp;
            })
            .catch(error => {
                temps[city] = `Could not retrieve data, received error code ${error.response.status}`;
            });
        if (Object.keys(temps).length === cities.length) {
            resolve.send(temps);
        }
    });
})