# 🚀 Digital Portfolio Generator - Complete Publishing & Deployment Guide

This guide walks you step-by-step through publishing and deploying your full-stack **Digital Portfolio Generator** application to the web so anyone in the world (recruiters, friends, teachers) can access it via a live public HTTPS URL.

---

## 🏗️ Architecture Overview

Your application consists of three main layers:
1. **Frontend**: React 18 (Vite + Tailwind CSS)
2. **Backend**: Java 21 / Spring Boot 3.3.4 (REST API + JWT Security)
3. **Database**: MySQL 8.0

---

## 🌟 Recommended Deployment Path: 100% Free Cloud Tier

| Component | Recommended Platform | Cost | Setup Time |
|---|---|---|---|
| **Frontend** | [Vercel](https://vercel.com) or [Netlify](https://netlify.com) | Free | ~3 mins |
| **Backend** | [Render](https://render.com) or [Railway](https://railway.app) | Free / Starter | ~5 mins |
| **Database** | [Aiven for MySQL](https://aiven.io) or [Clever Cloud](https://clever-cloud.com) | Free | ~3 mins |

---

## Step 1: Push Your Code to GitHub

Before deploying to any cloud platform, put your project into a GitHub repository.

1. Open a terminal / PowerShell in your project folder (`c:\Users\Nageswari\Downloads\Digi portfolio generator`):
   ```bash
   git add .
   git commit -m "Initial commit: Complete student digital portfolio generator"
   ```

2. Go to [GitHub.com](https://github.com) and click **New Repository**:
   - Repository name: `student-portfolio-generator` (or any name you prefer)
   - Visibility: **Public** or **Private**
   - Do **NOT** initialize with README or .gitignore (we already have them!)

3. Link and push your local code:
   ```bash
   git branch -M main
   git remote add origin https://github.com/YOUR_GITHUB_USERNAME/student-portfolio-generator.git
   git push -u origin main
   ```

---

## Step 2: Set Up a Free Cloud MySQL Database

Your Spring Boot backend needs an online MySQL database.

### Option A: Aiven (Recommended - Free Tier)
1. Sign up for a free account at [aiven.io](https://aiven.io/).
2. Click **Create Service** -> choose **MySQL** -> select the **Free Plan**.
3. Choose a cloud region closest to you (e.g. AWS or GCP, US or Europe or Asia).
4. Name your service (e.g., `portfolio-db`) and click **Create Service**.
5. Once created, navigate to **Overview** and copy:
   - **Host**
   - **Port** (e.g. `12345`)
   - **User** (e.g. `avnadmin`)
   - **Password**
   - **Database Name** (e.g. `defaultdb`)
6. Construct your JDBC connection URL:
   ```
   jdbc:mysql://<HOST>:<PORT>/<DATABASE_NAME>?ssl-mode=REQUIRED
   ```

### Option B: Clever Cloud (Free Tier)
1. Sign up at [clever-cloud.com](https://www.clever-cloud.com/).
2. Click **Create an add-on** -> select **MySQL** (select the free "Dev" plan).
3. Copy the host, database name, user, and password provided.
4. Construct your JDBC connection URL:
   ```
   jdbc:mysql://<HOST>:<PORT>/<DATABASE_NAME>?useSSL=false&serverTimezone=UTC
   ```

*(Optional)* You can connect to your cloud database using MySQL Workbench or DBeaver and run `database/schema.sql` to preload the tables and demo student accounts. If you don't run it manually, Hibernate will automatically create the tables on backend startup (`spring.jpa.hibernate.ddl-auto=update`).

---

## Step 3: Deploy the Spring Boot Backend

### Deploying on Render (Free Web Service)
1. Sign up at [render.com](https://render.com) using your GitHub account.
2. On your dashboard, click **New +** -> **Web Service**.
3. Select your GitHub repository (`student-portfolio-generator`).
4. Configure the service settings:
   - **Name**: `portfolio-backend` (or similar)
   - **Language**: `Java` (or choose `Docker`)
   - **Root Directory**: `backend` (if using Maven build) or leave blank if using Docker.
   - **Build Command** (if Maven): `mvn clean package -DskipTests`
   - **Start Command** (if Maven): `java -jar target/generator-backend-1.0.0.jar`
   - **Instance Type**: **Free**
5. Under **Environment Variables**, add the following keys:
   - `DB_URL`: `jdbc:mysql://<HOST>:<PORT>/<DATABASE_NAME>?ssl-mode=REQUIRED`
   - `DB_USERNAME`: `<your_cloud_db_username>`
   - `DB_PASSWORD`: `<your_cloud_db_password>`
   - `JWT_SECRET`: `ProductionSecretDigitalPortfolioGeneratorKey2026SecureLongToken`
6. Click **Create Web Service**.
7. Wait 2-3 minutes for the build to finish. Once live, Render will assign you a public URL, for example:
   `https://portfolio-backend-xyz.onrender.com`
8. Test that it is running by opening:
   `https://portfolio-backend-xyz.onrender.com/api/public/network` or checking health status.

---

## Step 4: Deploy the React Frontend

### Deploying on Vercel (Recommended - Instant & Free)
1. Sign up at [vercel.com](https://vercel.com) using your GitHub account.
2. Click **Add New...** -> **Project**.
3. Select your repository (`student-portfolio-generator`).
4. In the configuration screen:
   - **Framework Preset**: `Vite`
   - **Root Directory**: Click *Edit* and select `frontend`
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)
5. Expand **Environment Variables** and add:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://portfolio-backend-xyz.onrender.com/api` *(your Render backend URL from Step 3 with `/api` at the end)*
6. Click **Deploy**.
7. Within 1 minute, your portfolio generator is live with global CDN and HTTPS at:
   `https://student-portfolio-generator.vercel.app`!

---

## 🐳 Alternative Deployment Path: Single Cloud VPS with Docker Compose

If you have a VPS (DigitalOcean Droplet, AWS EC2, Linode, Hetzner, Oracle Cloud VM):

1. SSH into your VPS:
   ```bash
   ssh user@your-server-ip
   ```
2. Install Docker & Docker Compose:
   ```bash
   curl -fsSL https://get.docker.com -o get-docker.sh && sh get-docker.sh
   ```
3. Clone your GitHub repository:
   ```bash
   git clone https://github.com/YOUR_GITHUB_USERNAME/student-portfolio-generator.git
   cd student-portfolio-generator
   ```
4. Start all three containers (MySQL, Backend, Frontend) with one command:
   ```bash
   docker compose up -d --build
   ```
5. View container status:
   ```bash
   docker compose ps
   ```
   Your application will be live at `http://your-server-ip`!

---

## ⚡ Instant Demo Sharing: Expose Local Machine with Cloudflare Tunnel or Ngrok

If you need a live public URL immediately to show a client, mentor, or recruiter without setting up cloud accounts:

### Method: Cloudflare Tunnel (Free, No Sign-up required)
1. Download `cloudflared` from [cloudflare.com](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/downloads/).
2. Run in a terminal while your local app is running (`npm run dev` and `java -jar app.jar`):
   ```bash
   cloudflared tunnel --url http://localhost:5173
   ```
3. Cloudflare will give you an instant public HTTPS link (e.g., `https://random-word-abc.trycloudflare.com`) that tunnels straight to your local application!

---

## 🔍 Verification Checklist

After deploying your application:
- [ ] Open the frontend URL on mobile and desktop.
- [ ] Register a new student account.
- [ ] Add an education record, technical skills, and a project.
- [ ] Navigate to the **Portfolio Preview** tab.
- [ ] Click the **Share** button, verify public visibility is enabled, and copy the public portfolio URL.
- [ ] Open an incognito browser window and paste the public portfolio URL to confirm visitors can view it seamlessly without logging in.
- [ ] Scan the QR code with your phone camera to verify mobile viewing.
