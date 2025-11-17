# Base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app (node_modules excluded by .dockerignore)
COPY . .

# Expose dev server port
EXPOSE 4000

# Run Next.js in development mode
CMD ["npm", "run", "dev"]
