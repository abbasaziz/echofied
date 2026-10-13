/* Orchestrates the four-panel demo. Runs on user click. */
(function () {
  'use strict';

  var state = {
    industry: 'construction',
    running: false,
    timeouts: []
  };

  var els = {
    tabs: Array.prototype.slice.call(document.querySelectorAll('.demo-tab')),
    inboxList: document.querySelector('[data-list="inbox"]'),
    agentList: document.querySelector('[data-list="agent"]'),
    crmTable: document.querySelector('[data-list="crm"]'),
    draftList: document.querySelector('[data-list="drafts"]'),
    badgeInbox: document.querySelector('[data-badge="inbox"]'),
    badgeCrm: document.querySelector('[data-badge="crm"]'),
    badgeDrafts: document.querySelector('[data-badge="drafts"]'),
    play: document.querySelector('[data-action="play"]'),
    reset: document.querySelector('[data-action="reset"]')
  };

  function clearTimers() {
    state.timeouts.forEach(function (id) { clearTimeout(id); });
    state.timeouts = [];
  }

  function later(fn, ms) {
    var id = setTimeout(fn, ms);
    state.timeouts.push(id);
    return id;
  }

  function current() {
    return window.ECHO_DEMO_DATA[state.industry];
  }

  function setBadge(el, text) {
    if (el) el.textContent = text;
  }

  function reset() {
    clearTimers();
    state.running = false;

    if (els.inboxList) els.inboxList.innerHTML = '';
    if (els.agentList) els.agentList.innerHTML = '';
    if (els.crmTable) els.crmTable.innerHTML = '';
    if (els.draftList) els.draftList.innerHTML = '';

    var data = current();
    setBadge(els.badgeInbox, '0 new');
    setBadge(els.badgeCrm, data.badgeCrm);
    setBadge(els.badgeDrafts, '0 ready');

    if (els.play) { els.play.disabled = false; els.play.textContent = 'Run demo'; }
  }

  function renderStatic() {
    var data = current();
    var inboxNodes = window.EchoEmails.render(els.inboxList, data.inbox, 150);
    var crmNodes = window.EchoCrm.render(
      els.crmTable,
      data.crm,
      ['Contact', 'Account', 'Status'],
      0
    );
    // CRM rows start hidden until agent "writes" them
    crmNodes.forEach(function (row) { row.style.opacity = '0'; row.style.transform = 'translateY(6px)'; });
    return { inboxNodes: inboxNodes, crmNodes: crmNodes };
  }

  function run() {
    if (state.running) return;
    state.running = true;
    clearTimers();

    if (els.play) { els.play.disabled = true; els.play.textContent = 'Running…'; }

    if (els.inboxList) els.inboxList.innerHTML = '';
    if (els.agentList) els.agentList.innerHTML = '';
    if (els.crmTable) els.crmTable.innerHTML = '';
    if (els.draftList) els.draftList.innerHTML = '';

    var data = current();
    setBadge(els.badgeInbox, '0 new');
    setBadge(els.badgeCrm, data.badgeCrm);
    setBadge(els.badgeDrafts, '0 ready');

    // 1) Inbox populates
    var inboxNodes = window.EchoEmails.render(els.inboxList, data.inbox, 180);
    setBadge(els.badgeInbox, data.inbox.length + ' new');

    // 2) Agent reads & reasons
    var agentNodes = [];
    data.agentSteps.forEach(function (text, i) {
      later(function () {
        var li = document.createElement('li');
        li.textContent = text;
        li.style.animationDelay = '0ms';
        if (els.agentList) els.agentList.appendChild(li);
        agentNodes.push(li);
        if (i === 0) window.EchoEmails.markDone(inboxNodes[0]);
        if (i === 1 && inboxNodes[1]) window.EchoEmails.markDone(inboxNodes[1]);
        if (i === 2 && inboxNodes[2]) window.EchoEmails.markDone(inboxNodes[2]);
        if (i === data.agentSteps.length - 1) {
          agentNodes.forEach(function (n) { n.classList.add('is-done'); });
        }
      }, 500 + i * 900);
    });

    // 3) CRM writes
    var crmNodes = [];
    data.crm.forEach(function (row, i) {
      later(function () {
        if (els.crmTable) {
          // Build header once
          if (!els.crmTable.querySelector('.crm-row.header')) {
            var header = document.createElement('div');
            header.className = 'crm-row header';
            header.innerHTML = '<span>Contact</span><span>Account</span><span>Status</span>';
            els.crmTable.appendChild(header);
          }
          var r = document.createElement('div');
          r.className = 'crm-row is-new';
          r.style.animationDelay = '0ms';
          r.innerHTML =
            '<span>' + escapeHtml(row.name) + '</span>' +
            '<span>' + escapeHtml(row.company) + '</span>' +
            '<span>' + escapeHtml(row.status) +
              (row.tag ? '<span class="tag">' + escapeHtml(row.tag) + '</span>' : '') +
            '</span>';
          els.crmTable.appendChild(r);
          crmNodes.push(r);
        }
      }, 1800 + i * 700);
    });

    // 4) Drafts generated
    data.drafts.forEach(function (d, i) {
      later(function () {
        if (!els.draftList) return;
        var li = document.createElement('li');
        li.className = 'draft-item';
        li.style.animationDelay = '0ms';
        li.innerHTML =
          '<div class="row1"><strong>' + escapeHtml(d.to) + '</strong><span>draft</span></div>' +
          '<p><strong>' + escapeHtml(d.subject) + '</strong><br>' + escapeHtml(d.body) + '</p>' +
          '<div class="actions">' +
            '<span class="chip send">Approve &amp; send</span>' +
            '<span class="chip">Edit</span>' +
          '</div>';
        els.draftList.appendChild(li);
        setBadge(els.badgeDrafts, (i + 1) + ' ready');
      }, 3200 + i * 800);
    });

    // Finish
    later(function () {
      state.running = false;
      if (els.play) { els.play.disabled = false; els.play.textContent = 'Run again'; }
    }, 5400 + data.drafts.length * 800);
  }

  function switchIndustry(key) {
    if (!window.ECHO_DEMO_DATA[key]) return;
    state.industry = key;
    els.tabs.forEach(function (t) {
      var active = t.getAttribute('data-demo') === key;
      t.classList.toggle('is-active', active);
      t.setAttribute('aria-selected', String(active));
    });
    reset();
    // Auto-run for instant feedback
    run();
  }

  // Wire up
  els.tabs.forEach(function (t) {
    t.addEventListener('click', function () {
      switchIndustry(t.getAttribute('data-demo'));
    });
  });
  if (els.play) els.play.addEventListener('click', run);
  if (els.reset) els.reset.addEventListener('click', reset);

  // Initial paint
  reset();
  // Subtle auto-run when demo scrolls into view (once)
  if ('IntersectionObserver' in window) {
    var demoEl = document.getElementById('demo');
    if (demoEl) {
      var seen = false;
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && !seen) {
            seen = true;
            io.disconnect();
            setTimeout(run, 400);
          }
        });
      }, { threshold: 0.35 });
      io.observe(demoEl);
    }
  }

  function escapeHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
})();