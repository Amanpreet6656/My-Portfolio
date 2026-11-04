/**
 * Amanpreet Singh | Portfolio Application Engine
 *
 * Core subsystems:
 * - ThemeController: Dark/light mode persistence via localStorage
 * - NavigationController: Active route tracking and mobile overlay
 * - TextScramble: Character-by-character glyph decode reveal
 * - AntiGravityCanvas: Coulomb repulsion, Hooke springs, and elastic boundary collision
 * - ScrollScatterEngine: Randomized multi-directional spatial vectors via GSAP power3.out
 * - PageLoadChoreography: Entrance coordination
 */

'use strict';

// Theme controller: dark/light mode state and persistence
const ThemeController = (() => {
  const STORAGE_KEY = 'portfolio-theme-v6';

  function init() {
    const saved = localStorage.getItem(STORAGE_KEY);
    const theme = saved || 'dark';
    applyTheme(theme);

    const btn = document.getElementById('theme-toggle');
    if (btn) {
      btn.addEventListener('click', toggle);
    }
  }

  function toggle() {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem(STORAGE_KEY, next);

    const btn = document.getElementById('theme-toggle');
    if (btn) {
      btn.style.borderColor = 'var(--accent)';
      setTimeout(() => {
        btn.style.borderColor = '';
      }, 180);
    }
  }

  function applyTheme(theme) {
    if (document.body.dataset.page === 'legal') return;

    document.documentElement.setAttribute('data-theme', theme);
    const label = document.getElementById('theme-label');
    if (label) {
      label.textContent = theme === 'dark' ? 'LIGHT' : 'DARK';
    }
  }

  return { init };
})();

// Navigation controller: active route tracking and mobile overlay
const NavigationController = (() => {
  function init() {
    const menuBtn = document.getElementById('nav-menu-toggle');
    const overlay = document.getElementById('mobile-nav-overlay');

    if (menuBtn && overlay) {
      menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = overlay.classList.contains('active') ? 'hidden' : '';
      });

      overlay.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => {
          menuBtn.classList.remove('active');
          overlay.classList.remove('active');
          document.body.style.overflow = '';
        });
      });
    }

    // Determine current active navigation route
    const rawPath = window.location.pathname.split('/').pop() || 'index.html';
    const currentPath = (rawPath === '' || rawPath === '/') ? 'index.html' : rawPath;

    document.querySelectorAll('.nav-link').forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPath) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  return { init };
})();

// Text scramble reveal engine: character-by-character decode animation
class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = '!<>-_/[]{}~=+*^?#_0123456789ABCDEF';
    this.update = this.update.bind(this);
  }

  setText(newText) {
    const oldText = this.el.innerText || '';
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise((resolve) => this.resolve = resolve);
    this.queue = [];

    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 15);
      const end = start + Math.floor(Math.random() * 15) + 8;
      this.queue.push({ from, to, start, end, char: '' });
    }

    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }

  update() {
    let output = '';
    let complete = 0;

    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];

      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.3) {
          char = this.chars[Math.floor(Math.random() * this.chars.length)];
          this.queue[i].char = char;
        }
        output += `<span class="scramble-char">${char}</span>`;
      } else {
        output += from;
      }
    }

    this.el.innerHTML = output;

    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }
}

