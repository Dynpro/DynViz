FROM node:18


WORKDIR /app

# Copy package files
COPY package*.json ./

RUN npm install

# Copy all source code
COPY . .

# Build Next.js app
RUN npm run build

# Expose production port
EXPOSE 3000

# Start Next.js production server
CMD ["npm", "start"]
