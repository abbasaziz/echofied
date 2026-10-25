window.ECHO_HERO_DATA = {
  construction: {
    company: "Northgate Build",
    nav: "Jobs",
    title: "Active Jobs",
    tableHeaders: ["Job Status", "Job ID", "Client / Scope", "Actions"],
    request: "Parse this 45-page architect PDF and create a material takeoff for the Oakridge kitchen.",
    reasoning: [
      "Parsing 45-page architectural PDF...",
      "Extracting 24 line items (cabinets, countertops, fixtures).",
      "Cross-referencing pricing with supplier API.",
      "Generating Bill of Materials (BOM) and updating job record."
    ],
    initialRows: [
      { id: "JOB-105", name: "Marlowe Residence", detail: "Deck Repair", value: "In Progress", status: "active", label: "In Progress" },
      { id: "JOB-104", name: "Oakridge HOA", detail: "Clubhouse Reno", value: "$85,000", status: "active", label: "In Progress" }
    ],
    activeRow: { id: "JOB-106", name: "Dana Whitfield", detail: "Kitchen Remodel", value: "PDF Received", status: "pending", label: "Needs Estimate" },
    newRow: { id: "JOB-106", name: "Dana Whitfield", detail: "BOM Generated ($34,200)", value: "Ready for Review", status: "new", label: "Estimate Ready" },
    actionText: "Review BOM"
  },
  logistics: {
    company: "Copperfield Freight",
    nav: "Dispatches",
    title: "Dispatch Board",
    tableHeaders: ["Load Status", "Load ID", "Route / Details", "Actions"],
    request: "Truck #42 is stuck at the border. Extract the customs docs from my email and push them to the broker.",
    reasoning: [
      "Scanning driver email thread for attachments.",
      "Found 3 missing customs documents (Commercial Invoice, Packing List).",
      "Extracting load data from TMS and merging with PDFs.",
      "Emailing completed packet to Customs Broker."
    ],
    initialRows: [
      { id: "TRK-19", name: "Load #8822", detail: "Waco -> Houston", value: "En Route", status: "active", label: "En Route" },
      { id: "TRK-77", name: "Load #8830", detail: "Austin -> Dallas", value: "Loading", status: "active", label: "Loading" }
    ],
    activeRow: { id: "TRK-42", name: "Load #8821", detail: "Laredo Border Crossing", value: "Held at Border", status: "pending", label: "Customs Hold" },
    newRow: { id: "TRK-42", name: "Load #8821", detail: "Laredo Border Crossing", value: "Docs Sent to Broker", status: "new", label: "Cleared for Entry" },
    actionText: "View Docs"
  },
  retail: {
    company: "Aurora Supply",
    nav: "Inventory",
    title: "Inventory Sync",
    tableHeaders: ["Sync Status", "SKU", "Product Name", "Actions"],
    request: "Reconcile today's Shopify sales against the warehouse inventory spreadsheet.",
    reasoning: [
      "Pulling today's sales from Shopify API...",
      "Reading current stock levels from Google Sheets.",
      "Detected discrepancy: SKU-441 shows 0 stock but 3 orders pending.",
      "Syncing data and issuing restock alert."
    ],
    initialRows: [
      { id: "SKU-109", name: "Tinned Fish", detail: "45 in stock", value: "Synced", status: "active", label: "Synced" },
      { id: "SKU-882", name: "Olive Oil", detail: "14 in stock", value: "Synced", status: "active", label: "Synced" }
    ],
    activeRow: { id: "SKU-441", name: "Holiday Gift Box", detail: "0 in stock", value: "Oversold", status: "pending", label: "Needs Attention" },
    newRow: { id: "SKU-441", name: "Holiday Gift Box", detail: "0 in stock", value: "Restock Ordered (50)", status: "new", label: "Reconciled" },
    actionText: "View PO"
  },
  realestate: {
    company: "Hearthline Realty",
    nav: "Leads",
    title: "Lead Inbox",
    tableHeaders: ["Lead Status", "Lead ID", "Property / Budget", "Actions"],
    request: "A new Zillow lead just came in. Pre-qualify them and book a showing if they fit the Alder Lane property.",
    reasoning: [
      "Receiving Zillow webhook for Rachel Montgomery.",
      "Checking buyer budget: Pre-approved up to $720k.",
      "Property matches: 14 Alder Lane ($705k).",
      "Sending SMS to buyer with 3 available showing times."
    ],
    initialRows: [
      { id: "L-802", name: "Daniel Wu", detail: "Buyer - HOA Qs", value: "$550k", status: "active", label: "Follow-up" },
      { id: "L-799", name: "Sarah Jenkins", detail: "Buyer - 3 Bed", value: "$800k", status: "active", label: "Showing Booked" }
    ],
    activeRow: { id: "L-801", name: "Rachel Montgomery", detail: "14 Alder Lane Lead", value: "Unqualified", status: "pending", label: "New Lead" },
    newRow: { id: "L-801", name: "Rachel Montgomery", detail: "14 Alder Lane (Sat 11 AM)", value: "Pre-approved", status: "new", label: "Showing Booked" },
    actionText: "View Calendar"
  },
  dental: {
    company: "Brightwater Dental",
    nav: "Claims",
    title: "Insurance Claims",
    tableHeaders: ["Claim Status", "Patient", "Procedure", "Actions"],
    request: "Delta Dental denied claim #9921 for a root canal. Appeal the denial based on the attached X-ray.",
    reasoning: [
      "Reading denial code (D3330) from Delta Dental portal.",
      "Extracting clinical notes and X-ray from patient chart.",
      "Drafting medical necessity appeal letter...",
      "Submitting appeal via insurance API."
    ],
    initialRows: [
      { id: "CLM-101", name: "Sophia Bennett", detail: "Cleaning", value: "Approved", status: "active", label: "Approved" },
      { id: "CLM-102", name: "David Chen", detail: "Crown", value: "Processing", status: "active", label: "Processing" }
    ],
    activeRow: { id: "CLM-103", name: "Michael Kensington", detail: "Root Canal", value: "Denied", status: "pending", label: "Claim Denied" },
    newRow: { id: "CLM-103", name: "Michael Kensington", detail: "Root Canal", value: "Appeal Submitted", status: "new", label: "Under Appeal" },
    actionText: "View Appeal"
  }
};