// Anti-gravity canvas physics engine: Coulomb repulsion, Hooke springs, and boundary collisions
const AntiGravityCanvas = (() => {
  const COULOMB_K = 6500;         // Electrostatic repulsion constant (k_e)
  const SPRING_K = 0.032;         // Hooke's spring stiffness (k_s)
  const DAMPING = 0.91;           // Kinematic damping factor
  const MOUSE_RADIUS = 210;       // Interaction threshold radius (px)
  const RESTITUTION = 0.78;       // Boundary elastic bounce restitution
  const CONNECTION_RADIUS = 135;  // Proximity edge threshold (px)
  const NODE_SIZE = 3.5;          // Half-width of square node (px)
  const SOFT_MARGIN = 24;         // Buffer zone for soft boundary braking
  const FLOAT_AMP = 3.5;          // Amplitude of ambient zero-gravity orbital float (px)
  const FLOAT_SPEED = 0.0016;     // Angular velocity for smooth ambient drift loop

  let canvas, ctx;
  let nodes = [];
  let mouseX = -9999;
  let mouseY = -9999;
  let mouseActive = false;
  let animFrameId = null;
  let currentTheme = 'dark';
  let resizeTimeout = null;
  let isRunning = false;
  let simTime = 0;

  function createNodes() {
    nodes = [];
    const w = canvas.width;
    const h = canvas.height;
    if (w <= 0 || h <= 0) return;

    const spacing = Math.max(70, Math.min(100, Math.sqrt((w * h) / 130)));
    const margin = 40;

    const startX = margin;
    const endX = w - margin;
    const startY = margin;
    const endY = h - margin;

    for (let x = startX; x <= endX; x += spacing) {
      for (let y = startY; y <= endY; y += spacing) {
        const anchorX = Math.max(margin, Math.min(endX, x + (Math.random() - 0.5) * (spacing * 0.45)));
        const anchorY = Math.max(margin, Math.min(endY, y + (Math.random() - 0.5) * (spacing * 0.45)));

        nodes.push({
          x: anchorX,
          y: anchorY,
          anchorX: anchorX,
          anchorY: anchorY,
          vx: 0,
          vy: 0,
          mass: 1.0 + Math.random() * 0.3
        });
      }
    }
  }

  function resetPointer() {
    mouseActive = false;
    mouseX = -9999;
    mouseY = -9999;
  }

  function init() {
    canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    ctx = canvas.getContext('2d');
    resizeImmediate();

    // Window resize & orientation change handlers
    window.addEventListener('resize', onWindowResize);
    window.addEventListener('orientationchange', () => {
      setTimeout(resizeImmediate, 100);
    });

    // Mouse Tracking with bounded active detection
    window.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      // Interaction window matches canvas viewport coordinates with safety buffer
      const inBounds = (
        e.clientX >= rect.left - 40 &&
        e.clientX <= rect.right + 40 &&
        e.clientY >= rect.top - 40 &&
        e.clientY <= rect.bottom + 40
      );

      if (inBounds) {
        mouseX = (e.clientX - rect.left) * dpr;
        mouseY = (e.clientY - rect.top) * dpr;
        mouseActive = true;
      } else {
        resetPointer();
      }
    });

    // Window blur & document leave: reset pointer coordinates immediately
    // to prevent stuck repulsion fields from ghost pointer coordinates
    document.addEventListener('mouseleave', resetPointer);
    window.addEventListener('blur', resetPointer);
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        resetPointer();
      }
    });

    // Touch Handling for Mobile devices
    canvas.addEventListener('touchstart', (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        mouseX = (touch.clientX - rect.left) * dpr;
        mouseY = (touch.clientY - rect.top) * dpr;
        mouseActive = true;
      }
    }, { passive: true });

    canvas.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        mouseX = (touch.clientX - rect.left) * dpr;
        mouseY = (touch.clientY - rect.top) * dpr;
        mouseActive = true;
      }
    }, { passive: true });

    // Touch release listeners attached to window to catch finger lift-off outside canvas
    window.addEventListener('touchend', resetPointer);
    window.addEventListener('touchcancel', resetPointer);

    // Theme Mutation Observer
    const observer = new MutationObserver(() => {
      currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';

    // IntersectionObserver halts simulation loop when hero canvas scrolls out of view,
    // conserving CPU cycles and preventing uncleaned frame execution
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            startLoop();
          } else {
            resetPointer();
            stopLoop();
          }
        });
      }, { threshold: 0.05 });
      io.observe(canvas);
    } else {
      startLoop();
    }
  }

  function startLoop() {
    if (!isRunning) {
      isRunning = true;
      if (animFrameId) cancelAnimationFrame(animFrameId);
      animFrameId = requestAnimationFrame(tick);
    }
  }

  function stopLoop() {
    isRunning = false;
    if (animFrameId) {
      cancelAnimationFrame(animFrameId);
      animFrameId = null;
    }
  }

  /**
   * Sets canvas resolution to exact device pixels and scales existing
   * coordinates proportionally so nodes never stretch or distort.
   */
  function resizeImmediate() {
    if (!canvas || !canvas.parentElement) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.parentElement.getBoundingClientRect();

    const newWidth = Math.floor(rect.width * dpr);
    const newHeight = Math.floor(rect.height * dpr);

    if (newWidth <= 0 || newHeight <= 0) return;
    if (canvas.width === newWidth && canvas.height === newHeight) return;

    const oldWidth = canvas.width;
    const oldHeight = canvas.height;

    canvas.width = newWidth;
    canvas.height = newHeight;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';

    if (nodes.length === 0 || oldWidth <= 0 || oldHeight <= 0) {
      createNodes();
    } else {
      const scaleX = newWidth / oldWidth;
      const scaleY = newHeight / oldHeight;
      const rMin = NODE_SIZE;

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        node.anchorX = Math.max(30, Math.min(newWidth - 30, node.anchorX * scaleX));
        node.anchorY = Math.max(30, Math.min(newHeight - 30, node.anchorY * scaleY));
        node.x = Math.max(rMin, Math.min(newWidth - rMin, node.x * scaleX));
        node.y = Math.max(rMin, Math.min(newHeight - rMin, node.y * scaleY));
        node.vx = 0;
        node.vy = 0;
      }
    }
  }

  function onWindowResize() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      resizeImmediate();
    }, 60);
  }

  function simulate() {
    const w = canvas.width;
    const h = canvas.height;
    const dt = 1.0;
    const rMin = NODE_SIZE;
    simTime += 1.0;

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      let fx = 0;
      let fy = 0;

      // Ambient harmonic zero-gravity drift loop: keeps particles continuously in motion,
      // preventing the grid from freezing into a dead static state when idle.
      const phase = (node.anchorX * 0.011) + (node.anchorY * 0.013);
      const floatTargetX = node.anchorX + Math.sin(simTime * FLOAT_SPEED + phase) * FLOAT_AMP;
      const floatTargetY = node.anchorY + Math.cos(simTime * (FLOAT_SPEED * 0.85) + phase) * FLOAT_AMP;

      // 1. Hooke's Elastic Spring Restoration to dynamic floating anchor
      fx += -SPRING_K * (node.x - floatTargetX);
      fy += -SPRING_K * (node.y - floatTargetY);

      // 2. Coulomb Anti-Gravity Repulsion from Pointer
      if (mouseActive) {
        const dx = node.x - mouseX;
        const dy = node.y - mouseY;
        const distSq = dx * dx + dy * dy;
        const threshSq = MOUSE_RADIUS * MOUSE_RADIUS;

        if (distSq < threshSq) {
          // Softened gravitational potential eliminates singularity at distSq = 0
          const softenedDistSq = distSq + 256.0;
          const dist = Math.sqrt(softenedDistSq);
          const forceMag = COULOMB_K / softenedDistSq;
          fx += (dx / dist) * forceMag;
          fy += (dy / dist) * forceMag;
        }
      }

      // 3. Soft Boundary Deceleration Buffer
      if (node.x < SOFT_MARGIN) {
        fx += (SOFT_MARGIN - node.x) * 0.14;
      } else if (node.x > w - SOFT_MARGIN) {
        fx -= (node.x - (w - SOFT_MARGIN)) * 0.14;
      }

      if (node.y < SOFT_MARGIN) {
        fy += (SOFT_MARGIN - node.y) * 0.14;
      } else if (node.y > h - SOFT_MARGIN) {
        fy -= (node.y - (h - SOFT_MARGIN)) * 0.14;
      }

      // 4. Numerical Integration (Euler-Cromer)
      const ax = fx / node.mass;
      const ay = fy / node.mass;

      node.vx = (node.vx + ax * dt) * DAMPING;
      node.vy = (node.vy + ay * dt) * DAMPING;

      node.x += node.vx * dt;
      node.y += node.vy * dt;

      // 5. Elastic boundary bounce with separation impulse to prevent sticky wall trapping
      if (node.x < rMin) {
        node.x = rMin;
        node.vx = Math.max(Math.abs(node.vx) * RESTITUTION, 0.4);
      } else if (node.x > w - rMin) {
        node.x = w - rMin;
        node.vx = -Math.max(Math.abs(node.vx) * RESTITUTION, 0.4);
      }

      if (node.y < rMin) {
        node.y = rMin;
        node.vy = Math.max(Math.abs(node.vy) * RESTITUTION, 0.4);
      } else if (node.y > h - rMin) {
        node.y = h - rMin;
        node.vy = -Math.max(Math.abs(node.vy) * RESTITUTION, 0.4);
      }
    }
  }

  function render() {
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    const connRadSq = CONNECTION_RADIUS * CONNECTION_RADIUS;

    // Draw Spring Connection Edges
    ctx.lineWidth = 1;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const distSq = dx * dx + dy * dy;

        if (distSq < connRadSq) {
          const dist = Math.sqrt(distSq);
          const alpha = (1.0 - dist / CONNECTION_RADIUS);

          if (currentTheme === 'dark') {
            ctx.strokeStyle = `rgba(250, 250, 250, ${alpha * 0.08})`;
          } else {
            ctx.strokeStyle = `rgba(17, 17, 17, ${alpha * 0.06})`;
          }

          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }

    // Draw Geometric Square Nodes (Strict 90-degree corners, zero stretching)
    if (currentTheme === 'dark') {
      ctx.fillStyle = 'rgba(250, 250, 250, 0.35)';
    } else {
      ctx.fillStyle = 'rgba(17, 17, 17, 0.28)';
    }

    const s = NODE_SIZE;
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      ctx.fillRect(node.x - s, node.y - s, s * 2, s * 2);
    }
  }

  function tick() {
    if (!isRunning) return;
    simulate();
    render();
    animFrameId = requestAnimationFrame(tick);
  }

  return { init, resizeImmediate, resetPointer, stopLoop };
})();

