# Amanpreet Singh | Full-Stack Developer

I am a full-stack developer based near Sirsa, focused on building resilient web applications and clean digital tools.

## About This Repository

This repository hosts my personal portfolio. Instead of relying on boilerplate templates, I built a custom 3D scroll engine using Vanilla JavaScript, CSS 3D perspective transforms, and Linear Interpolation (LERP) for fluid depth navigation. On mobile viewports, the interface automatically switches to a hardware-friendly 2D translation fallback, paired with interactive pagination dots linked directly to the scroll engine.

## The Mindset

I approach software engineering the same way I approach Taekwondo and boxing: you cannot fake a foundation. Whether I am debugging relational database queries, profiling frontend render performance, or breaking down Japanese Kanji compounds, my rule is the same. I focus on putting in the repetitions, understanding the underlying mechanics rather than relying on heavy abstractions, and building systems that hold up under real pressure.

## Tech Stack

* **Frontend Architecture:** HTML5, CSS3, JavaScript (ES6+), Tailwind CSS, Bootstrap
* **Backend & Databases:** PHP, Python, Java, SQL (MySQL, Relational Database Design)

## Projects & Experience

### 1. Kissa Punjab: Client Platform
Built for Gurpreet Sidhu. A custom production web platform designed to host historical Punjabi literature and distribute digital publications.
* **Architecture:** Designed a normalized SQL schema separating customer identities, order transactions, and digital publication entitlements.
* **Security:** Implemented secure e-book fulfillment. Instead of exposing vulnerable static asset links, a custom PHP delivery handler verifies active session tokens, validates payment status, and streams the binary with rate-limited response headers.
* **Execution:** Managed real-world client expectations and scope creep firsthand, locking down core deliverables to ensure a stable, on-schedule production launch.

### 2. Smart Kanji Analyzer: Japanese Language Tool
A custom web tool engineered to solve my own bottleneck while studying Japanese. It eliminates the need to pause mid-sentence to look up unfamiliar Kanji in third-party dictionaries.
* **Architecture:** Features a client-side parsing engine that analyzes raw Japanese text blocks, isolating individual Kanji characters and compound expressions.
* **Functionality:** Maps parsed tokens against structured datasets to instantly surface Onyomi and Kunyomi readings, radical breakdowns, English definitions, and JLPT difficulty levels.
* **Performance:** Engineered with zero external bloat for sub-millisecond local lookups, built purely for frictionless text immersion.

## Portfolio Architecture & Performance

* **3D Scroll Engine:** Vanilla JavaScript LERP computing `current += (target - current) * 0.12` to animate 3D perspective matrices and cylindrical dial rotation without heavy animation libraries.
* **Mobile 2D Fallback:** Automatically switches to lightweight vertical translation on touch devices under 768px to ensure 60fps performance on low-power mobile GPUs.
* **Dynamic Pagination Dots:** Mobile-only progress indicator linked into the animation loop that dynamically expands and highlights the active section based on the continuous scroll fraction.
* **Design System:** Pure #050505 background with backdrop blur, glassmorphic card elevation, and responsive Tailwind layouts.

## Connect

* **GitHub:** [@Amanpreet6656](https://github.com/Amanpreet6656)
* **Email:** amanpreet6656@gmail.com
