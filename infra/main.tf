terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }
}

locals {
  env = { for tuple in regexall("(.*)=\"(.*)\"", file("../.env")) : tuple[0] => tuple[1] }
}

provider "aws" {
  region     = "eu-central-1"
  access_key = local.env["AWS_ACCESS_KEY_ID"]
  secret_key = local.env["AWS_SECRET_ACCESS_KEY"]
}

# Budget
resource "aws_budgets_budget" "demasie_month_budget" {
  name         = "demasie-month-budget"
  budget_type  = "COST"
  limit_amount = 8
  limit_unit   = "USD"
  time_unit    = "MONTHLY"

  notification {
    comparison_operator        = "GREATER_THAN"
    threshold                  = 75
    threshold_type             = "PERCENTAGE"
    notification_type          = "ACTUAL"
    subscriber_email_addresses = split(",", local.env["AWS_BUDGET_SUBSCRIBERS"])
  }

  notification {
    comparison_operator        = "GREATER_THAN"
    threshold                  = 90
    threshold_type             = "PERCENTAGE"
    notification_type          = "ACTUAL"
    subscriber_email_addresses = split(",", local.env["AWS_BUDGET_SUBSCRIBERS"])
  }

  notification {
    comparison_operator        = "GREATER_THAN"
    threshold                  = 100
    threshold_type             = "PERCENTAGE"
    notification_type          = "ACTUAL"
    subscriber_email_addresses = split(",", local.env["AWS_BUDGET_SUBSCRIBERS"])
  }
}

# # VPC
# resource "aws_vpc" "demasie_vpc" {
#   cidr_block       = "10.0.0.0/16"
#   instance_tenancy = "default"

#   tags = {
#     Name = "demasie-vpc"
#   }
# }

# # Subnet
# resource "aws_subnet" "demasie_subnet" {
#   vpc_id     = aws_vpc.demasie_vpc.id
#   cidr_block = "10.0.1.0/24"

#   tags = {
#     Name = "demasie-submet"
#   }
# }

# # Security Group
# resource "aws_security_group" "demasie_security_group" {
#   name        = "demasie-security-group"
#   description = "demasie_security_group"
#   vpc_id      = aws_vpc.demasie_vpc.id

#   ingress {
#     from_port   = 22
#     protocol    = "tcp"
#     to_port     = 22
#     cidr_blocks = ["0.0.0.0/0"]
#   }

#   ingress {
#     from_port   = 80
#     protocol    = "tcp"
#     to_port     = 80
#     cidr_blocks = ["0.0.0.0/0"]
#   }

#   ingress {
#     from_port   = 443
#     protocol    = "tcp"
#     to_port     = 443
#     cidr_blocks = ["0.0.0.0/0"]
#   }

#   egress {
#     from_port   = 0
#     to_port     = 0
#     protocol    = "-1"
#     cidr_blocks = ["0.0.0.0/0"]
#   }

#   lifecycle {
#     create_before_destroy = true
#   }
# }

# # EC2 Server
# resource "aws_instance" "demasie_ec2_server" {
#   ami                         = "ami-04e601abe3e1a910f" # Ubuntu 22.04 LTS
#   instance_type               = "t2.nano"               # Free tier
#   subnet_id                   = aws_subnet.demasie_subnet.id
#   associate_public_ip_address = true
#   key_name                    = "demasie_key_pair"
#   count                       = 1

#   tags = {
#     Name = "demasie-ec2-server"
#   }

#   vpc_security_group_ids = [
#     aws_security_group.demasie_security_group.id
#   ]

#   user_data = <<EOF
#     #! /bin/sh

# # Setup docker
# curl -fsSL https://get.docker.com -o get-docker.sh
# sudo sh ./get-docker.sh
# rm ./get-docker.sh

# # Add user to docker group
# sudo usermod --append --groups docker $USER
#   EOF

#   root_block_device {
#     delete_on_termination = true
#     iops                  = 3000
#     volume_size           = 8
#     volume_type           = "gp3"
#   }

#   depends_on = [aws_security_group.demasie_security_group]
# }

# output "ec2_instance" {
#   value = {
#     public_dns = aws_instance.demasie_ec2_server.public_dns,
#     public_ip  = aws_instance.demasie_ec2_server.public_ip
#   }
# }

