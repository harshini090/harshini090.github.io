// ============================================
// PREMIUM MINIMAL PORTFOLIO - JavaScript
// Sophisticated animations and interactions
// ============================================

// ========== Intersection Observer Setup ==========
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -10% 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      fadeInObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all animatable elements
const initScrollAnimations = () => {
  const elements = document.querySelectorAll(
    '.section-header, .project-card, .timeline-item, .credentials-group'
  );
  
  elements.forEach(el => {
    fadeInObserver.observe(el);
  });
};

// ========== Project Filtering ==========
const setupProjectFilter = () => {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Update active state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Filter projects with stagger effect
      projectCards.forEach((card, index) => {
        const categories = card.dataset.category.split(' ');
        const shouldShow = filter === 'all' || categories.includes(filter);

        if (shouldShow) {
          card.style.display = 'grid';
          // Reset and re-trigger animation
          card.classList.remove('in-view');
          setTimeout(() => {
            card.classList.add('in-view');
          }, index * 100);
        } else {
          card.classList.remove('in-view');
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
};

// ========== Theme Toggle with Image Switching ==========
const setupThemeToggle = () => {
  const themeToggle = document.querySelector('.theme-toggle');
  
  if (!themeToggle) return;
  
  // Check for saved theme preference or default to system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'light' || (!savedTheme && !systemPrefersDark)) {
    document.body.classList.add('light-mode');
    updateThemeImages('light');
  } else {
    updateThemeImages('dark');
  }
  
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    
    // Save preference
    const isLight = document.body.classList.contains('light-mode');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    
    // Update all theme-aware images
    updateThemeImages(isLight ? 'light' : 'dark');
  });
};

// ========== Update Theme Images ==========
const updateThemeImages = (theme) => {
  const themeIcons = document.querySelectorAll('.project-theme-icon');
  
  themeIcons.forEach(icon => {
    const darkSrc = icon.dataset.dark;
    const lightSrc = icon.dataset.light;
    
    if (theme === 'light' && lightSrc) {
      icon.src = lightSrc;
    } else if (theme === 'dark' && darkSrc) {
      icon.src = darkSrc;
    }
  });
};

// ========== Smooth Scroll ==========
const setupSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      
      if (targetId === '#') {
        e.preventDefault();
        return;
      }
      
      const target = document.querySelector(targetId);
      
      if (target) {
        e.preventDefault();
        const navHeight = 80;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
};

// ========== Parallax Effect ==========
const setupParallax = () => {
  const heroInner = document.querySelector('.hero-inner');
  
  if (!heroInner) return;
  
  let ticking = false;
  
  const updateParallax = () => {
    const scrolled = window.pageYOffset;
    const parallaxSpeed = 0.4;
    
    if (scrolled < window.innerHeight) {
      heroInner.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
      heroInner.style.opacity = 1 - (scrolled / window.innerHeight) * 0.6;
    }
    
    ticking = false;
  };
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });
};

// ========== Scroll Indicator Hide ==========
const setupScrollIndicator = () => {
  const scrollIndicator = document.querySelector('.scroll-indicator');
  
  if (!scrollIndicator) return;
  
  let ticking = false;
  
  const updateIndicator = () => {
    const scrolled = window.pageYOffset;
    
    if (scrolled > 200) {
      scrollIndicator.style.opacity = '0';
      scrollIndicator.style.pointerEvents = 'none';
    } else {
      scrollIndicator.style.opacity = '1';
      scrollIndicator.style.pointerEvents = 'auto';
    }
    
    ticking = false;
  };
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateIndicator);
      ticking = true;
    }
  }, { passive: true });
};

// ========== Enhanced Navigation Scroll Effect ==========
const setupNavScroll = () => {
  const nav = document.querySelector('.nav');
  let lastScroll = 0;
  let ticking = false;
  
  const updateNav = () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow on scroll
    if (currentScroll > 100) {
      nav.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.15)';
    } else {
      nav.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
    ticking = false;
  };
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateNav);
      ticking = true;
    }
  }, { passive: true });
};

