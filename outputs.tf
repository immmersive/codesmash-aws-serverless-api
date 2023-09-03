output "dynamodb_id" {
    value = aws_dynamodb_table.dynamodb.id
}

output "dynamodb_arn" {
    value = aws_dynamodb_table.dynamodb.arn
}

output "api_gateway_url" {
    value = aws_api_gateway_deployment.api_gateway.invoke_url
}
