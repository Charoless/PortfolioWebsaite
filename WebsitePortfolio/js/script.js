/* ============================================
   CHARLES ANTONIO — PORTFOLIO
   Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ============================================
  // DARK / LIGHT MODE
  // ============================================
  const themeToggle = document.querySelector('.theme-toggle');
  const savedTheme = localStorage.getItem('theme') || 'dark';

  if (savedTheme === 'light') {
    document.documentElement.classList.add('light-mode');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.documentElement.classList.toggle('light-mode');
      const current = document.documentElement.classList.contains('light-mode') ? 'light' : 'dark';
      localStorage.setItem('theme', current);
    });
  }

  // ============================================
  // NAVBAR SCROLL EFFECT
  // ============================================
  const navbar = document.getElementById('navbar');
  const handleNavScroll = () => {
    if (window.scrollY > -10) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  if (navbar) {
    window.addEventListener('scroll', handleNavScroll, { passive: true });
    handleNavScroll();
  }

  // ============================================
  // ACTIVE NAV LINK
  // ============================================
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ============================================
  // HAMBURGER MENU
  // ============================================
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
    });

    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
      });
    });
  }

  

  // ============================================
  // SCROLL REVEAL
  // ============================================
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));

  // ============================================
  // BACK TO TOP
  // ============================================
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }, { passive: true });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ============================================
  // READING PROGRESS BAR
  // ============================================
  const progressBar = document.querySelector('.reading-progress');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / total) * 100;
      progressBar.style.width = progress + '%';
    }, { passive: true });
  }

  // ============================================
  // CONTACT FORM
  // ============================================
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('fname').value.trim();
      const email = document.getElementById('femail').value.trim();
      const subject = document.getElementById('fsubject').value.trim();
      const message = document.getElementById('fmessage').value.trim();

      // Clear previous errors
      document.querySelectorAll('.form-error').forEach(el => el.remove());

      let valid = true;

      const showError = (id, msg) => {
        const el = document.getElementById(id);
        const err = document.createElement('span');
        err.className = 'form-error';
        err.style.cssText = 'color:#f04a6e;font-size:0.75rem;margin-top:4px;display:block;font-weight:600;';
        err.textContent = msg;
        el.parentElement.appendChild(err);
        valid = false;
      };

      if (!name) showError('fname', 'Name is required.');
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) showError('femail', 'Valid email required.');
      if (!subject) showError('fsubject', 'Subject is required.');
      if (!message || message.length < 10) showError('fmessage', 'Message must be at least 10 characters.');

      if (!valid) return;

      // Simulate submission
      const btn = contactForm.querySelector('.btn-primary');
      btn.disabled = true;
      btn.textContent = 'Sending...';

      setTimeout(() => {
        contactForm.style.display = 'none';
        const success = document.querySelector('.form-success');
        if (success) success.style.display = 'block';
      }, 1200);
    });
  }

  // ============================================
  // NUMBER COUNT ANIMATION
  // ============================================
  const statNums = document.querySelectorAll('[data-count]');
  if (statNums.length) {
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-count'));
          const suffix = el.getAttribute('data-suffix') || '';
          let current = 0;
          const increment = target / 60;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              el.textContent = target + suffix;
              clearInterval(timer);
            } else {
              el.textContent = Math.floor(current) + suffix;
            }
          }, 16);
          countObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    statNums.forEach(el => countObserver.observe(el));
  }

});
