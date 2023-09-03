# Module

- ID: codesmash-aws-serverless-api
- NAME: CodeSmash AWS Serverless API

# Intro

Deploys an API on AWS with the following resources:

- API Gateway
- Lambda
- DynamoDB

## AWS LAMBDA

- Language: TypeScript
- Runtime: NodeJs 18

# API Commands

You can execute the following command to test the API.
When the API has been deployed you will find the full API url in the terraform output under the output variable **api_gateway_url**.

- curl https://api-id.execute-api.region.amazonaws.com/api/type/new?name=${name}
- curl https://api-id.execute-api.region.amazonaws.com/api/type/update?id=${id}&name=${name}
- curl https://api-id.execute-api.region.amazonaws.com/api/type/get?id=${id}
- curl https://api-id.execute-api.region.amazonaws.com/api/type/query?name=${name}
- curl https://api-id.execute-api.region.amazonaws.com/api/type/delete?id=${id}
