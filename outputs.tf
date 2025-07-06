output "dynamodb_id" {
    value = aws_dynamodb_table.dynamodb.id
}

output "aws_lambda_function" {
    value = aws_lambda_function.lambda.function_name
}

output "api_gateway_url" {
  value = "https://${aws_api_gateway_rest_api.api_gateway.id}.execute-api.${var.region}.amazonaws.com/${aws_api_gateway_stage.api_stage.stage_name}"
}
