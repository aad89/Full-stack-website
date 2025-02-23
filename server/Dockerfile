# Use the official Node.js image from Docker Hub
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json files first to leverage Docker's caching
COPY package*.json ./

# Install dependencies (this includes @prisma/client and any other dependencies)
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Generate Prisma client (necessary for Prisma to communicate with the database)
RUN npx prisma generate

# Expose the port the app will run on (default is 3000)
EXPOSE 3000

# Set the command to start your app (adjust if you use another start script)
CMD ["npm", "start"]
