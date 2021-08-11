import { Request, Response } from 'express';
import axios from "axios";
import 'dotenv/config';

const apiKeyString = `&appid=${process.env.OPEN_WEATHER_API_KEY}`;
const openWeatherURI = "http://api.openweathermap.org/data/2.5/weather?q="

const getTempsFromCities = async (request: Request, resolve: Response) => {

    const cities: string[] = request.body.cities;

    let temps: { [x: string]: string | number; } = {};

    cities.forEach(async (city: string) => {
        await axios
            .get(`${openWeatherURI}${city}${apiKeyString}&units=metric`)
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
}

const getWeatherFromCities = async (request: Request, resolve: Response) => {

    const cities: string[] = request.body.cities;

    let weather: { [x: string]: string; } = {};

    cities.forEach(async (city: string) => {
        await axios
            .get(`${openWeatherURI}${city}${apiKeyString}`)
            .then(response => {
                weather[city] = response.data.weather[0].main;
            })
            .catch(error => {
                weather[city] = `Could not retrieve data, received error code ${error.response.status}`;
            });
        if (Object.keys(weather).length === cities.length) {
            resolve.send(weather);
        }
    });
}

export default { getTempsFromCities, getWeatherFromCities };