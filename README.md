# The-Architect-Constitution
"A cinematic, immersive web experience honoring Dr. B.R. Ambedkar and the Constitution of India. Built with GSAP, Lenis Scroll, and modern CSS animations."
<div align="center">
  <br />
    <a href="https://github.com/AshishKFrontend/The-Architect-Cinematic-Web">
      <img src="https://via.placeholder.com/1200x600/050505/ffffff?text=THE+ARCHITECT+-+Cinematic+Experience" alt="Project Banner">
    </a>
  <br />

  <h1 align="center">THE ARCHITECT - Dr. B.R. Ambedkar</h1>

  <p align="center">
    A cinematic web journey through the drafting of the Indian Constitution (1950).<br>
    <b>Justice • Liberty • Equality • Fraternity</b>
  </p>
  
  <p align="center">
    <img src="https://img.shields.io/badge/Made%20With-GSAP%203-green?style=for-the-badge&logo=greensock" alt="GSAP">
    <img src="https://img.shields.io/badge/Scroll-Lenis-red?style=for-the-badge" alt="Lenis">
    <img src="https://img.shields.io/badge/Design-Responsive-blue?style=for-the-badge&logo=css3" alt="CSS">
    <img src="https://img.shields.io/badge/Status-Completed-success?style=for-the-badge" alt="Status">
  </p>

  <h3>
      <a href="YOUR_LIVE_DEMO_LINK_HERE">Live Demo ↗</a>
      <span> | </span>
      <a href="https://github.com/AshishKFrontend/The-Architect-Cinematic-Web/issues">Report Bug</a>
  </h3>
</div>

<hr />

## 💡 About The Project

**The Architect** represents a fusion of history and modern creative web engineering. This is not just a static tribute page; it is an **interactive digital narrative** designed to evoke emotion through motion, sound, and typography.

The project leverages **Hardware Accelerated Animations** to ensure 60FPS performance even with complex layout transitions.

### ✨ Technical Highlights

- **🎭 GSAP Choreography:** Complex sequencing using `gsap.timeline()` for the preloader and hero reveal.
- **⚡ Lenis Inertia Scroll:** Implemented the `Lenis` library for a buttery-smooth scrolling experience that syncs perfectly with `ScrollTrigger`.
- **🖱️ Reactive Cursor System:** A custom glassmorphism cursor written in vanilla JS that uses linear interpolation (lerp) for magnetic effects on hoverable elements.
- **🔊 State-Managed Audio:** Background ambient score with a dedicated state management logic for play/pause and UI sync.
- **📱 Adaptive Layout Engine:** The JS creates different animation timelines based on `gsap.matchMedia()` to ensure mobile and desktop experiences are unique yet cohesive.

---

## 🛠️ Built With

The project does not rely on heavy frameworks like React; instead, it pushes the limits of **Vanilla JavaScript** and **CSS3**.

* ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white) **Semantic Markup**
* ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white) **CSS Variables & Glassmorphism**
* ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black) **ES6+ Modules**
* ![GSAP](https://img.shields.io/badge/GreenSock-88CE02?style=flat&logo=greensock&logoColor=white) **Animation Engine**

---

## 📂 Repository Structure

A look at the organized file structure for developers.

```text
The-Architect/
├── 📄 index.html          # Semantic Entry Point
├── 🎨 style.css           # Global Design System (:root vars)
├── 🧠 script.js           # Core Logic (Audio, GSAP, Cursor)
├── 📂 assets/
│   ├── 🎵 bg-music.mp3    # Ambient Score
│   ├── 🖼️ p1.png          # Hero Assets
│   └── ...
└── 📝 README.md           # Documentation
