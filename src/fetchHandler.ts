import { TimestreamQueryClient, QueryCommand } from "@aws-sdk/client-timestream-query";
import type { Context, APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';
import type { QueryCommandOutput, ColumnInfo, Row } from "@aws-sdk/client-timestream-query";

interface ResponseType {
    ColumnInfo?: ColumnInfo[];
    Rows: Row[]
}

export const handler = async (event: APIGatewayEvent, context:Context): Promise<APIGatewayProxyResult> => {

    const queryClient = new TimestreamQueryClient({ region: "ap-northeast-1"});
    const query = "SELECT * FROM \"LambdaTestDB\".\"testTable\" ORDER BY time DESC LIMIT 10"
    const response = await getAllRows(queryClient, query);

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

const parseQueryResult = (response:QueryCommandOutput):ResponseType => {
    return {
        ColumnInfo: response.ColumnInfo,
        Rows: response.Rows??[]
    }
};

const getAllRows = async (queryClient:TimestreamQueryClient, query:string, nextToken?:string): Promise<ResponseType> => {
    const request = new QueryCommand({
        QueryString: query,
        NextToken: nextToken,
        MaxRows: 1
    });

    const response = await queryClient.send(request);
    const a = parseQueryResult(response);
    
    if(response.NextToken != null) {
        const r = await getAllRows(queryClient, query, response.NextToken);
        a.Rows.push(...r.Rows);
    }

    return a;
};
