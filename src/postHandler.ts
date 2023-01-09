import { TimestreamWriteClient, WriteRecordsCommand } from "@aws-sdk/client-timestream-write";
import type { Context, APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';

export const handler = async (event: APIGatewayEvent, context:Context): Promise<APIGatewayProxyResult> => {
    
    const currentTime = Date.now().toString();

    const writeClient = new TimestreamWriteClient({region: "ap-northeast-1"});
    const request = new WriteRecordsCommand({
        DatabaseName: "LambdaTestDB",
        TableName: "testTable",
        Records: [
            {
                Dimensions: [
                    {
                        Name: "region",
                        Value: "ap-northeast-1"
                    }
                ],
                MeasureName: "testMetrics",
                MeasureValueType: "MULTI",
                MeasureValues: [
                    {
                        Name: "Temperature",
                        Value: "20.0",
                        Type: "DOUBLE"
                    },
                    {
                        Name: "Pressure",
                        Value: "1014.0",
                        Type: "DOUBLE"
                    }
                ],
                Time: currentTime,
            }
        ]
    });
    const response = await writeClient.send(request);
    
    return {
        statusCode: 200,
        body: JSON.stringify(
            {
                message: "Go Serverless v3.0! Your function executed successfully!",
                response: response,
            },
            null,
            2
        )
    }
};