// Scroll scatter engine: multi-directional entrance vectors via GSAP power3.out
const ScrollScatterEngine = (() => {
  function isAboveTheFold(el) {
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    const vpHeight = window.innerHeight || document.documentElement.clientHeight;
    return rect.top < vpHeight;
  }

  /**
   * Generates a constrained directional entrance vector for each card.
   * Displaces elements within a controlled 60px - 110px range to prevent
   * mobile viewport overflow while preserving the dynamic spatial snap.
   */
  function getRandomVector() {
    const angle = Math.random() * Math.PI * 2;
    const distance = 60 + Math.random() * 50; // 60px - 110px displacement
    return {
      x: Math.round(Math.cos(angle) * distance),
      y: Math.round(Math.sin(angle) * distance * 0.75 + 15) // Subtle bottom bias
    };
  }

  function init() {
    // Accessibility check: immediately expose all content if user requested reduced motion
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('.scatter-item, .scatter-text').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }

    if (typeof gsap === 'undefined') {
      document.querySelectorAll('.scatter-item, .scatter-text').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }

    const hasScrollTrigger = typeof ScrollTrigger !== 'undefined';
    if (hasScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
    }

    // 1. Process Grid Container Sections (.scatter-section)
    document.querySelectorAll('.scatter-section').forEach(section => {
      const items = Array.from(section.querySelectorAll('.scatter-item'));
      if (items.length === 0) return;

      const aboveFold = isAboveTheFold(section);

      if (aboveFold || !hasScrollTrigger) {
        // ABOVE THE FOLD: Animate immediately from random directions
        gsap.fromTo(items,
          {
            x: () => getRandomVector().x,
            y: () => getRandomVector().y,
            opacity: 0
          },
          {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 0.75,
            stagger: 0.05, // Precise 0.05s stagger constraint
            ease: 'power3.out', // Smooth power3.out snap without stutter
            force3D: true, // Hardware-accelerated translate3d
            overwrite: 'auto', // Cleanly reconcile any competing or duplicate tweens
            clearProps: 'transform,opacity',
            onComplete: () => {
              // Ensure all inline styles are completely purged when entrance animation finishes
              gsap.set(items, { clearProps: 'transform,opacity', opacity: 1, x: 0, y: 0 });
            }
          }
        );
      } else {
        // BELOW THE FOLD: Trigger once when entering viewport
        gsap.fromTo(items,
          {
            x: () => getRandomVector().x,
            y: () => getRandomVector().y,
            opacity: 0
          },
          {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 0.75,
            stagger: 0.05,
            ease: 'power3.out',
            force3D: true,
            overwrite: 'auto',
            clearProps: 'transform,opacity',
            onComplete: () => {
              gsap.set(items, { clearProps: 'transform,opacity', opacity: 1, x: 0, y: 0 });
            },
            scrollTrigger: {
              trigger: section,
              start: 'top 88%',
              once: true, // Execute once: continuous smooth motion without stick
              toggleActions: 'play none none none'
            }
          }
        );
      }
    });

    // 2. Process Text Blocks and Technical Descriptions (.scatter-text)
    // Exclude any element that already possesses .scatter-item to avoid conflicting dual GSAP tweens
    const textBlocks = Array.from(document.querySelectorAll('.scatter-text')).filter(
      block => !block.classList.contains('scatter-item')
    );

    textBlocks.forEach(block => {
      const aboveFold = isAboveTheFold(block);

      if (aboveFold || !hasScrollTrigger) {
        gsap.fromTo(block,
          {
            y: 30,
            opacity: 0
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.60,
            ease: 'power3.out',
            force3D: true,
            overwrite: 'auto',
            clearProps: 'transform,opacity',
            onComplete: () => {
              gsap.set(block, { clearProps: 'transform,opacity', opacity: 1, y: 0 });
            }
          }
        );
      } else {
        gsap.fromTo(block,
          {
            y: 30,
            opacity: 0
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.60,
            ease: 'power3.out',
            force3D: true,
            overwrite: 'auto',
            clearProps: 'transform,opacity',
            onComplete: () => {
              gsap.set(block, { clearProps: 'transform,opacity', opacity: 1, y: 0 });
            },
            scrollTrigger: {
              trigger: block,
              start: 'top 92%',
              once: true,
              toggleActions: 'play none none none'
            }
          }
        );
      }
    });

    // Refresh ScrollTrigger once fonts and layout finalize
    if (hasScrollTrigger) {
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => {
          ScrollTrigger.refresh();
        });
      }
      window.addEventListener('load', () => {
        ScrollTrigger.refresh();
      });
    }
  }

  return { init };
})();

