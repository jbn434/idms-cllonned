resource "aws_api_gateway_vpc_link" "this" {
  name        = "${var.environment}-vpc-link"
  target_arns = [data.terraform_remote_state.nlb.outputs.nlb_arn]
}

resource "aws_api_gateway_rest_api" "this" {
  name        = "${var.environment}-rest-api"
  description = "REST API to NLB on port 4000 — ${timestamp()}"

  endpoint_configuration {
    types = ["REGIONAL"]
  }

  # ✅ Enables binary support (for .css, .js, etc.)
  binary_media_types = ["*/*"]
}

resource "aws_api_gateway_resource" "proxy" {
  rest_api_id = aws_api_gateway_rest_api.this.id
  parent_id   = aws_api_gateway_rest_api.this.root_resource_id
  path_part   = "{proxy+}"
}

resource "aws_api_gateway_method" "proxy" {
  rest_api_id   = aws_api_gateway_rest_api.this.id
  resource_id   = aws_api_gateway_resource.proxy.id
  http_method   = "ANY"
  authorization = "NONE"
  api_key_required  = true

  request_parameters = {
    "method.request.path.proxy" = true
  }
}

resource "aws_api_gateway_integration" "proxy" {
  rest_api_id             = aws_api_gateway_rest_api.this.id
  resource_id             = aws_api_gateway_resource.proxy.id
  http_method             = aws_api_gateway_method.proxy.http_method
  integration_http_method = "ANY"
  type                    = "HTTP"

  # ✅ NLB endpoint with proxy passthrough
  uri                     = "http://${data.terraform_remote_state.nlb.outputs.nlb_dns_name}:4000/{proxy}"
  connection_type         = "VPC_LINK"
  connection_id           = aws_api_gateway_vpc_link.this.id
  passthrough_behavior    = "WHEN_NO_TEMPLATES"
  content_handling        = "CONVERT_TO_BINARY"  # ✅ Important for binary media

  request_parameters = {
    "integration.request.path.proxy" = "method.request.path.proxy"
  }
}

resource "aws_api_gateway_method_response" "proxy_200" {
  rest_api_id = aws_api_gateway_rest_api.this.id
  resource_id = aws_api_gateway_resource.proxy.id
  http_method = aws_api_gateway_method.proxy.http_method
  status_code = "200"

  response_parameters = {
    "method.response.header.Content-Type"                 = true
    "method.response.header.Access-Control-Allow-Origin"  = true
    "method.response.header.Access-Control-Allow-Methods" = true
    "method.response.header.Access-Control-Allow-Headers" = true
  }

  # Optional: avoid forcing JSON if serving static content
  # response_models = {
  #   "application/json" = "Empty"
  # }
}

resource "aws_api_gateway_integration_response" "proxy_200" {
  rest_api_id = aws_api_gateway_rest_api.this.id
  resource_id = aws_api_gateway_resource.proxy.id
  http_method = aws_api_gateway_method.proxy.http_method
  status_code = aws_api_gateway_method_response.proxy_200.status_code

  response_parameters = {
    "method.response.header.Content-Type"                 = "integration.response.header.Content-Type"
    "method.response.header.Access-Control-Allow-Origin"  = "integration.response.header.Access-Control-Allow-Origin"
    "method.response.header.Access-Control-Allow-Methods" = "integration.response.header.Access-Control-Allow-Methods"
    "method.response.header.Access-Control-Allow-Headers" = "integration.response.header.Access-Control-Allow-Headers"
  }

  depends_on = [
    aws_api_gateway_integration.proxy,
    aws_api_gateway_method_response.proxy_200
  ]
}

resource "aws_api_gateway_deployment" "this" {
  rest_api_id = aws_api_gateway_rest_api.this.id
  description = "Deployed on ${timestamp()}"

  depends_on = [
    aws_api_gateway_integration.proxy,
    aws_api_gateway_method_response.proxy_200,
    aws_api_gateway_integration_response.proxy_200
  ]
}

resource "aws_api_gateway_stage" "default" {
  stage_name    = "default"
  rest_api_id   = aws_api_gateway_rest_api.this.id
  deployment_id = aws_api_gateway_deployment.this.id
}
