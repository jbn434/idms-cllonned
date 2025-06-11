terraform {
  backend "s3" {
    bucket = "my-terraform-state-bckt43"
    key    = "stage/terraform.tfstate"
    region = var.region
  }
}
