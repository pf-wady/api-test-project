<!--
title: 'AWS Simple HTTP Endpoint example in NodeJS'
description: 'This template demonstrates how to make a simple HTTP API with Node.js running on AWS Lambda and API Gateway using the Serverless Framework.'
layout: Doc
framework: v3
platform: AWS
language: nodeJS
authorLink: 'https://github.com/serverless'
authorName: 'Serverless, inc.'
authorAvatar: 'https://avatars1.githubusercontent.com/u/13742415?s=200&v=4'
-->

# API Gateway+Lambda+TimeStream

Serverless Frameworkで、API Gateway+Lambda+TimeStreamのStackを作るサンプルです。  
ただし、TimeStreamのDBとTableは作成済みとします。  
HTTPでGETすると(RESTとしてはNGだけど)TimeStreamに1レコード書き込まれます。

## Usage

### Deployment

```
$ serverless deploy
```

After deploying, you should see output similar to:

```bash
Deploying api-test-project to stage dev (ap-northeast-1)

✔ Service deployed to stack api-test-project-dev (38s)

endpoint: GET - https://xxxxxxxxxx.execute-api.ap-northeast-1.amazonaws.com/
functions:
  hello: api-test-project-dev-hello (144 kB)
```

_Note_: In current form, after deployment, your API is public and can be invoked by anyone. For production deployments, you might want to configure an authorizer. For details on how to do that, refer to [http event docs](https://www.serverless.com/framework/docs/providers/aws/events/apigateway/).

### Invocation

After successful deployment, you can call the created application via HTTP:

```bash
curl https://xxxxxxx.execute-api.ap-northeast-1.amazonaws.com/
```

Which should result in response similar to the following (removed `input` content for brevity):

```json
{
  "message": "Go Serverless v3.0! Your function executed successfully!",
  "response": {
    "$metadata": {
      "httpStatusCode": 200,
      "requestId": "xxxxxxxxxxxxxxxxxxxxxxxxxx",
      "attempts": 1,
      "totalRetryDelay": 0
    },
    "RecordsIngested": {
      "MagneticStore": 0,
      "MemoryStore": 1,
      "Total": 1
    }
  }
}
```
