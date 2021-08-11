# weather-playground

This is a simple node express app to retrieve the current weather and temperature information (in celsius) for cities from the Open Weather Map API Current Weather Data (https://home.openweathermap.org/users/sign_up)

You will need to get an API key by signing up.

# Build and deploy

Copy and rename the file `env.example` to `.env` and add your Open Weather Map API key to the `OPEN_WEATHER_API_KEY` field.

First install the required packages: `npm install`
To deploy run the following command: `npm run start`
This will deploy the api to `localhost:3001`

# Usage

To retreive temperature data from the api send a POST request to `http://localhost:3001/tempFromCities` with a json body payload, for example:
```
{"cities":["London", "Berlin"]}
```

You could do this on Postman or use curl on the command line:

```
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"cities":["London", "Berlin"]}' \
  http://localhost:3001/tempFromCities
```

Example response: `{"London":17.78,"Berlin":20.53}`

To retreive weather information from the api send a POST request to `http://localhost:3001/weatherFromCities` with a json body payload as described above.

Example response: `{"Berlin": "Clear", "London": "Clouds"}`


# AWS CDK

An example serverless cdk version of the app is included in the ./aws directory - this uses an api gateway and integrated lambdas. Note that this has not actually been deployed yet!


## Tests

Happy and sad path integration tests for the express app can be run using `npm run test`.

CDK tests for the example AWS deployment can be run using `npm run test-cdk`.
