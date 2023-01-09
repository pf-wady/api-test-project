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
ただし、TimeStreamのDBとTableは作成済み。  
HTTPでPOSTするとTimeStreamに1レコード書き込み、GETすると最新10件を取得します。

## Usage

### Deployment

```
$ serverless deploy
```

After deploying, you should see output similar to:

```bash
Deploying api-test-project to stage dev (ap-northeast-1)

✔ Service deployed to stack api-test-project-dev (117s)

endpoints:
  POST - https://xxxxxxxxxx.execute-api.ap-northeast-1.amazonaws.com/post
  GET - https://xxxxxxxxxx.execute-api.ap-northeast-1.amazonaws.com/
functions:
  postData: api-test-project-dev-postData (291 kB)
  fetchData: api-test-project-dev-fetchData (291 kB)
```

_Note_: In current form, after deployment, your API is public and can be invoked by anyone. For production deployments, you might want to configure an authorizer. For details on how to do that, refer to [http event docs](https://www.serverless.com/framework/docs/providers/aws/events/apigateway/).

### Invocation

After successful deployment, you can call the created application via HTTP:

```bash
curl https://xxxxxxxxxx.execute-api.ap-northeast-1.amazonaws.com/
```
or
```bash
curl https://xxxxxxxxxx.execute-api.ap-northeast-1.amazonaws.com/post
```

For sample response, refer to `postData.json` and `fetchData.json` in `sample` directory.
