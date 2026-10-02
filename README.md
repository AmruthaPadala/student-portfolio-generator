# Student Digital Portfolio Generator

A complete, full-stack web application designed for students and graduates to manage their academic journey, technical skills, projects, and achievements in one place, generate a professional portfolio website with customizable layouts, preview it live, and share it with recruiters via a public link.

---

## 🚀 Key Features

### 1. Student Account & Profile Management
- Secure user registration and login with **BCrypt password hashing** and **JWT (JSON Web Token)** authentication.
- Comprehensive profile editor: Full name, professional headline, bio, contact details (phone, email), location, GitHub, LinkedIn, portfolio website, and avatar image.
- Inline form validation and responsive save notifications.

### 2. Education & Skills Tracking
- **Education CRUD**: Log college/university degrees, branch/field of study, start year, graduation year, CGPA/percentage, and course highlights.
- **Skills CRUD**: Organize technical (languages, frameworks, databases, tools) and soft skills (leadership, problem-solving, communication) with proficiency levels (Beginner, Intermediate, Advanced, Expert) and quick suggestions.

### 3. Projects Showcase
- **Projects CRUD**: Title, description, tech stack tags, repository links (GitHub), and live deployed demo URLs.
- **Featured Project Panning**: Pin standout projects with prominent badges in the portfolio.

### 4. Achievements & Certifications
- **Achievements CRUD**: Track certifications (e.g. AWS, Coursera, Oracle), awards, hackathon victories, and workshops.
- Includes issuer name, completion date, summary, and direct credential verification links.

### 5. Portfolio Generation & Live Preview
- **Predefined Professional Layouts**: Switch dynamically between **Modern Tech**, **Creative Showcase**, and **Minimal Clean**.
- **Accent Color Palettes**: Choose from **Indigo**, **Emerald**, **Rose**, **Amber**, **Cyan**, and **Violet**.
- **Interactive Multi-Device Preview**: Preview how your portfolio appears on **Desktop**, **Tablet**, and **Mobile** viewports directly inside the dashboard.
- **Graceful Empty States**: Friendly, polished placeholders when information has not been added yet.

### 6. Sharing & Privacy Control
- **Shareable Public URL**: Instant dedicated link `http://localhost:5173/portfolio/{slug}`.
- **Public Access Toggle**: Enable or disable public access with a single click. When disabled, public visitors receive a private notice while the student retains private editing access.
- **Data Protection**: Public responses are sanitized and never expose passwords, database identifiers, or unauthorized contact information.
- **Print / PDF Export**: Built-in print stylesheet to save or export clean resumes/portfolios to PDF.

### 7. Realistic Sample Content
- One-click **"Load Sample Data"** button to immediately populate realistic student academics, projects, and achievements for fast testing and onboarding.

---

## 🛠️ Technology Stack

| Layer | Technology | Details |
|---|---|---|
| **Frontend** | React 18, Vite, Tailwind CSS | Lucide Icons, React Router 6, Responsive Design |
| **Backend** | Java 21 / 25, Spring Boot 3.3.4 | Spring Data JPA, Spring Security 6, JJWT |
| **Database** | MySQL 8.0 | InnoDB, Auto-DDL schema updates |
| **Build Tools** | Apache Maven 3.9+, Node.js (npm) | Standard Maven & npm toolchains |

---

## 📋 Prerequisites

Before running the application locally, ensure you have:
1. **Java Development Kit (JDK)**: JDK 21 or later (`java -version`)
2. **Apache Maven**: Version 3.8+ (`mvn -version`)
3. **Node.js & npm**: Node.js 18+ and npm 9+ (`node -v`, `npm -v`)
4. **MySQL Server**: MySQL 8.0 or compatible (`mysql --version`)

---

## 🗄️ Database Setup

1. Open your MySQL client or command line:
   ```sql
   CREATE DATABASE IF NOT EXISTS portfolio_generator_db;
   ```

2. The application uses the following default configuration in `backend/src/main/resources/application.properties`:
   - URL: `jdbc:mysql://localhost:3306/portfolio_generator_db`
   - Username: `root`
   - Password: `root`

