/* =========================================
   INTEGRATIONS ANIMATION ENGINE (Conveyor)
   ========================================= */

window.IntegrationsEngine = (function () {
  'use strict';

  let isRunning = false;
  let timers = [];
  
  // UI Elements
  const statusText = document.getElementById('integrationStatus');
  const sourceBtns = document.querySelectorAll('.source-tab');
  
  const intakeSlot = document.getElementById('intakeSlot');
  const intakeName = document.getElementById('intakeName');
  const intakeMethod = document.getElementById('intakeMethod');
  
  const trackFill = document.getElementById('trackFill');
  const packet = document.getElementById('packet');
  const shield = document.getElementById('securityShield');
  const brain = document.getElementById('brainNode');
  const out1 = document.getElementById('out-1');
  const out2 = document.getElementById('out-2');

  const sh = [
    document.getElementById('sh-1'),
    document.getElementById('sh-2'),
    document.getElementById('sh-3'),
    document.getElementById('sh-4')
  ];

  // Text
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
    intakeSlot.classList.remove('active');
    shield.classList.remove('active');
    brain.classList.remove('active');
    out1.classList.remove('active');
    out2.classList.remove('active');
    sh.forEach(el => el.classList.remove('active'));
    
    trackFill.style.width = '0%';
    packet.style.opacity = '0';
    packet.style.left = '0%';
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

    // Highlight Source Tab
    const activeBtn = document.querySelector(`.source-tab[data-key="${key}"]`);
    if (activeBtn) activeBtn.classList.add('active');

    // Update Text Data
    intakeName.textContent = data.name;
    intakeMethod.textContent = data.method;
    txtTitle.textContent = data.name;
    txtRead.textContent = data.read;
    txtGuard.textContent = data.guardrails;
    txtOut.textContent = data.outcome;
    
    // The new sellable outputs
    out1Title.textContent = data.actionTitle;
    out1Text.textContent = data.actionDesc;
    out2Title.textContent = data.resultTitle;
    out2Text.textContent = data.resultDesc;

    await sleep(400);

    // 1. INTAKE
    statusText.textContent = `Connecting to ${data.name}...`;
    intakeSlot.classList.add('active');
    await sleep(1000);

    // 2. MOVE PACKET TO SHIELD
    statusText.textContent = "Extracting secure data...";
    packet.style.transition = 'left 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
    packet.style.opacity = '1';
    trackFill.style.transition = 'width 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
    
    // Calculate center of the shield to stop the packet there
    const shieldRect = shield.getBoundingClientRect();
    const trackRect = shield.parentElement.getBoundingClientRect();
    const shieldCenter = (shieldRect.left - trackRect.left) + (shieldRect.width / 2);
    const stopPercent = (shieldCenter / trackRect.width) * 100;
    
    packet.style.left = `${stopPercent}%`;
    trackFill.style.width = `${stopPercent}%`;
    
    await sleep(1200);

    // 3. SHIELD PROCESSING
    statusText.textContent = "Applying security guardrails...";
    shield.classList.add('active');
    packet.style.opacity = '0'; // Hide packet while processing
    
    for (let i = 0; i < sh.length; i++) {
      await sleep(400);
      sh[i].classList.add('active');
    }
    await sleep(600);

    // 4. MOVE PACKET TO BRAIN
    statusText.textContent = "Updating Knowledge Graph...";
    packet.style.transition = 'left 1s cubic-bezier(0.4, 0, 0.2, 1)';
    trackFill.style.transition = 'width 1s cubic-bezier(0.4, 0, 0.2, 1)';
    
    packet.style.opacity = '1';
    packet.style.left = `100%`; // Move all the way to end of track
    trackFill.style.width = `100%`;
    
    await sleep(1000);
    
    brain.classList.add('active');
    packet.style.opacity = '0';
    await sleep(800);

    // 5. TRIGGER OUTPUTS
    statusText.textContent = "Triggering AI workflow...";
    out1.classList.add('active');
    await sleep(600);
    out2.classList.add('active');
    await sleep(600);

    statusText.textContent = "Workflow complete. Human approves.";
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