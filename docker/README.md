# 📦 License API – Docker Setup

This project is a NestJS-based License API. The application is containerized using Docker and can be easily built and run locally or in a deployment environment.

## 🐳 Dockerfile Overview

The Dockerfile is located at `idms/docker/Dockerfile` and does the following:

- Uses `node:18-alpine` as the base image
- Installs PostgreSQL client (if needed by your app)
- Sets working directory to `/app`
- Installs Node.js dependencies
- Copies source code
- Builds the app using `npm run build`
- Exposes port `4000`
- Starts the app using `npm run start:prod`

---

## 🚀 How to Build and Run the App

### Step 1: Navigate to the `docker/` folder

```bash
cd idms/docker
docker build -t license-api .
docker run -p 4000:4000 license-api
The app will be available at:
http://localhost:4000

⚙️ Available Commands
Command	Description
npm install	Installs dependencies
npm run build	Builds the NestJS project
npm run start:prod	Starts the app in prod mode
