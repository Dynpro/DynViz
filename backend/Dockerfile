# ===============================
# Stage 1: Build the Go backend
# ===============================
FROM golang:1.25-alpine AS builder

# Set working directory
WORKDIR /app

# Install git (needed for module fetching) and ca-certificates
RUN apk add --no-cache git ca-certificates

# Copy go.mod and go.sum to leverage Docker cache
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy the full source code
COPY . .

# Build the Go binary
RUN go build -o dynviz-backend ./cmd/main.go

# ===============================
# Stage 2: Create minimal runtime image
# ===============================
FROM alpine:latest

WORKDIR /app

# Copy the built binary from builder
COPY --from=builder /app/dynviz-backend .

# Copy config folder if needed
COPY --from=builder /app/config ./config

# Expose the port your backend listens on (adjust if different)
EXPOSE 8080

# Run the backend
CMD ["./dynviz-backend"]



