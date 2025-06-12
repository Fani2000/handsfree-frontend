# Build stage: For building the Vue frontend
FROM node:18-alpine AS build
WORKDIR /app

# Pass backend URL to the build process
ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=${VITE_BACKEND_URL}

# Install dependencies and build the app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Serve stage: Using Nginx to serve the app
FROM nginx:stable-alpine

# Copy built files to Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Add Nginx config for SPA and API proxying
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]