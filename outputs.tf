output "dynamodb_id" {
    value = aws_dynamodb_table.dynamodb.id
}

output "aws_lambda_function" {
    value = aws_lambda_function.lambda.function_name
}

output "api_gateway_url" {
    value = aws_api_gateway_deployment.api_gateway.invoke_url
}
