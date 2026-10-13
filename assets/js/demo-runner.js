/* Orchestrates the demo. Two modes:
   - Desktop (>= 880px): four panels visible at once.
   - Mobile (< 880px): one panel at a time, advanced in sequence. */
(function () {
  'use strict';

  var state = {
    industry: 'construction',
    running: false,
    timeouts: [],
    mobile: false
  };

  var els = {};

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  function cssMs(name, fallback) {
    var v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    if (!v) return fallback;
    if (v.endsWith('ms')) return parseFloat(v);
    if (v.endsWith('s')) return parseFloat(v) * 1000;
    var n = parseFloat(v);
    return isNaN(n) ? fallback : n;
  }

  function cacheEls() {
    els = {
      tabs: $all('.demo-tab'),
      stage: $('[data-stage]'),
      panels: $all('.demo-panel'),
      inboxList: $('[data-list="inbox"]'),
      agentList: $('[data-list="agent"]'),
      crmTable: $('[data-list="crm"]'),
      draftList: $('[data-list="drafts"]'),
      badgeInbox: $('[data-badge="inbox"]'),
      badgeCrm: $('[data-badge="crm"]'),
      badgeDrafts: $('[data-badge="drafts"]'),
      play: $('[data-action="play"]'),
      reset: $('[data-action="reset"]'),
      progress: $('[data-progress]'),
      progressDots: $all('[data-step-dot]')
    };
  }

  function mq() {
    return window.matchMedia('(max-width: 879px)');
  }

  function setMobile() {
    state.mobile = mq().matches;
    if (els.progress) {
      if (state.mobile) els.progress.removeAttribute('hidden');
      else els.progress.setAttribute('hidden', '');
    }
    // Ensure the first panel is active in mobile mode
    if (state.mobile) showPanel('inbox');
    else {
      els.panels.forEach(function (p) { p.classList.add('is-active'); });
    }
  }

  function showPanel(name) {
    if (!state.mobile) return;
    els.panels.forEach(function (p) {
      var active = p.getAttribute('data-panel') === name;
      p.classList.toggle('is-active', active);
    });
    els.progressDots.forEach(function (d) {
      var active = d.getAttribute('data-step-dot') === name;
      d.classList.toggle('is-active', active);
    });
  }

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

  function setBadge(el, text) { if (el) el.textContent = text; }

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

    if (state.mobile) showPanel('inbox');

    if (els.play) { els.play.disabled = false; els.play.textContent = 'Run demo'; }
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
    var first = cssMs('--demo-first', 500);
    var step = cssMs('--demo-step', state.mobile ? 500 : 900);
    var crmGap = cssMs('--demo-crm', state.mobile ? 500 : 700);
    var draftGap = cssMs('--demo-drafts', state.mobile ? 600 : 800);

    setBadge(els.badgeInbox, '0 new');
    setBadge(els.badgeCrm, data.badgeCrm);
    setBadge(els.badgeDrafts, '0 ready');

    if (state.mobile) showPanel('inbox');

    // 1) Inbox
    var inboxNodes = window.EchoEmails.render(els.inboxList, data.inbox, state.mobile ? 120 : 180);
    setBadge(els.badgeInbox, data.inbox.length + ' new');

    // 2) Agent reasoning
    var agentNodes = [];
    data.agentSteps.forEach(function (text, i) {
      later(function () {
        var li = document.createElement('li');
        li.textContent = text;
        if (els.agentList) els.agentList.appendChild(li);
        agentNodes.push(li);

        if (i === 0 && inboxNodes[0]) window.EchoEmails.markDone(inboxNodes[0]);
        if (i === 1 && inboxNodes[1]) window.EchoEmails.markDone(inboxNodes[1]);
        if (i === 2 && inboxNodes[2]) window.EchoEmails.markDone(inboxNodes[2]);

        if (i === data.agentSteps.length - 1) {
          agentNodes.forEach(function (n) { n.classList.add('is-done'); });
        }

        if (state.mobile && i === 0) showPanel('agent');
      }, first + i * step);
    });

    // 3) CRM writes
    data.crm.forEach(function (row, i) {
      later(function () {
        if (!els.crmTable) return;
        if (!els.crmTable.querySelector('.crm-row.header')) {
          var header = document.createElement('div');
          header.className = 'crm-row header';
          header.innerHTML = '<span>Contact</span><span>Account</span><span>Status</span>';
          els.crmTable.appendChild(header);
        }
        var r = document.createElement('div');
        r.className = 'crm-row is-new';
        r.innerHTML =
          '<span>' + escapeHtml(row.name) + '</span>' +
          '<span>' + escapeHtml(row.company) + '</span>' +
          '<span>' + escapeHtml(row.status) +
            (row.tag ? '<span class="tag">' + escapeHtml(row.tag) + '</span>' : '') +
          '</span>';
        els.crmTable.appendChild(r);

        if (state.mobile && i === 0) showPanel('crm');
      }, first + data.agentSteps.length * step + i * crmGap);
    });

    // 4) Drafts
    data.drafts.forEach(function (d, i) {
      later(function () {
        if (!els.draftList) return;
        var li = document.createElement('li');
        li.className = 'draft-item';
        li.innerHTML =
          '<div class="row1"><strong>' + escapeHtml(d.to) + '</strong><span>draft</span></div>' +
          '<p><strong>' + escapeHtml(d.subject) + '</strong><br>' + escapeHtml(d.body) + '</p>' +
          '<div class="actions">' +
            '<span class="chip send">Approve &amp; send</span>' +
            '<span class="chip">Edit</span>' +
          '</div>';
        els.draftList.appendChild(li);
        setBadge(els.badgeDrafts, (i + 1) + ' ready');

        if (state.mobile && i === 0) showPanel('drafts');
      }, first + data.agentSteps.length * step + data.crm.length * crmGap + i * draftGap);
    });

    // Finish
    var total = first
      + data.agentSteps.length * step
      + data.crm.length * crmGap
      + data.drafts.length * draftGap
      + 400;

    later(function () {
      state.running = false;
      if (els.play) { els.play.disabled = false; els.play.textContent = 'Run again'; }
    }, total);
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
    run();
  }

  function escapeHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function bind() {
    els.tabs.forEach(function (t) {
      t.addEventListener('click', function () {
        switchIndustry(t.getAttribute('data-demo'));
      });
    });
    if (els.play) els.play.addEventListener('click', run);
    if (els.reset) els.reset.addEventListener('click', reset);

    var m = mq();
    var onChange = function () { setMobile(); reset(); };
    if (m.addEventListener) m.addEventListener('change', onChange);
    else if (m.addListener) m.addListener(onChange);
  }

  function init() {
    cacheEls();
    setMobile();
    reset();
    bind();

    if ('IntersectionObserver' in window) {
      var demoEl = document.getElementById('demo');
      if (demoEl) {
        var seen = false;
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting && !seen) {
              seen = true;
              io.disconnect();
              setTimeout(run, 300);
            }
          });
        }, { threshold: 0.3 });
        io.observe(demoEl);
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();