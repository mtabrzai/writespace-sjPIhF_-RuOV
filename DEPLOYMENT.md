# Deployment Guide

This guide provides instructions for deploying writespace to various platforms.

## Vercel

### Prerequisites

- A Vercel account ([sign up here](https://vercel.com/signup))
- The Vercel CLI installed (`npm install -g vercel`)
- Git installed and configured
- Node.js (v18 or later)

### Deploying with Vercel CLI

1. Install the Vercel CLI if you haven't already:
   ```bash
   npm install -g vercel
   ```

2. Log in to your Vercel account:
   ```bash
   vercel login
   ```

3. Navigate to your project directory:
   ```bash
   cd writespace
   ```

4. Run the deployment command:
   ```bash
   vercel
   ```

5. Follow the prompts to link your project to an existing Vercel project or create a new one.

6. Set the required environment variables:
   ```bash
   vercel env add VITE_API_BASE_URL
   ```

7. Deploy to production:
   ```bash
   vercel --prod
   ```

### Deploying with Git

1. Push your code to a Git repository (GitHub, GitLab, Bitbucket).

2. Go to your [Vercel Dashboard](https://vercel.com/dashboard) and click "Add New Project".

3. Import your Git repository.

4. Configure the project settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. Add the `VITE_API_BASE_URL` environment variable in the project settings.

6. Click "Deploy".

### Environment Variables

| Variable            | Description                     | Required | Default Value               |
|---------------------|---------------------------------|----------|-----------------------------|
| VITE_API_BASE_URL   | Base URL for the backend API    | Yes      |                             |

## Netlify

### Prerequisites

- A Netlify account ([sign up here](https://app.netlify.com/signup))
- Git installed and configured

### Deploying with Git

1. Push your code to a Git repository (GitHub, GitLab, Bitbucket).

2. Go to your [Netlify Dashboard](https://app.netlify.com/) and click "Add new site" > "Import an existing project".

3. Connect your Git provider and select your repository.

4. Configure the build settings:
   - **Base directory**: (leave empty)
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`

5. Add the `VITE_API_BASE_URL` environment variable in the "Environment variables" section.

6. Click "Deploy site".

## Docker

### Prerequisites

- Docker installed ([get Docker](https://docs.docker.com/get-docker/))
- Docker Compose (optional)

### Building the Docker Image

1. Create a `Dockerfile` in the root of your project:
   ```dockerfile
   # Build stage
   FROM node:18-alpine AS builder
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   RUN npm run build

   # Production stage
   FROM nginx:stable-alpine
   COPY --from=builder /app/dist /usr/share/nginx/html
   COPY nginx.conf /etc/nginx/conf.d/default.conf
   EXPOSE 80
   ```

2. Create an `nginx.conf` file:
   ```nginx
   server {
     listen 80;
     server_name localhost;

     location / {
       root /usr/share/nginx/html;
       index index.html index.htm;
       try_files $uri $uri/ /index.html;
     }

     error_page 500 502 503 504 /50x.html;
     location = /50x.html {
       root /usr/share/nginx/html;
     }
   }
   ```

3. Build the Docker image:
   ```bash
   docker build -t writespace .
   ```

4. Run the container:
   ```bash
   docker run -d -p 80:80 --name writespace -e VITE_API_BASE_URL=http://your-api-url writespace
   ```

### Using Docker Compose

1. Create a `docker-compose.yml` file:
   ```yaml
   version: '3.8'

   services:
     frontend:
       build: .
       ports:
         - "80:80"
       environment:
         - VITE_API_BASE_URL=http://your-api-url
       restart: unless-stopped
   ```

2. Start the services:
   ```bash
   docker-compose up -d
   ```

## Environment Configuration

Before deploying, ensure you have configured the following environment variables:

```env
VITE_API_BASE_URL=http://your-api-url
```

Replace `http://your-api-url` with the base URL of your backend API.

## CI/CD Integration

### GitHub Actions

1. Create a `.github/workflows/deploy.yml` file:
   ```yaml
   name: Deploy

   on:
     push:
       branches: [ main ]

   jobs:
     deploy:
       runs-on: ubuntu-latest

       steps:
         - uses: actions/checkout@v3

         - name: Set up Node.js
           uses: actions/setup-node@v3
           with:
             node-version: 18

         - name: Install dependencies
           run: npm install

         - name: Build
           run: npm run build
           env:
             VITE_API_BASE_URL: ${{ secrets.VITE_API_BASE_URL }}

         - name: Deploy to Vercel
           run: npx vercel --token ${{ secrets.VERCEL_TOKEN }} --prod
           env:
             VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
             VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
   ```

2. Add the following secrets to your GitHub repository:
   - `VITE_API_BASE_URL`
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID`

### GitLab CI/CD

1. Create a `.gitlab-ci.yml` file:
   ```yaml
   stages:
     - build
     - deploy

   build:
     stage: build
     image: node:18
     script:
       - npm install
       - npm run build
     artifacts:
       paths:
         - dist/
     only:
       - main

   deploy:
     stage: deploy
     image: node:18
     script:
       - npm install -g vercel
       - vercel --token $VERCEL_TOKEN --prod
     only:
       - main
   ```

2. Add the following variables to your GitLab project:
   - `VITE_API_BASE_URL`
   - `VERCEL_TOKEN`

## Troubleshooting

### Common Issues

1. **Environment variables not available**:
   - Ensure environment variables are prefixed with `VITE_` and are set in your deployment platform.
   - Verify that the variables are correctly named and spelled.

2. **Build failures**:
   - Check the build logs for errors.
   - Ensure all dependencies are correctly installed.
   - Verify that the Node.js version is compatible (v18 or later).

3. **API requests failing**:
   - Verify that the `VITE_API_BASE_URL` environment variable is correctly set.
   - Ensure CORS is configured on your backend API to allow requests from your frontend domain.

4. **Blank page after deployment**:
   - Check the browser's developer console for errors.
   - Verify that the build output directory (`dist`) is correctly configured in your deployment settings.
   - Ensure that the server is configured to serve the `index.html` file for all routes (SPA routing).

### Support

For additional help, please consult the following resources:

- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com/)
- [Docker Documentation](https://docs.docker.com/)
- [Vite Documentation](https://vitejs.dev/guide/)