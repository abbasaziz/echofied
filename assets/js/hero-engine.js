/* =========================================
   ECHO ANIMATION ENGINE (Saddlepoint UI)
   ========================================= */

window.EchoEngine = (function () {
  'use strict';

  let timeouts = [];
  let activeRunId = 0;

  function clearTimers() {
    timeouts.forEach(clearTimeout);
    timeouts = [];
  }

  async function run(scenario, uiSelectors, onComplete) {
    const myRunId = ++activeRunId;
    clearTimers();

    function sleep(ms) {
      return new Promise((resolve) => {
        const t = setTimeout(() => {
          if (myRunId === activeRunId) resolve();
        }, ms);
        timeouts.push(t);
      });
    }

    function typeText(el, text, speed = 30) {
      return new Promise(async (resolve) => {
        el.innerHTML = '';
        for (let i = 0; i < text.length; i++) {
          if (myRunId !== activeRunId) return;
          el.innerHTML = text.substring(0, i + 1) + '<span class="cursor"></span>';
          await sleep(speed);
        }
        if (myRunId !== activeRunId) return;
        el.innerHTML = text;
        resolve();
      });
    }

    // --- BUILD OUTCOME HTML ---
    let outcomeHTML = '';
    if (scenario.outcome.type === "booking") {
      outcomeHTML = `
        <div class="result-card anim-hidden" id="result-card">
          <div class="result-card-header">
            <div class="result-avatar" style="background:${scenario.outcome.avatarColor}">${scenario.outcome.initials}</div>
            <div>
              <h4>${scenario.outcome.name}</h4>
              <p>${scenario.outcome.sub}</p>
            </div>
          </div>
          <p>${scenario.outcome.details.join('<br>')}</p>
        </div>
        <div class="success-card anim-hidden" id="success-card">
          <div class="success-icon calendar">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
          </div>
          <div>
            <h4>${scenario.outcome.successTitle}</h4>
            <p>${scenario.outcome.successSub}</p>
          </div>
        </div>
      `;
    } else if (scenario.outcome.type === "integration") {
      outcomeHTML = `
        <div class="integration-flow anim-hidden" id="integration-flow">
          <div class="integration-node">
            <div class="int-icon shopify">S</div>
            <span>${scenario.outcome.source}</span>
          </div>
          <div class="integration-dots"></div>
          <div class="integration-node">
            <div class="int-icon sheets">G</div>
            <span>${scenario.outcome.dest}</span>
          </div>
        </div>
        <div class="success-card anim-hidden" id="success-card">
          <div class="success-icon sync">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
          </div>
          <div>
            <h4>${scenario.outcome.successTitle}</h4>
            <p>${scenario.outcome.successSub}</p>
          </div>
        </div>
      `;
    }

    // 1. Build layout HTML
    const leadsHTML = scenario.leads.map((lead, i) => `
      <tr class="lead-row anim-hidden" id="lead-row-${i}">
        <td>
          <div class="lead-profile">
            <div class="lead-avatar" style="background:${lead.c1}; color:${lead.c2}">${lead.initials}</div>
            <div class="lead-name"><h4>${lead.name}</h4><p>${lead.interest}</p></div>
          </div>
        </td>
        <td>
          <div class="score-bar">
            <div class="score-track"><div class="score-fill" data-target="${lead.score}" style="width:0%"></div></div>
            <span class="score-num">${lead.score}</span>
          </div>
        </td>
        <td style="text-align:right;"><button class="btn-outline" id="btn-lead-${i}">Contact</button></td>
      </tr>
    `).join('');

    const activityHTML = scenario.activity.map((act, i) => `
      <div class="activity-item anim-hidden" id="act-item-${i}">
        <div>
          <h4>${act.text}</h4>
          <p>${act.meta}</p>
        </div>
        <span>${act.time}</span>
      </div>
    `).join('');

    const layoutHTML = `
      <div class="mock-sidebar">
        <div class="mock-logo">
          <div class="icon">S</div>
          <span>${scenario.company}</span>
        </div>
        <nav class="mock-nav">
          <a href="javascript:void(0)" class="active">Overview <span class="count">6</span></a>
          <a href="javascript:void(0)">Inbox <span class="count">2</span></a>
          <a href="javascript:void(0)">Needs approval <span class="count">4</span></a>
          <a href="javascript:void(0)">AI Agents</a>
          <a href="javascript:void(0)">Company Brain</a>
          <a href="javascript:void(0)">Automations</a>
        </nav>
        <div class="sidebar-stats">
          <div>Handled by agents</div><div>1,082</div>
          <div>Approved by people</div><div>3</div>
          <div>Hours returned</div><div>168.1H</div>
        </div>
        <div class="mock-agent-status">
          <div class="avatar">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          </div>
          <div><h4>Echofied AI agent online</h4><p>Monitoring new leads.</p></div>
        </div>
      </div>

      <div class="mock-main">
        <div class="top-row">
          <div class="agent-image-card">
            <img src="/assets/img/agent-${scenario.workflowType}.png" alt="AI Agent" id="agent-image" style="opacity:0;">
          </div>
          <div class="activity-card">
            <div class="activity-header">
              <h3>AI activity</h3>
              <span>Live</span>
            </div>
            <div class="activity-list" id="activity-list-container">
              ${activityHTML}
            </div>
          </div>
        </div>
        <div class="leads-card">
          <div class="leads-header">
            <div>
              <h3>Top leads</h3>
              <p>Prioritized by AI intent score</p>
            </div>
            <a href="javascript:void(0)">View all →</a>
          </div>
          <table class="mock-table">
            <thead>
              <tr>
                <th>Lead</th>
                <th>AI Score</th>
                <th style="text-align:right;">Action</th>
              </tr>
            </thead>
            <tbody id="leads-tbody">
              ${leadsHTML}
            </tbody>
          </table>
        </div>
      </div>

      <div class="mock-right-panel">
        <div class="system-badge">System Live</div>
        <div class="agent-header">
          <div class="agent-logo">
            <svg width="12" height="12" viewBox="0 0 32 32" fill="none"><path d="M9 10.5h14M9 16h10M9 21.5h14" stroke="#fff" stroke-width="3" stroke-linecap="round"/><circle cx="24" cy="16" r="2.4" fill="#fff"/></svg>
          </div>
          <h3>Echofied Agent</h3>
        </div>

        <div class="processing-pill" id="agent-processing">
          <span class="spinner-dot"></span> Processing...
        </div>

        <div class="agent-chat-bubble anim-hidden" id="agent-request-bubble">
          <p id="agent-request-text"></p>
          <ul id="agent-reasoning-list"></ul>
        </div>

        <div id="outcome-container">
          ${outcomeHTML}
        </div>

        <div class="outcome-footer anim-hidden" id="outcome-footer">
          <p>Outcome</p>
          <strong>✓ Routed to results 2.1s</strong>
        </div>
      </div>
    `;

    const stage = document.getElementById('workflow-stage');
    if (stage) stage.innerHTML = layoutHTML;

    const requestText = document.getElementById('agent-request-text');
    const reasoningList = document.getElementById('agent-reasoning-list');
    const requestBubble = document.getElementById('agent-request-bubble');
    const processingPill = document.getElementById('agent-processing');
    
    // Get the dynamically generated outcome elements
    const resultCard = document.getElementById('result-card') || document.getElementById('integration-flow');
    const successCard = document.getElementById('success-card');
    const outcomeFooter = document.getElementById('outcome-footer');
    const agentImage = document.getElementById('agent-image');
    const activityList = document.getElementById('activity-list-container');

    if (agentImage) {
      agentImage.onload = () => { agentImage.style.opacity = '1'; };
      if (agentImage.complete) agentImage.style.opacity = '1';
    }

    // --- ANIMATION SEQUENCE ---
    await sleep(500);
    if (myRunId !== activeRunId) return;
    
    // 1. Fade in Activity & Leads
    document.querySelectorAll('.activity-item').forEach((el, i) => {
      setTimeout(() => el.classList.add('anim-show'), i * 100);
    });
    document.querySelectorAll('.lead-row').forEach((el, i) => {
      setTimeout(() => el.classList.add('anim-show'), i * 100);
    });

    // 2. Animate Score Bars
    setTimeout(() => {
      document.querySelectorAll('.score-fill').forEach(bar => {
        bar.style.width = bar.getAttribute('data-target') + '%';
      });
    }, 600);

    // 3. Inject a "Live" processing activity item
    const liveActivity = document.createElement('div');
    liveActivity.className = 'activity-item new-slide-in';
    liveActivity.innerHTML = `
      <div>
        <h4 id="live-act-text" style="color: #1866EE;">Processing new request...</h4>
        <p id="live-act-meta">Running AI workflow</p>
      </div>
      <span>Just now</span>
    `;
    activityList.insertBefore(liveActivity, activityList.firstChild);

    await sleep(1000);
    if (myRunId !== activeRunId) return;

    // 4. AI starts typing in the right panel
    processingPill.classList.add('show');
    requestBubble.classList.remove('anim-hidden');
    requestBubble.classList.add('anim-show');
    await typeText(requestText, scenario.request, 25);
    
    await sleep(400);
    if (myRunId !== activeRunId) return;

    // 5. Change Action Button State
    const btn1 = document.getElementById('btn-lead-0');
    if (btn1) {
      btn1.className = 'btn-outline processing';
      btn1.innerHTML = 'Syncing...';
    }

    // 6. Show reasoning steps
    for (let i = 0; i < scenario.reasoning.length; i++) {
      await sleep(400);
      if (myRunId !== activeRunId) return;
      
      const li = document.createElement('li');
      li.textContent = scenario.reasoning[i];
      reasoningList.appendChild(li);

      if (i === 1) document.getElementById('live-act-text').textContent = "Qualifying data...";
    }

    await sleep(600);
    if (myRunId !== activeRunId) return;

    // 7. Finalize everything
    document.getElementById('live-act-text').textContent = "Workflow complete";
    document.getElementById('live-act-meta').textContent = "Data synced to CRM";
    document.getElementById('live-act-text').style.color = "#16A34A";
    
    if (btn1) {
      btn1.className = 'btn-outline success';
      btn1.innerHTML = 'Done ✓';
    }

    processingPill.classList.remove('show');
    
    // Reveal the dynamically built outcome cards
    if (resultCard) {
      resultCard.classList.remove('anim-hidden');
      resultCard.classList.add('anim-show');
    }
    
    await sleep(400);
    if (myRunId !== activeRunId) return;
    
    if (successCard) {
      successCard.classList.remove('anim-hidden');
      successCard.classList.add('anim-show');
    }

    await sleep(400);
    if (myRunId !== activeRunId) return;

    if (outcomeFooter) {
      outcomeFooter.classList.remove('anim-hidden');
      outcomeFooter.classList.add('anim-show');
    }

    await sleep(2500);
    if (myRunId !== activeRunId) return;

    if (onComplete) onComplete();
  }

  return { run };
})();