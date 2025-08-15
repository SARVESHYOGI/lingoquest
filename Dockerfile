# Use Node.js Alpine image for smaller size
FROM node:20-alpine

# Set working directory inside the container
WORKDIR /mylongoquest

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of the project files
COPY . .

# Build the Next.js app for production
RUN npm run build

# Set environment variable (can be overridden via `docker run -e`)
ENV GEMINI_API_KEY=""

# Expose port
EXPOSE 3000

# Start the Next.js server
CMD ["npm", "start"]
