/* =========================================
   HERO ANIMATION DATA
   Add or edit scenarios here.
   ========================================= */

window.ECHO_HERO_DATA = {
  construction: {
    company: "Northgate Build",
    nav: "Jobs",
    title: "Active Jobs",
    request: "Need a quote for a 200 sq ft kitchen remodel in Oakridge.",
    reasoning: [
      "Reading email from Dana Whitfield.",
      "Checking service area: Oakridge is in-zone.",
      "Calculating estimate range: $28k - $42k.",
      "Drafting reply and scheduling site visit."
    ],
    initialRows: [
      { id: "JOB-104", name: "Dana Whitfield", detail: "Kitchen Remodel", value: "$35,000", status: "active", label: "In Progress" },
      { id: "JOB-105", name: "Marlowe Residence", detail: "Deck Repair", value: "$4,500", status: "active", label: "In Progress" }
    ],
    newRow: { id: "JOB-106", name: "Dana Whitfield", detail: "Kitchen Remodel (New)", value: "$35,000", status: "new", label: "Needs Review" },
    actionText: "Site Visit Booked"
  },
  logistics: {
    company: "Copperfield Freight",
    nav: "Dispatches",
    title: "Dispatch Board",
    request: "Truck 42 broke down in Dallas. Reroute the load to Truck 19.",
    reasoning: [
      "Receiving SMS from driver.",
      "Checking Truck 19 location: 20 miles away.",
      "Verifying HOS (Hours of Service) for Driver B.",
      "Rerouting load and notifying client."
    ],
    initialRows: [
      { id: "TRK-42", name: "Load #8821", detail: "Dallas -> Austin", value: "$1,200", status: "pending", label: "Broken Down" },
      { id: "TRK-19", name: "Load #8822", detail: "Waco -> Houston", value: "$950", status: "active", label: "En Route" }
    ],
    newRow: { id: "TRK-19", name: "Load #8821", detail: "Dallas -> Austin (Rerouted)", value: "$1,200", status: "new", label: "Reassigned" },
    actionText: "Route Updated"
  },
  retail: {
    company: "Aurora Supply",
    nav: "Orders",
    title: "Orders",
    request: "Did the bulk order for 400 units of AR-2210 ship yet?",
    reasoning: [
      "Searching order database for AR-2210.",
      "Found order #4810 for Aurora Retail Group.",
      "Checking warehouse status: Packed.",
      "Replying with tracking number."
    ],
    initialRows: [
      { id: "ORD-4809", name: "Lena Morrison", detail: "Retail Order", value: "$120", status: "active", label: "Shipped" },
      { id: "ORD-4810", name: "Aurora Retail", detail: "Bulk Order (400x)", value: "$7,360", status: "pending", label: "Packing" }
    ],
    newRow: { id: "ORD-4810", name: "Aurora Retail", detail: "Bulk Order (400x)", value: "$7,360", status: "new", label: "Shipped" },
    actionText: "Tracking Sent"
  },
  realestate: {
    company: "Hearthline Realty",
    nav: "Showings",
    title: "Active Leads",
    request: "Can we schedule a showing for 14 Alder Lane this Saturday?",
    reasoning: [
      "Checking calendar for Saturday.",
      "Found open slot: 11:00 AM.",
      "Matching property: 14 Alder Lane ($705k).",
      "Sending confirmation SMS to buyer."
    ],
    initialRows: [
      { id: "L-801", name: "Rachel Montgomery", detail: "Buyer - 3 Bed", value: "$700k", status: "active", label: "Active" },
      { id: "L-802", name: "Daniel Wu", detail: "Buyer - HOA Qs", value: "$550k", status: "pending", label: "Follow-up" }
    ],
    newRow: { id: "L-801", name: "Rachel Montgomery", detail: "14 Alder Lane (Sat 11 AM)", value: "$705k", status: "new", label: "Showing Booked" },
    actionText: "Calendar Updated"
  },
  dental: {
    company: "Brightwater Dental",
    nav: "Appointments",
    title: "Today's Schedule",
    request: "I need to reschedule my cleaning from Thursday to next week.",
    reasoning: [
      "Identifying patient: Michael Kensington.",
      "Checking next week availability: Tue 10:30 AM.",
      "Canceling Thursday 3:00 PM slot.",
      "Issuing SMS confirmation link."
    ],
    initialRows: [
      { id: "APT-201", name: "Sophia Bennett", detail: "New Patient Cleaning", value: "$150", status: "active", label: "Confirmed" },
      { id: "APT-202", name: "Michael Kensington", detail: "Cleaning (Thursday)", value: "$150", status: "pending", label: "Scheduled" }
    ],
    newRow: { id: "APT-202", name: "Michael Kensington", detail: "Cleaning (Tue 10:30 AM)", value: "$150", status: "new", label: "Rescheduled" },
    actionText: "SMS Sent"
  }
};