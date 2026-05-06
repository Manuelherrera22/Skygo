import './style.css';

document.addEventListener('DOMContentLoaded', () => {

  // ═══════════════════════════════════════
  // 1. CUSTOM CURSOR
  // ═══════════════════════════════════════
  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');

  if (dot && ring && window.innerWidth > 900) {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + 'px';
      dot.style.top = mouseY + 'px';
    });

    // Smooth ring follow
    function animateRing() {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.left = ringX + 'px';
      ring.style.top = ringY + 'px';
      requestAnimationFrame(animateRing);
    }
    animateRing();

    // Hover states
    const hoverTargets = document.querySelectorAll('a, button, .vert-card, .mem-card, .nav-cta');
    hoverTargets.forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }

  // ═══════════════════════════════════════
  // 2. SCROLL ANIMATIONS (IntersectionObserver)
  // ═══════════════════════════════════════
  const animElements = document.querySelectorAll('.anim-up');
  const animObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        animObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  animElements.forEach(el => animObserver.observe(el));

  // ═══════════════════════════════════════
  // 3. NAV SCROLL STATE
  // ═══════════════════════════════════════
  const nav = document.getElementById('mainNav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  // ═══════════════════════════════════════
  // 4. PARALLAX HERO VIDEO (subtle)
  // ═══════════════════════════════════════
  const heroVideo = document.querySelector('.hero-video');
  if (heroVideo) {
    window.addEventListener('scroll', () => {
      const scroll = window.scrollY;
      if (scroll < window.innerHeight) {
        heroVideo.style.transform = `translate(-50%, -50%) scale(${1.05 + scroll * 0.0002})`;
      }
    });
  }

  // ═══════════════════════════════════════
  // 5. TILT EFFECT ON MEMBERSHIP CARDS
  // ═══════════════════════════════════════
  const memCards = document.querySelectorAll('.mem-card');
  memCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 25;
      const rotateY = (centerX - x) / 25;
      card.style.transform = `translateY(-8px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) perspective(1000px) rotateX(0) rotateY(0)';
    });
  });
});
