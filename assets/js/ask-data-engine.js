/* =========================================
   ASK DATA ANIMATION ENGINE (Looping with Processing)
   ========================================= */

window.AskDataEngine = (function () {
  'use strict';

  let isRunning = false;
  let timers = [];
  let currentIndex = 0;

  // The Scenarios
  const scenarios = [
    {
      question: "Which clients haven't paid us in the last 30 days?",
      processing: "Scanning 14,280 invoice records...",
      summary: "I found 3 clients with overdue invoices totaling <strong>$18,500</strong>.",
      title: "Accounts Receivable",
      thead: `<tr><th>Client</th><th>Days Late</th><th style="text-align:right;">Amount</th></tr>`,
      rows: [
        `<tr><td>Aurora Retail</td><td>45 days</td><td class="amount" style="text-align:right; color:#D32F2F;">$4,200</td></tr>`,
        `<tr><td>Summit Realty</td><td>32 days</td><td class="amount" style="text-align:right; color:#D32F2F;">$12,500</td></tr>`,
        `<tr><td>Brightwater Dental</td><td>15 days</td><td class="amount" style="text-align:right; color:#D32F2F;">$1,800</td></tr>`
      ],
      totalLabel: "Total overdue",
      totalValue: "$18,500",
      actionText: "Export list to CSV"
    },
    {
      question: "What is my projected revenue for next month based on current pipeline?",
      processing: "Aggregating active deals in Salesforce...",
      summary: "Based on the active deals in Salesforce, your projected revenue is <strong>$142,000</strong>.",
      title: "Sales Pipeline Forecast",
      thead: `<tr><th>Deal Name</th><th>Stage</th><th style="text-align:right;">Value</th></tr>`,
      rows: [
        `<tr><td>Acme Corp Expansion</td><td>Negotiation</td><td class="amount" style="text-align:right; color:#1866EE;">$75,000</td></tr>`,
        `<tr><td>Northgate Build Co.</td><td>Proposal</td><td class="amount" style="text-align:right; color:#1866EE;">$42,000</td></tr>`,
        `<tr><td>Marlowe Residence</td><td>Demo</td><td class="amount" style="text-align:right; color:#1866EE;">$25,000</td></tr>`
      ],
      totalLabel: "Weighted Forecast",
      totalValue: "$142,000",
      actionText: "View full pipeline"
    },
    {
      question: "Which products are selling out fastest this week?",
      processing: "Checking inventory levels across 3 warehouses...",
      summary: "Inventory for <strong>SKU-882</strong> and <strong>SKU-441</strong> is critically low. Reorder recommended.",
      title: "Inventory Alerts",
      thead: `<tr><th>Product</th><th>Stock Left</th><th style="text-align:right;">Reorder Cost</th></tr>`,
      rows: [
        `<tr><td>SKU-882 (Olive Oil)</td><td style="color:#D32F2F; font-weight:700;">14 units</td><td class="amount" style="text-align:right;">$2,400</td></tr>`,
        `<tr><td>SKU-441 (Gift Box)</td><td style="color:#D32F2F; font-weight:700;">8 units</td><td class="amount" style="text-align:right;">$1,200</td></tr>`,
        `<tr><td>SKU-109 (Tinned Fish)</td><td style="color:#F59E0B; font-weight:700;">45 units</td><td class="amount" style="text-align:right;">$800</td></tr>`
      ],
      totalLabel: "Est. Reorder Value",
      totalValue: "$4,400",
      actionText: "Generate POs"
    }
  ];

  // UI Elements
  const questionText = document.getElementById('askQuestionText');
  const cursor = document.getElementById('askCursor');
  const processingState = document.getElementById('processingState');
  const processingText = document.getElementById('processingText');
  const aiResponse = document.getElementById('aiResponse');
  const summaryText = document.getElementById('aiSummaryText');
  const insightTitle = document.getElementById('insightTitle');
  const insightThead = document.getElementById('insightThead');
  const insightTbody = document.getElementById('insightTbody');
  const insightTotalLabel = document.getElementById('insightTotalLabel');
  const insightTotalValue = document.getElementById('insightTotalValue');
  const aiActionText = document.getElementById('aiActionText');

  function sleep(ms) {
    return new Promise(resolve => {
      const t = setTimeout(resolve, ms);
      timers.push(t);
    });
  }

  function typeText(el, text, speed = 35) {
    return new Promise(resolve => {
      el.innerHTML = '';
      let i = 0;
      function type() {
        if (i < text.length) {
          el.innerHTML = text.substring(0, i + 1);
          i++;
          timers.push(setTimeout(type, speed));
        } else {
          resolve();
        }
      }
      type();
    });
  }

  function resetUI() {
    questionText.innerHTML = '';
    cursor.style.display = 'inline-block';
    processingState.classList.remove('show');
    aiResponse.classList.remove('show');
    summaryText.innerHTML = '';
    insightThead.innerHTML = '';
    insightTbody.innerHTML = '';
  }

  async function playScenario(index) {
    resetUI();
    const data = scenarios[index];

    await sleep(600);

    // 1. Type Question
    await typeText(questionText, data.question, 35);
    cursor.style.display = 'none';
    
    await sleep(600);

    // 2. Processing State (The "Thinking" phase)
    processingText.textContent = data.processing;
    processingState.classList.add('show');
    
    // Artificial delay to simulate AI crunching data
    await sleep(1800);

    // 3. Hide Processing, Show AI Response
    processingState.classList.remove('show');
    await sleep(300); // Slight pause for smooth transition
    
    aiResponse.classList.add('show');
    await sleep(400);
    
    // Inject Data
    summaryText.innerHTML = data.summary;
    insightTitle.textContent = data.title;
    insightThead.innerHTML = data.thead;
    
    insightTbody.innerHTML = data.rows.map((row, i) => {
      return row.replace('<tr>', `<tr class="row-animate" id="row-${i}">`);
    }).join('');

    insightTotalLabel.textContent = data.totalLabel;
    insightTotalValue.textContent = data.totalValue;
    aiActionText.textContent = data.actionText;

    await sleep(600);

    // 4. Staggered Reveal of Rows
    const rows = insightTbody.querySelectorAll('.row-animate');
    for (let i = 0; i < rows.length; i++) {
      await sleep(250);
      rows[i].classList.add('show');
    }

    // 5. Wait before looping
    await sleep(5000);
    
    // Loop
    currentIndex = (currentIndex + 1) % scenarios.length;
    playScenario(currentIndex);
  }

  function init() {
    if (!questionText) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (!isRunning) {
            isRunning = true;
            playScenario(currentIndex);
          }
          observer.disconnect();
        }
      });
    }, { threshold: 0.4 });
    
    const wrapper = document.getElementById('askDataMockup');
    if (wrapper) observer.observe(wrapper);
  }

  return { init };
})();