# Docker Image which is used as foundation to create
# a custom Docker Image with this Dockerfile
FROM node:14.1.0-alpine3.10

# Copies package.json to Docker environment
COPY package.json /app/package.json
# A directory within the virtualized Docker environment
WORKDIR /app

# Installs all node packages
RUN npm install

# Copies everything over to Docker environment
COPY . /app
# Uses port which is used by the actual application
EXPOSE 3000

# Finally runs the application
CMD ["npm", "start"]