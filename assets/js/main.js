/* Main site interactions: nav, header state, reveal on scroll, form. */
(function () {
  'use strict';

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

  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var mobileNav = document.getElementById('mobileNav');
  if (toggle && mobileNav) {
    var setOpen = function (open) {
      toggle.setAttribute('aria-expanded', String(open));
      if (open) mobileNav.removeAttribute('hidden');
      else mobileNav.setAttribute('hidden', '');
      document.body.style.overflow = open ? 'hidden' : '';
    };

    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      setOpen(!open);
    });

    mobileNav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') setOpen(false);
    });
  }

  // Reveal on scroll animations
  var revealTargets = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
    revealTargets.forEach(function (el) { io.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // Accordion exclusive open logic (optional, closes others when one opens)
  var details = document.querySelectorAll('details');
  details.forEach(function(targetDetail) {
    targetDetail.addEventListener('toggle', function() {
      if (targetDetail.open) {
        details.forEach(function(detail) {
          if (detail !== targetDetail) {
            detail.removeAttribute('open');
          }
        });
      }
    });
  });

  // Contact form validation (client-side only)
  var form = document.getElementById('contactForm');
  if (form) {
    var status = form.querySelector('.form-status');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!status) return;
      
      var name = form.elements.namedItem('name');
      var email = form.elements.namedItem('email');
      
      if (!name || !name.value.trim()) { status.textContent = 'Please add your name.'; status.style.color = '#FF5A5A'; return; }
      if (!email || !email.value.trim() || email.value.indexOf('@') < 1) {
        status.textContent = 'Please add a valid work email.';
        status.style.color = '#FF5A5A';
        return;
      }
      
      status.textContent = 'Thanks — we will reply within one business day.';
      status.style.color = '#34C759';
      form.reset();
    });
  }
})();