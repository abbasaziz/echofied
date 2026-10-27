/* Demo data for four industries. Western company and contact names.
   Avatar gradients stay within the blue/gray family so the page theme remains
   black / white / gray / notification blue. */
window.ECHO_DEMO_DATA = {
  construction: {
    badgeCrm: 'Sheet',
    inbox: [
      {
        initials: 'NG',
        c1: '#0a84ff', c2: '#3aa0ff',
        name: 'Northgate Build Co.',
        from: 'dana.whitfield@northgatebuild.com',
        subject: 'Kitchen remodel quote for next month',
        body: 'Hi, we need a quote for a full kitchen remodel in the Oakridge area. Roughly 220 sq ft.',
        channel: 'Email'
      },
      {
        initials: 'MR',
        c1: '#3aa0ff', c2: '#7ab8ff',
        name: 'Marlowe Residence',
        from: 'Inbound call · +1 (415) 555-0184',
        subject: 'Deck repair follow-up',
        body: 'Caller wants to confirm if the deck repair estimate from last week still stands.',
        channel: 'Call'
      },
      {
        initials: 'CF',
        c1: '#1f1f1f', c2: '#4d4d4d',
        name: 'Vertex Freight',
        from: 'ops@vertexfreight.com',
        subject: 'Warehouse partition — site visit request',
        body: 'Can someone visit our Sacramento warehouse on Thursday to scope a partition wall?',
        channel: 'Email'
      }
    ],
    agentSteps: [
      'Reading the email and matching it to the Kitchen Remodel service line.',
      'Checking availability: site visit slots open Thursday 9:00 AM and 1:30 PM.',
      'Drafting a reply with two visit times and a ballpark range.',
      'Logging the lead in the Sheet and assigning priority: High.'
    ],
    crm: [
      { name: 'Dana Whitfield', company: 'Northgate Build Co.', status: 'New lead', tag: 'High' },
      { name: 'Marlowe Residence', company: 'Homeowner', status: 'Follow-up', tag: 'Warm' },
      { name: 'Vertex Freight', company: 'Vertex Freight', status: 'Site visit', tag: 'Booked' }
    ],
    drafts: [
      {
        to: 'dana.whitfield@northgatebuild.com',
        subject: 'Re: Kitchen remodel quote — two visit slots',
        body: 'Hi Dana, thanks for reaching out. We have Thursday 9:00 AM or 1:30 PM open for a site visit. A 220 sq ft kitchen remodel typically lands between $28,000 and $42,000 depending on finishes. Which slot works best?'
      },
      {
        to: 'Inbound call · +1 (415) 555-0184',
        subject: 'SMS confirmation — Deck repair estimate',
        body: 'Hi, this is Northgate Build Co. confirming your deck repair estimate is valid through the end of the month. Reply YES to schedule the visit.'
      }
    ]
  },

  ecommerce: {
    badgeCrm: 'GoHighLevel',
    inbox: [
      {
        initials: 'AR',
        c1: '#0a84ff', c2: '#3aa0ff',
        name: 'Aurora Retail Group',
        from: 'support@auroraretail.com',
        subject: 'Bulk order — 400 units of SKU AR-2210',
        body: 'We need 400 units of SKU AR-2210 delivered to our Denver DC by the 22nd. Can you confirm pricing and lead time?',
        channel: 'Email'
      },
      {
        initials: 'LM',
        c1: '#3aa0ff', c2: '#7ab8ff',
        name: 'Lena Morrison',
        from: 'lena.morrison@gmail.com',
        subject: 'Return request — order #48210',
        body: 'The jacket I ordered arrived with a broken zipper. I would like a replacement or refund.',
        channel: 'Email'
      },
      {
        initials: 'BS',
        c1: '#1f1f1f', c2: '#4d4d4d',
        name: 'Brightside Outfitters',
        from: 'Inbound call · +1 (312) 555-0177',
        subject: 'Wholesale application status',
        body: 'Caller wants to know if their wholesale application from last week has been approved.',
        channel: 'Call'
      }
    ],
    agentSteps: [
      'Identifying Aurora Retail Group as an existing wholesale account.',
      'Checking inventory: 612 units of AR-2210 available at Denver DC.',
      'Preparing a quote with tier-2 wholesale pricing and a 5-day lead time.',
      'Creating an opportunity in GoHighLevel and tagging it Priority.'
    ],
    crm: [
      { name: 'Aurora Retail Group', company: 'Wholesale', status: 'Quote sent', tag: 'Tier 2' },
      { name: 'Lena Morrison', company: 'Retail', status: 'Return opened', tag: 'Refund' },
      { name: 'Brightside Outfitters', company: 'Wholesale applicant', status: 'Approved', tag: 'New' }
    ],
    drafts: [
      {
        to: 'support@auroraretail.com',
        subject: 'Re: Bulk order — 400 units of AR-2210',
        body: 'Hi Aurora team, we have 612 units of AR-2210 ready at our Denver DC. Tier-2 wholesale pricing applies at $18.40/unit, total $7,360. Standard lead time is 5 business days. Reply to confirm and we will reserve the stock.'
      },
      {
        to: 'lena.morrison@gmail.com',
        subject: 'Re: Return request — order #48210',
        body: 'Hi Lena, sorry about the zipper. We have a replacement in your size ready to ship today at no cost. If you would rather have a refund, reply REFUND and we will process it within 24 hours.'
      }
    ]
  },

  realestate: {
    badgeCrm: 'HubSpot',
    inbox: [
      {
        initials: 'HT',
        c1: '#0a84ff', c2: '#3aa0ff',
        name: 'Summit Realty',
        from: 'jordan.tate@Summit Realty.com',
        subject: 'New buyer lead — 3 bed in Willow Creek',
        body: 'A couple is pre-approved up to $720k for a 3 bed in Willow Creek. Looking to move within 60 days.',
        channel: 'Email'
      },
      {
        initials: 'RM',
        c1: '#3aa0ff', c2: '#7ab8ff',
        name: 'Rachel Montgomery',
        from: 'Inbound call · +1 (206) 555-0113',
        subject: 'Showing request for 14 Alder Lane',
        body: 'Caller wants to see 14 Alder Lane this Saturday between 10 AM and 2 PM.',
        channel: 'Call'
      },
      {
        initials: 'DW',
        c1: '#1f1f1f', c2: '#4d4d4d',
        name: 'Daniel Wu',
        from: 'daniel.wu@protonmail.com',
        subject: 'Question about HOA fees at Cedar Park',
        body: 'Before we make an offer, can you confirm the monthly HOA fee and what it covers at Cedar Park?',
        channel: 'Email'
      }
    ],
    agentSteps: [
      'Tagging Jordan Tate as a top-producing partner agent.',
      'Matching the buyer profile to 3 active listings in Willow Creek.',
      'Holding two Saturday showing slots for 14 Alder Lane.',
      'Creating a deal in HubSpot and setting follow-up for tomorrow 9 AM.'
    ],
    crm: [
      { name: 'Jordan Tate', company: 'Summit Realty', status: 'Deal created', tag: 'Buyer' },
      { name: 'Rachel Montgomery', company: 'Buyer', status: 'Showing booked', tag: 'Sat 11' },
      { name: 'Daniel Wu', company: 'Buyer', status: 'Question', tag: 'HOA' }
    ],
    drafts: [
      {
        to: 'jordan.tate@Summit Realty.com',
        subject: 'Re: New buyer lead — 3 bed in Willow Creek',
        body: 'Hi Jordan, matched your buyers to three active Willow Creek listings: 14 Alder Lane ($705k), 22 Birch Court ($712k), and 8 Fern Way ($698k). All three fit the 60-day timeline. Want me to book back-to-back showings this Saturday?'
      },
      {
        to: 'daniel.wu@protonmail.com',
        subject: 'Re: HOA fees at Cedar Park',
        body: 'Hi Daniel, the Cedar Park HOA is $185/month and covers landscaping, the community pool, and exterior maintenance on shared structures. Roofs are covered under a separate reserve. Happy to send the full HOA packet.'
      }
    ]
  },

  clinic: {
    badgeCrm: 'Salesforce',
    inbox: [
      {
        initials: 'BD',
        c1: '#0a84ff', c2: '#3aa0ff',
        name: 'Brightwater Dental',
        from: 'priya.raman@brightwaterdental.com',
        subject: 'New patient — cleaning + X-ray',
        body: 'Can you fit in a new patient for a cleaning and X-ray this Friday afternoon?',
        channel: 'Email'
      },
      {
        initials: 'MK',
        c1: '#3aa0ff', c2: '#7ab8ff',
        name: 'Michael Kensington',
        from: 'Inbound call · +1 (617) 555-0169',
        subject: 'Reschedule Thursday appointment',
        body: 'Caller wants to move their Thursday 3:00 PM cleaning to next week.',
        channel: 'Call'
      },
      {
        initials: 'SB',
        c1: '#1f1f1f', c2: '#4d4d4d',
        name: 'Sophia Bennett',
        from: 'sophia.bennett@outlook.com',
        subject: 'Insurance coverage question',
        body: 'Does Brightwater accept Delta Dental PPO? I want to book a first visit if so.',
        channel: 'Email'
      }
    ],
    agentSteps: [
      'Confirming Friday 2:15 PM is open for a new patient cleaning and X-ray.',
      'Verifying Delta Dental PPO is accepted and in-network.',
      'Preparing a reschedule link for Michael Kensington with 3 options.',
      'Creating patient records in Salesforce and flagging insurance verification.'
    ],
    crm: [
      { name: 'New patient · Friday', company: 'Brightwater Dental', status: 'Booked', tag: '2:15 PM' },
      { name: 'Michael Kensington', company: 'Patient', status: 'Reschedule link sent', tag: 'SMS' },
      { name: 'Sophia Bennett', company: 'New patient', status: 'Insurance verified', tag: 'Delta' }
    ],
    drafts: [
      {
        to: 'priya.raman@brightwaterdental.com',
        subject: 'Re: New patient — cleaning + X-ray',
        body: 'Hi Priya, we have Friday 2:15 PM open for a new patient cleaning and X-ray. I have booked it and flagged the chart for insurance verification. The patient will get an SMS confirmation within a minute.'
      },
      {
        to: 'sophia.bennett@outlook.com',
        subject: 'Re: Insurance coverage question',
        body: 'Hi Sophia, yes — Brightwater Dental is in-network with Delta Dental PPO. Cleanings and routine X-rays are covered at 100% for preventive care. Would you like me to book your first visit? I have Tuesday 10:30 AM and Thursday 4:00 PM open.'
      }
    ]
  }
};