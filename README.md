# Amanpreet Singh | Full-Stack Developer

I am a full-stack developer based near Sirsa, building resilient web applications and clean digital tools.

This repository hosts my personal portfolio. Rather than relying on boilerplate templates, I built a custom 3D scroll engine using Vanilla JavaScript, CSS 3D perspective transforms, and Linear Interpolation (LERP) for fluid depth navigation. On mobile viewports, the interface switches to a hardware-friendly 2D translation fallback paired with interactive pagination dots linked directly to the scroll engine.

---

## 🥋 The Mindset

I approach software engineering the same way I approach Taekwondo and boxing: you can't fake a foundation. No shortcuts, no relying on heavy abstractions without understanding the underlying mechanics.

Whether I'm debugging relational database queries, profiling frontend render performance, or breaking down Japanese kanji compounds, the rule is the same: put in the reps, understand the fundamentals, and build things that hold up under real pressure.

---

## 🛠️ Tech Stack

### Frontend Architecture
* **Core:** HTML5, CSS3, JavaScript (ES6+)
* **Styling & Frameworks:** Tailwind CSS, Bootstrap

### Backend & Databases
* **Server Logic:** PHP, Python, Java
* **Data Storage:** SQL (MySQL / Relational Database Design)

---

## 💻 Projects & Experience

### 1. Kissa Punjab — Client E-Commerce Platform
*Built for Gurpreet Sidhu*

A custom production web platform designed to host historical Punjabi literature and distribute digital publications.

* **Architecture Breakdown:**
  * Designed a normalized SQL schema separating customer identities, order transactions, and digital publication entitlements.
  * Implemented secure e-book fulfillment: instead of exposing vulnerable static asset links, a custom PHP delivery handler verifies active session tokens, validates payment status, and streams the binary with rate-limited response headers.
* **Key Takeaway:** Managed real-world client expectations and scope creep firsthand—locking core deliverables to ensure a stable, on-schedule production launch.

### 2. Smart Kanji Analyzer — Japanese Language Tool
*Personal Study Utility*

A custom web tool I engineered to solve my own bottleneck while studying Japanese: pausing mid-sentence to look up unfamiliar kanji in third-party dictionaries constantly derailed reading flow.

* **Architecture Breakdown:**
  * Client-side parsing engine that analyzes raw Japanese text blocks, isolating individual kanji characters and compound expressions.
  * Maps parsed tokens against structured datasets to instantly surface Onyomi/Kunyomi readings, radical breakdowns, English definitions, and JLPT difficulty levels.
  * Zero external bloat, sub-millisecond local lookups, and built purely around frictionless text immersion.

---

## ⚙️ Portfolio Architecture & Performance

* **3D Scroll Engine:** Vanilla JavaScript LERP (`current += (target - current) * 0.12`) animating 3D perspective matrices and cylindrical dial rotation without heavy animation libraries.
* **Mobile 2D Fallback:** Automatically switches to lightweight vertical translation on touch devices (`< 768px`) to ensure 60fps performance on low-power mobile GPUs.
* **Dynamic Pagination Dots:** Mobile-only progress indicator linked into the animation loop that dynamically expands and highlights the active section based on continuous scroll fraction.
* **Design System:** Pure `#050505` background with backdrop blur, glassmorphic card elevation, and responsive Tailwind layouts.

---

## 🌐 Connect

* **GitHub:** [@Amanpreet6656](https://github.com/Amanpreet6656)
* **Email:** [amanpreet6656@gmail.com](mailto:amanpreet6656@gmail.com)
