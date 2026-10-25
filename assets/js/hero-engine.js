/* =========================================
   ECHO ANIMATION ENGINE (Abortable & Looping)
   ========================================= */

window.EchoEngine = (function () {
  'use strict';

  let activeTimers = [];
  let runId = 0;

  function clearTimers() {
    activeTimers.forEach(clearTimeout);
    activeTimers = [];
  }

  async function run(scenario, uiSelectors, onComplete) {
    // Increment runId to abort any previous running sequence
    runId++;
    const myRunId = runId;
    clearTimers();

    // A sleep function that only resolves if this run is still the active one
    function sleep(ms) {
      return new Promise((resolve) => {
        const t = setTimeout(() => {
          if (myRunId === runId) resolve();
        }, ms);
        activeTimers.push(t);
      });
    }

    function typeText(el, text, speed = 35) {
      return new Promise(async (resolve) => {
        el.innerHTML = '';
        for (let i = 0; i < text.length; i++) {
          if (myRunId !== runId) return; // Abort if a new run started
          el.innerHTML = text.substring(0, i + 1) + '<span class="cursor"></span>';
          await sleep(speed);
        }
        if (myRunId !== runId) return;
        el.innerHTML = text;
        resolve();
      });
    }

    // --- HTML Generators ---
    const builders = {
      construction: () => `
        <div class="wf-construction">
          <div class="pdf-doc" id="pdf-doc">
            <div class="pdf-header">Architectural_Plan_Rev4.pdf</div>
            <div class="pdf-lines">
              <div class="line"></div><div class="line"></div><div class="line"></div><div class="line"></div><div class="line"></div>
            </div>
            <div class="scan-laser" id="scan-laser"></div>
          </div>
          <div class="extracted-bom" id="bom-list"></div>
        </div>
      `,
      logistics: () => `
        <div class="wf-logistics">
          <div class="route-map">
            <div class="route-line"></div>
            <div class="truck-node" id="truck-node">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
            </div>
            <div class="border-gate" id="border-gate">Customs Hold</div>
          </div>
          <div class="docs-packet" id="docs-packet">
            <div class="doc-icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1866EE" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg></div>
            <div class="doc-icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1866EE" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg></div>
            <div class="doc-icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1866EE" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg></div>
          </div>
        </div>
      `,
      retail: () => `
        <div class="wf-retail">
          <div class="sync-columns">
            <div class="sync-source">
              <div class="source-icon">S</div>
              <span>Shopify</span>
            </div>
            <div class="sync-track">
              <div class="data-packet" id="data-packet"></div>
            </div>
            <div class="sync-dest">
              <div class="source-icon" style="background:#0F9D58; color:#fff;">G</div>
              <span>Google Sheets</span>
            </div>
          </div>
          <div class="inventory-alert" id="inv-alert">
            <span class="alert-badge">Oversold</span>
            <span>SKU-441 (Gift Box) — 0 stock, 3 pending</span>
          </div>
        </div>
      `,
      realestate: () => `
        <div class="wf-realestate">
          <div class="lead-card" id="lead-card">
            <div class="lead-header">
              <div class="avatar-small" style="background: #E2E8F0; width: 36px; height: 36px;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#475569" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              </div>
              <div><strong>Rachel Montgomery</strong><br><span style="font-size:11px; color:#888">Zillow Lead</span></div>
            </div>
            <div class="lead-details">
              <div class="check-item" id="check-budget">☑ Budget: $720k (Pass)</div>
              <div class="check-item" id="check-property">☑ Match: 14 Alder Lane</div>
            </div>
          </div>
          <div class="calendar-popup" id="cal-popup">
            <div class="cal-icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1866EE" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg></div>
            <div><strong>Showing Booked</strong><br><span style="font-size:11px; color:#888">Sat, 11:00 AM</span></div>
          </div>
        </div>
      `,
      dental: () => `
        <div class="wf-dental">
          <div class="claim-form" id="claim-form">
            <div class="claim-header">
              <span>Claim #9921</span>
              <span class="status-pill pending" id="claim-status">Denied</span>
            </div>
            <div class="claim-row">Procedure: Root Canal (D3330)</div>
            <div class="claim-row" id="xray-row">X-Ray: <span style="color:#aaa">Pending attachment...</span></div>
            <div class="claim-row" id="appeal-row">Appeal: <span style="color:#aaa">Drafting...</span></div>
          </div>
        </div>
      `
    };

    try {
      // 1. Update Static UI
      if (uiSelectors.company) document.querySelector(uiSelectors.company).textContent = scenario.company;
      if (uiSelectors.nav) document.querySelector(uiSelectors.nav).innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg> <span>${scenario.nav}</span>`;
      if (uiSelectors.title) document.querySelector(uiSelectors.title).textContent = scenario.title;

      // 2. Setup the Stage
      const stage = document.getElementById('workflow-stage');
      stage.innerHTML = builders[scenario.workflowType]();

      // 3. Reset AI Panel
      const statusEl = document.querySelector(uiSelectors.status);
      const requestEl = document.querySelector(uiSelectors.request);
      const reasoningEl = document.querySelector(uiSelectors.reasoning);
      const panelEl = document.querySelector(uiSelectors.panel);

      statusEl.innerHTML = '<span class="spinner"></span> Listening...';
      statusEl.style.color = '#A0A0A0';
      statusEl.firstChild.style.animation = 'spin 1s linear infinite';
      requestEl.innerHTML = '';
      reasoningEl.innerHTML = '';
      reasoningEl.classList.remove('show');
      panelEl.classList.remove('active');

      await sleep(600);
      if (myRunId !== runId) return;
      panelEl.classList.add('active');
      await typeText(requestEl, scenario.request, 35);
      if (myRunId !== runId) return;
      
      await sleep(800);
      if (myRunId !== runId) return;
      statusEl.innerHTML = '<span class="spinner"></span> Processing...';
      reasoningEl.classList.add('show');
      
      for (let i = 0; i < scenario.reasoning.length; i++) {
        await sleep(600);
        if (myRunId !== runId) return;
        const step = document.createElement('div');
        step.className = 'ai-step';
        step.innerHTML = `<span class="dot"></span> ${scenario.reasoning[i]}`;
        reasoningEl.appendChild(step);
      }

      await sleep(500);
      if (myRunId !== runId) return;
      statusEl.innerHTML = '<span class="spinner"></span> Executing...';

      if (scenario.workflowType === 'construction') {
        document.getElementById('scan-laser').classList.add('active');
        await sleep(1000);
        if (myRunId !== runId) return;
        document.getElementById('bom-list').innerHTML = `
          <div class="bom-item">✓ 24x Base Cabinets</div>
          <div class="bom-item">✓ 12x Upper Cabinets</div>
          <div class="bom-item">✓ 45 sq ft Quartz Countertop</div>
          <div class="bom-item">✓ Plumbing & Electrical</div>
        `;
        document.querySelectorAll('.bom-item').forEach((item, i) => {
          setTimeout(() => item.classList.add('show'), i * 300);
        });
        await sleep(1500);
      } 
      else if (scenario.workflowType === 'logistics') {
        document.getElementById('truck-node').classList.add('move');
        await sleep(1200);
        if (myRunId !== runId) return;
        document.getElementById('docs-packet').classList.add('send');
        await sleep(1000);
        if (myRunId !== runId) return;
        document.getElementById('border-gate').innerHTML = 'Cleared';
        document.getElementById('border-gate').classList.add('cleared');
        await sleep(1000);
      }
      else if (scenario.workflowType === 'retail') {
        document.getElementById('data-packet').classList.add('stream');
        await sleep(1500);
        if (myRunId !== runId) return;
        document.getElementById('inv-alert').classList.add('show');
        await sleep(1000);
        if (myRunId !== runId) return;
        document.getElementById('inv-alert').classList.add('resolved');
        document.getElementById('inv-alert').innerHTML = `<span class="alert-badge" style="background:#E3F6E9; color:#1D8A4A;">Synced</span><span>Restock PO generated</span>`;
        await sleep(1000);
      }
      else if (scenario.workflowType === 'realestate') {
        document.getElementById('check-budget').classList.add('show');
        await sleep(500);
        if (myRunId !== runId) return;
        document.getElementById('check-property').classList.add('show');
        await sleep(800);
        if (myRunId !== runId) return;
        document.getElementById('cal-popup').classList.add('show');
        await sleep(1500);
      }
      else if (scenario.workflowType === 'dental') {
        document.getElementById('claim-status').innerHTML = 'Appealing...';
        document.getElementById('claim-status').className = 'status-pill active';
        await sleep(800);
        if (myRunId !== runId) return;
        document.getElementById('xray-row').innerHTML = 'X-Ray: <span style="color:#1866EE">attached_xray.png</span>';
        await sleep(800);
        if (myRunId !== runId) return;
        document.getElementById('appeal-row').innerHTML = 'Appeal: <span style="color:#1866EE">Medical necessity letter generated.</span>';
        await sleep(1000);
        if (myRunId !== runId) return;
        document.getElementById('claim-status').innerHTML = 'Submitted';
        document.getElementById('claim-status').style.background = '#E8F0FE';
        document.getElementById('claim-status').style.color = '#1866EE';
        await sleep(1000);
      }

      if (myRunId !== runId) return;
      statusEl.innerHTML = `<span class="spinner" style="border-top-color:#34C759"></span> Done.`;
      statusEl.style.color = '#34C759';
      statusEl.firstChild.style.animation = 'none';

      await sleep(2000);
      if (myRunId !== runId) return;
      
      if (onComplete) onComplete();

    } catch (e) {
      // Ignore aborted errors
    }
  }

  return { run: run };
})();