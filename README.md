# Module

- ID: codesmash-aws-serverless-api
- NAME: CodeSmash AWS Serverless API

# Intro

use app/mac/terraform for local development

# Commands

terraform init
terraform plan
terraform apply --auto-approve
terraform workspace list
terraform workspace new dev
terraform workspace new uat
terraform workspace new prod
terraform workspace select dev
terraform workspace select uat
terraform workspace select prod

# API Commands

- "https://${apiId}.execute-api.ap-northeast-1.amazonaws.com/api/type/new?name=${name}"
- "https://${apiId}.execute-api.ap-northeast-1.amazonaws.com/api/type/update?id=${id}&name=${name}"
- "https://${apiId}.execute-api.ap-northeast-1.amazonaws.com/api/type/get?id=${id}"
- "https://${apiId}.execute-api.ap-northeast-1.amazonaws.com/api/type/query?name=${name}"
- "https://${apiId}.execute-api.ap-northeast-1.amazonaws.com/api/type/delete?id=${id}"
