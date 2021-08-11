import axios from "axios";
import 'dotenv/config';

const apiKeyString = `&appid=${process.env.OPEN_WEATHER_API_KEY}&units=metric`;
const openWeatherURI = "http://api.openweathermap.org/data/2.5/weather?q="

exports.main = async function (event: { body: string; }, context: any) {
    const cities: string[] = JSON.parse(event.body).cities;

    let weather: { [city: string]: string; } = {};

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
            return {
                statusCode: 200,
                headers: {},
                body: JSON.stringify(weather)
            };
        }
    });
}
