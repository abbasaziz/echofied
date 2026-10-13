/* Renders CRM rows for the demo. */
window.EchoCrm = (function () {
  'use strict';

  function render(tableEl, rows, headerLabels, delayMs) {
    if (!tableEl) return [];
    tableEl.innerHTML = '';
    var nodes = [];

    var header = document.createElement('div');
    header.className = 'crm-row header';
    header.innerHTML =
      '<span>' + escapeHtml(headerLabels[0]) + '</span>' +
      '<span>' + escapeHtml(headerLabels[1]) + '</span>' +
      '<span>' + escapeHtml(headerLabels[2]) + '</span>';
    tableEl.appendChild(header);

    rows.forEach(function (row, i) {
      var r = document.createElement('div');
      r.className = 'crm-row';
      r.style.animationDelay = (i * (delayMs || 220)) + 'ms';
      r.innerHTML =
        '<span>' + escapeHtml(row.name) + '</span>' +
        '<span>' + escapeHtml(row.company) + '</span>' +
        '<span>' + escapeHtml(row.status) +
          (row.tag ? '<span class="tag">' + escapeHtml(row.tag) + '</span>' : '') +
        '</span>';
      tableEl.appendChild(r);
      nodes.push(r);
    });
    return nodes;
  }

  function markNew(row) {
    if (!row) return;
    row.classList.add('is-new');
  }

  function escapeHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  return { render: render, markNew: markNew };
})();