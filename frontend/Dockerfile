FROM node:18

WORKDIR /app

# Copy only package files first (cache optimization)
COPY package*.json ./

RUN npm install

# Copy everything
COPY . .

# Expose Vite dev port
EXPOSE 4000

# Start Vite dev server and bind to 0.0.0.0 so EC2 can access it
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "4000"]
