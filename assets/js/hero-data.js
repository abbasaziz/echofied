window.ECHO_HERO_DATA = {
  realestate: {
    company: "Hearthline Realty",
    nav: "Overview",
    title: "Dashboard",
    workflowType: "realestate",
    request: "New Zillow lead came in. Pre-qualify them for Alder Lane and book a showing.",
    reasoning: [
      "Receiving Zillow webhook: Alex Montgomery.",
      "Checking pre-approval: $720k limit.",
      "Matching to 14 Alder Lane ($705k).",
      "Sending SMS with 3 available times."
    ],
    leads: [
      { initials: "AS", name: "Ali Sheikh", interest: "3-bed in Dubai", score: 92, c1: "#EDE9FE", c2: "#7008E7" },
      { initials: "NW", name: "Noah Williams", interest: "Downtown condo", score: 86, c1: "#D0FAE5", c2: "#007A55" },
      { initials: "ED", name: "Emma Davis", interest: "Family home", score: 78, c1: "#FEF3C6", c2: "#BB4D00" },
      { initials: "LB", name: "Liam Brown", interest: "Investment unit", score: 64, c1: "#DFF2FE", c2: "#0069A8" }
    ],
    activity: [
      { text: "Replied to Ali Sheikh", meta: "Shared 3 matching properties", time: "2m" },
      { text: "Replied to Noah Williams", meta: "Shared 5 matching properties", time: "8m" },
      { text: "Property tour scheduled", meta: "The Waverly · Tomorrow, 2:00 PM", time: "18m" },
      { text: "Seller follow-up completed", meta: "Emma Davis · Seller inquiry", time: "31m" }
    ]
  },
  ecommerce: {
    company: "Aurora Supply",
    nav: "Overview",
    title: "Dashboard",
    workflowType: "ecommerce",
    request: "Reconcile today's Shopify sales against the Google Sheet inventory.",
    reasoning: [
      "Pulling 1,204 orders from Shopify...",
      "Reading current stock levels from Sheets.",
      "Detected discrepancy on SKU-441 (Oversold).",
      "Auto-generating purchase order."
    ],
    leads: [
      { initials: "MP", name: "Maya Patel", interest: "Cart abandoned ($184)", score: 92, c1: "#EDE9FE", c2: "#7008E7" },
      { initials: "CJ", name: "Chloe Jenkins", interest: "VIP Customer", score: 88, c1: "#D0FAE5", c2: "#007A55" },
      { initials: "LB", name: "Liam Brown", interest: "Return request #4821", score: 75, c1: "#FEF3C6", c2: "#BB4D00" },
      { initials: "NW", name: "Noah Williams", interest: "Bulk pricing inquiry", score: 61, c1: "#DFF2FE", c2: "#0069A8" }
    ],
    activity: [
      { text: "Replied to Ali Sheikh", meta: "Recommended 3 matching products", time: "2m" },
      { text: "Abandoned cart recovered", meta: "Maya Patel, $184 order, email follow-up", time: "8m" },
      { text: "Restock order drafted", meta: "Linen Tote, Sand, 12 units left", time: "18m" },
      { text: "Return request resolved", meta: "Emma Davis, order #4821, refund issued", time: "31m" }
    ]
  },
  logistics: {
    company: "Copperfield Freight",
    nav: "Overview",
    title: "Dashboard",
    workflowType: "logistics",
    request: "Truck 42 is held at Laredo. Extract the customs docs from my email and push them to the broker.",
    reasoning: [
      "Scanning driver email for attachments...",
      "Found Commercial Invoice and Packing List.",
      "Merging with TMS load data.",
      "Transmitting packet to Customs Broker."
    ],
    leads: [
      { initials: "AF", name: "Atlas Freight", interest: "Port delay inquiry", score: 95, c1: "#EDE9FE", c2: "#7008E7" },
      { initials: "DE", name: "DHL Express", interest: "Capacity request", score: 84, c1: "#D0FAE5", c2: "#007A55" },
      { initials: "ED", name: "Emma Davis", interest: "Pickup scheduling", score: 72, c1: "#FEF3C6", c2: "#BB4D00" },
      { initials: "LB", name: "Liam Brown", interest: "Cross-dock quote", score: 58, c1: "#DFF2FE", c2: "#0069A8" }
    ],
    activity: [
      { text: "Rerouted shipment #SH-2041", meta: "Avoided port delay, New ETA Thu, 4:30 PM", time: "2m" },
      { text: "Replied to Noah Williams", meta: "Shared tracking for 5 open shipments", time: "8m" },
      { text: "Pickup scheduled", meta: "Warehouse 3, tomorrow, 2:00 PM", time: "18m" },
      { text: "Carrier follow-up completed", meta: "Atlas Freight, delay inquiry", time: "31m" }
    ]
  }
};