/* Main site interactions: nav, header state, reveal on scroll, form. */
(function () {
  'use strict';

  // Year in footer
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Sticky header state
  var header = document.getElementById('siteHeader');
  if (header) {
    var onScroll = function () {
      if (window.scrollY > 8) header.classList.add('is-scrolled');
      else header.classList.remove('is-scrolled');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Mobile nav
  var toggle = document.querySelector('.nav-toggle');
  var mobileNav = document.getElementById('mobileNav');
  if (toggle && mobileNav) {
    var setOpen = function (open) {
      toggle.setAttribute('aria-expanded', String(open));
      if (open) mobileNav.removeAttribute('hidden');
      else mobileNav.setAttribute('hidden', '');
      document.body.classList.toggle('nav-open', open);
    };

    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      setOpen(!open);
    });

    mobileNav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') setOpen(false);
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth >= 880 && toggle.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
      }
    });
  }

  // Reveal on scroll
  var revealTargets = document.querySelectorAll(
    '.section-head, .step, .price-card, .testimonial, .demo, .cta-inner, .faq details'
  );
  revealTargets.forEach(function (el) { el.classList.add('reveal'); });

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    revealTargets.forEach(function (el) { io.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // Contact form (client-side only; replace action with your endpoint)
  var form = document.getElementById('contactForm');
  if (form) {
    var status = form.querySelector('.form-status');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!status) return;
      var name = form.elements.namedItem('name');
      var email = form.elements.namedItem('email');
      if (!name || !name.value.trim()) { status.textContent = 'Please add your name.'; return; }
      if (!email || !email.value.trim() || email.value.indexOf('@') < 1) {
        status.textContent = 'Please add a valid work email.';
        return;
      }
      status.textContent = 'Thanks — we will reply within one business day.';
      form.reset();
    });
  }
})();