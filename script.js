/* ══════════════════════════════════════════
   CREATIVE DESIGN — script.js
   ══════════════════════════════════════════ */

/* ── MOBILE NAV DRAWER ── */
const hamburger  = document.getElementById('hamburger');
const navLinks   = document.getElementById('navLinks');
const navOverlay = document.getElementById('navOverlay');

function openMenu() {
  navLinks.classList.add('open');
  navOverlay.classList.add('active');
  hamburger.classList.add('open');
  document.body.style.overflow = 'hidden'; // prevent body scroll
}

function closeMenu() {
  navLinks.classList.remove('open');
  navOverlay.classList.remove('active');
  hamburger.classList.remove('open');
  document.body.style.overflow = '';
}

function toggleMenu() {
  if (navLinks.classList.contains('open')) {
    closeMenu();
  } else {
    openMenu();
  }
}

// Close drawer on ESC key
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closeMenu();
});

// Close drawer when any nav link is clicked (smooth scroll to section)
navLinks.querySelectorAll('a').forEach(function (link) {
  link.addEventListener('click', function () {
    // Small delay so smooth-scroll feels natural before drawer closes
    setTimeout(closeMenu, 80);
  });
});


/* ── FORM SUBMIT HANDLER ── */
function handleForm(e) {
  e.preventDefault();
  const btn  = e.target.querySelector('.form-submit');
  const orig = btn.textContent;

  btn.textContent         = '✅ Submitted! We\'ll call you soon.';
  btn.style.background    = '#2D6A4F';
  btn.style.color         = '#fff';
  btn.style.pointerEvents = 'none';

  setTimeout(function () {
    btn.textContent         = orig;
    btn.style.background    = '';
    btn.style.color         = '';
    btn.style.pointerEvents = '';
    e.target.reset();
  }, 4000);
}


/* ── SCROLL-REVEAL ANIMATION ── */
(function () {
  const targets = document.querySelectorAll(
    '.service-card, .why-card, .looking-card, .about-card, .hero-visual-card, .hero-visual-main'
  );

  targets.forEach(function (el) {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(22px)';
    el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
  });

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity   = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target); // animate once
        }
      });
    },
    { threshold: 0.1 }
  );

  targets.forEach(function (el) { observer.observe(el); });
})();


/* ── ANIMATED STAT COUNTERS ── */
(function () {
  const statEls = document.querySelectorAll('.stat-number');

  function animateCount(el) {
    const raw    = el.textContent.replace(/[^0-9]/g, '');
    const suffix = el.textContent.replace(/[0-9]/g, '');
    const target = parseInt(raw, 10);
    if (!target) return;

    let start    = 0;
    const step   = Math.ceil(target / 60);
    const timer  = setInterval(function () {
      start += step;
      if (start >= target) {
        start = target;
        clearInterval(timer);
      }
      el.textContent = start + suffix;
    }, 24);
  }

  const counterObs = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          counterObs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  statEls.forEach(function (el) { counterObs.observe(el); });
})();


/* ── NAVBAR SCROLL SHADOW ── */
(function () {
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 20) {
      nav.style.boxShadow = '0 4px 30px rgba(0,0,0,0.5)';
    } else {
      nav.style.boxShadow = 'none';
    }
  });
})();
