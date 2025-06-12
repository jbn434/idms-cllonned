
---

## 🚀 CI/CD Workflow Overview

The GitHub Actions workflow file is responsible for:

1. Checking out the repository
2. Setting up Terraform
3. Initializing Terraform with remote backend
4. Running Terraform plan and apply using staging variables
5. Extracting the EC2 instance public IP from Terraform output
6. Fetching environment variables from AWS SSM Parameter Store
7. Deploying resources to EC2 (Docker excluded in this context)

---

## 🔐 GitHub Secrets Required

Ensure the following secrets are configured in your GitHub repository under **Settings → Secrets and variables → Actions**:

| Secret Name               | Description                                  |
|--------------------------|----------------------------------------------|
| `AWS_ACCESS_KEY_ID`      | AWS IAM user access key                      |
| `AWS_SECRET_ACCESS_KEY`  | AWS IAM user secret key                      |
| `AWS_REGION`             | AWS region (e.g., `us-east-1`)              |
| `AMI_ID`                 | AMI ID to launch the EC2 instance from      |
| `SSH_PRIVATE_KEY`        | SSH private key to connect to EC2 instance  |



Trigger
The workflow is triggered on any push event to the repository.

Environment Variables
AWS credentials (AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION) are injected via GitHub Secrets.

Checkout Source Code
The actions/checkout@v3 step pulls down the latest code from the repo so the workflow can access it.

Set up Terraform
The HashiCorp setup-terraform action installs Terraform CLI version 1.5.0.

Terraform Init
Initializes Terraform in the infra/vpc directory using a remote backend stored in an S3 bucket (my-terraform-state-bckt43).

Terraform Plan
Runs terraform plan with variables loaded from stage.tfvars to preview infrastructure changes.

Terraform Apply
Runs terraform apply with -auto-approve to provision infrastructure without prompting.

Extract EC2 Public IP
Grabs the public IP of the EC2 instance from Terraform outputs and sets it as an environment variable (EC2_IP) for later steps.
