/* Renders draft items for the demo. */
window.EchoDrafts = (function () {
  'use strict';

  function render(listEl, drafts, delayMs) {
    if (!listEl) return [];
    listEl.innerHTML = '';
    var nodes = [];
    drafts.forEach(function (d, i) {
      var li = document.createElement('li');
      li.className = 'draft-item';
      li.style.animationDelay = (i * (delayMs || 260)) + 'ms';
      li.innerHTML =
        '<div class="row1"><strong>' + escapeHtml(d.to) + '</strong><span>draft</span></div>' +
        '<p><strong>' + escapeHtml(d.subject) + '</strong><br>' + escapeHtml(d.body) + '</p>' +
        '<div class="actions">' +
          '<span class="chip send">Approve &amp; send</span>' +
          '<span class="chip">Edit</span>' +
        '</div>';
      listEl.appendChild(li);
      nodes.push(li);
    });
    return nodes;
  }

  function escapeHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  return { render: render };
})();