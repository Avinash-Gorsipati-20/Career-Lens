# 🚀 AIBuilder – Next-Gen AI-Powered Career & Resume Platform

[![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)](package.json)
[![React](https://img.shields.io/badge/React-18.2.0-61DAFB.svg?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-3178C6.svg?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.1.4-646CFF.svg?logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC.svg?logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](#license)

**AIBuilder** (AI Career Platform) is an end-to-end, AI-driven career platform designed to help software engineers, developers, and professionals craft ATS-optimized resumes, build interactive developer portfolios, analyze career growth trajectories, match verified job opportunities, and bridge skill gaps with AI recommendations.

---

## 📌 Table of Contents

- [Overview](#-overview)
- [🛠️ Technologies Used](#️-technologies-used)
- [✨ Comprehensive Feature Breakdown](#-comprehensive-feature-breakdown)
  - [1. Smart Resume Builder & Live Editor](#1-smart-resume-builder--live-editor)
  - [2. AI Targeted Resume Generator & ATS Compatibility Checker](#2-ai-targeted-resume-generator--ats-compatibility-checker)
  - [3. Interactive Portfolio Engine](#3-interactive-portfolio-engine)
  - [4. CareerLens AI & Career Growth Hub](#4-careerlens-ai--career-growth-hub)
  - [5. Verified Job Opportunities & Application Tracker](#5-verified-job-opportunities--application-tracker)
  - [6. Smart Imports, Code Parser & Version History](#6-smart-imports-code-parser--version-history)
  - [7. Authentication & Eye-Protection Theme System](#7-authentication--eye-protection-theme-system)
- [🎨 Resume Templates](#-resume-templates)
- [💻 Portfolio Layouts & Themes](#-portfolio-layouts--themes)
- [📁 Project Folder Structure](#-project-folder-structure)
- [🚀 Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development Server](#development-server)
  - [Production Build](#production-build)
  - [Code Linting](#code-linting)
- [🔒 Security & Data Persistence](#-security--data-persistence)
- [📄 License](#-license)

---

## 🔍 Overview

Modern recruitment relies heavily on Applicant Tracking Systems (ATS) and dynamic visual proof of skills. **AIBuilder** bridges the gap between raw candidate data and job market requirements by providing a real-time split-screen resume builder, automated ATS optimization against job descriptions, dynamic web portfolio generation, and AI-powered career path planning—all in one unified, responsive web interface.

---

## 🛠️ Technologies Used

### Core Frameworks & Libraries

| Technology | Version | Purpose |
| :--- | :--- | :--- |
| **[React](https://reactjs.org/)** | `^18.2.0` | UI component architecture, hooks, and reactive state management |
| **[TypeScript](https://www.typescriptlang.org/)** | `^5.2.2` | Type-safe interfaces across domain models (Resumes, Portfolios, Career, Auth) |
| **[Vite](https://vitejs.dev/)** | `^5.1.4` | Ultra-fast build tool, local dev server with HMR, and production bundler |
| **[Tailwind CSS](https://tailwindcss.com/)** | `^3.4.1` | Utility-first CSS design system with custom theme tokens |
| **[Lucide React](https://lucide.dev/)** | `^0.344.0` | Modern, clean vector icon suite |

### Document & Asset Processing

| Technology | Version | Purpose |
| :--- | :--- | :--- |
| **[jspdf](https://github.com/parallax/jsPDF)** | `^2.5.1` | Client-side vector PDF document generation |
| **[html2canvas](https://html2canvas.hertzen.com/)** | `^1.4.1` | DOM element rasterization for high-precision document exports |
| **[clsx](https://github.com/lukeed/clsx)** & **[tailwind-merge](https://github.com/dcastil/tailwind-merge)** | `^2.1.1` / `^2.2.1` | Dynamic utility class combining and conflict resolution |

### Build Tools & Preprocessors

| Technology | Version | Purpose |
| :--- | :--- | :--- |
| **[PostCSS](https://postcss.org/)** | `^8.4.35` | Tool for transforming CSS with JavaScript plugins |
| **[Autoprefixer](https://github.com/postcss/autoprefixer)** | `^10.4.18` | Parse CSS and add vendor prefixes automatically |
| **[ESLint](https://eslint.org/)** | Standard | Code quality enforcement and static analysis |

---

## ✨ Comprehensive Feature Breakdown

### 1. Smart Resume Builder & Live Editor
- **Split-Screen Desktop Layout**: Real-time form editing panel on the left with live, synchronized paper document preview on the right.
- **Mobile Responsive View Toggle**: Smooth switch between form editor and paper preview modes on mobile devices.
- **Interactive Section Management**:
  - Personal Details (Full Name, Contact, Social Links, Avatar URL)
  - Professional Executive Summary with AI Polish
  - Work Experience (Company, Role, Dates, Achievements, Key Metrics)
  - Education & Academic Credentials
  - Technical Skills (Categorized by domain with proficiency levels)
  - Portfolio Projects (Title, Description, Tech Stack, Links)
  - Certifications, Awards, and Custom Fields
- **Real-Time Progress Tracker**: Visual completion percentage indicator highlighting missing sections to maximize resume quality.
- **Field Validation**: Inline error indicators to prevent missing required contact details or invalid links.

### 2. AI Targeted Resume Generator & ATS Compatibility Checker
- **Targeted Job Tailoring (`TargetedResumeView`)**: Paste any target Job Description (JD) to generate a customized, ATS-aligned resume draft.
- **AI Gap Analysis & Keyword Matching**: Evaluates match percentage between candidate skills and target job requirements.
- **ATS Score Checker Modal (`AtsScoreCheckerModal`)**:
  - Detailed score breakdown out of 100 points across **Keyword Density**, **Action Verbs**, **Formatting**, **Contact Info**, and **Completeness**.
  - One-click missing skill injection straight into your active resume skills list.

### 3. Interactive Portfolio Engine
- **Instant Web Portfolio Generation**: Converts raw resume JSON data into a fully interactive, production-ready developer website.
- **5 Built-in Architectural Portfolio Themes**:
  - **Modern Minimal**: Clean typography, subtle borders, and executive spacing.
  - **Clean Tech**: High-tech developer theme with highlighted tech tags.
  - **Creative Glassmorphism**: Vibrant gradients, translucent glass backdrop-filters, and soft glows.
  - **Developer Dark**: High-contrast dark theme engineered specifically for software engineers and open-source contributors.
  - **Executive**: Sleek corporate aesthetics tailored for leadership and engineering managers.
- **Interactive Project Showcase**: Deep-dive project modals featuring live preview links, GitHub repository links, and feature badges.
- **Export & Deployment Suite**: Download portfolio HTML/PDF, preview dynamic web layouts, and configure custom deployment settings.

### 4. CareerLens AI & Career Growth Hub
- **AI Trajectory Predictor**: Analyzes current role and technical stack to map potential career advancement paths (e.g., Senior Full-Stack Engineer → Cloud Architect / Engineering Manager).
- **Interview Preparation Module**: Generates role-specific behavioral and technical interview questions along with structured STAR-method answers.
- **Skill Gap & Learning Roadmap (`SkillGapRoadmapView`)**: Identifies skill shortfalls for desired job titles and presents curated learning milestones and course recommendations.

### 5. Verified Job Opportunities & Application Tracker
- **Curated Job Feed**: Browse role recommendations matched against your experience profile.
- **1-Click Targeted Tailoring**: Instantly transition from a job listing to a customized resume draft target-fit for that application.
- **Match Score Badging**: Visual indication of high, medium, or developing fit for each listing.

### 6. Smart Imports & Final Cloud Documents
- **JSON & PDF Resume Import (`ResumeImportModal`)**: Load existing resume datasets or import structured JSON files with ease.
- **Code Snippet to Achievement Parser (`CodeImportModal`)**: Paste code snippets or GitHub repository descriptions to automatically generate technical achievements and summaries.
- **Guided Input Wizard (`GuidedInputModal`)**: Step-by-step onboarding flow designed to help first-time users build a complete resume from scratch.
- **Firebase final saves**: A name is requested on first save; later saves update the same document. Save As creates a new document without version history or autosave records.

### 7. Authentication & Eye-Protection Theme System
- **Firebase Authentication (`GoogleLoginPage`)**: Google, Email/Password, GitHub, and Microsoft providers use the configured Firebase project only.
- **Tri-Theme Visual Engine**:
  - **Dark Mode**: Deep Slate-950 backdrop for night sessions.
  - **Light Mode**: High-contrast, clean slate aesthetic.
  - **Eye-Protection Warm Mode**: Soft, warm background (`#faf6ed`) designed to minimize eye strain during long writing sessions.
- **Profile photo storage**: Profile images are validated and uploaded to the authenticated user's Firebase Storage folder.

---

## 🎨 Resume Templates

AIBuilder includes **14 pre-built, print-ready, and ATS-tested resume templates**:

1. 📄 **AtsTemplate**: Ultra-clean, plain formatting optimized for ATS parser ingestion.
2. 💼 **ProfessionalTemplate**: Standard corporate grid suited for mid to senior professionals.
3. 🚀 **ModernTemplate**: Contemporary layout featuring subtle accent colors and modern fonts.
4. 👑 **ExecutiveTemplate**: High-impact layout designed for managerial and C-level roles.
5. ✨ **MinimalTemplate**: Stripped-down aesthetic focused purely on content density.
6. 🎨 **CreativeTemplate**: Bold color accents and dynamic header placement for design/tech hybrids.
7. 🏛️ **SwissGridTemplate**: Strict grid layout inspired by classical Swiss graphic design.
8. ❄️ **NordicTemplate**: Clean Scandinavian minimalism with spacious typography.
9. 💻 **TechTemplate**: Code-focused layout highlighting technical skill badges and project links.
10. ⚡ **DeveloperMatrixTemplate**: High-density format ideal for software developers with extensive tech stacks.
11. 🌈 **GradientTemplate**: Vibrant header gradient styling for standout applications.
12. 💎 **ElegantTemplate**: Sophisticated typography with polished divider styling.
13. 📐 **SplitTemplate**: Dual-column layout balancing experience on the left and skills on the right.
14. 📦 **CompactTemplate**: Optimized one-page template for dense work histories.

---

## 💻 Portfolio Layouts & Themes

The Portfolio Engine converts your resume data into responsive web portfolios featuring **5 distinctive design system themes**:

```
 ┌─────────────────────────────────────────────────────────────────┐
 │                       PORTFOLIO ENGINE                          │
 ├─────────────────┬─────────────────┬─────────────────────────────┤
 │ Modern Minimal  │ Clean Tech      │ Creative Glassmorphism      │
 ├─────────────────┼─────────────────┴─────────────────────────────┤
 │ Developer Dark  │ Executive Leadership                          │
 └─────────────────┴───────────────────────────────────────────────┘
```

- **Live Theme Customizer**: Dynamic color palette switching.
- **Custom Section Display**: Toggle sections (Experience, Projects, Skills, Contact).
- **Responsive Navigation**: Mobile drawer menu and desktop sticky navbar.

---

## 📁 Project Folder Structure

```
AIBuilder/
├── index.html                  # HTML5 Entry point
├── package.json                # Project dependencies and script definitions
├── postcss.config.js           # PostCSS configuration for Tailwind CSS
├── tailwind.config.js          # Custom Tailwind design tokens & themes
├── tsconfig.json               # TypeScript compiler options
├── tsconfig.node.json          # Node-specific TypeScript settings
├── vite.config.ts              # Vite server and build configuration
└── src/
    ├── main.tsx                # Application root mounting file
    ├── App.tsx                 # Main application layout and tab navigation router
    ├── index.css               # Global CSS styles and Tailwind directives
    ├── types/                  # Type definitions & data interfaces
    │   ├── auth.ts             # Auth context user types
    │   ├── career.ts           # Career, skills & interview types
    │   ├── portfolio.ts        # Portfolio customization settings
    │   ├── resume.ts           # Full Resume data schema
    │   ├── targetedResume.ts   # Targeted job description analysis types
    │   └── version.ts          # Resume version history types
    ├── context/                # Global React Context providers
    │   ├── AuthContext.tsx     # Google authentication session state
    │   └── ThemeContext.tsx    # Light / Dark / Eye-Protection theme manager
    ├── hooks/                  # Custom React Hooks
    │   ├── useAutoSave.ts      # Debounced local storage auto-persistence
    │   └── useResume.ts        # Central state manager for resume data & actions
    ├── services/               # Core business logic & AI API services
    │   ├── aiIntegration.ts    # AI assistant utility helpers
    │   ├── aiService.ts        # Gemini AI prompt orchestration
    │   ├── careerService.ts    # Career growth, interview & gap analysis logic
    │   ├── jobService.ts       # Job listings & application tracking service
    │   ├── learningService.ts  # Skill roadmap & course recommendation engine
    │   ├── pdfService.ts       # html2canvas & jsPDF rendering wrapper
    │   ├── portfolioService.ts # Portfolio theme & layout manager
    │   ├── resumeParserService.ts # PDF/JSON content parsing
    │   ├── storageService.ts   # LocalStorage data persistence adapter
    │   ├── targetedResumeService.ts # ATS scoring & keyword alignment algorithm
    │   ├── templateService.ts  # Resume template catalog definitions
    │   └── versionService.ts   # Snapshot history & restore logic
    └── components/             # UI Components by feature domain
        ├── auth/               # Google Login and user authentication modals
        ├── career/             # CareerLens AI, Job Listings & Skill Roadmaps
        ├── dashboard/          # Central user overview dashboard
        ├── form/               # Resume field editors and inputs
        ├── landing/            # Public platform landing page
        ├── layout/             # Header navigation bar & tab controllers
        ├── portfolio/          # Web Portfolio Engine themes & showcase views
        ├── preview/            # Live A4 paper document preview component
        ├── targetedResume/     # Job description ATS targeting view
        ├── templates/          # 14 print-ready resume template components
        ├── ui/                 # Shared atomic UI primitives (Buttons, Cards, Badges)
        └── widgets/            # Interactive modal tools (ATS Checker, Imports, Versions)
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following software installed on your machine:
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher (or `pnpm` / `yarn`)

### Installation

1. **Clone the repository** (or navigate to the workspace directory):
   ```bash
   git clone https://github.com/your-username/AIBuilder.git
   cd AIBuilder
   ```

2. **Install project dependencies**:
   ```bash
   npm install
   ```

### Development Server

Run the local development server with hot module replacement (HMR):
```bash
npm run dev
```
The application will be accessible at: `http://localhost:5173`

### Production Build

Compile TypeScript and build the static production bundle using Vite:
```bash
npm run build
```
The optimized build output will be generated inside the `dist/` directory.

### Preview Production Build

Preview the built application locally:
```bash
npm run preview
```

### Code Linting

Run static analysis and code quality checks using ESLint:
```bash
npm run lint
```

---

## 🔒 Security & Data Persistence

- **Firebase persistence**: Authenticated users can access only their own `users/{uid}` profile and final `documents/{documentId}` records. Firestore contains no drafts, autosaves, sections, or version history.
- **Protected images**: Profile photos are stored at `profile-photos/{uid}/{unique-file-name}` in Firebase Storage; Firestore stores only the download URL.
- **Required setup**: See [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) before running the app with Firebase.
- **Zero Lock-In**: Export full structured JSON data at any time and import it back seamlessly.
- **Client-Side Export**: PDF generation and DOM rasterization run entirely inside the client environment via `html2canvas` and `jspdf`.

---

## 📄 License

This project is licensed under the **MIT License**. Feel free to use, modify, and distribute it for personal or commercial projects.

---

<p center>
  Made with ❤️ for Job Seekers, Developers, and Career Growth.
</p>
