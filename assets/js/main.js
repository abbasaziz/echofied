/* Main site interactions & Module Initialization */
(function () {
  'use strict';

  // --- 1. General Site Logic ---
  
  var header = document.getElementById('siteHeader');
  if (header) {
    var onScroll = function () {
      if (window.scrollY > 8) header.classList.add('is-scrolled');
      else header.classList.remove('is-scrolled');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

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

  document.querySelectorAll('details').forEach(function(targetDetail) {
    targetDetail.addEventListener('toggle', function() {
      if (targetDetail.open) {
        document.querySelectorAll('details').forEach(function(detail) {
          if (detail !== targetDetail) detail.removeAttribute('open');
        });
      }
    });
  });

  var form = document.getElementById('contactForm');
  if (form) {
    var status = form.querySelector('.form-status');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!status) return;
      var name = form.elements.namedItem('name');
      var email = form.elements.namedItem('email');
      if (!name || !name.value.trim()) { status.textContent = 'Please add your name.'; status.style.color = '#FF5A5A'; return; }
      if (!email || !email.value.trim() || email.value.indexOf('@') < 1) { status.textContent = 'Please add a valid email.'; status.style.color = '#FF5A5A'; return; }
      status.textContent = 'Thanks — we will reply within one business day.'; status.style.color = '#34C759';
      form.reset();
    });
  }

  // --- 2. Hero Module Initialization ---

  const heroTabs = document.querySelectorAll('.mockup-tab');
  let heroCurrentScenario = 'construction';

  // These selectors map exactly to the HTML structure of the hero mockup
  const heroUiSelectors = {
    company: '#mockCompanyName',
    nav: '#mockNavTable',
    title: '#mockPageTitle',
    status: '#aiStatus',
    request: '#aiRequest',
    reasoning: '#aiReasoning',
    panel: '#mockAIPanel',
    tbody: '#mockTableBody'
  };

  function playHeroScenario(industryKey) {
    const data = window.ECHO_HERO_DATA[industryKey];
    if (!data) return;
    
    // Call the decoupled engine
    window.EchoEngine.run(data, heroUiSelectors);
  }

  if (heroTabs.length > 0) {
    heroTabs.forEach(tab => {
      tab.addEventListener('click', function() {
        // Prevent switching if currently animating
        // (The engine already has an internal check, but this stops the UI from flashing)
        
        heroTabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        
        heroCurrentScenario = this.getAttribute('data-industry');
        playHeroScenario(heroCurrentScenario);
      });
    });

    // Auto-run first animation on load
    window.addEventListener('load', () => {
      setTimeout(() => {
        playHeroScenario('construction');
      }, 1000);
    });
  }

  // --- 3. Integrations Module Initialization ---
  if (window.IntegrationsEngine) {
    window.IntegrationsEngine.init();
  }

  // --- 4. Ask Data Module Initialization ---
  if (window.AskDataEngine) {
    window.AskDataEngine.init();
  }
})();