/* =========================================
   INTEGRATIONS ANIMATION ENGINE (Core Architecture)
   ========================================= */

window.IntegrationsEngine = (function () {
  'use strict';

  let isRunning = false;
  let timers = [];
  
  const statusText = document.getElementById('integrationStatus');
  const sourceBtns = document.querySelectorAll('.source-node');
  
  const trackLeft = document.getElementById('track-left');
  const trackRight = document.getElementById('track-right');
  
  const shield = document.getElementById('securityShield');
  const internalTrack = document.querySelector('.core-internal-track');
  const brain = document.getElementById('brainNode');
  
  const out1 = document.getElementById('out-1');
  const out2 = document.getElementById('out-2');

  const shSteps = [
    document.getElementById('sh-1'),
    document.getElementById('sh-2'),
    document.getElementById('sh-3'),
    document.getElementById('sh-4')
  ];

  const txtTitle = document.getElementById('explain-title');
  const txtRead = document.getElementById('explain-read');
  const txtGuard = document.getElementById('explain-guardrails');
  const txtOut = document.getElementById('explain-outcome');
  const out1Title = document.getElementById('out-1-title');
  const out1Text = document.getElementById('out-1-text');
  const out2Title = document.getElementById('out-2-title');
  const out2Text = document.getElementById('out-2-text');

  function sleep(ms) {
    return new Promise(resolve => {
      const t = setTimeout(resolve, ms);
      timers.push(t);
    });
  }

  function resetUI() {
    timers.forEach(clearTimeout);
    timers = [];
    
    sourceBtns.forEach(btn => btn.classList.remove('active'));
    trackLeft.classList.remove('active');
    shield.classList.remove('active');
    internalTrack.classList.remove('active');
    brain.classList.remove('active');
    trackRight.classList.remove('active');
    out1.classList.remove('active');
    out2.classList.remove('active');
    shSteps.forEach(el => el.classList.remove('active'));
  }

  async function runPipeline(key) {
    if (isRunning) {
      isRunning = false;
      resetUI();
    }
    
    isRunning = true;
    resetUI();
    
    const data = window.ECHO_INTEGRATION_SYSTEMS[key];
    if (!data) return;

    // Highlight active source
    const activeBtn = document.querySelector(`.source-node[data-key="${key}"]`);
    if (activeBtn) activeBtn.classList.add('active');

    // Update Text Content
    txtTitle.textContent = data.name;
    txtRead.textContent = data.read;
    txtGuard.textContent = data.guardrails;
    txtOut.textContent = data.outcome;
    out1Title.textContent = data.actionTitle;
    out1Text.textContent = data.actionDesc;
    out2Title.textContent = data.resultTitle;
    out2Text.textContent = data.resultDesc;

    await sleep(400);

    // 1. Source -> Guardrails
    statusText.textContent = `Extracting from ${data.name}...`;
    trackLeft.classList.add('active');
    await sleep(1000);
    
    shield.classList.add('active');
    await sleep(400);

    // 2. Guardrails Processing
    statusText.textContent = "Applying guardrails...";
    for (let i = 0; i < shSteps.length; i++) {
      await sleep(350);
      shSteps[i].classList.add('active');
    }
    await sleep(600);

    // 3. Guardrails -> Brain
    statusText.textContent = "Syncing to knowledge graph...";
    internalTrack.classList.add('active');
    await sleep(800);

    brain.classList.add('active');
    await sleep(1000);

    // 4. Brain -> Outputs
    statusText.textContent = "Triggering AI workflows...";
    trackRight.classList.add('active');
    await sleep(1000);

    out1.classList.add('active');
    await sleep(500);
    out2.classList.add('active');
    
    statusText.textContent = "Workflow complete.";
    isRunning = false;
  }

  function init() {
    if (!statusText) return;

    sourceBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.getAttribute('data-key');
        runPipeline(key);
      });
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          runPipeline('salesforce');
          observer.disconnect();
        }
      });
    }, { threshold: 0.4 });
    
    const wrapper = document.getElementById('integrationAnimationWrapper');
    if (wrapper) observer.observe(wrapper);
  }

  return { init };
})();