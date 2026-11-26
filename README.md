# Amanpreet Singh | Portfolio Architecture

An information-dense digital portfolio built with semantic HTML5, modern CSS3 (Custom Properties & Grid), and Vanilla ES6+ JavaScript, without heavy SPA frontend frameworks (such as React or Vue) or bundler pipelines.

The design language is brutalist, rectilinear, and strictly avoids decorative purple gradients, pill buttons, and scroll-jacking.

---

## Architectural Principles

### 1. Framework-Free UI Structure
The user interface avoids virtual DOM diffing engines and runtime component wrappers. Layouts use native CSS Grid and Flexbox for immediate rendering and low memory overhead.

### 2. Purposeful Motion Choreography (GSAP & Anime.js)
Motion libraries are used strictly for entrance choreography:
* **Anime.js:** Drives staggered navigation arrivals and header reveals during initial page load (`easeOutQuad` and `easeOutCubic`).
* **GSAP & ScrollTrigger (`ScrollScatterEngine`):** Animates spatial card entrances using `force3D: true` (`translate3d`) and `power3.out` curves.
* **Clean Post-Tween State:** `clearProps: 'transform,opacity'` removes inline styles after completion.
* **Accessibility:** Honors `prefers-reduced-motion: reduce`, bypassing motion when static presentation is requested.

### 3. Native Scroll Integrity vs. Anti-Gravity Canvas
Viewport scrolling remains 100% native and unmodified. The **Anti-Gravity Engine** runs independently on a background `<canvas>`:
* **Isolated HTML5 Canvas Simulation:** Computes 2D particle dynamics from classical mechanics without external physics libraries:
  * **Coulomb Repulsion:** Pointer interactions apply an inverse-square repulsion field ($F_e = \frac{k_e}{r^2 + \epsilon}$) with a softening parameter ($\epsilon = 256.0$) to avoid division-by-zero singularities.
  * **Hooke's Law Spring Restoration:** Nodes return toward floating lattice anchors via linear elastic springs ($F_s = -k_s \cdot \Delta x$).
  * **Euler-Cromer Numerical Integration:** Updates follow symplectic Euler-Cromer steps ($v_{t+\Delta t} = (v_t + a \cdot \Delta t) \cdot \gamma$, $x_{t+\Delta t} = x_t + v_{t+\Delta t} \cdot \Delta t$).
  * **Kinematic Boundaries:** Soft deceleration margins (`24px`) and elastic restitution ($e = 0.78$) contain nodes cleanly within the canvas.
* **Lifecycle Management:** An `IntersectionObserver` pauses the `requestAnimationFrame` loop when the hero canvas leaves the viewport.

### 4. Local State & Multi-Page Partitioning
* Persists theme selection via the Web Storage API (`localStorage`).
* Cleanly separates `Index`, `Work`, `System`, `Contact`, `Privacy`, and `Terms` across static HTML documents.

---

## Technical Stack Breakdown

| Layer | Implementation | Purpose |
| :--- | :--- | :--- |
| **Document Structure** | Semantic HTML5 | Accessible, static multi-page markup |
| **Styling & Layout** | CSS3 (Variables, Grid, Flexbox) | High-contrast rectilinear design system |
| **Application Logic** | Vanilla JavaScript (ES6+) | Theme persistence, routing state, `TextScramble` |
| **Physics Simulation** | HTML5 Canvas 2D API | Custom 2D particle simulation (Euler-Cromer integration) |
| **Motion Choreography** | GSAP 3 + Anime.js | Entrance vectors and micro-stagger reveals |

---

## Local Development & Deployment

The codebase requires zero build tooling, zero Node.js dependencies, and zero transpilation steps.

```bash
# Clone the repository
git clone https://github.com/Amanpreet6656/My-Portfolio.git
cd My-Portfolio

# Serve locally via Python 3's built-in HTTP server
python3 -m http.server 8000
```

Alternatively, open `index.html` directly in any modern web browser.

---

## License

Copyright (c) 2026 Amanpreet Singh. All rights reserved. Source code is provided for portfolio, demonstration, and academic/technical review purposes only. See [LICENSE](LICENSE) and [terms.html](terms.html) for details.
