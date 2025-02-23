# Step 1: Use the official Node.js image
FROM node:18

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (if exists)
COPY package*.json ./

# Step 4: Install dependencies (including @prisma/client and prisma)
RUN npm install

# Step 5: Install Prisma CLI globally to ensure the command is available
RUN npm install -g prisma

# Step 6: Copy the rest of the application code into the container
COPY . .

# Step 7: Generate Prisma Client
RUN prisma generate

# Step 8: Expose the port your app will run on (default is 3000)
EXPOSE 3000

# Step 9: Start the application
CMD ["npm", "start"]
