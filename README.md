# Athmeeya M Kashyap | Personal Portfolio 🚀

![Portfolio Preview Banner](https://athmeeya2006.github.io/webpage/assets/Athmeeya_Kashyap_cv.jpg)

> A premium, high-performance, responsive personal portfolio website with a sci-fi/terminal aesthetic.

[![Live Demo](https://img.shields.io/badge/Live_Demo-View_Website-00FFE5?style=for-the-badge&logo=vercel)](https://athmeeya2006.github.io/webpage/)

## 📌 Overview

This repository contains the source code for my personal portfolio website. Designed from the ground up without heavy frontend frameworks, it leverages **HTML5**, **CSS3**, and **Vanilla JavaScript** to deliver a blazingly fast, visually striking, and deeply interactive experience. The design heavily utilizes `<canvas>` elements, smooth scrolling mechanics, and intricate micro-animations to create a dynamic, living interface that reflects my dual interests in rigorous computational research and polished software engineering.

## ✨ Key Features

- **Sci-Fi / Terminal Aesthetic:** Dark mode by default, featuring vibrant neon accents (Cyan, Orange, Purple), glitch effects, and monospace typography.
- **Canvas-Powered Visuals:**
  - Interactive Starfield background (`#starCanvas`)
  - Dynamic Matrix Rain for competitive programming achievements (`#codeCanvas`)
  - Animated Radar sweep for contact signals (`#radarCanvas`)
  - Floating Neural Network connecting technical skills (`#skillCanvas`)
- **Advanced Animations:** Custom `IntersectionObserver` implementations for staggered scroll reveals, text scrambling effects, and 3D tilt mechanics on interactive cards.
- **Performance Optimized:** Lightweight Vanilla JS with `requestAnimationFrame` throttled scroll events and smooth `lerp` functions for buttery-smooth animations.
- **Fully Responsive:** Carefully crafted media queries ensure the complex grid layouts and canvas elements scale flawlessly down to mobile devices.
- **SEO Ready:** Semantic HTML, Open Graph meta tags, and Twitter Cards configured for optimal search engine visibility and social sharing.

## 🏗️ Architecture & Sections

The single-page application is structured into clearly defined sections:

1. **Hero:** Immersive intro with custom text-scramble loading, starfield canvas, and quick CTA links.
2. **About:** Narrative introduction covering academic background (B.Tech CS + MS Computational Natural Sciences at IIIT Hyderabad) and research focus (Percolation Theory, Complex Networks).
3. **Experience:** Timeline of professional software engineering and academic research roles.
4. **Education:** Animated timeline tracking academic progression.
5. **Skills:** Interactive neural-network style canvas demonstrating proficiency across Low-Level/Quant, Scientific/Research, and Systems/Web stacks.
6. **Achievements:** Horizontal scrolling "Hall of Legends" showcasing competitive mathematics (INMO), astronomy (NSEA), and hackathon successes.
7. **Projects:** 3D tilt-enabled cards detailing key technical projects, from Max-Flow benchmarking to Full-Stack Web Systems.
8. **Contact:** Radar-themed terminal interface for professional links (GitHub, LinkedIn, Codeforces, Email) and CV download.

## 🛠️ Technical Stack

- **Structure:** HTML5 (Semantic, Accessible)
- **Styling:** CSS3 (CSS Variables, Flexbox/Grid, CSS Animations, Media Queries)
- **Logic & Interactions:** Vanilla JavaScript (ES6+)
- **Graphics:** HTML5 Canvas API
- **Typography:** Google Fonts (`Inter`, `Bebas Neue`, `Orbitron`, `Space Mono`)

## 🚀 Getting Started

Since this project relies purely on standard web technologies, there is no build step or package manager required to run it locally.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/athmeeya2006/webpage.git
   ```

2. **Navigate to the directory:**
   ```bash
   cd webpage
   ```

3. **Run locally:**
   Simply open `index.html` in your modern web browser. 
   *(Optional: Use an extension like Live Server in VS Code for hot reloading during development).*

## 📂 Repository Structure

```text
├── index.html        # Main HTML structure and semantic markup
├── styles.css        # Core styling, responsive design, and CSS animations
├── scripts.js        # Logic for canvas rendering, intersection observers, and interactions
├── assets/           # Directory containing images and documents
│   ├── Athmeeya_Kashyap_cv.jpg
│   └── Athmeeya_Kashyap_cv.pdf
└── README.md         # Project documentation (You are here)
```

---
*Crafted with precision and a passion for complex systems.*
