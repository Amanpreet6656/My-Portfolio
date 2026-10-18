# Amanpreet Singh | Full-Stack Developer

This repository contains the source code and architectural documentation for my personal web portfolio. Operating as a full-stack developer based near Sirsa, Haryana, my focus is on engineering resilient web applications and robust digital infrastructure.

## Architectural Overview

Rather than utilizing standard boilerplate templates, the portfolio interface implements a custom 3D scrolling engine. This system is constructed using native JavaScript and CSS 3D perspective transformations. It utilizes Linear Interpolation (LERP) to compute fluid depth navigation (`current += (target - current) * 0.12`). 

For mobile viewports, the application programmatically degrades to a hardware-optimized 2D translation model. This fallback is supported by dynamic pagination linked directly to the primary animation loop, ensuring stable 60fps rendering on low-power mobile graphics processing units. The visual interface strictly adheres to a `#050505` background, utilizing backdrop blurring, glassmorphic elevation, and responsive Tailwind CSS layouts.

## Engineering Philosophy

My development methodology is grounded in building from fundamental principles rather than relying heavily on high-level abstractions. Whether optimizing relational database queries, profiling frontend rendering performance, or parsing complex data structures, the priority remains strict adherence to core mechanics, structured testing, and scalable architecture.

## Technical Stack

*   **Frontend Infrastructure:** HTML5, CSS3, JavaScript (ES6+), Tailwind CSS, Bootstrap
*   **Backend & Data Systems:** PHP, Python, Java, SQL (MySQL, Relational Database Design)

## Project Profiles

### 1. Kissa Punjab: Production Client Platform
A production-grade web platform developed to archive and distribute historical Punjabi literature for a private client.

*   **System Architecture:** Features a normalized SQL database schema designed to separate user identities, transaction records, and digital asset access rights.
*   **Security Implementation:** Bypasses vulnerable static asset linking in favor of a secure PHP delivery handler. This backend controller authenticates active session tokens, verifies payment states, and streams digital publications using rate-limited response headers to prevent unauthorized distribution.
*   **Project Management:** Navigated real-world client requirements and scope constraints to deliver a stable, on-schedule production deployment.

### 2. Smart Kanji Analyzer: Linguistic Processing Tool
A localized web application engineered to parse and analyze Japanese text, designed to eliminate workflow interruptions during language acquisition.

*   **System Architecture:** Integrates a client-side parsing engine that segments raw Japanese text strings, isolating distinct Kanji characters and morphological components without external backend bloat.
*   **Data Mapping:** Correlates parsed tokens against integrated datasets to return Onyomi and Kunyomi readings, radical breakdowns, English definitions, and standardized proficiency levels.
*   **Performance:** Operates entirely client-side, achieving sub-millisecond local retrieval times for frictionless reading immersion.

## Contact Information

*   **GitHub:** [@Amanpreet6656](https://github.com/Amanpreet6656)
*   **Email:** amanpreetsingh21605@gmail.com
