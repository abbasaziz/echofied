/* =========================================
   INTEGRATIONS DATA
   ========================================= */

window.ECHO_INTEGRATION_SYSTEMS = {
  salesforce: {
    name: "Salesforce",
    method: "API · OAuth",
    read: "Accounts, opportunities, cases",
    guardrails: "Each user sees only what Salesforce lets them see",
    outcome: "Knowledge graph synced",
    actionTitle: "AI Agent Works",
    actionDesc: "Drafts follow-up email",
    resultTitle: "You Get",
    resultDesc: "Routed to Sales Rep"
  },
  stripe: {
    name: "Stripe",
    method: "API · Scoped Key",
    read: "Invoices, subscriptions",
    guardrails: "PCI compliant. Zero card data stored.",
    outcome: "Revenue metrics synced",
    actionTitle: "AI Agent Works",
    actionDesc: "Updates CRM deal stage",
    resultTitle: "You Recover",
    resultDesc: "Lost revenue from churn"
  },
  xero: {
    name: "Xero",
    method: "API · UK/EU",
    read: "Bank transactions, payroll",
    guardrails: "Financial data masked. Bank details redacted.",
    outcome: "Client billing synced",
    actionTitle: "AI Agent Works",
    actionDesc: "Flags overdue invoice",
    resultTitle: "You Get Paid",
    resultDesc: "Faster cash flow"
  },
  sap: {
    name: "SAP ERP",
    method: "ODBC · Legacy",
    read: "Inventory, purchase orders",
    guardrails: "Read-only replica. DB credentials never exposed.",
    outcome: "Supply chain delays mapped",
    actionTitle: "AI Agent Works",
    actionDesc: "Alerts ops team on Slack",
    resultTitle: "You Avoid",
    resultDesc: "Costly stockouts"
  }
};