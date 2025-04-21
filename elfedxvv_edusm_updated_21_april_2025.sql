-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 21, 2025 at 06:18 PM
-- Server version: 5.7.23-23
-- PHP Version: 8.1.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `elfedxvv_edusm`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_permissions`
--

CREATE TABLE `admin_permissions` (
  `permission_id` int(11) NOT NULL,
  `admin_id` int(11) DEFAULT NULL,
  `can_add_courses` tinyint(1) DEFAULT '0',
  `can_edit_courses` tinyint(1) DEFAULT '0',
  `can_delete_courses` tinyint(1) DEFAULT '0',
  `can_manage_users` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `assessments`
--

CREATE TABLE `assessments` (
  `assessment_id` int(11) NOT NULL,
  `chapter_id` int(11) DEFAULT NULL,
  `assessment_name` varchar(255) NOT NULL,
  `is_paid` tinyint(1) DEFAULT '0',
  `added_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `assessment_answers`
--

CREATE TABLE `assessment_answers` (
  `answer_id` int(11) NOT NULL,
  `assessment_question_id` int(11) DEFAULT NULL,
  `option_a` text NOT NULL,
  `option_b` text NOT NULL,
  `option_c` text NOT NULL,
  `option_d` text NOT NULL,
  `correct_option` enum('A','B','C','D') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `assessment_questions`
--

CREATE TABLE `assessment_questions` (
  `assessment_question_id` int(11) NOT NULL,
  `assessment_id` int(11) DEFAULT NULL,
  `question_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `certificates`
--

CREATE TABLE `certificates` (
  `certificate_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `assessment_id` int(11) DEFAULT NULL,
  `issued_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `chapters`
--

CREATE TABLE `chapters` (
  `chapter_id` int(11) NOT NULL,
  `subject_id` int(11) DEFAULT NULL,
  `chapter_name` varchar(255) NOT NULL,
  `summary` text,
  `video_url` varchar(500) DEFAULT NULL,
  `pdf` varchar(232) NOT NULL,
  `added_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `chapters`
--

INSERT INTO `chapters` (`chapter_id`, `subject_id`, `chapter_name`, `summary`, `video_url`, `pdf`, `added_by`) VALUES
(1, 1, 'Introduction', 'Introduction of english', 'https://www.example.com', 'english.pdf', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `classes`
--

CREATE TABLE `classes` (
  `class_id` int(11) NOT NULL,
  `class_name` varchar(255) NOT NULL,
  `board_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `classes`
--

INSERT INTO `classes` (`class_id`, `class_name`, `board_id`) VALUES
(1, '6th', 2),
(8, '7th', 2),
(9, '8th', 2),
(10, '9th', 2),
(11, '10th', 2),
(12, '11th', 2),
(13, '12th', 2);

-- --------------------------------------------------------

--
-- Table structure for table `education_boards`
--

CREATE TABLE `education_boards` (
  `board_id` int(11) NOT NULL,
  `board_name` varchar(255) NOT NULL,
  `image` varchar(333) DEFAULT NULL,
  `linkTo` varchar(222) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `education_boards`
--

INSERT INTO `education_boards` (`board_id`, `board_name`, `image`, `linkTo`) VALUES
(2, 'NCERT', 'industry.png', '/board/2');

-- --------------------------------------------------------

--
-- Table structure for table `pricing`
--

CREATE TABLE `pricing` (
  `pricing_id` int(11) NOT NULL,
  `plan_name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `duration` enum('monthly','yearly','lifetime') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `questions_answers`
--

CREATE TABLE `questions_answers` (
  `question_id` int(11) NOT NULL,
  `chapter_id` int(11) DEFAULT NULL,
  `question_text` text NOT NULL,
  `correct_answer` text NOT NULL,
  `added_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `signUp_verify`
--

CREATE TABLE `signUp_verify` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `otp` varchar(6) NOT NULL,
  `sent_time` varchar(121) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `signUp_verify`
--

INSERT INTO `signUp_verify` (`id`, `email`, `otp`, `sent_time`) VALUES
(0, 'pspankajsharma222@gmail.com', '8851', '02-Apr-2025 02:26:35');

-- --------------------------------------------------------

--
-- Table structure for table `sold_chapters`
--

CREATE TABLE `sold_chapters` (
  `id` int(11) NOT NULL,
  `chapter_id` int(11) NOT NULL,
  `subject_id` int(11) NOT NULL,
  `user_id` varchar(120) COLLATE utf8_unicode_ci NOT NULL,
  `purchase_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `validity` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `update_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `activeStatus` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sold_chapters`
--

INSERT INTO `sold_chapters` (`id`, `chapter_id`, `subject_id`, `user_id`, `purchase_date`, `validity`, `update_date`, `activeStatus`) VALUES
(1, 1, 1, 'pankajsharma@gmail.com', '2025-04-21 14:18:22', '180', '2025-04-21 14:18:22', 1),
(2, 1, 1, 'user@example.com', '2025-04-21 14:19:20', '180', '2025-04-21 14:19:20', 1);

-- --------------------------------------------------------

--
-- Table structure for table `sold_class`
--

CREATE TABLE `sold_class` (
  `id` int(11) NOT NULL,
  `class_id` int(11) NOT NULL,
  `user_id` varchar(120) COLLATE utf8_unicode_ci NOT NULL,
  `purchase_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `validity` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `update_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `activeStatus` int(11) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sold_class`
--

INSERT INTO `sold_class` (`id`, `class_id`, `user_id`, `purchase_date`, `validity`, `update_date`, `activeStatus`) VALUES
(1, 1, 'pankajsharma@gmail.com', '2025-04-21 14:18:40', '365', '2025-04-21 14:18:40', 1),
(2, 1, 'user@example.com', '2025-04-21 14:19:20', '180', '2025-04-21 14:19:20', 1);

-- --------------------------------------------------------

--
-- Table structure for table `sold_subjects`
--

CREATE TABLE `sold_subjects` (
  `id` int(11) NOT NULL,
  `subject_id` int(11) NOT NULL,
  `class_id` int(11) NOT NULL,
  `user_id` varchar(120) COLLATE utf8_unicode_ci NOT NULL,
  `purchase_date` datetime NOT NULL,
  `validity` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `update_date` datetime NOT NULL,
  `activeStatus` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sold_subjects`
--

INSERT INTO `sold_subjects` (`id`, `subject_id`, `class_id`, `user_id`, `purchase_date`, `validity`, `update_date`, `activeStatus`) VALUES
(3, 1, 1, 'pankajsharma@gmail.com', '2025-04-21 14:18:40', '365', '2025-04-21 14:18:40', 1),
(4, 1, 1, 'user@example.com', '2025-04-21 14:19:20', '180', '2025-04-21 14:19:20', 1);

-- --------------------------------------------------------

--
-- Table structure for table `subjects`
--

CREATE TABLE `subjects` (
  `subject_id` int(11) NOT NULL,
  `class_id` int(11) DEFAULT NULL,
  `subject_name` varchar(255) NOT NULL,
  `added_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `subjects`
--

INSERT INTO `subjects` (`subject_id`, `class_id`, `subject_name`, `added_by`) VALUES
(1, 1, 'English', NULL),
(4, 1, 'Maths', NULL),
(5, 8, 'Science', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `subscriptions`
--

CREATE TABLE `subscriptions` (
  `subscription_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `pricing_id` int(11) DEFAULT NULL,
  `start_date` date NOT NULL,
  `end_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('super_admin','sub_admin','user') DEFAULT 'user',
  `token` varchar(344) NOT NULL,
  `created_by` varchar(123) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `active_status` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `name`, `email`, `password`, `role`, `token`, `created_by`, `created_at`, `active_status`) VALUES
(3, '', 'pankaj@gmail.com', '$2b$10$dpd4Qm.raykc3RlEc.E61eEhHuEo8/7ZgEqLZB0yoRey2p64YprIO', 'super_admin', '0719f3d266cf726ac1c698bf64dc80d356c6412d9418d5c51b9f1e97250a2b6f', '', '2025-04-17 05:33:30', 1),
(6, '', 'demo@gmail.com', '$2b$10$dpd4Qm.raykc3RlEc.E61eEhHuEo8/7ZgEqLZB0yoRey2p64YprIO', 'sub_admin', '190426bb9db1934ee3afcca267173d77307fed40a84b6b75b4568e35357f80f9', 'pankaj@gmail.com', '2025-04-17 06:26:28', 1),
(8, '', 'ps@gmail.com', '$2b$10$dpd4Qm.raykc3RlEc.E61eEhHuEo8/7ZgEqLZB0yoRey2p64YprIO', 'user', 'c7f08e980e3cb2dfc1d1116a8d850d04b52bc322e7cec1a7d8b518e46329438e', 'pankaj@gmail.com', '2025-04-17 06:26:28', 1),
(9, '', 'ds@gmail.com', '$2b$10$Y1ujrvCgO7Ku/3BO1DV/MOMlyVTHWkXxnXSA2bFGruEjLhwTRZnbi', 'user', 'e1645cdd9c688769fdd083d5015509f7ee1c33d19516478856abadfdf1503ddd', 'ds@gmail.com', '2025-04-21 12:27:10', 1);

-- --------------------------------------------------------

--
-- Table structure for table `user_assessments`
--

CREATE TABLE `user_assessments` (
  `user_assessment_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `assessment_id` int(11) DEFAULT NULL,
  `score` int(11) DEFAULT NULL,
  `completed` tinyint(1) DEFAULT '0',
  `certificate_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `user_course_progress`
--

CREATE TABLE `user_course_progress` (
  `progress_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `class_id` int(11) DEFAULT NULL,
  `subject_id` int(11) DEFAULT NULL,
  `chapter_id` int(11) DEFAULT NULL,
  `status` enum('not_started','in_progress','assessment','completed') DEFAULT 'not_started',
  `started_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `assessment_started_at` timestamp NULL DEFAULT NULL,
  `completed_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_permissions`
--
ALTER TABLE `admin_permissions`
  ADD PRIMARY KEY (`permission_id`),
  ADD KEY `admin_id` (`admin_id`);

--
-- Indexes for table `assessments`
--
ALTER TABLE `assessments`
  ADD PRIMARY KEY (`assessment_id`),
  ADD KEY `chapter_id` (`chapter_id`),
  ADD KEY `added_by` (`added_by`);

--
-- Indexes for table `assessment_answers`
--
ALTER TABLE `assessment_answers`
  ADD PRIMARY KEY (`answer_id`),
  ADD KEY `assessment_question_id` (`assessment_question_id`);

--
-- Indexes for table `assessment_questions`
--
ALTER TABLE `assessment_questions`
  ADD PRIMARY KEY (`assessment_question_id`),
  ADD KEY `assessment_id` (`assessment_id`),
  ADD KEY `question_id` (`question_id`);

--
-- Indexes for table `certificates`
--
ALTER TABLE `certificates`
  ADD PRIMARY KEY (`certificate_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `assessment_id` (`assessment_id`);

--
-- Indexes for table `chapters`
--
ALTER TABLE `chapters`
  ADD PRIMARY KEY (`chapter_id`),
  ADD KEY `subject_id` (`subject_id`),
  ADD KEY `added_by` (`added_by`);

--
-- Indexes for table `classes`
--
ALTER TABLE `classes`
  ADD PRIMARY KEY (`class_id`),
  ADD KEY `board_id` (`board_id`);

--
-- Indexes for table `education_boards`
--
ALTER TABLE `education_boards`
  ADD PRIMARY KEY (`board_id`),
  ADD UNIQUE KEY `board_name` (`board_name`);

--
-- Indexes for table `pricing`
--
ALTER TABLE `pricing`
  ADD PRIMARY KEY (`pricing_id`);

--
-- Indexes for table `questions_answers`
--
ALTER TABLE `questions_answers`
  ADD PRIMARY KEY (`question_id`),
  ADD KEY `chapter_id` (`chapter_id`),
  ADD KEY `added_by` (`added_by`);

--
-- Indexes for table `signUp_verify`
--
ALTER TABLE `signUp_verify`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sold_chapters`
--
ALTER TABLE `sold_chapters`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sold_class`
--
ALTER TABLE `sold_class`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sold_subjects`
--
ALTER TABLE `sold_subjects`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subjects`
--
ALTER TABLE `subjects`
  ADD PRIMARY KEY (`subject_id`),
  ADD KEY `class_id` (`class_id`),
  ADD KEY `added_by` (`added_by`);

--
-- Indexes for table `subscriptions`
--
ALTER TABLE `subscriptions`
  ADD PRIMARY KEY (`subscription_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `pricing_id` (`pricing_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `user_assessments`
--
ALTER TABLE `user_assessments`
  ADD PRIMARY KEY (`user_assessment_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `assessment_id` (`assessment_id`);

--
-- Indexes for table `user_course_progress`
--
ALTER TABLE `user_course_progress`
  ADD PRIMARY KEY (`progress_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `class_id` (`class_id`),
  ADD KEY `subject_id` (`subject_id`),
  ADD KEY `chapter_id` (`chapter_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_permissions`
--
ALTER TABLE `admin_permissions`
  MODIFY `permission_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `assessments`
--
ALTER TABLE `assessments`
  MODIFY `assessment_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `assessment_answers`
--
ALTER TABLE `assessment_answers`
  MODIFY `answer_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `assessment_questions`
--
ALTER TABLE `assessment_questions`
  MODIFY `assessment_question_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `certificates`
--
ALTER TABLE `certificates`
  MODIFY `certificate_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `chapters`
--
ALTER TABLE `chapters`
  MODIFY `chapter_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `classes`
--
ALTER TABLE `classes`
  MODIFY `class_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `education_boards`
--
ALTER TABLE `education_boards`
  MODIFY `board_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `pricing`
--
ALTER TABLE `pricing`
  MODIFY `pricing_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `questions_answers`
--
ALTER TABLE `questions_answers`
  MODIFY `question_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sold_chapters`
--
ALTER TABLE `sold_chapters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `sold_class`
--
ALTER TABLE `sold_class`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `sold_subjects`
--
ALTER TABLE `sold_subjects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `subjects`
--
ALTER TABLE `subjects`
  MODIFY `subject_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `subscriptions`
--
ALTER TABLE `subscriptions`
  MODIFY `subscription_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `user_assessments`
--
ALTER TABLE `user_assessments`
  MODIFY `user_assessment_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_course_progress`
--
ALTER TABLE `user_course_progress`
  MODIFY `progress_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admin_permissions`
--
ALTER TABLE `admin_permissions`
  ADD CONSTRAINT `admin_permissions_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `assessments`
--
ALTER TABLE `assessments`
  ADD CONSTRAINT `assessments_ibfk_1` FOREIGN KEY (`chapter_id`) REFERENCES `chapters` (`chapter_id`),
  ADD CONSTRAINT `assessments_ibfk_2` FOREIGN KEY (`added_by`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `assessment_answers`
--
ALTER TABLE `assessment_answers`
  ADD CONSTRAINT `assessment_answers_ibfk_1` FOREIGN KEY (`assessment_question_id`) REFERENCES `assessment_questions` (`assessment_question_id`);

--
-- Constraints for table `assessment_questions`
--
ALTER TABLE `assessment_questions`
  ADD CONSTRAINT `assessment_questions_ibfk_1` FOREIGN KEY (`assessment_id`) REFERENCES `assessments` (`assessment_id`),
  ADD CONSTRAINT `assessment_questions_ibfk_2` FOREIGN KEY (`question_id`) REFERENCES `questions_answers` (`question_id`);

--
-- Constraints for table `certificates`
--
ALTER TABLE `certificates`
  ADD CONSTRAINT `certificates_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `certificates_ibfk_2` FOREIGN KEY (`assessment_id`) REFERENCES `assessments` (`assessment_id`);

--
-- Constraints for table `chapters`
--
ALTER TABLE `chapters`
  ADD CONSTRAINT `chapters_ibfk_1` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`subject_id`),
  ADD CONSTRAINT `chapters_ibfk_2` FOREIGN KEY (`added_by`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `classes`
--
ALTER TABLE `classes`
  ADD CONSTRAINT `classes_ibfk_1` FOREIGN KEY (`board_id`) REFERENCES `education_boards` (`board_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `questions_answers`
--
ALTER TABLE `questions_answers`
  ADD CONSTRAINT `questions_answers_ibfk_1` FOREIGN KEY (`chapter_id`) REFERENCES `chapters` (`chapter_id`),
  ADD CONSTRAINT `questions_answers_ibfk_2` FOREIGN KEY (`added_by`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `subjects`
--
ALTER TABLE `subjects`
  ADD CONSTRAINT `subjects_ibfk_1` FOREIGN KEY (`class_id`) REFERENCES `classes` (`class_id`),
  ADD CONSTRAINT `subjects_ibfk_2` FOREIGN KEY (`added_by`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `subscriptions`
--
ALTER TABLE `subscriptions`
  ADD CONSTRAINT `subscriptions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `subscriptions_ibfk_2` FOREIGN KEY (`pricing_id`) REFERENCES `pricing` (`pricing_id`);

--
-- Constraints for table `user_assessments`
--
ALTER TABLE `user_assessments`
  ADD CONSTRAINT `user_assessments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `user_assessments_ibfk_2` FOREIGN KEY (`assessment_id`) REFERENCES `assessments` (`assessment_id`);

--
-- Constraints for table `user_course_progress`
--
ALTER TABLE `user_course_progress`
  ADD CONSTRAINT `user_course_progress_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `user_course_progress_ibfk_2` FOREIGN KEY (`class_id`) REFERENCES `classes` (`class_id`),
  ADD CONSTRAINT `user_course_progress_ibfk_3` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`subject_id`),
  ADD CONSTRAINT `user_course_progress_ibfk_4` FOREIGN KEY (`chapter_id`) REFERENCES `chapters` (`chapter_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
