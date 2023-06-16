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

variable "aws_variables" {
  type = map(string)
  default = {
    ami           = "ami-04e601abe3e1a910f" # Ubuntu 22.04 LTS
    instance_type = "t2.micro"              # Free tier
    subnet        = "subnet-0428cd590bc209832"
    vpc_id        = "vpc-0fbe0c741b97a6e17" # AWS Virtual Private Cloud
    sec_group_id  = "sg-08361cdbc600b7f85"  # Security Group Id`
    public_ip     = true
    key_name      = "demasie_key_pair"
  }
}

provider "aws" {
  region     = "eu-central-1"
  access_key = local.env["AWS_ACCESS_KEY_ID"]
  secret_key = local.env["AWS_SECRET_ACCESS_KEY"]
}

# Security Group
resource "aws_security_group" "demaise_security_group" {
  name        = "demasie_Security_Group"
  description = "demasie_Security_Group"
  vpc_id      = lookup(var.aws_variables, "vpc_id")

  // Allow SSH
  ingress {
    from_port   = 22
    protocol    = "tcp"
    to_port     = 22
    cidr_blocks = ["0.0.0.0/0"]
  }

  // Allow HTTP
  ingress {
    from_port   = 80
    protocol    = "tcp"
    to_port     = 80
    cidr_blocks = ["0.0.0.0/0"]
  }

  // Allow HTTPS
  ingress {
    from_port   = 443
    protocol    = "tcp"
    to_port     = 443
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  lifecycle {
    create_before_destroy = true
  }
}

# EC2 Server
resource "aws_instance" "demasie_ec2_server" {
  ami                         = lookup(var.aws_variables, "ami")
  instance_type               = lookup(var.aws_variables, "instance_type")
  subnet_id                   = lookup(var.aws_variables, "subnet")
  associate_public_ip_address = lookup(var.aws_variables, "public_ip")
  key_name                    = lookup(var.aws_variables, "key_name")

  vpc_security_group_ids = [
    aws_security_group.demaise_security_group.id
  ]

  user_data = <<EOF
    #! /bin/sh
    # Setup docker on server
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh ./get-docker.sh --dry-run
  EOF

  root_block_device {
    delete_on_termination = true
    iops                  = 3000
    volume_size           = 8
    volume_type           = "gp3"
  }

  depends_on = [aws_security_group.demaise_security_group]
}

output "ec2_instance" {
  value = {
    public_dns = aws_instance.demasie_ec2_server.public_dns,
    public_ip  = aws_instance.demasie_ec2_server.public_ip
  }
}

# Budget
resource "aws_budgets_budget" "ec2_server" {
  name         = "demasie EC2 Month Budget"
  budget_type  = "COST"
  limit_amount = 5
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
