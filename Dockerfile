# Stage 1: Build
FROM node:18-alpine as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .


# Build the application (assuming you have a build script in your package.json)
RUN npm run build

# Stage 2: Run
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=build /app .

# Install only production dependencies
RUN npm install --only=production

# Expose the port the app runs on
EXPOSE 5000

# Command to run the application
CMD ["npm", "run", "start"]
