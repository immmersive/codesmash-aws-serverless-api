provider "aws" {
  region = var.region
}

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 2.70"
    }
  }

  backend "s3" {
    encrypt = true
    bucket  = var.bucket
    region  = var.region
    key     = var.key
  }
}
