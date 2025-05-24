-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: May 24, 2025 at 11:06 AM
-- Server version: 8.0.31
-- PHP Version: 8.1.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `seznamopravil`
--

-- --------------------------------------------------------

--
-- Table structure for table `kategorija`
--

DROP TABLE IF EXISTS `kategorija`;
CREATE TABLE IF NOT EXISTS `kategorija` (
  `id` int NOT NULL AUTO_INCREMENT,
  `naziv` varchar(45) NOT NULL,
  `uporabnik` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `kategorija`
--

INSERT INTO `kategorija` (`id`, `naziv`, `uporabnik`) VALUES
(16, 'Šola', 4),
(17, 'Doma', 4);

-- --------------------------------------------------------

--
-- Table structure for table `opravilo`
--

DROP TABLE IF EXISTS `opravilo`;
CREATE TABLE IF NOT EXISTS `opravilo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `naziv` varchar(45) NOT NULL,
  `opis` varchar(200) NOT NULL,
  `rok` datetime NOT NULL,
  `uporabnik` int NOT NULL,
  `kategorija` int NOT NULL,
  `opravljeno` tinyint(1) NOT NULL DEFAULT '0',
  `datum_nastanka` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=69 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `opravilo`
--

INSERT INTO `opravilo` (`id`, `naziv`, `opis`, `rok`, `uporabnik`, `kategorija`, `opravljeno`, `datum_nastanka`) VALUES
(67, 'Pregled pes', 'Pelji psa na pregled', '2024-12-12 00:00:00', 4, -1, 1, '2024-12-03 13:54:51'),
(68, 'novo', 'haha', '0000-00-00 00:00:00', 4, 16, 1, '2025-01-21 11:23:33'),
(61, 'Naloga 2', 'Napiši JUnit teste', '2024-12-06 00:00:00', 4, 16, 0, '2024-12-03 13:52:50'),
(62, 'Oddaj nalogo pri DSR', '', '2024-12-13 00:00:00', 4, 16, 0, '2024-12-03 13:53:03'),
(63, 'Pokosi travo', '', '0000-00-00 00:00:00', 4, 17, 0, '2024-12-03 13:53:28'),
(64, 'Odnesi smeti', '', '0000-00-00 00:00:00', 4, 17, 0, '2024-12-03 13:53:35'),
(65, 'Pospravi sobo', '', '0000-00-00 00:00:00', 4, 17, 1, '2024-12-03 13:53:42'),
(66, 'Pojdi nakupovat', 'Kupi: jajca, moko, mleko, kruh, maslo', '0000-00-00 00:00:00', 4, -1, 0, '2024-12-03 13:54:11');

-- --------------------------------------------------------

--
-- Table structure for table `uporabnik`
--

DROP TABLE IF EXISTS `uporabnik`;
CREATE TABLE IF NOT EXISTS `uporabnik` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ime` varchar(45) NOT NULL,
  `priimek` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `geslo` varchar(200) NOT NULL,
  `obvescanje` varchar(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `uporabnik`
--

INSERT INTO `uporabnik` (`id`, `ime`, `priimek`, `email`, `geslo`, `obvescanje`) VALUES
(4, 'Luka', 'Car', 'car', '$2y$10$ViFNJKs85ZxJ..k7R8bCl.Dd2dzpiJirrjzxiDDaynRJnw.Rq9LsC', '1');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