// ========== Cursor Follow Effect (Subtle) ==========
const setupCursorEffect = () => {
  // Only on larger screens
  if (window.innerWidth < 768) return;
  
  const hero = document.querySelector('.hero');
  if (!hero) return;
  
  let mouseX = 0;
  let mouseY = 0;
  let currentX = 0;
  let currentY = 0;
  
  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    mouseX = (e.clientX - rect.left - rect.width / 2) / 50;
    mouseY = (e.clientY - rect.top - rect.height / 2) / 50;
  });
  
  const animateCursor = () => {
    currentX += (mouseX - currentX) * 0.1;
    currentY += (mouseY - currentY) * 0.1;
    
    const profileGlow = document.querySelector('.profile-glow');
    if (profileGlow) {
      profileGlow.style.transform = `translate(${currentX}px, ${currentY}px) scale(1.05)`;
    }
    
    requestAnimationFrame(animateCursor);
  };
  
  animateCursor();
};

// ========== Project Card Hover Effects ==========
const setupProjectHoverEffects = () => {
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    const visual = card.querySelector('.project-visual');
    
    card.addEventListener('mouseenter', () => {
      visual.style.transform = 'scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
      visual.style.transform = 'scale(1)';
    });
  });
};

// ========== Staggered Animation Delays ==========
const applyStaggeredDelays = () => {
  const projectCards = document.querySelectorAll('.project-card');
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  projectCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
  });
  
  timelineItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.1}s`;
  });
};

// ========== Keyboard Navigation Enhancement ==========
const setupKeyboardNav = () => {
  const filterBtns = document.querySelectorAll('.filter-btn');
  
  filterBtns.forEach((btn, index) => {
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        const nextBtn = filterBtns[index + 1] || filterBtns[0];
        nextBtn.focus();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const prevBtn = filterBtns[index - 1] || filterBtns[filterBtns.length - 1];
        prevBtn.focus();
      }
    });
  });
};

// ========== Enhanced Link Interactions ==========
const setupLinkEffects = () => {
  const links = document.querySelectorAll('.project-link, .contact-link, .cert-item');
  
  links.forEach(link => {
    link.addEventListener('mouseenter', function() {
      this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
  });
};

// ========== Lazy Loading Images ==========
const setupLazyLoading = () => {
  if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
      img.src = img.dataset.src || img.src;
    });
  } else {
    // Fallback for older browsers
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          imageObserver.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  }
};

// ========== Performance Optimization ==========
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

const throttle = (func, limit) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// ========== Window Resize Handler ==========
const setupResizeHandler = () => {
  const handleResize = debounce(() => {
    // Recalculate layouts if needed
    console.log('Window resized');
  }, 250);
  
  window.addEventListener('resize', handleResize);
};

// ========== Preload Critical Resources ==========
const preloadResources = () => {
  // Preload fonts
  const fontLinks = [
    'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500&display=swap',
    'https://fonts.googleapis.com/css2?family=General+Sans:wght@300;400;500;600&display=swap'
  ];
  
  fontLinks.forEach(href => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'style';
    link.href = href;
    document.head.appendChild(link);
  });
};

// ========== Accessibility Announcements ==========
const announceToScreenReader = (message) => {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', 'polite');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  document.body.appendChild(announcement);
  
  setTimeout(() => announcement.remove(), 1000);
};

// Add screen reader only utility class
const addA11yStyles = () => {
  const style = document.createElement('style');
  style.textContent = `
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border-width: 0;
    }
  `;
  document.head.appendChild(style);
};

// ========== Bee Tour Guide (Cinematic Edition) ==========
const setupBeeTour = () => {
  const tour     = document.getElementById('beeTour');
  if (!tour) return;
  if (localStorage.getItem('beeDismissed')) { tour.remove(); return; }

  const speech     = document.getElementById('beeSpeech');
  const speechText = document.getElementById('beeSpeechText');
  const btns       = document.getElementById('beeBtns');
  const btnYes     = document.getElementById('beeBtnYes');
  const btnNo      = document.getElementById('beeBtnNo');
  const skipBtn    = document.getElementById('beeSkip');
  const wrapper    = document.getElementById('beeWrapper');

  // Add depth shadow under bee
  const shadow = document.createElement('div');
  shadow.className = 'bee-shadow';
  wrapper.appendChild(shadow);

  // --- Current position (center of bee) ---
  let beeX = 0, beeY = 0;
  let flyRaf = null;
  let speechTimeout = null;
  let isTourActive = false;

  // --- Place bee at a screen coordinate (center) ---
  const placeBee = (x, y) => {
    beeX = x; beeY = y;
    tour.style.left = (x - 29) + 'px';
    tour.style.top  = (y - 31) + 'px';
    // Shadow dims/shrinks when bee is higher on screen
    const h = Math.max(0, Math.min(1, y / window.innerHeight));
    shadow.style.opacity = (0.1 + h * 0.35).toFixed(2);
    shadow.style.transform = `translateX(-50%) scaleX(${(0.45 + h * 0.55).toFixed(2)})`;
  };

  // --- Ease in-out (cubic) ---
  const easeInOut = t => t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2, 3)/2;

  // --- Wavy cinematic flight with 3D directional body rotation ---
  const flyTo = (tx, ty, duration, onDone) => {
    if (flyRaf) cancelAnimationFrame(flyRaf);
    const sx = beeX, sy = beeY;
    const dist = Math.hypot(tx - sx, ty - sy);
    if (dist < 2) { if (onDone) onDone(); return; }

    const dx = tx - sx, dy = ty - sy, len = dist;
    const px = -dy / len, py = dx / len;  // unit perpendicular

    const startTime = performance.now();

    const step = (now) => {
      const raw = Math.min(1, (now - startTime) / duration);
      const t   = easeInOut(raw);

      const waveAmp    = Math.min(55, dist * 0.22) * Math.sin(raw * Math.PI);
      const waveOffset = Math.sin(raw * Math.PI * 3.5) * waveAmp;

      const cx = sx + dx * t + px * waveOffset;
      const cy = sy + dy * t + py * waveOffset;
      placeBee(cx, cy);

      // 3D directional rotation — body banks and faces travel direction
      if (raw < 0.98) {
        const t2  = easeInOut(Math.min(1, raw + 0.04));
        const w2  = Math.min(55, dist * 0.22) * Math.sin(Math.min(1, raw + 0.04) * Math.PI);
        const wo2 = Math.sin(Math.min(1, raw + 0.04) * Math.PI * 3.5) * w2;
        const nx  = sx + dx * t2 + px * wo2;
        const ny  = sy + dy * t2 + py * wo2;

        const vx = nx - cx, vy = ny - cy;
        const vlen = Math.hypot(vx, vy) || 1;
        const vnx = vx / vlen, vny = vy / vlen;

        const rotY = -(vnx * 42);  // face left/right
        const rotX = vny * 22;     // pitch nose up/down
        const rotZ = vnx * 18;     // bank/lean into turn

        wrapper.style.transform = `rotateY(${rotY.toFixed(1)}deg) rotateX(${rotX.toFixed(1)}deg) rotateZ(${rotZ.toFixed(1)}deg) scale(1.05)`;
      }

      if (raw < 1) {
        flyRaf = requestAnimationFrame(step);
      } else {
        wrapper.style.transform = '';
        if (onDone) onDone();
      }
    };

    flyRaf = requestAnimationFrame(step);
  };

  // --- Speech bubble helpers ---
  const showBubble = (text, opts = {}) => {
    if (speechTimeout) clearTimeout(speechTimeout);
    speechText.innerHTML = text; // text is internal hardcoded strings only

    btns.style.display    = opts.showBtns  ? 'flex'  : 'none';
    skipBtn.style.display = opts.showSkip  ? 'block' : 'none';

    speech.classList.toggle('flip-right', beeX < window.innerWidth * 0.5);
    speech.classList.toggle('flip-down',  beeY < 120);
    speech.classList.add('visible');

    if (opts.autohide) {
      speechTimeout = setTimeout(hideBubble, opts.autohide);
    }
  };

  const hideBubble = () => speech.classList.remove('visible');

  const dismissBee = () => {
    hideBubble();
    if (flyRaf) cancelAnimationFrame(flyRaf);
    tour.classList.add('dismissed');
    localStorage.setItem('beeDismissed', '1');
    setTimeout(() => tour.remove(), 500);
  };

  // --- Corner rest position ---
  const cornerX = () => window.innerWidth  - 70;
  const cornerY = () => window.innerHeight - 70;

  const goRest = () => {
    flyTo(cornerX(), cornerY(), 1400, () => {
      tour.classList.add('resting');
      wrapper.classList.add('side-peek');
      showBubble("That's the tour! Click me to dismiss. *happy bee noises*", { showSkip: true, autohide: 6000 });
    });
  };

  // --- 3D zoom toward camera entrance ---
  const zoomToCamera = (onDone) => {
    const duration = 1800;
    const startTime = performance.now();
    wrapper.style.animation = 'none';

    const step = (now) => {
      const raw = Math.min(1, (now - startTime) / duration);
      const p = easeInOut(raw);

      const scale = 0.06 + p * 2.14;              // 0.06 → 2.2
      const rotY  = -15 * p;                       // 0 → -15deg (3/4 angle)
      const rotX  = 8 * Math.sin(p * Math.PI);    // gentle nose-arc on approach

      wrapper.style.transform = `scale(${scale.toFixed(3)}) rotateY(${rotY.toFixed(1)}deg) rotateX(${rotX.toFixed(1)}deg)`;

      if (raw < 1) {
        requestAnimationFrame(step);
      } else {
        wrapper.style.transform = '';
        wrapper.style.animation = '';
        wrapper.classList.add('camera-hover');
        if (onDone) onDone();
      }
    };

    requestAnimationFrame(step);
  };

  // --- Happy reaction on Yes ---
  const doYesReaction = (onDone) => {
    wrapper.classList.add('excited', 'fast-wings');
    setTimeout(() => {
      wrapper.classList.remove('excited', 'fast-wings');
      if (onDone) onDone();
    }, 1500);
  };

  // --- Pre-rotate body to face destination (lookAt equivalent in CSS 3D) ---
  const preRotateToward = (tx, ty, duration, onDone) => {
    const dx = tx - beeX, dy = ty - beeY;
    const dist = Math.hypot(dx, dy) || 1;
    const vnx = dx / dist, vny = dy / dist;

    // Target orientation angles — same formula as flyTo so transition is seamless
    const toRotY = -(vnx * 42);
    const toRotX = vny * 22;
    const toRotZ = vnx * 18;

    const startTime = performance.now();

    const step = (now) => {
      const raw = Math.min(1, (now - startTime) / duration);
      const p   = easeInOut(raw);

      wrapper.style.transform = `rotateY(${(toRotY * p).toFixed(1)}deg) rotateX(${(toRotX * p).toFixed(1)}deg) rotateZ(${(toRotZ * p).toFixed(1)}deg) scale(1.05)`;

      if (raw < 1) {
        requestAnimationFrame(step);
      } else {
        if (onDone) onDone();
      }
    };

    requestAnimationFrame(step);
  };

  // --- Launch: wings spin up → body turns to face target → fly ---
  const launchAndFly = (tx, ty, duration, onDone) => {
    wrapper.classList.add('launching', 'fast-wings');
    setTimeout(() => {
      wrapper.classList.remove('launching', 'fast-wings');
      // Turn to face destination first, then fly
      preRotateToward(tx, ty, 380, () => {
        flyTo(tx, ty, duration, onDone);
      });
    }, 500);
  };

  // --- Tour steps ---
  const scrollToSection = (selector) => {
    const el = document.querySelector(selector);
    if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' });
  };

  const runTour = () => {
    isTourActive = true;
    hideBubble();
    tour.classList.remove('resting');
    wrapper.classList.remove('side-peek', 'camera-hover');

    // Stop 1 — Work section
    const wx = window.innerWidth * 0.13, wy = window.innerHeight * 0.38;
    launchAndFly(wx, wy, 2000, () => {
      scrollToSection('#work');
      wrapper.classList.add('settling');
      setTimeout(() => wrapper.classList.remove('settling'), 700);
      showBubble("Bzzzt! Right HERE! These are her projects — ClaimSense is a whole AI backend she built. She's kind of a big deal! &#x1F525;", { showSkip: true, autohide: 5500 });
      setTimeout(() => {

        // Stop 2 — Experience
        const ex = window.innerWidth * 0.85, ey = window.innerHeight * 0.42;
        launchAndFly(ex, ey, 2400, () => {
          scrollToSection('#experience');
          wrapper.classList.add('settling');
          setTimeout(() => wrapper.classList.remove('settling'), 700);
          showBubble("Wooooosh! &#x2728; THIS is the experience section! AWS certified, internships, research — she did the thing!", { showSkip: true, autohide: 5500 });
          setTimeout(() => {

            // Stop 3 — Contact
            const cx = window.innerWidth * 0.5, cy = window.innerHeight * 0.35;
            launchAndFly(cx, cy, 2200, () => {
              scrollToSection('#contact');
              wrapper.classList.add('settling');
              setTimeout(() => wrapper.classList.remove('settling'), 700);
              showBubble("And HEREEE! &#x1F4EC; If you wanna hire her — don't be shy. She doesn't sting! ...probably.", { showSkip: true, autohide: 5500 });
              setTimeout(goRest, 5800);
            });
          }, 5700);
        });
      }, 5700);
    });
  };

  // --- Init: zoom toward camera, show prompt at large near-camera position ---
  placeBee(window.innerWidth * 0.62, window.innerHeight * 0.40);
  wrapper.style.transform = 'scale(0.06)';

  setTimeout(() => {
    tour.classList.add('visible');
    zoomToCamera(() => {
      showBubble("Hey! &#x1F44B; I'm Harshi-Bee! Want a quick tour of this portfolio?", { showBtns: true, showSkip: true });
    });
  }, 1000);

  // --- Button events ---
  btnYes.addEventListener('click', (e) => {
    e.stopPropagation();
    hideBubble();
    doYesReaction(() => runTour());
  });

  btnNo.addEventListener('click', (e) => {
    e.stopPropagation();
    hideBubble();
    wrapper.classList.remove('camera-hover');
    flyTo(cornerX(), cornerY(), 1300, () => {
      tour.classList.add('resting');
      wrapper.classList.add('side-peek');
      showBubble("No worries! I'll buzz around quietly. Click me to dismiss.", { showSkip: true, autohide: 4500 });
    });
  });

  skipBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    dismissBee();
  });

  wrapper.addEventListener('click', () => {
    if (!isTourActive || tour.classList.contains('resting')) {
      dismissBee();
    }
  });

  // Update corner on resize
  window.addEventListener('resize', () => {
    if (tour.classList.contains('resting') && !isTourActive) {
      placeBee(cornerX(), cornerY());
    }
  });
};

// ========== Initialize Everything ==========
const init = () => {
  // Wait for DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePortfolio);
  } else {
    initializePortfolio();
  }
};

const initializePortfolio = () => {
  console.log('🎨 Initializing premium portfolio...');
  
  // Core functionality
  initScrollAnimations();
  setupProjectFilter();
  setupThemeToggle();
  setupSmoothScroll();
  
  // Visual enhancements
  setupParallax();
  setupScrollIndicator();
  setupNavScroll();
  setupCursorEffect();
  setupProjectHoverEffects();
  
  // Layout & timing
  applyStaggeredDelays();
  
  // Accessibility & interaction
  setupKeyboardNav();
  setupLinkEffects();
  addA11yStyles();
  
  // Performance
  setupLazyLoading();
  setupResizeHandler();
  
  // Tour guide
  setupBeeTour();

  // Add loaded class for any additional transitions
  document.body.classList.add('loaded');
  
  console.log('✨ Portfolio initialized successfully!');
};

// ========== Start the Application ==========
init();

// ========== Export for Module Systems ==========
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    init,
    debounce,
    throttle,
    announceToScreenReader
  };
}