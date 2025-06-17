output "api_gateway_url" {
  value = "https://${aws_api_gateway_rest_api.this.id}.execute-api.${var.region}.amazonaws.com/default"
}

output "api_key_value" {
  value     = aws_api_gateway_api_key.this.value
  sensitive = true
}

