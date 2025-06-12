# idms/docker/Dockerfile

FROM node:18-alpine

# Install PostgreSQL client
RUN apk add --no-cache postgresql-client

# Set working directory inside the container
WORKDIR /app

# Copy package files first for caching layer
COPY src/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY src/ ./src

COPY docker/.env .env

# Copy build-related configs (optional, already included in COPY . . if in root)
# COPY tsconfig*.json ./
# COPY nest-cli.json ./

# Build the app
RUN npm run build

# Expose app port
EXPOSE 4000

# Start the app
CMD ["npm", "run", "start:prod"]

