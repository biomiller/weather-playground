import { App } from '@aws-cdk/core';
import '@aws-cdk/assert/jest';
import { expect, haveResourceLike } from '@aws-cdk/assert';
import { LambdaStack } from "../lib/lambda-stack";
import { ApiGatewayStack } from "../lib/api-gateway-stack";

const app = new App()

const lambdaStack = new LambdaStack(
    app,
    "lambda-stack-test",
    {
        identifier: "test"
    }
)

const apiGatewayStack = new ApiGatewayStack(
    app,
    "api-gateway-stack-test",
    {
        identifier: "test",
        getWeatherLambda: lambdaStack.getWeatherLambdaFunction
    }
)

test("weather app lambda stack test", () => {
    expect(lambdaStack).to(haveResourceLike("AWS::Lambda::Function",
        {
            Description: "A Lambda function to get weather data",
            FunctionName: "weather-api-get-weather-test",
            Handler: "./aws/src/getWeather.handler",
        })
    );

    expect(lambdaStack).to(haveResourceLike("AWS::Logs::LogGroup",
        {
            LogGroupName: "/aws/lambda/weather-api-get-weather-test",
        })
    );
});

test("weather app api gateway stack test", () => {
    expect(apiGatewayStack).to(haveResourceLike("AWS::ApiGateway::RestApi",
        {
            Name: "Weather Service"
        })
    );
})