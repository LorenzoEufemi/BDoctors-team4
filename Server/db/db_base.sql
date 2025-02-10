-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: doctor_db
-- ------------------------------------------------------
-- Server version	8.4.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `dottore_specializzazioni`
--

DROP TABLE IF EXISTS `dottore_specializzazioni`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dottore_specializzazioni` (
  `dottore_id` bigint unsigned NOT NULL,
  `specializzazione_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`dottore_id`,`specializzazione_id`),
  KEY `specializzazione_id` (`specializzazione_id`),
  CONSTRAINT `dottore_specializzazioni_ibfk_1` FOREIGN KEY (`dottore_id`) REFERENCES `dottori` (`id`) ON DELETE CASCADE,
  CONSTRAINT `dottore_specializzazioni_ibfk_2` FOREIGN KEY (`specializzazione_id`) REFERENCES `specializzazioni` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dottore_specializzazioni`
--

LOCK TABLES `dottore_specializzazioni` WRITE;
/*!40000 ALTER TABLE `dottore_specializzazioni` DISABLE KEYS */;
INSERT INTO `dottore_specializzazioni` VALUES (1,1),(6,1),(10,1),(2,2),(8,2),(12,2),(3,3),(9,3),(14,3),(2,4),(7,4),(11,4),(1,5),(5,5),(7,5),(15,5),(1,6),(8,6),(11,6),(14,6),(3,7),(9,7),(14,7),(4,8),(7,8),(11,8),(15,8),(4,9),(10,9),(13,9),(2,10),(6,10),(13,10),(3,11),(9,11),(4,12),(8,12),(12,12),(5,13),(10,13),(5,14),(13,14),(15,14),(6,15),(12,15);
/*!40000 ALTER TABLE `dottore_specializzazioni` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dottori`
--

DROP TABLE IF EXISTS `dottori`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dottori` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `cognome` varchar(255) NOT NULL,
  `via` varchar(255) DEFAULT NULL,
  `citta` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `telefono` varchar(20) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `slug` varchar(255) NOT NULL,
  `immagine` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `telefono` (`telefono`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dottori`
--

