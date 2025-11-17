# -----------------------------
# STEP 1 — Build the Go binary
# -----------------------------
FROM golang:1.21 AS builder

WORKDIR /app

# Copy go.mod and go.sum for dependency caching
COPY go.mod go.sum ./
RUN go mod download

# Copy the full project
COPY . .

# Build optimized Linux binary
# CGO disabled for portability
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o dynviz-backend ./cmd

# -----------------------------
# STEP 2 — Run the minimal container
# -----------------------------
FROM alpine:3.19

WORKDIR /app

# Required for SSL connections (PostgreSQL, Snowflake, HTTPS, etc.)
RUN apk add --no-cache ca-certificates

# Copy binary from builder stage
COPY --from=builder /app/dynviz-backend .

# Copy config directory (if your app reads config files)
COPY --from=builder /app/config ./config

# Expose backend port
EXPOSE 8080

# Run the backend
CMD ["./dynviz-backend"]
