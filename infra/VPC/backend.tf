terraform {
  backend "s3" {
    bucket = "my-terraform-state-bckt43"
    key    = "stage/terraform.tfstate"
    region = "us-east-1"
  }
}
