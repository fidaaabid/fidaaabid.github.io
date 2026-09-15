// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Draw-in animation for the hero loop, respecting reduced motion
const loopPath = document.getElementById('loopPath');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (loopPath) {
  if (prefersReducedMotion) {
    loopPath.classList.add('drawn');
  } else {
    requestAnimationFrame(() => {
      setTimeout(() => loopPath.classList.add('drawn'), 150);
    });
  }
}

// Publication abstract toggles
document.querySelectorAll('.abstract-toggle').forEach((btn) => {
  btn.addEventListener('click', () => {
    const abstract = btn.nextElementSibling;
    const isHidden = abstract.hasAttribute('hidden');
    if (isHidden) {
      abstract.removeAttribute('hidden');
      btn.textContent = 'Abstract –';
    } else {
      abstract.setAttribute('hidden', '');
      btn.textContent = 'Abstract +';
    }
    btn.setAttribute('aria-expanded', String(isHidden));
  });
});

// Lightbox for publication thumbnails
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');

function openLightbox(src, alt) {
  lightboxImg.src = src;
  lightboxImg.alt = alt;
  lightbox.removeAttribute('hidden');
}

function closeLightbox() {
  lightbox.setAttribute('hidden', '');
  lightboxImg.src = '';
}

document.querySelectorAll('.pub-thumb-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const img = btn.querySelector('img');
    openLightbox(img.src, img.alt);
  });
});

if (lightboxClose) {
  lightboxClose.addEventListener('click', closeLightbox);
}

if (lightbox) {
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightbox && !lightbox.hasAttribute('hidden')) {
    closeLightbox();
  }
});

// Reveal sections on scroll
const revealTargets = document.querySelectorAll('.section');
revealTargets.forEach((el) => el.classList.add('reveal'));

if ('IntersectionObserver' in window && !prefersReducedMotion) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealTargets.forEach((el) => observer.observe(el));
} else {
  revealTargets.forEach((el) => el.classList.add('in-view'));
}
