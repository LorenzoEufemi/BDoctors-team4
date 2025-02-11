-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: doctor_db
-- ------------------------------------------------------
-- Server version	8.4.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
...
/*!40101 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table doctor_specializations
--

DROP TABLE IF EXISTS doctor_specializations;
CREATE TABLE doctor_specializations (
  doctor_id bigint unsigned NOT NULL,
  specialization_id bigint unsigned NOT NULL,
  PRIMARY KEY (doctor_id, specialization_id),
  KEY specialization_id (specialization_id),
  CONSTRAINT doctor_specializations_ibfk_1 FOREIGN KEY (doctor_id) REFERENCES doctors (id) ON DELETE CASCADE,
  CONSTRAINT doctor_specializations_ibfk_2 FOREIGN KEY (specialization_id) REFERENCES specializations (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for table doctors
--

DROP TABLE IF EXISTS doctors;
CREATE TABLE doctors (
  id bigint unsigned NOT NULL AUTO_INCREMENT,
  first_name varchar(255) NOT NULL,
  last_name varchar(255) NOT NULL,
  address varchar(255) DEFAULT NULL,
  city varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  phone varchar(20) NOT NULL,
  resume text DEFAULT NULL, -- Added column
  created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  slug varchar(255) NOT NULL,
  image varchar(255) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY email (email),
  UNIQUE KEY phone (phone),
  UNIQUE KEY slug (slug)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for table reviews
--

DROP TABLE IF EXISTS reviews;
CREATE TABLE reviews (
  id bigint unsigned NOT NULL AUTO_INCREMENT,
  review text NOT NULL,
  rating tinyint NOT NULL,
  patient varchar(255) NOT NULL,
  email varchar(255) NOT NULL, -- Added column
  doctor_id bigint unsigned NOT NULL,
  created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY doctor_id (doctor_id),
  CONSTRAINT reviews_ibfk_1 FOREIGN KEY (doctor_id) REFERENCES doctors (id) ON DELETE CASCADE,
  CONSTRAINT reviews_chk_1 CHECK ((rating between 1 and 5))
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for table specializations
--

DROP TABLE IF EXISTS specializations;
CREATE TABLE specializations (
  id bigint unsigned NOT NULL AUTO_INCREMENT,
  specialization varchar(255) NOT NULL,
  created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  slug varchar(255) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY specialization (specialization),
  UNIQUE KEY slug (slug)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;