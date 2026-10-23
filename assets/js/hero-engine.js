/* =========================================
   ECHO ANIMATION ENGINE
   Reusable across multiple sections.
   ========================================= */

window.EchoEngine = (function () {
  'use strict';

  let timeouts = [];
  let isAnimating = false;

  function clearTimers() {
    timeouts.forEach(clearTimeout);
    timeouts = [];
  }

  function sleep(ms) {
    return new Promise(resolve => {
      const t = setTimeout(resolve, ms);
      timeouts.push(t);
    });
  }

  function typeText(el, text, speed = 40) {
    return new Promise(resolve => {
      el.innerHTML = '';
      let i = 0;
      function type() {
        if (i < text.length) {
          el.innerHTML = text.substring(0, i + 1) + '<span class="cursor"></span>';
          i++;
          timeouts.push(setTimeout(type, speed));
        } else {
          el.innerHTML = text;
          resolve();
        }
      }
      type();
    });
  }

  async function renderRows(tbody, rows) {
    tbody.innerHTML = '';
    rows.forEach((r) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><span class="status-pill ${r.status}">${r.label}</span></td>
        <td><strong>${r.id}</strong><br><span style="color:#737373;font-size:11px">${r.name}</span></td>
        <td>${r.detail}</td>
        <td>${r.value}</td>
        <td><span style="color:#1866EE;font-size:12px;cursor:pointer">View</span></td>
      `;
      tbody.appendChild(tr);
    });
  }

  // The main function to run the animation
  async function run(scenario, uiSelectors, onComplete) {
    if (isAnimating) return;
    isAnimating = true;
    clearTimers();

    // 1. Update Static UI Labels
    if (uiSelectors.company) document.querySelector(uiSelectors.company).textContent = scenario.company;
    if (uiSelectors.nav) document.querySelector(uiSelectors.nav).innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg> <span>${scenario.nav}</span>`;
    if (uiSelectors.title) document.querySelector(uiSelectors.title).textContent = scenario.title;
    
    // 2. Reset Dynamic UI
    const statusEl = document.querySelector(uiSelectors.status);
    const requestEl = document.querySelector(uiSelectors.request);
    const reasoningEl = document.querySelector(uiSelectors.reasoning);
    const panelEl = document.querySelector(uiSelectors.panel);
    const tbody = document.querySelector(uiSelectors.tbody);

    statusEl.innerHTML = '<span class="spinner"></span> Listening for requests...';
    statusEl.style.color = '#737373';
    statusEl.firstChild.style.animation = 'spin 1s linear infinite';
    requestEl.innerHTML = '';
    reasoningEl.innerHTML = '';
    reasoningEl.classList.remove('show');
    panelEl.classList.remove('active');

    await renderRows(tbody, scenario.initialRows);
    
    // 3. Type user request
    await sleep(500);
    panelEl.classList.add('active');
    await typeText(requestEl, scenario.request, 40);
    
    // 4. Show AI Reasoning
    await sleep(800);
    statusEl.innerHTML = '<span class="spinner"></span> Echofied processing...';
    reasoningEl.classList.add('show');
    
    for (let i = 0; i < scenario.reasoning.length; i++) {
      await sleep(600);
      const step = document.createElement('div');
      step.className = 'ai-step';
      step.innerHTML = `<span class="dot"></span> ${scenario.reasoning[i]}`;
      reasoningEl.appendChild(step);
    }

    // 5. Final Action
    await sleep(1000);
    statusEl.innerHTML = `<span class="spinner" style="border-top-color:#34C759"></span> Done.`;
    statusEl.style.color = '#1D8A4A';
    statusEl.firstChild.style.animation = 'none'; // stop spinner
    
    // 6. Insert New Row
    const tr = document.createElement('tr');
    tr.className = 'new-row highlight';
    tr.innerHTML = `
      <td><span class="status-pill ${scenario.newRow.status}">${scenario.newRow.label}</span></td>
      <td><strong>${scenario.newRow.id}</strong><br><span style="color:#737373;font-size:11px">${scenario.newRow.name}</span></td>
      <td>${scenario.newRow.detail}</td>
      <td>${scenario.newRow.value}</td>
      <td><span style="color:#1866EE;font-size:12px;font-weight:600">${scenario.actionText}</span></td>
    `;
    tbody.insertBefore(tr, tbody.firstChild);

    await sleep(1500);
    isAnimating = false;
    
    if (onComplete) onComplete();
  }

  return {
    run: run,
    clear: clearTimers
  };
})();