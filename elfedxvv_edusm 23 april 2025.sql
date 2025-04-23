-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 23, 2025 at 04:38 PM
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
-- Table structure for table `assesments_question_answer`
--

CREATE TABLE `assesments_question_answer` (
  `id` int(11) NOT NULL,
  `assessment_id` int(11) NOT NULL,
  `question` text COLLATE utf8_unicode_ci NOT NULL,
  `option_a` text COLLATE utf8_unicode_ci NOT NULL,
  `option_b` text COLLATE utf8_unicode_ci NOT NULL,
  `option_c` text COLLATE utf8_unicode_ci NOT NULL,
  `option_d` text COLLATE utf8_unicode_ci,
  `correct_option` enum('option_a','option_b','option_c','option_d') COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `assesments_question_answer`
--

INSERT INTO `assesments_question_answer` (`id`, `assessment_id`, `question`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_option`) VALUES
(1, 1, 'what is javascript?', 'Javascript is a server-side scripting language.', 'Javascript is a windows application.', 'Javascript is a mobile script', 'Javascript is a client-side scripting language.', 'option_d'),
(2, 2, 'full form of PHP?', 'Python hyper text', 'Hypertext Preprocessor', 'personal Hypertext Preprocessor', 'personal house page', 'option_b'),
(3, 1, 'what is callback hell? ', 'nested callback issue', 'callback function error', 'package of node.js', 'React package', 'option_a');

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

--
-- Dumping data for table `assessments`
--

INSERT INTO `assessments` (`assessment_id`, `chapter_id`, `assessment_name`, `is_paid`, `added_by`) VALUES
(1, 1, 'javascript', 0, NULL),
(2, 1, 'PHP', 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `blog`
--

CREATE TABLE `blog` (
  `blog_id` int(11) NOT NULL,
  `cat_id` int(11) DEFAULT NULL,
  `title` varchar(222) COLLATE utf8_unicode_ci NOT NULL,
  `slug` varchar(222) COLLATE utf8_unicode_ci NOT NULL,
  `description1` longtext COLLATE utf8_unicode_ci NOT NULL,
  `image1` varchar(111) COLLATE utf8_unicode_ci NOT NULL,
  `description2` longtext COLLATE utf8_unicode_ci NOT NULL,
  `create_date` varchar(111) COLLATE utf8_unicode_ci NOT NULL,
  `update_date` varchar(111) COLLATE utf8_unicode_ci NOT NULL,
  `isActive` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `blog`
--

INSERT INTO `blog` (`blog_id`, `cat_id`, `title`, `slug`, `description1`, `image1`, `description2`, `create_date`, `update_date`, `isActive`) VALUES
(1, 2, 'Simple Habits That Can Transform Your Finances', 'Simple Habits That Can Transform Your Finances', '<p data-start=\"251\" data-end=\"574\">Managing money doesn\'t have to be complicated. In fact, it’s often the small, consistent habits that lead to major financial breakthroughs. Whether you’re saving for a big purchase, trying to pay off debt, or planning for retirement, these five habits can help you take control of your money and build a more secure future.</p>\r\n<h3 data-start=\"576\" data-end=\"614\">1. <strong data-start=\"583\" data-end=\"614\">Track Every Rupee You Spend</strong></h3>\r\n<p data-start=\"615\" data-end=\"843\">The first step toward financial awareness is knowing where your money goes. Use apps like Walnut, Money Manager, or just a simple spreadsheet to track daily expenses. You\'ll be surprised at how much those \"little\" things add up.</p>\r\n<h3 data-start=\"845\" data-end=\"880\">2. <strong data-start=\"852\" data-end=\"880\">Follow the 50/30/20 Rule</strong></h3>\r\n<p data-start=\"881\" data-end=\"910\">A simple budgeting framework:</p>\r\n<ul data-start=\"911\" data-end=\"1043\">\r\n    <li data-start=\"911\" data-end=\"955\">\r\n        <p data-start=\"913\" data-end=\"955\">50% for <strong data-start=\"921\" data-end=\"930\">needs</strong> (rent, bills, groceries)</p>\r\n    </li>\r\n    <li data-start=\"956\" data-end=\"1003\">\r\n        <p data-start=\"958\" data-end=\"1003\">30% for <strong data-start=\"966\" data-end=\"975\">wants</strong> (dining out, subscriptions)</p>\r\n    </li>\r\n    <li data-start=\"1004\" data-end=\"1043\">\r\n        <p data-start=\"1006\" data-end=\"1043\">20% for <strong data-start=\"1014\" data-end=\"1043\">savings or debt repayment</strong></p>\r\n    </li>\r\n</ul>\r\n', 'https://onlinehtmleditor.dev/assets/images/sections/convert-to-html.png', '<p data-start=\"1045\" data-end=\"1089\">This gives your money direction and purpose.</p>\r\n<h3 data-start=\"1091\" data-end=\"1123\">3. <strong data-start=\"1098\" data-end=\"1123\">Start Investing Early</strong></h3>\r\n<p data-start=\"1124\" data-end=\"1342\">Don’t wait for the “perfect time” to start investing. Thanks to the power of compounding, even small investments can grow significantly over time. Explore SIPs in mutual funds, PPFs, or index funds for long-term gains.</p>\r\n<h3 data-start=\"1344\" data-end=\"1378\">4. <strong data-start=\"1351\" data-end=\"1378\">Build an Emergency Fund</strong></h3>\r\n<p data-start=\"1379\" data-end=\"1533\">Life is unpredictable. An emergency fund (3–6 months’ worth of expenses) can shield you from debt during tough times like job loss or medical emergencies.</p>\r\n<h3 data-start=\"1535\" data-end=\"1567\">5. <strong data-start=\"1542\" data-end=\"1567\">Automate Your Savings</strong></h3>\r\n<p data-start=\"1568\" data-end=\"1749\">Set up auto-debits to move money into your savings or investment accounts right after you receive your salary. This makes saving effortless and ensures you\'re paying yourself first.</p>\r\n<hr data-start=\"1751\" data-end=\"1754\">\r\n<p data-start=\"1756\" data-end=\"1969\"><strong data-start=\"1756\" data-end=\"1771\">Conclusion:</strong> Financial freedom isn’t about making millions overnight—it’s about consistency, discipline, and making smart choices over time. Start small, stay committed, and watch your financial life transform.</p>', '23-Apr-2025', '23-Apr-2025', 1),
(4, 2, 'Mastering Class 12 CBSE Maths – Smart Tips, Tricks & Topics You Can’t Miss!', 'Mastering Class 12 CBSE Maths', '<p data-start=\"248\" data-end=\"494\">Class 12 Maths can feel like a rollercoaster — one moment you\'re flying through matrices, the next you\'re stuck in a vortex of integrals. But don’t worry! With the right mindset and smart strategies, you can not only survive but score 90+ easily.</p>\n<p data-start=\"496\" data-end=\"560\">Here’s your ultimate guide to mastering Class 12 Maths for CBSE.</p>\n<hr data-start=\"562\" data-end=\"565\">\n<h3 data-start=\"567\" data-end=\"598\">? Key Chapters to Focus On</h3>\n<p data-start=\"600\" data-end=\"694\">While all chapters are important, these topics are <strong data-start=\"651\" data-end=\"666\">must-master</strong> (high weightage in boards):</p>\n<ol data-start=\"696\" data-end=\"1139\">\n    <li data-start=\"696\" data-end=\"774\">\n        <p data-start=\"699\" data-end=\"774\"><strong data-start=\"699\" data-end=\"726\">Relations and Functions</strong> – Strong basics needed for many other chapters.</p>\n    </li>\n    <li data-start=\"775\" data-end=\"845\">\n        <p data-start=\"778\" data-end=\"845\"><strong data-start=\"778\" data-end=\"805\">Matrices &amp; Determinants</strong> – Easy scoring if your steps are clear.</p>\n    </li>\n    <li data-start=\"846\" data-end=\"917\">\n        <p data-start=\"849\" data-end=\"917\"><strong data-start=\"849\" data-end=\"883\">Continuity &amp; Differentiability</strong> – Conceptual + application based.</p>\n    </li>\n    <li data-start=\"918\" data-end=\"992\">\n        <p data-start=\"921\" data-end=\"992\"><strong data-start=\"921\" data-end=\"934\">Integrals</strong> – Practice, practice, practice. Understand formulas well.</p>\n    </li>\n    <li data-start=\"993\" data-end=\"1062\">\n        <p data-start=\"996\" data-end=\"1062\"><strong data-start=\"996\" data-end=\"1027\">Applications of Derivatives</strong> – Real-life utility, very scoring.</p>\n    </li>\n    <li data-start=\"1063\" data-end=\"1139\">\n        <p data-start=\"1066\" data-end=\"1139\"><strong data-start=\"1066\" data-end=\"1081\">Probability</strong> – Logical, and often ignored by students. A game changer!</p>\n    </li>\n</ol>', '/uploads/1745399558310-Screenshot 2024-10-22 151216.png', '<h3 data-start=\"1146\" data-end=\"1174\">? Top Tips to Ace Maths</h3>\n<p data-start=\"1176\" data-end=\"1266\">✅ <strong data-start=\"1178\" data-end=\"1204\">Understand, Don’t Cram</strong> – Maths is not a memory test. Focus on <em data-start=\"1244\" data-end=\"1249\"><i>why</i></em> each step works.</p>\n<p data-start=\"1268\" data-end=\"1374\">✅ <strong data-start=\"1270\" data-end=\"1292\">NCRT is Your Bible</strong> – Solve each NCERT problem, examples included. Boards LOVE NCERT-style questions.</p>\n<p data-start=\"1376\" data-end=\"1454\">✅ <strong data-start=\"1378\" data-end=\"1395\">Formula Sheet</strong> – Maintain a single-page formula chart for daily revision.</p>\n<p data-start=\"1456\" data-end=\"1612\">✅ <strong data-start=\"1458\" data-end=\"1480\">Step-Wise Practice</strong> – In board exams, marks are given for steps. Even if your final answer is wrong, you can still score well if your process is right.</p>\n<p data-start=\"1614\" data-end=\"1726\">✅ <strong data-start=\"1616\" data-end=\"1647\">Previous Year Papers = Gold</strong> – Solve last 5-10 years’ CBSE question papers. Repetition of concepts is real.</p>\n<hr data-start=\"1728\" data-end=\"1731\">\n<h3 data-start=\"1733\" data-end=\"1764\">? Common Mistakes to Avoid</h3>\n<p data-start=\"1766\" data-end=\"1844\">? Skipping steps – CBSE gives marks step-wise, not just for the final answer.</p>\n<p data-start=\"1846\" data-end=\"1913\">? Ignoring Graphs – Especially in Calculus and Linear Programming.</p>\n<p data-start=\"1915\" data-end=\"2009\">? Getting Overconfident in “Easy” Chapters – Like Matrices. One small mistake can cost marks.</p>', '23-Apr-2025', '23-Apr-2025', 1);

-- --------------------------------------------------------

--
-- Table structure for table `blog_category`
--

CREATE TABLE `blog_category` (
  `cat_id` int(11) NOT NULL,
  `cat_name` varchar(111) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `blog_category`
--

INSERT INTO `blog_category` (`cat_id`, `cat_name`) VALUES
(2, 'Finance'),
(3, 'maths'),
(4, 'English');

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

--
-- Dumping data for table `questions_answers`
--

INSERT INTO `questions_answers` (`question_id`, `chapter_id`, `question_text`, `correct_answer`, `added_by`) VALUES
(1, 1, 'Full form of CSS?', 'Cascading Style Sheets', NULL),
(2, 1, 'What is an array?', 'An array is a collection of elements stored in a single variable.', NULL),
(3, 1, 'What is a loop?', 'A loop is used to execute a block of code repeatedly.', NULL);

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
(2, 1, 1, 'user@example.com', '2025-04-21 14:19:20', '180', '2025-04-21 14:19:20', 1),
(3, 1, 1, 'ps@gmail.com', '2025-02-02 14:18:19', '180', '2025-02-02 14:18:19', 1);

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
(2, 1, 'user@example.com', '2025-04-21 14:19:20', '180', '2025-04-21 14:19:20', 1),
(3, 1, 'ps@gmail.com', '2025-02-02 14:18:19', '180', '2025-02-02 14:18:19', 1);

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
(4, 1, 1, 'user@example.com', '2025-04-21 14:19:20', '180', '2025-04-21 14:19:20', 1),
(5, 1, 1, 'ps@gmail.com', '2025-02-02 14:18:19', '180', '0000-00-00 00:00:00', 1);

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
(8, '', 'ps@gmail.com', '$2b$10$dpd4Qm.raykc3RlEc.E61eEhHuEo8/7ZgEqLZB0yoRey2p64YprIO', 'user', 'c1e8504b9c62f255e2551f9685875c93810c3453a12a6f2b975d5ba79fb55c25', 'pankaj@gmail.com', '2025-04-17 06:26:28', 1),
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
-- Indexes for table `assesments_question_answer`
--
ALTER TABLE `assesments_question_answer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `assessments`
--
ALTER TABLE `assessments`
  ADD PRIMARY KEY (`assessment_id`),
  ADD KEY `chapter_id` (`chapter_id`),
  ADD KEY `added_by` (`added_by`);

--
-- Indexes for table `blog`
--
ALTER TABLE `blog`
  ADD PRIMARY KEY (`blog_id`),
  ADD KEY `fk_blog_category` (`cat_id`);

--
-- Indexes for table `blog_category`
--
ALTER TABLE `blog_category`
  ADD PRIMARY KEY (`cat_id`);

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
-- AUTO_INCREMENT for table `assesments_question_answer`
--
ALTER TABLE `assesments_question_answer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `assessments`
--
ALTER TABLE `assessments`
  MODIFY `assessment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `blog`
--
ALTER TABLE `blog`
  MODIFY `blog_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `blog_category`
--
ALTER TABLE `blog_category`
  MODIFY `cat_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

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
  MODIFY `question_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `sold_chapters`
--
ALTER TABLE `sold_chapters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `sold_class`
--
ALTER TABLE `sold_class`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `sold_subjects`
--
ALTER TABLE `sold_subjects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

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
-- Constraints for table `blog`
--
ALTER TABLE `blog`
  ADD CONSTRAINT `fk_blog_category` FOREIGN KEY (`cat_id`) REFERENCES `blog_category` (`cat_id`) ON DELETE SET NULL ON UPDATE CASCADE;

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
