import { App } from "@aws-cdk/core";
import { ApiGatewayStack } from "../lib/api-gateway-stack";
import { LambdaStack } from "../lib/lambda-stack";
import 'dotenv/config';

let identifier: string = process.env.IDENTIFIER || "";

if (identifier === "") {
    throw new Error("Identifier not set in .env file");
}

const app = new App();

const lambdaStack = new LambdaStack(
    app,
    `lambda-stack-${identifier}`,
    {
        identifier: identifier
    }
)

const apiGatewayStack = new ApiGatewayStack(
    app,
    `api-gateway-stack-${identifier}`,
    {
        identifier: identifier,
        getWeatherLambda: lambdaStack.getWeatherLambdaFunction
    }
)