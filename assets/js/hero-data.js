window.ECHO_HERO_DATA = {
  construction: {
    company: "Northgate Build",
    nav: "Estimating",
    title: "Active Bids",
    workflowType: "construction",
    request: "Parse the architect PDF for Oakridge kitchen and generate a material takeoff.",
    reasoning: [
      "Reading 45-page architectural PDF...",
      "Extracting materials: cabinets, countertops, fixtures.",
      "Cross-referencing supplier pricing API.",
      "Generating final Bill of Materials."
    ]
  },
  logistics: {
    company: "Copperfield Freight",
    nav: "Dispatch",
    title: "Border Crossings",
    workflowType: "logistics",
    request: "Truck 42 is held at Laredo. Extract the customs docs from my email and push them to the broker.",
    reasoning: [
      "Scanning driver email for attachments...",
      "Found Commercial Invoice and Packing List.",
      "Merging with TMS load data.",
      "Transmitting packet to Customs Broker."
    ]
  },
  retail: {
    company: "Aurora Supply",
    nav: "Inventory",
    title: "Stock Sync",
    workflowType: "retail",
    request: "Reconcile today's Shopify sales against the Google Sheet inventory.",
    reasoning: [
      "Pulling 1,204 orders from Shopify...",
      "Reading current stock levels from Sheets.",
      "Detected discrepancy on SKU-441 (Oversold).",
      "Auto-generating purchase order."
    ]
  },
  realestate: {
    company: "Hearthline Realty",
    nav: "Leads",
    title: "New Leads",
    workflowType: "realestate",
    request: "New Zillow lead came in. Pre-qualify them for Alder Lane and book a showing.",
    reasoning: [
      "Receiving Zillow webhook: Rachel Montgomery.",
      "Checking pre-approval: $720k limit.",
      "Matching to 14 Alder Lane ($705k).",
      "Sending SMS with 3 available times."
    ]
  },
  dental: {
    company: "Brightwater Dental",
    nav: "Claims",
    title: "Insurance Claims",
    workflowType: "dental",
    request: "Delta Dental denied claim #9921. Appeal the denial using the attached X-ray.",
    reasoning: [
      "Reading denial code (D3330)...",
      "Extracting clinical notes & X-ray.",
      "Drafting medical necessity letter...",
      "Submitting appeal via API."
    ]
  }
};