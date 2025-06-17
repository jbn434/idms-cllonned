resource "aws_instance" "web" {
  ami           = var.ami_id
  instance_type = var.instance_type

  subnet_id              = module.vpc.public_subnets_ids[0]
  vpc_security_group_ids = [aws_security_group.open_ssh_and_app.id]
  iam_instance_profile   = aws_iam_instance_profile.ec2_ssm_profile.name
  key_name               = "githubaction"

  user_data = <<-EOF
              #!/bin/bash
              apt-get update -y
              apt-get install -y curl unzip wget

              # Install SSM Agent
              snap install amazon-ssm-agent --classic
              systemctl enable snap.amazon-ssm-agent.amazon-ssm-agent
              systemctl start snap.amazon-ssm-agent.amazon-ssm-agent

              # Install CloudWatch Agent
              wget https://s3.amazonaws.com/amazoncloudwatch-agent/ubuntu/amd64/latest/amazon-cloudwatch-agent.deb
              dpkg -i amazon-cloudwatch-agent.deb

              # Start CloudWatch Agent
              /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl \
                -a fetch-config \
                -m ec2 \
                -c ssm:/cloudwatch/docker-config \
                -s
              EOF

  tags = {
    Name = "Backend API IDLMS"
  }
}
