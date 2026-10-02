-- ========================================================
-- Database Schema for Student Digital Portfolio Generator
-- Target Database: MySQL 8.0+
-- ========================================================

CREATE DATABASE IF NOT EXISTS portfolio_generator_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE portfolio_generator_db;

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    headline VARCHAR(150),
    bio TEXT,
    phone VARCHAR(30),
    location VARCHAR(100),
    github_url VARCHAR(255),
    linkedin_url VARCHAR(255),
    website_url VARCHAR(255),
    avatar_url VARCHAR(500),
    created_at DATETIME(6) NOT NULL,
    updated_at DATETIME(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. Portfolio Settings Table
CREATE TABLE IF NOT EXISTS portfolio_settings (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    is_public BIT(1) NOT NULL DEFAULT b'1',
    theme_template VARCHAR(50) DEFAULT 'MODERN',
    accent_color VARCHAR(50) DEFAULT 'indigo',
    show_contact_info BIT(1) DEFAULT b'1',
    show_grades BIT(1) DEFAULT b'1',
    custom_tagline VARCHAR(255),
    CONSTRAINT fk_portfolio_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. Educations Table
CREATE TABLE IF NOT EXISTS educations (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    institution VARCHAR(150) NOT NULL,
    degree VARCHAR(100) NOT NULL,
    field_of_study VARCHAR(100) NOT NULL,
    start_year INT,
    graduation_year INT NOT NULL,
    grade VARCHAR(30),
    description TEXT,
    display_order INT DEFAULT 0,
    CONSTRAINT fk_education_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. Skills Table
CREATE TABLE IF NOT EXISTS skills (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(30) NOT NULL,
    proficiency_level VARCHAR(50),
    display_order INT DEFAULT 0,
    CONSTRAINT fk_skills_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. Projects Table
CREATE TABLE IF NOT EXISTS projects (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    technologies VARCHAR(500),
    github_url VARCHAR(255),
    live_url VARCHAR(255),
    featured BIT(1) NOT NULL DEFAULT b'0',
    display_order INT DEFAULT 0,
    CONSTRAINT fk_projects_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 6. Achievements Table
CREATE TABLE IF NOT EXISTS achievements (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    title VARCHAR(150) NOT NULL,
    category VARCHAR(50),
    issuer VARCHAR(150),
    issue_date VARCHAR(50),
    description TEXT,
    credential_url VARCHAR(255),
    display_order INT DEFAULT 0,
    CONSTRAINT fk_achievements_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
