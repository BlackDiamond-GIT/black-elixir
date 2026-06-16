/* Navigation and UI interactions */

document.addEventListener('DOMContentLoaded', function() {
  const nav = document.querySelector('.nav');
  const hamburger = document.querySelector('.nav__hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileBar = document.querySelector('.mobile-bar');

  const menuCloseBtn = document.querySelector('.mobile-menu__close');

  const setMobileMenuOpen = (open) => {
    if (!mobileMenu || !hamburger) return;
    mobileMenu.classList.toggle('open', open);
    hamburger.classList.toggle('active', open);
    document.body.classList.toggle('menu-open', open);
    mobileMenu.setAttribute('aria-hidden', open ? 'false' : 'true');
    hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
    hamburger.setAttribute('aria-label', open ? 'Close menu' : 'Menu');
    if (mobileBar) {
      mobileBar.classList.toggle('is-hidden', open);
    }
  };

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      setMobileMenuOpen(!mobileMenu.classList.contains('open'));
    });

    menuCloseBtn?.addEventListener('click', () => {
      setMobileMenuOpen(false);
    });

    document.querySelectorAll('.nav__link, .mob-link, .mob-info-link, .mobile-menu__cta').forEach(link => {
      link.addEventListener('click', () => {
        setMobileMenuOpen(false);
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        setMobileMenuOpen(false);
      }
    });
  }
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      nav?.classList.add('scrolled');
    } else {
      nav?.classList.remove('scrolled');
    }
  });
  
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-q');
    if (question) {
      question.addEventListener('click', () => {
        item.classList.toggle('open');
      });
    }
  });
  
  const revealElements = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('vis');
      }
    });
  }, { threshold: 0.1 });
  
  revealElements.forEach(el => observer.observe(el));
});
