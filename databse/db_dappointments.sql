-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 16, 2024 at 12:30 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_dappointments`
--

-- --------------------------------------------------------

--
-- Table structure for table `appointment`
--

CREATE TABLE `appointment` (
  `appID` int(3) NOT NULL,
  `patientID` int(3) NOT NULL,
  `scheduleID` int(10) NOT NULL,
  `lastApp` date DEFAULT NULL,
  `takingMeds` tinyint(1) NOT NULL,
  `ndMeds` varchar(100) DEFAULT NULL,
  `appReason` varchar(100) NOT NULL,
  `appRemarks` varchar(100) DEFAULT NULL,
  `status` enum('processing','cancelled','approved','done') NOT NULL DEFAULT 'processing'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `appointment`
--

INSERT INTO `appointment` (`appID`, `patientID`, `scheduleID`, `lastApp`, `takingMeds`, `ndMeds`, `appReason`, `appRemarks`, `status`) VALUES
(1, 1, 1, '2024-05-12', 0, '', 'Toothache', '', 'done'),
(3, 3, 3, '2024-05-14', 0, NULL, 'Headache', NULL, 'processing');

-- --------------------------------------------------------

--
-- Table structure for table `dentist`
--

CREATE TABLE `dentist` (
  `dentistID` int(3) NOT NULL,
  `password` varchar(1000) NOT NULL,
  `dentistFirstName` varchar(50) NOT NULL,
  `dentistLastName` varchar(50) NOT NULL,
  `dentistGender` enum('Male','Female') NOT NULL,
  `dentistAddress` varchar(100) NOT NULL,
  `dentistPhone` varchar(15) NOT NULL,
  `dentistEmail` varchar(20) NOT NULL,
  `dentistDOB` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dentist`
--

INSERT INTO `dentist` (`dentistID`, `password`, `dentistFirstName`, `dentistLastName`, `dentistGender`, `dentistAddress`, `dentistPhone`, `dentistEmail`, `dentistDOB`) VALUES
(3, '$2b$10$zLVZ0TQgHKORBOS6kcWKDOVWQ/DrBNxy1TGxzkmKqV.1GKB0DaO32', 'Carl', 'Malubay', 'Male', 'Bulacan St. California', '09473829302', 'fatboy@gmail.com', '2003-08-09'),
(4, '$2b$10$ShQeWDTrfs2cMGufAj1I9OTLei7spC5tyfuf19dDF.jG/Gb1.8zAu', 'Kenneth', 'Salome', 'Male', 'Boston, Celtics', '09285038132', 'kensalome@gmail.com', '2000-02-22');

-- --------------------------------------------------------

--
-- Table structure for table `dentistschedule`
--

