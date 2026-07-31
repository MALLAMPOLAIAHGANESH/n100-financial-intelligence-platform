# ========================================================
# STAGE 1: Build Next.js Frontend (Static Production Export)
# ========================================================
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend

# Copy frontend package manifests and install dependencies
COPY frontend/package*.json ./
RUN npm ci

# Copy frontend source code and build
COPY frontend/ ./
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# ========================================================
# STAGE 2: Production Python FastAPI & Uvicorn Runtime
# ========================================================
FROM python:3.11-slim AS runner
WORKDIR /app

# Install system dependencies for PostgreSQL & Python builds
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy backend requirements and install Python packages
COPY n100/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend source code
COPY n100/ ./n100/

# Copy built frontend static production assets from STAGE 1
COPY --from=frontend-builder /app/frontend/out ./frontend/out

# Set environment variables for production execution
ENV PYTHONUNBUFFERED=1
ENV PYTHONPATH=/app/n100/src
ENV PORT=8000

EXPOSE 8000

# Start Uvicorn server dynamically on $PORT provided by cloud host
CMD ["sh", "-c", "uvicorn src.app.main:create_app --factory --host 0.0.0.0 --port ${PORT:-8000}"]
