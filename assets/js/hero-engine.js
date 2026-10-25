/* =========================================
   ECHO ANIMATION ENGINE (Dynamic Workflows)
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

  function typeText(el, text, speed = 35) {
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

  // Draws the glowing laser between the AI panel and the table
  function drawLaser(panelEl, tableEl, activeRowEl) {
    const oldLaser = document.querySelector('.agent-laser');
    if (oldLaser) oldLaser.remove();

    if (!panelEl || !tableEl || !activeRowEl) return;

    const panelRect = panelEl.getBoundingClientRect();
    const rowRect = activeRowEl.getBoundingClientRect();
    const containerRect = panelEl.offsetParent.getBoundingClientRect();

    const startX = panelRect.left - containerRect.left;
    const startY = panelRect.top - containerRect.top + (panelRect.height / 2);
    
    const endX = rowRect.right - containerRect.left;
    const endY = rowRect.top - containerRect.top + (rowRect.height / 2);

    const laser = document.createElement('div');
    laser.className = 'agent-laser';
    laser.style.left = `${startX}px`;
    laser.style.top = `${startY}px`;
    
    const deltaX = endX - startX;
    const deltaY = endY - startY;
    const length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

    laser.style.width = `${length}px`;
    laser.style.transform = `rotate(${angle}deg)`;
    
    panelEl.offsetParent.appendChild(laser);

    requestAnimationFrame(() => {
      laser.classList.add('active');
    });
  }

  function removeLaser() {
    const laser = document.querySelector('.agent-laser');
    if (laser) {
      laser.classList.remove('active');
      setTimeout(() => laser.remove(), 400);
    }
  }

  async function renderRows(tbody, rows) {
    tbody.innerHTML = '';
    rows.forEach((r) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><span class="status-pill ${r.status}">${r.label}</span></td>
        <td><strong>${r.id}</strong><br><span style="color:#737373;font-size:11px">${r.name}</span></td>
        <td>${r.detail}</td>
        <td><span style="color:#888;font-weight:500">${r.value}</span></td>
      `;
      tbody.appendChild(tr);
    });
  }

  async function run(scenario, uiSelectors, onComplete) {
    if (isAnimating) return;
    isAnimating = true;
    clearTimers();
    removeLaser();

    // 1. Update Static UI
    if (uiSelectors.company) document.querySelector(uiSelectors.company).textContent = scenario.company;
    if (uiSelectors.nav) document.querySelector(uiSelectors.nav).innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg> <span>${scenario.nav}</span>`;
    if (uiSelectors.title) document.querySelector(uiSelectors.title).textContent = scenario.title;
    
    // Dynamically update table headers based on the scenario
    const theadTr = document.querySelector('.mock-table thead tr');
    if (theadTr && scenario.tableHeaders) {
      theadTr.innerHTML = scenario.tableHeaders.map(h => `<th>${h}</th>`).join('');
    }

    // 2. Reset Dynamic UI
    const statusEl = document.querySelector(uiSelectors.status);
    const requestEl = document.querySelector(uiSelectors.request);
    const reasoningEl = document.querySelector(uiSelectors.reasoning);
    const panelEl = document.querySelector(uiSelectors.panel);
    const tbody = document.querySelector(uiSelectors.tbody);
    const tableEl = document.querySelector('.mock-table');

    statusEl.innerHTML = '<span class="spinner"></span> Listening...';
    statusEl.style.color = '#A0A0A0';
    statusEl.firstChild.style.animation = 'spin 1s linear infinite';
    requestEl.innerHTML = '';
    reasoningEl.innerHTML = '';
    reasoningEl.classList.remove('show');
    panelEl.classList.remove('active');

    await renderRows(tbody, scenario.initialRows);
    
    // 3. Type user request
    await sleep(500);
    panelEl.classList.add('active');
    await typeText(requestEl, scenario.request, 35);
    
    // 4. Show AI Reasoning
    await sleep(800);
    statusEl.innerHTML = '<span class="spinner"></span> Processing...';
    reasoningEl.classList.add('show');
    
    for (let i = 0; i < scenario.reasoning.length; i++) {
      await sleep(700);
      const step = document.createElement('div');
      step.className = 'ai-step';
      step.innerHTML = `<span class="dot"></span> ${scenario.reasoning[i]}`;
      reasoningEl.appendChild(step);
    }

    // 5. Inject the "Active Row" to the top of the table
    await sleep(600);
    
    const activeTr = document.createElement('tr');
    activeTr.className = 'active-row-row';
    activeTr.innerHTML = `
      <td><span class="status-pill ${scenario.activeRow.status}">${scenario.activeRow.label}</span></td>
      <td><strong>${scenario.activeRow.id}</strong><br><span style="color:#737373;font-size:11px">${scenario.activeRow.name}</span></td>
      <td>${scenario.activeRow.detail}</td>
      <td><span style="color:#D32F2F;font-weight:600">${scenario.activeRow.value}</span></td>
    `;
    tbody.insertBefore(activeTr, tbody.firstChild);

    // 6. Animate the transformation
    await sleep(500);
    drawLaser(panelEl, tableEl, activeTr);
    activeTr.classList.add('is-processing');
    
    const statusCell = activeTr.querySelector('td:first-child');
    statusCell.innerHTML = `<span class="processing-pill"><span class="spinner" style="width:10px;height:10px;border-width:1.5px;border-top-color:#1866EE;"></span> Resolving...</span>`;

    // Wait for AI to "do the work"
    await sleep(2500);

    // 7. The Transformation
    statusEl.innerHTML = `<span class="spinner" style="border-top-color:#34C759"></span> Done.`;
    statusEl.style.color = '#34C759';
    statusEl.firstChild.style.animation = 'none';
    
    removeLaser();
    activeTr.classList.remove('is-processing');
    activeTr.classList.add('success-flash');
    
    // Change the HTML of the row to the final state
    activeTr.innerHTML = `
      <td><span class="status-pill ${scenario.newRow.status}">${scenario.newRow.label}</span></td>
      <td><strong>${scenario.newRow.id}</strong><br><span style="color:#737373;font-size:11px">${scenario.newRow.name}</span></td>
      <td>${scenario.newRow.detail}</td>
      <td><span style="color:#1866EE;font-weight:600;cursor:pointer">${scenario.newRow.value}</span></td>
    `;

    await sleep(2500);
    isAnimating = false;
    
    if (onComplete) onComplete();
  }

  return {
    run: run,
    clear: clearTimers
  };
})();