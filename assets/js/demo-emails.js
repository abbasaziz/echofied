/* Renders inbox items into the demo inbox panel. */
window.EchoEmails = (function () {
  'use strict';

  function el(tag, cls, html) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (html != null) node.innerHTML = html;
    return node;
  }

  function render(listEl, items, delayMs) {
    if (!listEl) return [];
    listEl.innerHTML = '';
    var nodes = [];
    items.forEach(function (item, i) {
      var li = el('li', 'inbox-item');
      li.style.animationDelay = (i * (delayMs || 180)) + 'ms';
      li.innerHTML =
        '<span class="avatar" style="--c1:' + item.c1 + ';--c2:' + item.c2 + '">' + item.initials + '</span>' +
        '<div class="meta">' +
          '<strong>' + escapeHtml(item.name) + '</strong>' +
          '<em>' + escapeHtml(item.from) + ' · ' + escapeHtml(item.channel) + '</em>' +
          '<p>' + escapeHtml(item.subject) + '</p>' +
        '</div>';
      listEl.appendChild(li);
      nodes.push(li);
    });
    return nodes;
  }

  function markDone(node) {
    if (!node) return;
    node.classList.add('is-done');
  }

  function escapeHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  return { render: render, markDone: markDone };
})();