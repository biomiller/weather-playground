import { Construct, Duration, Stack, StackProps } from "@aws-cdk/core";
import { Code, Runtime, Function } from "@aws-cdk/aws-lambda";
import { ManagedPolicy, PolicyStatement, Role, ServicePrincipal } from "@aws-cdk/aws-iam";
import { LogGroup } from "@aws-cdk/aws-logs";

export interface ILambdaStackProps extends StackProps {
    identifier: string;
}

export class LambdaStack extends Stack {
    public getWeatherLambdaFunction: Function;

    constructor(scope: Construct, id: string, props: ILambdaStackProps) {
        super(scope, id, props);

        const getWeatherLambdaLogGroup = new LogGroup(
            this,
            "GetWeatherLambdaLogGroup",
            {
                logGroupName: `/aws/lambda/weather-api-get-weather-${props.identifier}`
            }
        )

        const getWeatherLambdaPolicy = new ManagedPolicy(
            this,
            "GetWeatherLambdaPolicy",
            {
                statements: [
                    new PolicyStatement({
                        sid: "AllowServices",
                        resources: [
                            getWeatherLambdaLogGroup.logGroupArn,
                            `${getWeatherLambdaLogGroup.logGroupArn}/*`
                        ],
                        actions: [
                            "logs:CreateLogStream",
                            "logs:PutLogEvents",
                        ]
                    })
                ],
            }
        )

        const getWeatherLambdaRole = new Role(this, "GetWeatherLambdaRole", {
            assumedBy: new ServicePrincipal("lambda.amazonaws.com"),
            managedPolicies: [
                getWeatherLambdaPolicy
            ]
        })

        this.getWeatherLambdaFunction = new Function(
            this,
            "GetWeatherLambdaFunction",
            {
                code: Code.fromAsset("./aws/src"),
                description: "A Lambda function to get weather data",
                functionName: `weather-api-get-weather-${props.identifier}`,
                handler: ("./aws/src/getWeather.handler"),
                role: getWeatherLambdaRole,
                runtime: Runtime.NODEJS_14_X,
                timeout: Duration.seconds(30),
            }
        )
    }

}