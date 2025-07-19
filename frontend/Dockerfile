# Step 1: Build
FROM node:18-alpine AS builder

WORKDIR /app
COPY . .

# Install dependencies
RUN npm install

# Build the app
RUN npm run build

# Step 2: Production image
FROM node:18-alpine AS runner

WORKDIR /app

# Copy only the built output from the builder stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

CMD ["npm", "start"]