CREATE TABLE `dentistschedule` (
  `scheduleID` int(10) NOT NULL,
  `dentistID` int(3) NOT NULL,
  `scheduleDate` date NOT NULL,
  `serviceType` varchar(100) NOT NULL,
  `scheduleDay` varchar(15) NOT NULL,
  `startTime` time NOT NULL,
  `endTime` time NOT NULL,
  `schedAvail` enum('available','booked') NOT NULL DEFAULT 'available'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dentistschedule`
--

INSERT INTO `dentistschedule` (`scheduleID`, `dentistID`, `scheduleDate`, `serviceType`, `scheduleDay`, `startTime`, `endTime`, `schedAvail`) VALUES
(1, 4, '2024-05-15', 'Braces, Implants, Cleaning', 'Wednesday', '09:00:00', '10:00:00', 'available'),
(2, 3, '2024-05-13', 'Braces', 'Monday', '10:00:00', '11:00:00', 'available'),
(3, 3, '2024-05-15', 'Braces, Implants', 'Wednesday', '10:00:00', '11:00:00', 'available'),
(4, 3, '2024-05-17', 'braces', 'Friday', '08:00:00', '09:00:00', 'available');

-- --------------------------------------------------------

--
-- Table structure for table `patient`
--

CREATE TABLE `patient` (
  `patientID` int(3) NOT NULL,
  `password` varchar(1000) NOT NULL,
  `patientFirstName` varchar(20) NOT NULL,
  `patientLastName` varchar(20) NOT NULL,
  `patientAge` varchar(10) NOT NULL,
  `patientDOB` date NOT NULL,
  `patientGender` enum('Male','Female') NOT NULL,
  `patientAddress` varchar(100) NOT NULL,
  `patientPhone` varchar(11) NOT NULL,
  `patientEmail` varchar(100) NOT NULL,
  `patientECName` varchar(50) NOT NULL,
  `patientECRelation` varchar(20) NOT NULL,
  `patientECPhone` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `patient`
--

INSERT INTO `patient` (`patientID`, `password`, `patientFirstName`, `patientLastName`, `patientAge`, `patientDOB`, `patientGender`, `patientAddress`, `patientPhone`, `patientEmail`, `patientECName`, `patientECRelation`, `patientECPhone`) VALUES
(1, '$2b$10$ZKkBca9XrSLTZLca1DyH4.R1OJ6aEwElrn.7lpsJG8QAN8XjYurZm', 'Kiel', 'Ongtengco', '20', '2003-12-15', 'Male', 'Manila', '09270823209', 'kielpogi@gmail.com', 'Rowena Ongtengco', 'Mother', '09242347891'),
(3, '$2b$10$qU0FuZa3ub10lMc1zPpPoekuzye6dvQH/9JT6fOK/DjERwy9G5Kqm', 'ken', 'ramos', '20', '2003-05-11', 'Male', 'Tuguegarao St. London, USA', '09212132673', 'kenram@gmail.com', 'Jojo Ramos', 'Sibling', '09123456789'),
(4, '$2b$10$qU0FuZa3ub10lMc1zPpPoekuzye6dvQH/9JT6fOK/DjERwy9G5Kqm', 'KIEL', 'ONGTENGCO', '20', '2003-12-15', 'Male', '2032 E. CARLOS ST. PANDACAN', '09270823209', 'kielongtengco@gmail.com', 'Margot Robbie', '09436725463', 'Sidechick#3'),
(5, '$2b$10$iqJ9w8QNrSET0muwBd2Zz.TY9N337SH7WX/t3v1ckNDFkSZIgeqmC', 'John', 'Doe', '20', '2003-11-13', 'Male', '1661 Manila', '09375469402', 'johndoe@gmail.com', 'Jane Doe', 'Wife', '09869045206'),
(6, '$2b$10$Vd1bj40LUi3EmjMqaEIFYOhGaxnEDf1yCrJf.I.XX96NTrRGVL7je', 'Jane', 'Ongtengco', '21', '2003-06-04', 'Female', '2032 E. CARLOS ST. PANDACAN', '09151686621', 'janeyymak@gmail.com', 'Kiel Ongtengco', 'Husband', '09270823209');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appointment`
--
ALTER TABLE `appointment`
  ADD PRIMARY KEY (`appID`),
  ADD UNIQUE KEY `scheduleID_2` (`scheduleID`),
  ADD KEY `patientID` (`patientID`),
  ADD KEY `scheduleID` (`scheduleID`);

--
-- Indexes for table `dentist`
--
ALTER TABLE `dentist`
  ADD PRIMARY KEY (`dentistID`);

--
-- Indexes for table `dentistschedule`
--
ALTER TABLE `dentistschedule`
  ADD PRIMARY KEY (`scheduleID`) USING BTREE,
  ADD KEY `schedulecreate` (`dentistID`);

--
-- Indexes for table `patient`
--
ALTER TABLE `patient`
  ADD PRIMARY KEY (`patientID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appointment`
--
ALTER TABLE `appointment`
  MODIFY `appID` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `dentist`
--
ALTER TABLE `dentist`
  MODIFY `dentistID` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `dentistschedule`
--
ALTER TABLE `dentistschedule`
  MODIFY `scheduleID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `patient`
--
ALTER TABLE `patient`
  MODIFY `patientID` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `appointment`
--
ALTER TABLE `appointment`
  ADD CONSTRAINT `appointmentcreate` FOREIGN KEY (`scheduleID`) REFERENCES `dentistschedule` (`scheduleId`),
  ADD CONSTRAINT `appointmentrequest` FOREIGN KEY (`patientID`) REFERENCES `patient` (`patientID`);

--
-- Constraints for table `dentistschedule`
--
ALTER TABLE `dentistschedule`
  ADD CONSTRAINT `schedulecreate` FOREIGN KEY (`dentistID`) REFERENCES `dentist` (`dentistID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
