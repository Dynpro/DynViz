# 1. Use official Node.js image
FROM node:18

# 2. Set working directory
WORKDIR /app

# 3. Copy only package files (for caching)
COPY package*.json ./

# 4. Install dependencies
RUN npm install --legacy-peer-deps

# 5. Copy all project files
COPY . .

# 6. Build the Next.js app
RUN npm run build

# 7. Expose port 3000
EXPOSE 3000

# 8. Run the production server
CMD ["npm", "start"]
