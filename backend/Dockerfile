# -----------------------------
# STEP 1 — Build the Go binary
# -----------------------------
FROM golang:1.25 AS builder

WORKDIR /app

# Copy go.mod and go.sum for dependency caching
COPY go.mod go.sum ./
RUN go mod download

# Copy the full project
COPY . .

# Build optimized Linux binary
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o dynviz-backend ./cmd

# -----------------------------
# STEP 2 — Run the minimal container
# -----------------------------
FROM alpine:3.19

WORKDIR /app

# Required for SSL connections (PostgreSQL, HTTPS, etc.)
RUN apk add --no-cache ca-certificates

# Copy binary from builder stage
COPY --from=builder /app/dynviz-backend .

# Copy config folder (if needed)
COPY --from=builder /app/config ./config

EXPOSE 8080

CMD ["./dynviz-backend"]
