# Dockerized MERN Task List

This repository contains a containerized version of a Task List application built with the MERN stack (MongoDB, Express, React, Node.js).

## Project Structure

```
├── client/               # React frontend
│   ├── Dockerfile        # Client container configuration
│   ├── nginx.conf        # Nginx configuration for client container
│   └── ...
├── server/               # Express backend
│   ├── Dockerfile        # Server container configuration
│   └── ...
├── docker-compose.yml    # Docker Compose configuration
└── README.md             # This file
```

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd task-manager
```

### 2. Start the application with Docker Compose

```bash
docker-compose up -d
```

This command will:
- Build the Docker images for the client and server
- Start the MongoDB container
- Start the server container
- Start the client container
- Set up the network between containers

### 3. Access the application

Open your browser and navigate to:
```
http://localhost
```

### 4. Stop the application

```bash
docker-compose down
```

To remove volumes (including the MongoDB data):
```bash
docker-compose down -v
```

## Container Details

### MongoDB
- Image: mongo:latest
- Port: 27017 (exposed to host)
- Data persistence: Using Docker volume (`mongo_data`)

### Server (Node.js/Express)
- Custom image built from `./server/Dockerfile`
- Port: 3000 (exposed to host)
- Environment variables set in docker-compose.yml
- Depends on: MongoDB container

### Client (React/Nginx)
- Custom multi-stage build from `./client/Dockerfile`
- Built with Node.js, served with Nginx
- Port: 80 (exposed to host)
- Depends on: Server container
- API requests proxied to the server via Nginx

## Modifications Made for Dockerization

1. Updated MongoDB connection string to use the service name
2. Changed API_URL in the client to use relative paths
3. Fixed the delete task endpoint to use `findByIdAndDelete`
4. Added Nginx configuration to proxy API requests to the server

## Troubleshooting

### Cannot connect to MongoDB
- Check if the MongoDB container is running: `docker ps`
- Inspect MongoDB logs: `docker logs mongodb`

### API requests failing
- Check if the server container is running: `docker ps`
- Inspect server logs: `docker logs server`
- Verify the Nginx configuration is correctly set up

### Changes not reflecting
- Rebuild the images: `docker-compose build`
- Restart the containers: `docker-compose restart`
