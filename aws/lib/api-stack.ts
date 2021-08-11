import { Construct, NestedStack, NestedStackProps } from "@aws-cdk/core"
import { LambdaIntegration, RestApi } from "@aws-cdk/aws-apigateway";
import { Function } from "@aws-cdk/aws-lambda";


export interface IApiGatewayStackProps extends NestedStackProps {
    identifier: string;
    getWeatherLambda: Function;
}
export class ApiGatewayStack extends NestedStack{

    constructor(scope: Construct, id: string, props: IApiGatewayStackProps) {
        super(scope, id, props);

    const api = new RestApi(this, "Weather-API", {
        restApiName: "Weather Service",
      });

    const getWeatherIntegration = new LambdaIntegration(props.getWeatherLambda);

    const weather = api.root.addResource("weather");
    weather.addMethod("POST", getWeatherIntegration);

    }
}