# Pull Docker Hub base image
FROM node:16
# Set working directory
WORKDIR /app
# Install app dependencies
COPY package*.json ./
RUN npm install -qy
# Copy app to container
COPY . .
# Port
EXPOSE 5000
# Run the "dev" script in package.json
CMD ["npm", "run", "server"]