3. **Custom Database Credentials (Environment Variables)**:
   You can override the database credentials without editing code using environment variables:
   ```bash
   # Windows PowerShell
   $env:DB_URL="jdbc:mysql://localhost:3306/portfolio_generator_db?useSSL=false&serverTimezone=UTC"
   $env:DB_USERNAME="your_mysql_username"
   $env:DB_PASSWORD="your_mysql_password"
   $env:JWT_SECRET="YourLongSecretKeyForJWTTokenSecurity2026"
   ```

---

## ⚡ Running the Application

### 1. Start the Spring Boot Backend
Open a terminal in the `backend/` folder:

```bash
cd backend

# Option A: Run using Maven Spring Boot plugin
mvn spring-boot:run

# Option B: Or package and run the executable JAR
mvn clean package -DskipTests
java -jar target/generator-backend-1.0.0.jar
```
The backend server will start on **`http://localhost:8080`**.

### 2. Start the React Frontend
Open a new terminal in the `frontend/` folder:

```bash
cd frontend

# Install dependencies (if not done yet)
npm install

# Start the development server
npm run dev
```
The frontend application will start on **`http://localhost:5173`**.

---

## 🧪 Pre-configured Demo Accounts

You can register a new account anytime on the register page, or test immediately with existing sample students:

| Role | Username / Email | Password | Shareable Portfolio Link |
|---|---|---|---|
| Demo Student 1 | `studentdemo` / `student@college.edu` | `student123` | `http://localhost:5173/portfolio/studentdemo` |
| Demo Student 2 | `priyasharma` / `priya.sharma@university.edu` | `SecurePassword123!` | `http://localhost:5173/portfolio/priyasharma` |

---

## 📡 REST API Endpoints Overview

### Authentication (`/api/auth`)
- `POST /api/auth/register` - Register new student account
- `POST /api/auth/login` - Authenticate and obtain JWT token
- `GET /api/auth/me` - Get currently authenticated student info

### Profile (`/api/profile`)
- `GET /api/profile` - Fetch current student profile
- `PUT /api/profile` - Update bio, headline, links, and avatar

### Education (`/api/education`)
- `GET /api/education` - List all education entries
- `POST /api/education` - Add education record
- `PUT /api/education/{id}` - Update education record
- `DELETE /api/education/{id}` - Delete education record

### Skills (`/api/skills`)
- `GET /api/skills?category=TECHNICAL|SOFT` - List skills
- `POST /api/skills` - Add skill with category & proficiency
- `PUT /api/skills/{id}` - Update skill
- `DELETE /api/skills/{id}` - Delete skill

### Projects (`/api/projects`)
- `GET /api/projects` - List student projects
- `POST /api/projects` - Add project with tags & links
- `PUT /api/projects/{id}` - Update project
- `DELETE /api/projects/{id}` - Delete project

### Achievements (`/api/achievements`)
- `GET /api/achievements` - List certifications & awards
- `POST /api/achievements` - Add achievement
- `PUT /api/achievements/{id}` - Update achievement
- `DELETE /api/achievements/{id}` - Delete achievement

### Portfolio Generation (`/api/portfolio`)
- `GET /api/portfolio/settings` - Get slug, theme, and public visibility toggle
- `PUT /api/portfolio/settings` - Update slug, theme, and public toggle
- `GET /api/portfolio/preview` - Get assembled portfolio preview
- `POST /api/portfolio/sample-data` - Auto-populate realistic sample content

### Public Access (`/api/public/portfolio`)
- `GET /api/public/portfolio/{slug}` - Fetch public portfolio (returns 404/denied if public access is disabled)

---

## 🌐 Publishing & Production Deployment

For complete step-by-step instructions on deploying the frontend to **Vercel**, the backend to **Render**, and the database to **Aiven for MySQL**, see the [DEPLOYMENT.md](DEPLOYMENT.md) guide.

### Quick Docker Compose Deployment
To launch the entire stack (MySQL + Spring Boot + React Nginx) locally or on a cloud VPS:
```bash
docker compose up -d --build
```
The app will be available on port `80` (frontend) and `8080` (backend API).

