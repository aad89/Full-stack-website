# Step 1: Use the official Node.js image from Docker Hub
FROM node:18

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (if exists) into the container
COPY package*.json ./

# Step 4: Install dependencies (including prisma and @prisma/client)
RUN npm install

# Step 5: Copy the rest of the application code into the container
COPY . .

# Step 6: Generate the Prisma Client
RUN npx prisma generate

# Step 7: Expose the port your app will run on
EXPOSE 3000

# Step 8: Start the application
CMD ["npm", "start"]
