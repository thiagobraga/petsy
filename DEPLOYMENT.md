# Deployment Guide

Petsy is designed to be easily deployed to modern static hosting platforms like Vercel, as well as via Docker.

## Vercel Deployment (Recommended)

1. Connect your GitHub repository to Vercel.
2. Vercel will automatically detect the Vite React configuration.
3. The following build settings should be used automatically:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Routing is handled automatically by the included `vercel.json` to ensure client-side routing works properly without 404s on reload.

## Docker Deployment

The application includes a multi-stage Dockerfile that builds the Vite app and serves it using a lightweight HTTP server.

```bash
docker compose up -d --build
```

This will expose the app on port `8080`.
