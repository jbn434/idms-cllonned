tf_state_bucket = "my-terraform-state-bckt43"
environment     = "dev"
region          = "us-east-1"

load_balancer_type = "network"
internal           = true
target_port        = 4000
lb_create_sg       = true

lb_egress_roles = [
  {
    description      = "Allow all outbound"
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = []
    security_groups  = []
    self             = false
  }
]

common_tags = {
  Environment = "dev"
  Project     = "IDMS"
}