// Page load choreography and text scramble initialization
const PageLoadChoreography = (() => {
  function init() {
    // 1. Initialize High-Tech Text Scramble on H1 Headers
    const mainHeader = document.querySelector('.hero-title, .page-header-title');
    if (mainHeader) {
      const originalText = mainHeader.innerText.trim();
      const scrambler = new TextScramble(mainHeader);
      // Brief delay to synchronize with page entrance
      setTimeout(() => {
        scrambler.setText(originalText);
      }, 120);
    }

    // 2. Anime.js Global Navigation Entrance
    if (typeof anime !== 'undefined') {
      anime({
        targets: '.nav-brand',
        opacity: [0, 1],
        translateY: [-10, 0],
        duration: 260,
        easing: 'easeOutQuad',
        delay: 30
      });

      anime({
        targets: '.nav-link',
        opacity: [0, 1],
        translateY: [-10, 0],
        delay: anime.stagger(40, { start: 80 }),
        duration: 220,
        easing: 'easeOutQuad'
      });

      anime({
        targets: '.btn-theme',
        opacity: [0, 1],
        duration: 240,
        easing: 'easeOutQuad',
        delay: 200
      });

      const page = document.body.dataset.page;

      if (page === 'index') {
        anime({
          targets: '.hero-role',
          opacity: [0, 1],
          translateY: [20, 0],
          duration: 400,
          easing: 'easeOutCubic',
          delay: 260
        });

        anime({
          targets: '.hero-sub',
          opacity: [0, 1],
          translateY: [16, 0],
          duration: 360,
          easing: 'easeOutCubic',
          delay: 360
        });

        anime({
          targets: '.hero-actions',
          opacity: [0, 1],
          translateY: [14, 0],
          duration: 340,
          easing: 'easeOutCubic',
          delay: 440
        });
      } else if (page !== 'legal') {
        anime({
          targets: '.page-header-sub',
          opacity: [0, 1],
          translateY: [12, 0],
          duration: 340,
          easing: 'easeOutQuad',
          delay: 240
        });
      }
    }
  }

  return { init };
})();

// Runtime bootstrap
document.addEventListener('DOMContentLoaded', () => {
  ThemeController.init();
  NavigationController.init();
  PageLoadChoreography.init();

  const page = document.body.dataset.page;

  if (page === 'index') {
    AntiGravityCanvas.init();
  }

  if (page !== 'legal') {
    ScrollScatterEngine.init();
  }
});