LOCK TABLES `dottori` WRITE;
/*!40000 ALTER TABLE `dottori` DISABLE KEYS */;
INSERT INTO `dottori` VALUES (1,'Achille','Fortezza','Via Roma, 10','Roma','achille.fortezza@email.com','3331112233','2025-02-06 10:38:05','2025-02-06 10:47:12','achille-fortezza','img1.jpg'),(2,'Enea','Valenti','Corso Vittorio Emanuele, 45','Milano','enea.valenti@email.com','3331112244','2025-02-06 10:38:05','2025-02-06 10:47:12','enea-valenti','img2.jpg'),(3,'Olimpia','De Angelis','Piazza Garibaldi, 22','Napoli','olimpia.deangelis@email.com','3331112255','2025-02-06 10:38:05','2025-02-06 10:47:12','olimpia-deangelis','img3.jpg'),(4,'Ippolito','Ricci','Viale dei Mille, 8','Torino','ippolito.ricci@email.com','3331112266','2025-02-06 10:38:05','2025-02-06 10:47:12','ippolito-ricci','img4.jpg'),(5,'Flavio','Sereni','Via Dante Alighieri, 14','Bologna','flavio.sereni@email.com','3331112277','2025-02-06 10:38:05','2025-02-06 10:47:12','flavio-sereni','img5.jpg'),(6,'Diana','Fabbri','Via Manzoni, 30','Firenze','diana.fabbri@email.com','3331112288','2025-02-06 10:38:05','2025-02-06 10:47:12','diana-fabbri','img6.jpg'),(7,'Teseo','Marconi','Piazza Duomo, 5','Venezia','teseo.marconi@email.com','3331112299','2025-02-06 10:38:05','2025-02-06 10:47:12','teseo-marconi','img7.jpg'),(8,'Alcide','Ferrari','Via Leonardo Da Vinci, 12','Genova','alcide.ferrari@email.com','3331112300','2025-02-06 10:38:05','2025-02-06 10:47:12','alcide-ferrari','img8.jpg'),(9,'Artemisia','Moretti','Corso Garibaldi, 18','Bari','artemisia.moretti@email.com','3331112311','2025-02-06 10:38:05','2025-02-06 10:47:12','artemisia-moretti','img9.jpg'),(10,'Fedro','Benedetti','Viale Marconi, 25','Palermo','fedro.benedetti@email.com','3331112322','2025-02-06 10:38:05','2025-02-06 10:47:12','fedro-benedetti','img10.jpg'),(11,'Vittoria','Rizzo','Via XX Settembre, 40','Catania','vittoria.rizzo@email.com','3331112333','2025-02-06 10:38:05','2025-02-06 10:47:12','vittoria-rizzo','img11.jpg'),(12,'Teodoro','Santi','Via della Libertà, 7','Verona','teodoro.santi@email.com','3331112344','2025-02-06 10:38:05','2025-02-06 10:47:12','teodoro-santi','img12.jpg'),(13,'Alessio','Fontana','Piazza Repubblica, 3','Cagliari','alessio.fontana@email.com','3331112355','2025-02-06 10:38:05','2025-02-06 10:47:12','alessio-fontana','img13.jpg'),(14,'Celeste','Grimaldi','Via Firenze, 19','Perugia','celeste.grimaldi@email.com','3331112366','2025-02-06 10:38:05','2025-02-06 10:47:12','celeste-grimaldi','img14.jpg'),(15,'Vasco','Martini','Via Torino, 9','Trieste','vasco.martini@email.com','3331112377','2025-02-06 10:38:05','2025-02-06 10:47:12','vasco-martini','img15.jpg');
/*!40000 ALTER TABLE `dottori` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recensioni`
--

DROP TABLE IF EXISTS `recensioni`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recensioni` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `recensione` text NOT NULL,
  `voto` tinyint NOT NULL,
  `paziente` varchar(255) NOT NULL,
  `dottore_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `dottore_id` (`dottore_id`),
  CONSTRAINT `recensioni_ibfk_1` FOREIGN KEY (`dottore_id`) REFERENCES `dottori` (`id`) ON DELETE CASCADE,
  CONSTRAINT `recensioni_chk_1` CHECK ((`voto` between 1 and 5))
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recensioni`
--

LOCK TABLES `recensioni` WRITE;
/*!40000 ALTER TABLE `recensioni` DISABLE KEYS */;
INSERT INTO `recensioni` VALUES (1,'Ottimo servizio, molto professionale.',5,'Mario Rossi',1,'2025-02-06 13:46:27','2025-02-06 13:46:27'),(2,'Esperienza nella media, tempi di attesa lunghi.',3,'Laura Bianchi',2,'2025-02-06 13:46:27','2025-02-06 13:46:27'),(3,'Poco soddisfatto, scarsa attenzione al paziente.',2,'Giuseppe Verdi',3,'2025-02-06 13:46:27','2025-02-06 13:46:27'),(4,'Dottore eccellente, tornerò sicuramente.',5,'Anna Neri',1,'2025-02-06 13:46:27','2025-02-06 13:46:27'),(5,'Non mi sono trovato bene, poca disponibilità.',1,'Paolo Ferri',4,'2025-02-06 13:46:27','2025-02-06 13:46:27'),(6,'Servizio impeccabile, molto cortese.',4,'Stefano Galli',5,'2025-02-06 13:46:27','2025-02-06 13:46:27'),(7,'Dottore molto preparato e gentile.',5,'Elisa Moretti',6,'2025-02-06 13:46:27','2025-02-06 13:46:27'),(8,'Tempi di attesa lunghi ma ottima consulenza.',3,'Marco Rinaldi',7,'2025-02-06 13:46:27','2025-02-06 13:46:27'),(9,'Esperienza negativa, non tornerò.',1,'Francesca Belli',8,'2025-02-06 13:46:27','2025-02-06 13:46:27'),(10,'Visita soddisfacente, tornerò per controlli.',4,'Luca Conti',9,'2025-02-06 13:46:27','2025-02-06 13:46:27'),(11,'Molto competente e disponibile.',5,'Giorgia Esposito',10,'2025-02-06 13:46:27','2025-02-06 13:46:27'),(12,'Non mi sono sentito ascoltato.',2,'Davide Romano',11,'2025-02-06 13:46:27','2025-02-06 13:46:27'),(13,'Tutto perfetto, consiglio vivamente.',5,'Alessandra Greco',12,'2025-02-06 13:46:27','2025-02-06 13:46:27'),(14,'Poca empatia, migliorabile.',2,'Andrea De Luca',13,'2025-02-06 13:46:27','2025-02-06 13:46:27'),(15,'Esperienza ottima, studio molto pulito.',4,'Serena Marchetti',14,'2025-02-06 13:46:27','2025-02-06 13:46:27'),(16,'Dottore molto attento e scrupoloso.',5,'Federico Barone',15,'2025-02-06 13:46:27','2025-02-06 13:46:27'),(17,'Troppa attesa, ma buon trattamento.',3,'Martina Santoro',1,'2025-02-06 13:46:27','2025-02-06 13:46:27'),(18,'Professionale e cordiale.',4,'Giovanni Leone',2,'2025-02-06 13:46:27','2025-02-06 13:46:27'),(19,'Consigliato, grande competenza.',5,'Silvia Parisi',3,'2025-02-06 13:46:27','2025-02-06 13:46:27'),(20,'Non mi ha convinto, poco comunicativo.',2,'Enrico Vitali',4,'2025-02-06 13:46:27','2025-02-06 13:46:27'),(21,'Esperienza piacevole, accogliente.',4,'Roberta Pellegrini',5,'2025-02-06 13:46:27','2025-02-06 13:46:27'),(22,'Molto gentile, chiaro nelle spiegazioni.',5,'Alberto Fabbri',6,'2025-02-06 13:46:27','2025-02-06 13:46:27'),(23,'Non lo consiglio, mi sono sentito trascurato.',1,'Daniela Sartori',7,'2025-02-06 13:46:27','2025-02-06 13:46:27'),(24,'Disponibile e preparato.',5,'Matteo Morelli',8,'2025-02-06 13:46:27','2025-02-06 13:46:27'),(25,'Tutto bene, consigliato.',4,'Chiara Ferraro',9,'2025-02-06 13:46:27','2025-02-06 13:46:27'),(26,'Dovrebbe migliorare nella comunicazione.',3,'Stefano Bianco',10,'2025-02-06 13:46:27','2025-02-06 13:46:27'),(27,'Molto attento ai dettagli.',5,'Lucia Colombo',11,'2025-02-06 13:46:27','2025-02-06 13:46:27'),(28,'Non mi sono trovato bene.',1,'Antonio Gallo',12,'2025-02-06 13:46:27','2025-02-06 13:46:27'),(29,'Dottore eccezionale, tornerò sicuramente.',5,'Valentina Rizzo',13,'2025-02-06 13:46:27','2025-02-06 13:46:27'),(30,'Cortese ma un po\' freddo.',3,'Giorgio Lombardi',14,'2025-02-06 13:46:27','2025-02-06 13:46:27'),(31,'Studio pulito e ben organizzato.',4,'Elena Caruso',15,'2025-02-06 13:46:27','2025-02-06 13:46:27');
/*!40000 ALTER TABLE `recensioni` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `specializzazioni`
--

DROP TABLE IF EXISTS `specializzazioni`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `specializzazioni` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `specializzazione` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `slug` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `specializzazione` (`specializzazione`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `specializzazioni`
--

LOCK TABLES `specializzazioni` WRITE;
/*!40000 ALTER TABLE `specializzazioni` DISABLE KEYS */;
INSERT INTO `specializzazioni` VALUES (1,'Cardiologia','2025-02-06 10:39:08','2025-02-06 10:39:08','cardiologia'),(2,'Dermatologia','2025-02-06 10:39:08','2025-02-06 10:39:08','dermatologia'),(3,'Neurologia','2025-02-06 10:39:08','2025-02-06 10:39:08','neurologia'),(4,'Pediatria','2025-02-06 10:39:08','2025-02-06 10:39:08','pediatria'),(5,'Ortopedia','2025-02-06 10:39:08','2025-02-06 10:39:08','ortopedia'),(6,'Oftalmologia','2025-02-06 10:39:08','2025-02-06 10:39:08','oftalmologia'),(7,'Psichiatria','2025-02-06 10:39:08','2025-02-06 10:39:08','psichiatria'),(8,'Oncologia','2025-02-06 10:39:08','2025-02-06 10:39:08','oncologia'),(9,'Urologia','2025-02-06 10:39:08','2025-02-06 10:39:08','urologia'),(10,'Ginecologia','2025-02-06 10:39:08','2025-02-06 10:39:08','ginecologia'),(11,'Otorinolaringoiatria','2025-02-06 10:39:08','2025-02-06 10:39:08','otorinolaringoiatria'),(12,'Endocrinologia','2025-02-06 10:39:08','2025-02-06 10:39:08','endocrinologia'),(13,'Gastroenterologia','2025-02-06 10:39:08','2025-02-06 10:39:08','gastroenterologia'),(14,'Reumatologia','2025-02-06 10:39:08','2025-02-06 10:39:08','reumatologia'),(15,'Nefrologia','2025-02-06 10:39:08','2025-02-06 10:39:08','nefrologia');
/*!40000 ALTER TABLE `specializzazioni` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-06 14:52:24
