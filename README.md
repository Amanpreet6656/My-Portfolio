# Amanpreet Singh | Portfolio Architecture

An information-dense, high-performance digital portfolio engineered from systems-level principles. Instead of relying on bloated JavaScript frontend frameworks (such as React, Vue, or heavy UI abstraction layers) or complex bundler pipelines, this platform is engineered directly against native web primitives—semantic HTML5, modern CSS3 (Custom Properties & Grid), and vanilla ES6+ JavaScript.

The design language is intentionally brutalist, deterministic, and information-dense. It strictly rejects modern web bloat: no arbitrary runtime component abstractions, no decorative purple gradients, no rounded pill containers, and—critically—**zero scroll-jacking**.

---

## Architectural Principles

### 1. Framework-Free UI Architecture
The user interface is completely free of virtual DOM diffing engines, runtime component wrappers, and synthetic event pipelines. Layouts are constructed strictly with native CSS Grid and Flexbox, yielding instant First Contentful Paint (FCP), sub-millisecond layout calculations, and predictable garbage collection cycles with zero framework overhead.

### 2. Purposeful Motion Choreography (GSAP & Anime.js)
While the UI rejects bulky client-side frameworks, high-performance motion libraries are deliberately utilized strictly for hardware-accelerated, high-performance entrance choreography:
* **Anime.js:** Orchestrates micro-staggered navigation arrivals and header reveals during initial page transitions with mathematically tuned ease curves (`easeOutQuad` and `easeOutCubic`).
* **GSAP & ScrollTrigger (`ScrollScatterEngine`):** Drives multi-directional spatial vector entrances as content enters the viewport. Displacements are calculated along constrained trajectory angles, composited on dedicated GPU layers via `force3D: true` (`translate3d`), and smoothed through `power3.out` velocity curves.
* **Zero Residual Style Pollution:** Upon tween completion, `clearProps: 'transform,opacity'` completely purges inline styling attributes, returning elements to pure, native CSS box-model control.
* **Accessibility Enforced:** The choreography engine actively queries `prefers-reduced-motion: reduce` at runtime; animations are immediately bypassed for users requesting static presentation.

### 3. Native Scroll Integrity vs. Anti-Gravity Canvas
A foundational tenet of this brutalist architecture is **uncompromised native scroll behavior**. Viewport scrolling is never hijacked, throttled, momentum-smoothed, or trapped by synthetic wheel interceptors. The browser compositor retains 100% unimpeded control over native document flow.

The **Anti-Gravity Engine** is entirely separate from document scrolling:
* **Isolated HTML5 Canvas Simulation:** Rather than manipulating DOM nodes or intercepting scroll deltas, the engine operates on a standalone, hardware-accelerated `<canvas>` context positioned beneath hero elements.
* **Mathematical First Principles:** The simulation computes particle dynamics from classical mechanics without external physics engines:
  * **Coulomb Electrostatic Repulsion:** Pointer and touch interactions generate an inverse-square electrostatic repulsion field ($F_e = \frac{k_e}{r^2 + \epsilon}$) with a softening parameter ($\epsilon = 256.0$) to eliminate coordinate singularities as distance approaches zero.
  * **Hooke's Law Spring Restoration:** Nodes are tethered to dynamic lattice coordinates via linear elastic springs ($F_s = -k_s \cdot \Delta x$), continuously counterbalanced by low-frequency harmonic zero-gravity drift.
  * **Euler-Cromer Numerical Integration:** State updates follow a symplectic Euler-Cromer integration scheme ($v_{t+\Delta t} = (v_t + a \cdot \Delta t) \cdot \gamma$, $x_{t+\Delta t} = x_t + v_{t+\Delta t} \cdot \Delta t$), ensuring energy stability and preventing velocity drift across variable refresh rates.
  * **Kinematic Boundaries:** Soft deceleration margins ($24\text{px}$) and elastic boundary restitution ($e = 0.78$) with separation impulse prevent particles from escaping or sticking to viewport boundaries.
* **Hardware Lifecycle Management:** An `IntersectionObserver` halts the `requestAnimationFrame` tick loop the instant the canvas leaves the viewport, conserving CPU and GPU cycles when off-screen.

### 4. Offline-First & Deterministic Telemetry
Engineered to operate with absolute stability under constrained or severed network conditions:
* Direct integration with the Web Storage API for state persistence (dark/light theme memory).
* Strict asset hygiene and semantic document partitioning ensure sub-second Time-to-Interactive (TTI) across global edge networks.
* Segmented view routing (`Index`, `Work`, `System`, `Contact`) cleanly isolates technical case studies, systems architecture breakdowns, and direct communication channels.

---

## Technical Stack Breakdown

| Layer | Implementation | Purpose |
| :--- | :--- | :--- |
| **Document Structure** | Semantic HTML5 | Accessible, machine-readable DOM with zero hydration penalty |
| **Styling & Layout** | CSS3 (Variables, Grid, Flexbox) | High-contrast brutalist design, deterministic typography, zero utility bloat |
| **Application Logic** | Vanilla JavaScript (ES6+) | Theme persistence, route telemetry, glyph decoding (`TextScramble`) |
| **Physics Simulation** | HTML5 Canvas 2D API | Custom N-body spatial simulation, Euler-Cromer integration, Coulomb field |
| **Motion Choreography** | GSAP 3 + Anime.js | GPU-accelerated entrance vectors, micro-staggers, clean post-tween DOM state |

---

## Local Development & Deployment

The codebase requires zero build tooling, zero Node.js dependencies, and zero transpilation steps. It executes natively in any standard modern web browser.

```bash
# Clone the repository
git clone https://github.com/Amanpreet6656/My-Portfolio.git
cd My-Portfolio

# Serve locally via Python 3's built-in HTTP server
python3 -m http.server 8000
```

Alternatively, open `index.html` directly in any standards-compliant browser.

---

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
