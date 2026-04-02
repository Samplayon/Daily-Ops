const sourceBlocks = [
  { label: "8a-11a", start: 8, end: 11 },
  { label: "11a-2p", start: 11, end: 14 },
  { label: "2p-5p", start: 14, end: 17 },
  { label: "5p-6p", start: 17, end: 18 },
  { label: "6p-7p", start: 18, end: 19 },
  { label: "7p-8p", start: 19, end: 20 },
  { label: "8p-10p", start: 20, end: 22 },
  { label: "10p-12a", start: 22, end: 24 },
];

function hourLabel(hour) {
  const normalized = hour % 24;
  const suffix = normalized >= 12 ? "p" : "a";
  const displayHour = normalized % 12 === 0 ? 12 : normalized % 12;
  return `${displayHour}${suffix}`;
}

const baseEditableSkillAssignments = [
  "Tier 2 Phones",
  "Disputes",
  "School Support Queue",
  "FST Queue",
  "Data Requests",
  "Calibrations",
  "Game Reports",
];
const LEGACY_ADMIN_PASSWORD = "1234";
const acoNames = new Set([
  "Adam Nye",
  "Alyssa Tankersley",
  "Ashtyn Bailey",
  "Camaron King",
  "Elvis Vu",
  "Jarrett Todd",
  "Jason Bremermann",
  "Kahlil Lambert",
  "Mark Brand",
  "Andrew Wood",
  "Autura Carson",
  "Cameron Fisk",
  "Charles McGinty",
  "Jules Lindsay",
  "Nelly Corona",
  "Kesa Brown",
  "Kacy Coulombe",
  "Nicholas Brawner",
]);

const timeBlocks = Array.from({ length: 16 }, (_, index) => {
  const start = 8 + index;
  const end = start + 1;
  return {
    label: `${hourLabel(start)}-${hourLabel(end)}`,
    start,
    end,
  };
});

const rawInitialTeam = [
  {
    "name": "Ireal James",
    "title": "Support Specialist 2",
    "manager": "Dohnny",
    "schedule": "8am - 5pm",
    "states": "Indiana, New Mexico, South Dakota",
    "assignments": [
      [
        "Tier 2 Phones",
        true
      ],
      [
        "School Support Queue",
        false
      ],
      [
        "School Support Queue",
        false
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ]
    ]
  },
  {
    "name": "Nick Broadie",
    "title": "Support Specialist 2",
    "manager": "Dohnny",
    "schedule": "8am - 5pm",
    "states": "Arkansas, Oregon, Mississippi",
    "assignments": [
      [
        "Tier 2 Phones",
        true
      ],
      [
        "School Support Queue",
        false
      ],
      [
        "Tier 2 Phones",
        true
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ]
    ]
  },
  {
    "name": "Nauman Khan",
    "title": "Support Specialist 2",
    "manager": "Dohnny",
    "schedule": "9am - 6pm",
    "states": "Delaware, South Carolina, Arizona",
    "assignments": [
      [
        "Disputes",
        false
      ],
      [
        "Tier 2 Phones",
        true
      ],
      [
        "School Support Queue",
        false
      ],
      [
        "Tier 2 Phones",
        true
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ]
    ]
  },
  {
    "name": "Michael Rakestraw",
    "title": "Support Specialist 2",
    "manager": "Sam",
    "schedule": "10 am - 7pm",
    "states": "Connecticut, California, Arkansas",
    "assignments": [
      [
        "School Support Queue",
        false
      ],
      [
        "School Support Queue",
        false
      ],
      [
        "Tier 2 Phones",
        true
      ],
      [
        "Tier 2 Phones",
        true
      ],
      [
        "School Support Queue",
        false
      ],
      [
        "School Support Queue",
        false
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ]
    ]
  },
  {
    "name": "Evan Nutsugah",
    "title": "Support Specialist 2",
    "manager": "Dohnny",
    "schedule": "10 am - 7pm",
    "states": "Iowa, Tennessee, Rhode Island",
    "assignments": [
      [
        "School Support Queue",
        false
      ],
      [
        "Tier 2 Phones",
        true
      ],
      [
        "Tier 2 Phones",
        true
      ],
      [
        "School Support Queue",
        false
      ],
      [
        "School Support Queue",
        false
      ],
      [
        "School Support Queue",
        false
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ]
    ]
  },
  {
    "name": "Tyler Todd",
    "title": "Support Specialist 2",
    "manager": "Sam",
    "schedule": "10 am - 7pm",
    "states": "Minnesota, Alaska, North Carolina",
    "assignments": [
      [
        "OOO/Sick/PTO",
        false
      ],
      [
        "OOO/Sick/PTO",
        false
      ],
      [
        "OOO/Sick/PTO",
        false
      ],
      [
        "OOO/Sick/PTO",
        false
      ],
      [
        "OOO/Sick/PTO",
        false
      ],
      [
        "OOO/Sick/PTO",
        false
      ],
      [
        "OOO/Sick/PTO",
        false
      ],
      [
        "OOO/Sick/PTO",
        false
      ]
    ]
  },
  {
    "name": "Mason Roach",
    "title": "Support Specialist 2",
    "manager": "Dohnny",
    "schedule": "11 am - 8pm",
    "states": "Florida, Nevada, Minnesota",
    "assignments": [
      [
        "",
        false
      ],
      [
        "Tier 2 Phones",
        true
      ],
      [
        "Calibrations",
        false
      ],
      [
        "School Support Queue",
        false
      ],
      [
        "School Support Queue",
        false
      ],
      [
        "School Support Queue",
        false
      ],
      [
        "School Support Queue",
        false
      ],
      [
        "",
        false
      ]
    ]
  },
  {
    "name": "Ezra Mix",
    "title": "Support Specialist 2",
    "manager": "Nick",
    "schedule": "3pm-12am",
    "states": "Connecticut, Kansas, Maine",
    "assignments": [
      [
        "",
        false
      ],
      [
        "",
        false
      ],
      [
        "Tier 2 Phones",
        false
      ],
      [
        "Game Reports",
        false
      ],
      [
        "Game Reports",
        false
      ],
      [
        "Game Reports",
        false
      ],
      [
        "Tier 2 Phones",
        true
      ],
      [
        "All Channels",
        false
      ]
    ]
  },
  {
    "name": "Lilith Sharp",
    "title": "Support Specialist 2",
    "manager": "Nick",
    "schedule": "3pm-12am",
    "states": "Michigan, Ohio, Oregon",
    "assignments": [
      [
        "",
        false
      ],
      [
        "School Support Queue",
        false
      ],
      [
        "School Support Queue",
        false
      ],
      [
        "OOO/Sick/PTO",
        false
      ],
      [
        "OOO/Sick/PTO",
        false
      ],
      [
        "OOO/Sick/PTO",
        false
      ],
      [
        "OOO/Sick/PTO",
        false
      ],
      [
        "OOO/Sick/PTO",
        false
      ]
    ]
  },
  {
    "name": "Kenneth House",
    "title": "Senior Support Analyst",
    "manager": "Dohnny",
    "schedule": "8:30 am - 5:30 pm",
    "states": "",
    "assignments": [
      [
        "Calibrations",
        false
      ],
      [
        "Disputes",
        false
      ],
      [
        "Disputes",
        false
      ],
      [
        "Calibrations",
        false
      ],
      [
        "Calibrations",
        false
      ],
      [
        "Calibrations",
        false
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ]
    ]
  },
  {
    "name": "Justin Son",
    "title": "Senior Support Specialist",
    "manager": "Dohnny",
    "schedule": "9 am - 6 pm",
    "states": "",
    "assignments": [
      [
        "Tier 2 Phones",
        true
      ],
      [
        "Flex",
        false
      ],
      [
        "Flex",
        false
      ],
      [
        "Flex",
        false
      ],
      [
        "Flex",
        false
      ],
      [
        "Flex",
        false
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ]
    ]
  },
  {
    "name": "Johnny Huynh",
    "title": "Senior Support Specialist",
    "manager": "Sam",
    "schedule": "10 am - 7pm",
    "states": "",
    "assignments": [
      [
        "Flex",
        false
      ],
      [
        "Data Requests",
        false
      ],
      [
        "Flex",
        false
      ],
      [
        "Flex",
        false
      ],
      [
        "Flex",
        false
      ],
      [
        "Flex",
        false
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ]
    ]
  },
  {
    "name": "Lydia Mercado",
    "title": "Senior Support Specialist",
    "manager": "Nick",
    "schedule": "11pm - 8pm",
    "states": "",
    "assignments": [
      [
        "",
        false
      ],
      [
        "Flex",
        false
      ],
      [
        "Flex",
        false
      ],
      [
        "Flex",
        false
      ],
      [
        "Flex",
        false
      ],
      [
        "Flex",
        false
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ]
    ]
  },
  {
    "name": "Jeremy Turner",
    "title": "Senior Support Specialist",
    "manager": "Sam",
    "schedule": "OFF",
    "states": "",
    "assignments": [
      [
        "",
        false
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ]
    ]
  },
  {
    "name": "Katie Manis",
    "title": "Support Specialist 1",
    "manager": "Dohnny",
    "schedule": "1pm - 10pm",
    "states": "Montana, New Jersey, Virginia",
    "assignments": [
      [
        "",
        false
      ],
      [
        "Calibrations",
        false
      ],
      [
        "Tier 2 Phones",
        true
      ],
      [
        "Data Requests",
        false
      ],
      [
        "Data Requests",
        false
      ],
      [
        "Data Requests",
        false
      ],
      [
        "Tier 2 Phones",
        true
      ],
      [
        "",
        false
      ]
    ]
  },
  {
    "name": "Michael Gettemy",
    "title": "Support Specialist 1",
    "manager": "Sam",
    "schedule": "8am-5pm",
    "states": "Alabama, Iowa, Louisiana",
    "assignments": [
      [
        "Tier 2 Phones",
        true
      ],
      [
        "FST Queue",
        false
      ],
      [
        "Tier 2 Phones",
        true
      ],
      [
        "FST Queue",
        false
      ],
      [
        "FST Queue",
        false
      ],
      [
        "FST Queue",
        false
      ],
      [
        "FST Queue",
        false
      ],
      [
        "",
        false
      ]
    ]
  },
  {
    "name": "Morticia Hollis",
    "title": "Support Specialist 1",
    "manager": "Nick",
    "schedule": "11 am - 8pm",
    "states": "Wisconsin, New York, Missouri",
    "assignments": [
      [
        "",
        false
      ],
      [
        "FST Queue",
        false
      ],
      [
        "Disputes",
        false
      ],
      [
        "Tier 2 Phones",
        true
      ],
      [
        "Tier 2 Phones",
        true
      ],
      [
        "Tier 2 Phones",
        true
      ],
      [
        "FST Queue",
        false
      ],
      [
        "",
        false
      ]
    ]
  },
  {
    "name": "Rachel Williamson",
    "title": "Support Specialist 1",
    "manager": "Nick",
    "schedule": "1pm - 10pm",
    "states": "Arkansas, Utah, Texas",
    "assignments": [
      [
        "",
        false
      ],
      [
        "",
        true
      ],
      [
        "FST Queue",
        false
      ],
      [
        "Tier 2 Phones",
        true
      ],
      [
        "Tier 2 Phones",
        true
      ],
      [
        "Tier 2 Phones",
        true
      ],
      [
        "FST Queue",
        false
      ],
      [
        "",
        false
      ]
    ]
  },
  {
    "name": "Amie Brannon",
    "title": "Support Specialist 1",
    "manager": "Nick",
    "schedule": "3pm - 12pm",
    "states": "Colorado, Minnesota, Texas",
    "assignments": [
      [
        "OOO/Sick/PTO",
        false
      ],
      [
        "OOO/Sick/PTO",
        false
      ],
      [
        "OOO/Sick/PTO",
        false
      ],
      [
        "OOO/Sick/PTO",
        false
      ],
      [
        "OOO/Sick/PTO",
        false
      ],
      [
        "OOO/Sick/PTO",
        false
      ],
      [
        "OOO/Sick/PTO",
        false
      ],
      [
        "OOO/Sick/PTO",
        false
      ]
    ]
  },
  {
    "name": "Sunshine Patterson",
    "title": "Support Specialist 1",
    "manager": "Sam",
    "schedule": "1pm-10pm",
    "states": "Georgia, Colorado, West Virginia",
    "assignments": [
      [
        "",
        false
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ]
    ]
  },
  {
    "name": "Kirah Martin",
    "title": "Support Specialist 1",
    "manager": "Sam",
    "schedule": "1pm - 10pm",
    "states": "Kansas, Illinois, Oklahoma",
    "assignments": [
      [
        "",
        false
      ],
      [
        "",
        false
      ],
      [
        "FST Queue",
        false
      ],
      [
        "FST Queue",
        false
      ],
      [
        "FST Queue",
        false
      ],
      [
        "FST Queue",
        false
      ],
      [
        "Tier 2 Phones",
        true
      ],
      [
        "All Channels",
        true
      ]
    ]
  },
  {
    "name": "Cesia Valencia-Torres",
    "title": "Fan Support Specialists",
    "manager": "Dohnny",
    "schedule": "8 am - 5 pm (M-F/T-Sat)",
    "states": "",
    "assignments": [
      [
        "FST Queue",
        false
      ],
      [
        "FST Queue",
        false
      ],
      [
        "FST Queue",
        false
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ]
    ]
  },
  {
    "name": "Kyle Snider",
    "title": "Fan Support Specialists",
    "manager": "Nick",
    "schedule": "10am - 4pm",
    "states": "",
    "assignments": [
      [
        "Data Requests",
        false
      ],
      [
        "Data Requests",
        false
      ],
      [
        "FST Queue",
        false
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ]
    ]
  },
  {
    "name": "Mattie McMillan-Benton",
    "title": "Fan Support Specialists",
    "manager": "Sam",
    "schedule": "10 am - 7pm",
    "states": "",
    "assignments": [
      [
        "Disputes",
        false
      ],
      [
        "FST Queue",
        false
      ],
      [
        "FST Queue",
        false
      ],
      [
        "FST Queue",
        false
      ],
      [
        "FST Queue",
        false
      ],
      [
        "FST Queue",
        false
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ]
    ]
  },
  {
    "name": "Ryan Gant",
    "title": "Fan Support Specialists",
    "manager": "Nick",
    "schedule": "3 pm - 12 pm",
    "states": "",
    "assignments": [
      [
        "",
        false
      ],
      [
        "",
        false
      ],
      [
        "FST Queue",
        false
      ],
      [
        "FST Queue",
        false
      ],
      [
        "FST Queue",
        false
      ],
      [
        "FST Queue",
        false
      ],
      [
        "FST Queue",
        false
      ],
      [
        "FST Queue",
        false
      ]
    ]
  },
  {
    "name": "Ebony Kelsey",
    "title": "Fan Support Specialists",
    "manager": "Nick",
    "schedule": "6 pm - 11 pm",
    "states": "",
    "assignments": [
      [
        "",
        false
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ],
      [
        "FST Queue",
        false
      ],
      [
        "FST Queue",
        false
      ],
      [
        "FST Queue",
        false
      ],
      [
        "FST Queue",
        false
      ],
      [
        "FST Queue",
        false
      ]
    ]
  },
  {
    "name": "Antionette Brown",
    "title": "Fan Support Specialists",
    "manager": "Dohnny",
    "schedule": "10 am - 7pm",
    "states": "",
    "assignments": [
      [
        "FST Queue",
        false
      ],
      [
        "FST Queue",
        false
      ],
      [
        "FST Queue",
        false
      ],
      [
        "Login Issues",
        false
      ],
      [
        "Login Issues",
        false
      ],
      [
        "Login Issues",
        false
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ]
    ]
  },
  {
    "name": "Anderson Stapleton",
    "title": "Lead Fan Support Specialists",
    "manager": "Sam",
    "schedule": "2 pm - 11 pm",
    "states": "",
    "assignments": [
      [
        "",
        false
      ],
      [
        "",
        false
      ],
      [
        "FST Queue",
        false
      ],
      [
        "FST Queue",
        false
      ],
      [
        "FST Queue",
        false
      ],
      [
        "FST Queue",
        false
      ],
      [
        "Login Issues",
        false
      ],
      [
        "Login Issues",
        false
      ]
    ]
  },
  {
    "name": "Eric Huisman",
    "title": "Fan Support Specialists 3",
    "manager": "Joseph",
    "schedule": "10 am - 7pm",
    "states": "",
    "assignments": [
      [
        "Bugs Escalation",
        false
      ],
      [
        "Bugs Escalation",
        false
      ],
      [
        "FST Queue",
        false
      ],
      [
        "FST Queue",
        true
      ],
      [
        "FST Queue",
        true
      ],
      [
        "FST Queue",
        true
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ]
    ]
  },
  {
    "name": "Sam Williamson",
    "title": "Support Manager",
    "manager": "Joseph",
    "schedule": "9a - 6p",
    "states": "",
    "assignments": [
      [
        "",
        false
      ],
      [
        "MOD",
        false
      ],
      [
        "",
        false
      ],
      [
        "",
        true
      ],
      [
        "",
        true
      ],
      [
        "",
        true
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ]
    ]
  },
  {
    "name": "Dohnny Iszard",
    "title": "Support Manager",
    "manager": "Joseph",
    "schedule": "9a - 6p",
    "states": "",
    "assignments": [
      [
        "MOD",
        false
      ],
      [
        "",
        false
      ],
      [
        "MOD",
        false
      ],
      [
        "",
        true
      ],
      [
        "",
        true
      ],
      [
        "",
        true
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ]
    ]
  },
  {
    "name": "Nick Atz",
    "title": "Support Manager",
    "manager": "Joseph",
    "schedule": "1p - 10p",
    "states": "",
    "assignments": [
      [
        "",
        false
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ],
      [
        "MOD",
        true
      ],
      [
        "MOD",
        true
      ],
      [
        "MOD",
        true
      ],
      [
        "MOD",
        false
      ],
      [
        "",
        false
      ]
    ]
  },
  {
    "name": "ADVANCED CLIENT OPERATIONS",
    "title": "Support Specialist",
    "manager": "Unknown",
    "schedule": "8am - 5pm",
    "states": "",
    "assignments": [
      [
        "",
        false
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ]
    ]
  },
  {
    "name": "Adam Nye",
    "title": "Support Analyst",
    "manager": "Erik Millan",
    "schedule": "OOO/Sick/PTO",
    "states": "0",
    "assignments": [
      [
        "OOO/Sick/PTO",
        false
      ],
      [
        "OOO/Sick/PTO",
        false
      ],
      [
        "OOO/Sick/PTO",
        false
      ],
      [
        "OOO/Sick/PTO",
        false
      ],
      [
        "OOO/Sick/PTO",
        false
      ],
      [
        "OOO/Sick/PTO",
        false
      ],
      [
        "OOO/Sick/PTO",
        false
      ],
      [
        "OOO/Sick/PTO",
        false
      ]
    ]
  },
  {
    "name": "Alyssa Tankersley",
    "title": "Support Analyst",
    "manager": "Erik Millan",
    "schedule": "8am - 5pm",
    "states": "0",
    "assignments": [
      [
        "Flex",
        true
      ],
      [
        "SSA State Assignments",
        false
      ],
      [
        "Live Monitoring",
        false
      ],
      [
        "SSA State Assignments",
        false
      ],
      [
        "Flex",
        true
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ]
    ]
  },
  {
    "name": "Ashtyn Bailey",
    "title": "Support Analyst",
    "manager": "Erik Millan",
    "schedule": "OOO/Sick/PTO",
    "states": "0",
    "assignments": [
      [
        "OOO/Sick/PTO",
        false
      ],
      [
        "OOO/Sick/PTO",
        false
      ],
      [
        "OOO/Sick/PTO",
        false
      ],
      [
        "OOO/Sick/PTO",
        false
      ],
      [
        "OOO/Sick/PTO",
        false
      ],
      [
        "OOO/Sick/PTO",
        false
      ],
      [
        "OOO/Sick/PTO",
        false
      ],
      [
        "OOO/Sick/PTO",
        false
      ]
    ]
  },
  {
    "name": "Camaron King",
    "title": "Support Analyst",
    "manager": "Erik Millan",
    "schedule": "8am - 5pm",
    "states": "0",
    "assignments": [
      [
        "SSA State Assignments",
        false
      ],
      [
        "SSA State Assignments",
        false
      ],
      [
        "Flex",
        true
      ],
      [
        "Flex",
        true
      ],
      [
        "Flex",
        true
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ]
    ]
  },
  {
    "name": "Elvis Vu",
    "title": "Support Analyst",
    "manager": "Erik Millan",
    "schedule": "SSA State Assignments",
    "states": "0",
    "assignments": [
      [
        "Flex",
        true
      ],
      [
        "SSA State Assignments",
        false
      ],
      [
        "SSA State Assignments",
        false
      ],
      [
        "Live Monitoring",
        false
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ]
    ]
  },
  {
    "name": "Jarrett Todd",
    "title": "Support Analyst",
    "manager": "Erik Millan",
    "schedule": "SSA State Assignments",
    "states": "0",
    "assignments": [
      [
        "SSA State Assignments",
        false
      ],
      [
        "Flex",
        true
      ],
      [
        "Live Monitoring",
        false
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ]
    ]
  },
  {
    "name": "Jason Bremermann",
    "title": "Support Analyst",
    "manager": "Erik Millan",
    "schedule": "Flex",
    "states": "1",
    "assignments": [
      [
        "SSA State Assignments",
        false
      ],
      [
        "SSA State Assignments",
        false
      ],
      [
        "SSA State Assignments",
        false
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ]
    ]
  },
  {
    "name": "Kahlil Lambert",
    "title": "Support Analyst",
    "manager": "Erik Millan",
    "schedule": "SSA State Assignments",
    "states": "0",
    "assignments": [
      [
        "SSA State Assignments",
        false
      ],
      [
        "SSA State Assignments",
        false
      ],
      [
        "Flex",
        true
      ],
      [
        "Flex",
        true
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ]
    ]
  },
  {
    "name": "Mark Brand",
    "title": "Support Analyst",
    "manager": "Erik Millan",
    "schedule": "SSA State Assignments",
    "states": "0",
    "assignments": [
      [
        "SSA State Assignments",
        false
      ],
      [
        "Flex",
        true
      ],
      [
        "SSA State Assignments",
        false
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ]
    ]
  },
  {
    "name": "Andrew Wood",
    "title": "Support Analyst",
    "manager": "Rachel Wolovick",
    "schedule": "Flex",
    "states": "1",
    "assignments": [
      [
        "SSA State Assignments",
        false
      ],
      [
        "SSA State Assignments",
        false
      ],
      [
        "SSA State Assignments",
        false
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ]
    ]
  },
  {
    "name": "Autura Carson",
    "title": "Support Analyst",
    "manager": "Rachel Wolovick",
    "schedule": "Flex",
    "states": "1",
    "assignments": [
      [
        "SSA State Assignments",
        false
      ],
      [
        "SSA State Assignments",
        false
      ],
      [
        "SSA State Assignments",
        false
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ]
    ]
  },
  {
    "name": "Cameron Fisk",
    "title": "Support Analyst",
    "manager": "Rachel Wolovick",
    "schedule": "SSA State Assignments",
    "states": "0",
    "assignments": [
      [
        "SSA State Assignments",
        false
      ],
      [
        "Flex",
        true
      ],
      [
        "SSA State Assignments",
        false
      ],
      [
        "Live Monitoring",
        false
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ]
    ]
  },
  {
    "name": "Charles McGinty",
    "title": "Support Analyst",
    "manager": "Rachel Wolovick",
    "schedule": "SSA State Assignments",
    "states": "0",
    "assignments": [
      [
        "SSA State Assignments",
        false
      ],
      [
        "SSA State Assignments",
        false
      ],
      [
        "Flex",
        true
      ],
      [
        "Flex",
        true
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ]
    ]
  },
  {
    "name": "Jules Lindsay",
    "title": "Support Analyst",
    "manager": "Rachel Wolovick",
    "schedule": "Flex",
    "states": "1",
    "assignments": [
      [
        "SSA State Assignments",
        false
      ],
      [
        "SSA State Assignments",
        false
      ],
      [
        "SSA State Assignments",
        false
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ]
    ]
  },
  {
    "name": "Nelly Corona",
    "title": "Support Analyst",
    "manager": "Rachel Wolovick",
    "schedule": "Flex",
    "states": "1",
    "assignments": [
      [
        "SSA State Assignments",
        false
      ],
      [
        "SSA State Assignments",
        false
      ],
      [
        "SSA State Assignments",
        false
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ]
    ]
  },
  {
    "name": "Kesa Brown",
    "title": "Support Analyst",
    "manager": "Rachel Wolovick",
    "schedule": "SSA State Assignments",
    "states": "0",
    "assignments": [
      [
        "SSA State Assignments",
        false
      ],
      [
        "Flex",
        true
      ],
      [
        "Live Monitoring",
        false
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ]
    ]
  },
  {
    "name": "Kacy Coulombe",
    "title": "Support Analyst",
    "manager": "Rachel Wolovick",
    "schedule": "8am - 5pm",
    "states": "0",
    "assignments": [
      [
        "Flex",
        true
      ],
      [
        "SSA State Assignments",
        false
      ],
      [
        "Live Monitoring",
        false
      ],
      [
        "",
        false
      ],
      [
        "Flex",
        true
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ]
    ]
  },
  {
    "name": "Nicholas Brawner",
    "title": "Support Analyst",
    "manager": "Rachel Wolovick",
    "schedule": "SSA State Assignments",
    "states": "0",
    "assignments": [
      [
        "SSA State Assignments",
        false
      ],
      [
        "SSA State Assignments",
        false
      ],
      [
        "Flex",
        true
      ],
      [
        "Flex",
        true
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ],
      [
        "",
        false
      ]
    ]
  }
];

function expandAssignments(assignments) {
  return timeBlocks.map((hourBlock) => {
    const sourceIndex = sourceBlocks.findIndex(
      (sourceBlock) =>
        hourBlock.start >= sourceBlock.start && hourBlock.end <= sourceBlock.end
    );

    if (sourceIndex === -1) return ["", false];
    const [assignment, phones] = assignments[sourceIndex] || ["", false];
    return [assignment, phones];
  });
}

function inferSkills(assignments) {
  const inferred = new Set(
    assignments
      .map(([assignment]) => assignment)
      .filter((assignment) => baseEditableSkillAssignments.includes(assignment))
  );
  return baseEditableSkillAssignments.filter((assignment) => inferred.has(assignment));
}

const initialTeam = rawInitialTeam.map((person) => ({
  ...person,
  teamGroup: acoNames.has(person.name) ? "aco" : "core",
  skills: inferSkills(person.assignments),
  assignments: expandAssignments(person.assignments),
}));

const baseAssignmentAliases = [
  { canonical: "Tier 2 Phones", phrases: ["tier 2 phones", "phones", "phone", "phone queue"] },
  { canonical: "School Support Queue", phrases: ["school support queue", "school support", "support queue"] },
  { canonical: "FST Queue", phrases: ["fst queue", "fst"] },
  { canonical: "Data Requests", phrases: ["data requests", "data request"] },
  { canonical: "Calibrations", phrases: ["calibrations", "calibration"] },
  { canonical: "Disputes", phrases: ["disputes", "dispute"] },
  { canonical: "Game Reports", phrases: ["game reports", "game report"] },
  { canonical: "Training", phrases: ["training", "in training"] },
  { canonical: "OOO/Sick/PTO", phrases: ["ooo", "pto", "out today", "out", "sick"] },
];

const assignmentColors = {
  "Tier 2 Phones": "#2f6c6a",
  "School Support Queue": "#d96b2b",
  "FST Queue": "#118a7e",
  "Data Requests": "#5f9f1f",
  Disputes: "#8c4db4",
  Calibrations: "#b85c12",
  "Game Reports": "#4c6edb",
  Training: "#a06cd5",
  "OOO/Sick/PTO": "#9d3f18",
  Flex: "#6b7280",
  "Bugs Escalation": "#d64550",
  "Login Issues": "#2c7fb8",
  "All Channels": "#7c5cfa",
  MOD: "#111827",
};

const assignmentPalette = [
  "#0f766e",
  "#c2410c",
  "#7c3aed",
  "#2563eb",
  "#0891b2",
  "#be185d",
  "#4d7c0f",
  "#b45309",
  "#1d4ed8",
  "#0f766e",
];

function looksLikeManagerName(value) {
  const text = String(value || "").trim();
  if (!text) return false;
  if (text.toLowerCase() === "unknown") return true;
  if (/\d/.test(text)) return false;
  if (/\d\s*[ap]m/i.test(text)) return false;
  if (/\b[ap]m\b/i.test(text)) return false;
  if (text.includes(":")) return false;
  return true;
}

function formatManagerName(value) {
  const text = String(value || "").trim();
  if (!text || text === "Unknown" || text === "Samuel Williamson") return "";
  if (text === "Erik Millan") return "Erik";
  if (text === "Rachel Wolovick") return "Rachel";
  return text;
}

const managers = [
  "all",
  ...new Set(
    [
      "Sam",
      "Erik",
      "Rachel",
      ...initialTeam.map((person) => formatManagerName(person.manager)),
    ].filter(looksLikeManagerName)
  ),
];
function buildAdminProfiles() {
  return [
    {
      id: "samuel-williamson-admin",
      name: "Samuel Williamson",
      label: "Samuel Williamson",
      scope: "all",
      canViewAuditLog: true,
    },
    ...managers
      .filter((manager) => manager !== "all")
      .map((manager) => ({
        id: `${normalizeText(manager).replace(/[^a-z0-9]+/g, "-")}-manager`,
        name: manager,
        label: manager,
        scope: "all",
        canViewAuditLog: false,
      })),
  ];
}

const adminProfiles = buildAdminProfiles();
const assignmentManagerCard = document.getElementById("assignment-manager-card");

const teamFilter = document.getElementById("team-filter");
const managerFilter = document.getElementById("manager-filter");
const assignmentFilter = document.getElementById("assignment-filter");
const personFilter = document.getElementById("person-filter");
const showOutOnly = document.getElementById("show-out-only");
const outOnlyCard = document.getElementById("out-only-card");
const outOnlyNames = document.getElementById("out-only-names");
const chartRoot = document.getElementById("assignment-chart");
const boardJumpRoot = document.getElementById("board-jump");
const commandInput = document.getElementById("command-input");
const sendMessageButton = document.getElementById("send-message");
const voiceInputButton = document.getElementById("voice-input");
const voiceStatus = document.getElementById("voice-status");
const sendToChatgptButton = document.getElementById("send-to-chatgpt");
const chatgptStatus = document.getElementById("chatgpt-status");
const resetDataButton = document.getElementById("reset-data");
const assistantGoalSelect = document.getElementById("assistant-goal-select");
const assistantSubjectInput = document.getElementById("assistant-subject-input");
const assistantAssignmentSelect = document.getElementById("assistant-assignment-select");
const assistantTimeInput = document.getElementById("assistant-time-input");
const assistantNotesInput = document.getElementById("assistant-notes-input");
const assistantBuildRequestButton = document.getElementById("assistant-build-request");
const assistantAssignmentManager = document.getElementById("assistant-assignment-manager");
const assistantNewAssignmentInput = document.getElementById("assistant-new-assignment-input");
const assistantAddAssignmentButton = document.getElementById("assistant-add-assignment");
const promptChips = document.querySelectorAll(".prompt-chip");
const chatShell = document.querySelector(".chat-shell");
const chatHistory = document.getElementById("chat-history");
const pendingPlanRoot = document.getElementById("pending-plan");
const pendingPlanOverviewRoot = document.getElementById("pending-plan-overview");
const applyPlanButton = document.getElementById("apply-plan");
const discardPlanButton = document.getElementById("discard-plan");
const portalScreen = document.getElementById("portal-screen");
const adminShell = document.getElementById("admin-shell");
const agentShell = document.getElementById("agent-shell");
const adminIdentitySelect = document.getElementById("admin-identity-select");
const adminPasswordInput = document.getElementById("admin-password");
const adminLoginButton = document.getElementById("admin-login");
const adminLoginFeedback = document.getElementById("admin-login-feedback");
const adminIdentityBadge = document.getElementById("admin-identity-badge");
const agentSelect = document.getElementById("agent-select");
const agentOpenButton = document.getElementById("agent-open");
const backToHomeAdminButton = document.getElementById("back-to-home-admin");
const backToHomeAgentButton = document.getElementById("back-to-home-agent");
const agentBoard = document.getElementById("agent-board");
const agentThemeSelect = document.getElementById("agent-theme-select");
const agentTextSelect = document.getElementById("agent-text-select");
const agentBackgroundUpload = document.getElementById("agent-background-upload");
const clearAgentBackgroundButton = document.getElementById("clear-agent-background");
const agentAlertsEnabled = document.getElementById("agent-alerts-enabled");
const agentAlertTiming = document.getElementById("agent-alert-timing");
const agentAlertScope = document.getElementById("agent-alert-scope");
const agentAlertSoundEnabled = document.getElementById("agent-alert-sound-enabled");
const agentEnableNotificationsButton = document.getElementById("agent-enable-notifications");
const agentTestAlertButton = document.getElementById("agent-test-alert");
const agentAlertStatus = document.getElementById("agent-alert-status");
const agentHeroName = document.getElementById("agent-hero-name");
const agentNameStat = document.getElementById("agent-name-stat");
const agentScheduleStat = document.getElementById("agent-schedule-stat");
const agentManagerStat = document.getElementById("agent-manager-stat");
const agentSubtitle = document.getElementById("agent-subtitle");
const agentCoverageTitle = document.getElementById("agent-coverage-title");
const agentCoverageSubtitle = document.getElementById("agent-coverage-subtitle");
const agentCoverageChart = document.getElementById("agent-coverage-chart");
const boardTabButton = document.getElementById("board-tab");
const shiftTabButton = document.getElementById("shift-tab");
const skillsTabButton = document.getElementById("skills-tab");
const automationsTabButton = document.getElementById("automations-tab");
const adminTabButton = document.getElementById("admin-tab");
const boardView = document.getElementById("board-view");
const shiftView = document.getElementById("shift-view");
const skillsView = document.getElementById("skills-view");
const automationsView = document.getElementById("automations-view");
const adminView = document.getElementById("admin-view");
const shiftSearchInput = document.getElementById("shift-search-input");
const shiftEditorList = document.getElementById("shift-editor-list");
const skillsMatrix = document.getElementById("skills-matrix");
const schedulingRulesCard = document.getElementById("scheduling-rules-card");
const automationsList = document.getElementById("automations-list");
const adminPasswordCard = document.getElementById("admin-password-card");
const auditLogPanel = document.getElementById("audit-log-panel");
const auditLogList = document.getElementById("audit-log-list");
const archivesList = document.getElementById("archives-list");
const archivePreview = document.getElementById("archive-preview");
const archivePreviewDetails = document.getElementById("archive-preview-details");
const archivePreviewTitle = document.getElementById("archive-preview-title");
const archivePreviewMeta = document.getElementById("archive-preview-meta");
const archivePreviewTable = document.getElementById("archive-preview-table");
const archivePreviewOpen = document.getElementById("archive-preview-open");
const archivePreviewSummaryAction = document.querySelector(".archive-preview-summary-action");
const assistantScopeButtons = document.querySelectorAll(".assistant-scope-button");
const assistantManagerFilter = document.getElementById("assistant-manager-filter");
const themeToggleButton = document.getElementById("theme-toggle");
const backendAvailable = window.location.protocol.startsWith("http");

let team = cloneData(initialTeam);
let pendingPlan = null;
let lastReviewedPlan = null;
let pendingQuestion = null;
let lastInsight = null;
let assistantMode = backendAvailable ? "openai" : "local";
let activeWorkspaceTab = "board";
let automationTestState = {};
let archiveLibrary = {
  folder: "Supabase bucket: daily-ops-archives",
  archives: [],
};
let selectedArchiveName = "";
let archiveStatus = {
  enabled: false,
  time: "00:00",
  lastArchivedDate: "",
  lastArchivedAt: "",
  nextRun: "",
};
let archiveSyncTimer = null;
let lastArchiveSyncSignature = "";
let archivePreviewContent = {};
let archivePreviewRows = [];
let notificationCheckTimer = null;
let notificationAudioContext = null;
let editableSkillAssignments = [...baseEditableSkillAssignments];
let assignmentAliases = [...baseAssignmentAliases];
let assignmentOptions = [];

const automationDefinitions = [
  {
    id: "rule-based-reshuffle",
    name: "Rule-Based Reshuffle",
    description: "Rebuild today's schedule using the saved All, Support, and ACO scheduling rules.",
    kind: "schedule-reshuffle",
  },
  {
    id: "nightly-pdf-archive",
    name: "Nightly Schedule Archive",
    description: "At 12:00 a.m., save a copy of the day's schedule into Supabase Storage.",
    time: "00:00",
    kind: "pdf-archive",
  },
];
let currentView = "portal";
let currentAdminProfileId = adminProfiles[0].id;
let selectedAgentId = "";
let assistantTeamMode = "all";
let assistantManagerMode = "all";
let editingBoardRow = null;
let editingShiftPersonId = null;
let shiftSearchTerm = "";
let blockLayout = {
  baseSize: 1,
  focus: null,
};
let isListening = false;
let messages = [
  {
    role: "assistant",
    text: "",
  },
];

const shiftOverrideStorageKey = "daily-ops-shift-overrides-v1";
const auditLogFallbackStorageKey = "daily-ops-audit-log-v1";
const adminPasswordsStorageKey = "daily-ops-admin-passwords-v1";
const shiftTimeOptions = Array.from({ length: 17 }, (_, index) => 8 + index);
let auditLogEntries = [];
let auditLogLoaded = false;
let auditLogLoading = false;
let auditLogError = "";
let adminPasswordsState = null;
let adminPasswordSaveState = {
  message: "",
  tone: "",
};

function getTodayKey() {
  return new Date().toISOString().slice(0, 10);
}

function loadShiftOverrides() {
  try {
    const raw = window.localStorage.getItem(shiftOverrideStorageKey);
    if (!raw) {
      return { permanent: {}, daily: {} };
    }
    const parsed = JSON.parse(raw);
    return {
      permanent: parsed?.permanent || {},
      daily: parsed?.daily || {},
    };
  } catch (error) {
    return { permanent: {}, daily: {} };
  }
}

function saveShiftOverrides(payload) {
  window.localStorage.setItem(shiftOverrideStorageKey, JSON.stringify(payload));
}

function normalizeHourValue(hour) {
  if (hour >= 24) return hour;
  if (hour < 8) return hour + 24;
  return hour;
}

function parseTimeToken(token) {
  const normalized = normalizeText(token).replace(/\s+/g, "");
  const match = normalized.match(/^(\d{1,2})(?::(\d{2}))?(a|p|am|pm)$/);
  if (!match) return null;
  let hour = Number(match[1]) % 12;
  const minutes = Number(match[2] || "0");
  const meridiem = match[3].startsWith("p") ? "pm" : "am";
  if (meridiem === "pm") hour += 12;
  return hour + minutes / 60;
}

function parseScheduleWindow(schedule) {
  const text = String(schedule || "").trim();
  if (!text || /off|ooo|pto|sick/i.test(text)) return null;
  const parts = text.split("-").map((part) => part.trim()).filter(Boolean);
  if (parts.length < 2) return null;
  const start = parseTimeToken(parts[0]);
  const end = parseTimeToken(parts[1]);
  if (start === null || end === null) return null;
  const normalizedStart = normalizeHourValue(start);
  let normalizedEnd = normalizeHourValue(end);
  if (normalizedEnd <= normalizedStart) normalizedEnd += 24;
  return {
    start,
    end,
    normalizedStart,
    normalizedEnd,
  };
}

function getWorkedBlockIndexesForSchedule(schedule) {
  const windowRange = parseScheduleWindow(schedule);
  if (!windowRange) return [];

  return timeBlocks
    .map((block, blockIndex) => {
      const blockStart = normalizeHourValue(block.start);
      const blockEnd = normalizeHourValue(block.end);
      return blockStart >= windowRange.normalizedStart && blockEnd <= windowRange.normalizedEnd
        ? blockIndex
        : null;
    })
    .filter((value) => value !== null);
}

function formatShiftHour(hour) {
  if (hour === 24) return "12a";
  return hourLabel(hour);
}

function formatScheduleValue(startHour, endHour) {
  return `${formatShiftHour(startHour)} - ${formatShiftHour(endHour)}`;
}

function applyScheduleToPerson(person, schedule) {
  const nextWorkedBlocks = new Set(getWorkedBlockIndexesForSchedule(schedule));
  const previousAssignments = person.assignments.map(([assignment, phones]) => [assignment, phones]);

  person.schedule = schedule;
  person.assignments = previousAssignments.map(([assignment, phones], blockIndex) => {
    if (nextWorkedBlocks.has(blockIndex)) {
      return [assignment, phones];
    }
    return ["", false];
  });
}

function applyStoredShiftOverrides() {
  const overrides = loadShiftOverrides();
  const todayOverrides = overrides.daily[getTodayKey()] || {};

  team.forEach((person) => {
    const permanentOverride = overrides.permanent[personId(person)];
    const dailyOverride = todayOverrides[personId(person)];
    const nextSchedule = dailyOverride?.schedule || permanentOverride?.schedule;
    if (nextSchedule) {
      applyScheduleToPerson(person, nextSchedule);
    }
  });
}

function saveShiftChange(person, schedule, mode) {
  const overrides = loadShiftOverrides();
  const personKey = personId(person);
  const todayKey = getTodayKey();
  const previousSchedule = person.schedule;

  if (mode === "permanent") {
    overrides.permanent[personKey] = { schedule };
    overrides.daily[todayKey] = overrides.daily[todayKey] || {};
    overrides.daily[todayKey][personKey] = { schedule };
  } else {
    overrides.daily[todayKey] = overrides.daily[todayKey] || {};
    overrides.daily[todayKey][personKey] = { schedule };
  }

  saveShiftOverrides(overrides);
  applyScheduleToPerson(person, schedule);
  if (currentView === "admin") {
    void appendAuditLogEntry({
      actionType: "shift_change",
      summary: `${person.name} shift changed to ${schedule}`,
      details: [
        `Previous schedule: ${previousSchedule}`,
        `New schedule: ${schedule}`,
        mode === "permanent" ? "Scope: Permanent default schedule" : "Scope: Today only",
      ],
    });
  }
}

applyStoredShiftOverrides();

function populatePortalAgentSelect() {
  if (!agentSelect) return;
  agentSelect.innerHTML = '<option value="">Select your name</option>';
  [...initialTeam]
    .sort((a, b) => a.name.localeCompare(b.name))
    .forEach((person) => {
      const option = document.createElement("option");
      option.value = personId(person);
      option.textContent = person.name;
      agentSelect.appendChild(option);
    });
}

function getCurrentAdminProfile() {
  return adminProfiles.find((profile) => profile.id === currentAdminProfileId) || adminProfiles[0];
}

function getCurrentAdminScope() {
  if (currentView !== "admin") return "all";
  return getCurrentAdminProfile().scope || "all";
}

function getAdminVisibleTeam(collection = team) {
  const scope = getCurrentAdminScope();
  if (scope === "all") return collection;
  return collection.filter((person) => formatManagerName(person.manager) === scope);
}

function canCurrentAdminViewAuditLog() {
  return currentView === "admin" && Boolean(getCurrentAdminProfile().canViewAuditLog);
}

function populateAdminIdentitySelect() {
  if (!adminIdentitySelect) return;
  adminIdentitySelect.innerHTML = adminProfiles
    .map((profile) => `<option value="${profile.id}">${profile.label}</option>`)
    .join("");
  adminIdentitySelect.value = currentAdminProfileId;
}

function renderAdminIdentityBadge() {
  if (!adminIdentityBadge) return;
  const profile = getCurrentAdminProfile();
  adminIdentityBadge.textContent = `Signed in as ${profile.name}`;
}

function populatePersonFilter() {
  if (!personFilter) return;
  const currentValue = personFilter.value || "all";
  personFilter.innerHTML = '<option value="all">All specialists</option>';
  [...(currentView === "admin" ? getAdminVisibleTeam(initialTeam) : initialTeam)]
    .sort((a, b) => a.name.localeCompare(b.name))
    .forEach((person) => {
      const option = document.createElement("option");
      option.value = personId(person);
      option.textContent = person.name;
      personFilter.appendChild(option);
    });
  personFilter.value = [...personFilter.options].some((option) => option.value === currentValue)
    ? currentValue
    : "all";
}

function populateManagerFilter() {
  if (!managerFilter) return;
  const scope = getCurrentAdminScope();
  const options =
    scope === "all"
      ? [
          { value: "all", label: "All managers" },
          ...managers
            .filter((manager) => manager !== "all")
            .map((manager) => ({ value: manager, label: manager })),
        ]
      : [{ value: scope, label: scope }];

  managerFilter.innerHTML = options
    .map((option) => `<option value="${option.value}">${option.label}</option>`)
    .join("");

  if (!options.some((option) => option.value === managerFilter.value)) {
    managerFilter.value = scope === "all" ? "all" : scope;
  }
  managerFilter.disabled = scope !== "all";
}

function populateAssistantManagerFilter() {
  if (!assistantManagerFilter) return;
  const scope = getCurrentAdminScope();

  const options =
    scope === "all"
      ? [
          { value: "all", label: "All managers" },
          ...managers
            .filter((manager) => manager !== "all")
            .map((manager) => ({ value: manager, label: manager })),
        ]
      : [{ value: scope, label: scope }];

  assistantManagerFilter.innerHTML = options
    .map((option) => `<option value="${option.value}">${option.label}</option>`)
    .join("");

  const hasActiveValue = options.some((option) => option.value === assistantManagerMode);
  assistantManagerMode = hasActiveValue ? assistantManagerMode : scope === "all" ? "all" : scope;
  assistantManagerFilter.value = assistantManagerMode;
  assistantManagerFilter.disabled = scope !== "all";
}

function handleAdminLogin() {
  if (!adminIdentitySelect?.value) {
    adminLoginFeedback.textContent = "Choose an admin view.";
    return;
  }
  if (adminPasswordInput.value === getAdminPasswordForProfile(adminIdentitySelect.value)) {
    adminLoginFeedback.textContent = "";
    currentAdminProfileId = adminIdentitySelect.value;
    adminPasswordInput.value = "";
    setView("admin");
    void refreshAuditLog(true);
    render();
    return;
  }
  adminLoginFeedback.textContent = "Wrong password.";
}

function handleAgentOpen() {
  if (!agentSelect.value) return;
  selectedAgentId = agentSelect.value;
  setView("agent");
  render();
}

populatePortalAgentSelect();
populateAdminIdentitySelect();
populatePersonFilter();
populateAssistantManagerFilter();

promptChips.forEach((chip) => {
  chip.addEventListener("click", () => {
    commandInput.value = chip.dataset.prompt || "";
    commandInput.focus();
  });
});

themeToggleButton?.addEventListener("click", () => {
  const nextTheme = document.body.dataset.theme === "dark" ? "light" : "dark";
  setTheme(nextTheme);
});

function getAssignmentManagerKey() {
  return "daily-ops-custom-assignments";
}

function loadCustomAssignments() {
  try {
    const raw = window.localStorage.getItem(getAssignmentManagerKey());
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.map((entry) => String(entry || "").trim()).filter(Boolean) : [];
  } catch {
    return [];
  }
}

function saveCustomAssignments(assignments) {
  window.localStorage.setItem(getAssignmentManagerKey(), JSON.stringify(assignments));
}

function addCustomAssignment(assignmentName) {
  const nextAssignment = String(assignmentName || "").trim();
  if (!nextAssignment) return false;
  if (assignmentOptions.includes(nextAssignment)) return false;
  const custom = loadCustomAssignments();
  custom.push(nextAssignment);
  saveCustomAssignments(custom);
  refreshAssignmentCollections();
  refreshAssignmentControls();
  return true;
}

function ensureAssignmentColor(assignment) {
  if (!assignment || assignmentColors[assignment]) return;
  const colorIndex = Object.keys(assignmentColors).length % assignmentPalette.length;
  assignmentColors[assignment] = assignmentPalette[colorIndex];
}

function refreshAssignmentCollections() {
  const customAssignments = loadCustomAssignments();
  editableSkillAssignments = [...new Set([...baseEditableSkillAssignments, ...customAssignments])];
  assignmentAliases = [
    ...baseAssignmentAliases,
    ...customAssignments.map((assignment) => ({
      canonical: assignment,
      phrases: [normalizeText(assignment)],
    })),
  ];
  editableSkillAssignments.forEach(ensureAssignmentColor);
  assignmentOptions = [
    "all",
    ...new Set(
      [
        ...editableSkillAssignments,
        ...team.flatMap((person) => person.assignments.map(([assignment]) => assignment).filter(Boolean)),
      ].filter(Boolean)
    ),
  ];
}

function refreshAssignmentControls() {
  const currentAssignmentFilter = assignmentFilter.value;
  const currentAssistantAssignment = assistantAssignmentSelect.value;

  assignmentFilter.innerHTML = "";
  assignmentOptions.forEach((assignment) => {
    const option = document.createElement("option");
    option.value = assignment;
    option.textContent = assignment === "all" ? "All assignments" : assignment;
    assignmentFilter.appendChild(option);
  });
  assignmentFilter.value = assignmentOptions.includes(currentAssignmentFilter) ? currentAssignmentFilter : "all";

  assistantAssignmentSelect.innerHTML = "";
  [...assignmentOptions]
    .filter((assignment) => !["all", "Open"].includes(assignment))
    .forEach((assignment) => {
      const option = document.createElement("option");
      option.value = assignment;
      option.textContent = assignment;
      assistantAssignmentSelect.appendChild(option);
    });
  if ([...assistantAssignmentSelect.options].some((option) => option.value === currentAssistantAssignment)) {
    assistantAssignmentSelect.value = currentAssistantAssignment;
  }
}

function removeAssignmentEverywhere(assignment) {
  team.forEach((person) => {
    person.assignments = person.assignments.map(([currentAssignment]) =>
      currentAssignment === assignment ? ["", false] : [currentAssignment, currentAssignment === "Tier 2 Phones"]
    );
    person.skills = (person.skills || []).filter((skill) => skill !== assignment);
  });
}

function renderAssignmentManager() {
  if (!assignmentManagerCard) return;

  const customAssignments = loadCustomAssignments();
  assignmentManagerCard.innerHTML = `
    <div class="rules-card">
      <div class="assignment-manager-add">
        <input id="new-assignment-input" type="text" class="portal-input" placeholder="Add a new assignment" />
        <button type="button" class="secondary-button" id="add-assignment-button">Add Assignment</button>
      </div>
      <div class="assignment-manager-list">
        ${editableSkillAssignments
          .map(
            (assignment) => `
              <div class="assignment-manager-row">
                <span class="assignment-manager-name">${assignment}</span>
                ${
                  customAssignments.includes(assignment)
                    ? `<button type="button" class="secondary-button assignment-remove-button" data-remove-assignment="${assignment}">Delete</button>`
                    : `<span class="assignment-manager-fixed">Built-in</span>`
                }
              </div>
            `
          )
          .join("")}
      </div>
    </div>
  `;

  assignmentManagerCard.querySelector("#add-assignment-button")?.addEventListener("click", () => {
    const input = assignmentManagerCard.querySelector("#new-assignment-input");
    const assignmentName = String(input?.value || "").trim();
    if (!addCustomAssignment(assignmentName)) {
      input.value = "";
      return;
    }
    void appendAuditLogEntry({
      actionType: "assignment-added",
      summary: `Added assignment: ${assignmentName}`,
      details: ["Assignment manager"],
    });
    render();
  });

  assignmentManagerCard.querySelectorAll("[data-remove-assignment]").forEach((button) => {
    button.addEventListener("click", () => {
      const assignment = button.dataset.removeAssignment || "";
      const nextCustom = loadCustomAssignments().filter((entry) => entry !== assignment);
      saveCustomAssignments(nextCustom);
      removeAssignmentEverywhere(assignment);
      delete assignmentColors[assignment];
      refreshAssignmentCollections();
      refreshAssignmentControls();
      void appendAuditLogEntry({
        actionType: "assignment-removed",
        summary: `Removed assignment: ${assignment}`,
        details: ["Assignment manager"],
      });
      render();
    });
  });
}

function cloneData(value) {
  return JSON.parse(JSON.stringify(value));
}

function getAssistantScopedTeam() {
  return getAdminVisibleTeam(team).filter((person) => {
    if (assistantTeamMode === "core" && person.teamGroup !== "core") return false;
    if (assistantTeamMode === "aco" && person.teamGroup !== "aco") return false;
    if (assistantManagerMode !== "all" && formatManagerName(person.manager) !== assistantManagerMode) return false;
    return true;
  });
}

function loadFallbackAuditLog() {
  try {
    const raw = window.localStorage.getItem(auditLogFallbackStorageKey);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveFallbackAuditLog(entries) {
  window.localStorage.setItem(auditLogFallbackStorageKey, JSON.stringify(entries));
}

function defaultAdminPasswords() {
  return {};
}

function cloneAdminPasswords(passwords) {
  return { ...(passwords || {}) };
}

function normalizeAdminPasswords(passwords) {
  if (!passwords || typeof passwords !== "object" || Array.isArray(passwords)) {
    return defaultAdminPasswords();
  }

  return Object.fromEntries(
    Object.entries(passwords)
      .map(([key, value]) => [String(key || "").trim(), String(value || "").trim()])
      .filter(([key, value]) => key && value)
  );
}

function loadAdminPasswords() {
  if (adminPasswordsState) {
    return cloneAdminPasswords(adminPasswordsState);
  }

  try {
    const raw = window.localStorage.getItem(adminPasswordsStorageKey);
    adminPasswordsState = normalizeAdminPasswords(raw ? JSON.parse(raw) : {});
  } catch {
    adminPasswordsState = defaultAdminPasswords();
  }

  return cloneAdminPasswords(adminPasswordsState);
}

function saveAdminPasswords(passwords) {
  adminPasswordsState = normalizeAdminPasswords(passwords);
  window.localStorage.setItem(adminPasswordsStorageKey, JSON.stringify(adminPasswordsState));
  return cloneAdminPasswords(adminPasswordsState);
}

function getAdminPasswordForProfile(profileId) {
  const passwords = loadAdminPasswords();
  return passwords[profileId] || LEGACY_ADMIN_PASSWORD;
}

async function syncAdminPasswordsFromServer() {
  if (!backendAvailable) return;

  try {
    const response = await fetch("/api/admin-passwords");
    const payload = parseJsonSafely(await response.text(), {});
    if (!response.ok) {
      throw new Error(payload.details || payload.error || `Failed to load admin passwords (${response.status})`);
    }
    saveAdminPasswords(payload?.passwords || defaultAdminPasswords());
  } catch {
    // Keep local fallback working even if the shared config is unavailable.
  }
}

async function persistAdminPasswords(passwords) {
  if (!backendAvailable) {
    saveAdminPasswords(passwords);
    return cloneAdminPasswords(passwords);
  }

  const response = await fetch("/api/admin-passwords", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ passwords }),
  });
  const payload = parseJsonSafely(await response.text(), {});
  if (!response.ok) {
    throw new Error(payload.details || payload.error || `Failed to save admin passwords (${response.status})`);
  }
  return saveAdminPasswords(payload?.passwords || passwords);
}

function parseJsonSafely(text, fallback = {}) {
  try {
    return text ? JSON.parse(text) : fallback;
  } catch {
    throw new Error(text || "The server returned an invalid response.");
  }
}

async function refreshAuditLog(force = false) {
  if (!canCurrentAdminViewAuditLog()) {
    auditLogEntries = [];
    auditLogLoaded = false;
    auditLogLoading = false;
    auditLogError = "";
    return;
  }

  if (auditLogLoading && !force) return;

  if (!backendAvailable) {
    auditLogEntries = loadFallbackAuditLog();
    auditLogLoaded = true;
    auditLogError = "";
    renderAuditLog();
    return;
  }

  auditLogLoading = true;
  if (force) {
    auditLogLoaded = false;
  }
  renderAuditLog();

  try {
    const response = await fetch("/api/audit-log");
    const payload = parseJsonSafely(await response.text(), {});
    if (!response.ok) {
      throw new Error(payload.details || payload.error || "Unable to load the change log.");
    }
    auditLogEntries = Array.isArray(payload.entries) ? payload.entries : [];
    saveFallbackAuditLog(auditLogEntries);
    auditLogError = "";
    auditLogLoaded = true;
  } catch (error) {
    auditLogEntries = loadFallbackAuditLog();
    auditLogError = error.message;
    auditLogLoaded = true;
  } finally {
    auditLogLoading = false;
    renderAuditLog();
  }
}

async function appendAuditLogEntry({ actionType, summary, details = [] }) {
  if (currentView !== "admin") return;

  const actor = getCurrentAdminProfile();
  const entry = {
    actorId: actor.id,
    actorName: actor.name,
    actorScope: actor.scope,
    actionType,
    summary,
    details,
    createdAt: new Date().toISOString(),
  };

  auditLogEntries = [entry, ...loadFallbackAuditLog()].slice(0, 250);
  saveFallbackAuditLog(auditLogEntries);
  auditLogLoaded = true;
  if (canCurrentAdminViewAuditLog()) {
    renderAuditLog();
  }

  if (!backendAvailable) return;

  try {
    const response = await fetch("/api/audit-log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ entry }),
    });
    const payload = parseJsonSafely(await response.text(), {});
    if (!response.ok) {
      throw new Error(payload.details || payload.error || "Unable to save the change log.");
    }
    if (Array.isArray(payload.entries)) {
      auditLogEntries = payload.entries;
      saveFallbackAuditLog(auditLogEntries);
      if (canCurrentAdminViewAuditLog()) {
        renderAuditLog();
      }
    }
  } catch (error) {
    auditLogError = error.message;
    if (canCurrentAdminViewAuditLog()) {
      renderAuditLog();
    }
  }
}

function formatAuditTimestamp(value) {
  if (!value) return "";
  try {
    return new Date(value).toLocaleString([], {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  } catch {
    return value;
  }
}

function renderAuditLog() {
  if (!auditLogPanel || !auditLogList) return;

  const shouldShow = canCurrentAdminViewAuditLog();
  auditLogPanel.classList.toggle("hidden", !shouldShow);
  if (!shouldShow) return;

  if (auditLogLoading && !auditLogLoaded) {
    auditLogList.innerHTML = `<div class="empty-state">Loading manager change log...</div>`;
    return;
  }

  if (!auditLogEntries.length) {
    auditLogList.innerHTML = `<div class="empty-state">${auditLogError || "No logged changes yet."}</div>`;
    return;
  }

  auditLogList.innerHTML = auditLogEntries
    .map((entry) => {
      const details = Array.isArray(entry.details) && entry.details.length
        ? `<div class="archive-meta">${entry.details.join(" • ")}</div>`
        : "";
      const scopeLabel = entry.actorScope && entry.actorScope !== "all" ? ` • ${entry.actorScope} team` : "";
      return `
        <div class="archive-row active">
          <div>
            <strong>${entry.summary || "Change recorded"}</strong>
            <div class="archive-meta">${entry.actorName || "Unknown"}${scopeLabel} • ${formatAuditTimestamp(entry.createdAt)}</div>
            ${details}
          </div>
        </div>
      `;
    })
    .join("");
}

refreshAssignmentCollections();
refreshAssignmentControls();
setTheme(getSavedTheme());

syncAssistantBuilder();

function renderAssistantScopeButtons() {
  assistantScopeButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.scope === assistantTeamMode);
  });
  if (assistantManagerFilter) {
    assistantManagerFilter.value = assistantManagerMode;
  }
}

function syncAssistantBuilder() {
  const goal = assistantGoalSelect?.value || "move";
  if (!assistantSubjectInput || !assistantTimeInput || !assistantNotesInput || !assistantAssignmentSelect) return;
  if (assistantAssignmentManager) {
    assistantAssignmentManager.classList.toggle("hidden", goal !== "assignment");
  }

  if (goal === "coverage") {
    assistantBuildRequestButton.classList.remove("hidden");
    assistantSubjectInput.closest("label")?.classList.remove("hidden");
    assistantAssignmentSelect.closest("label")?.classList.remove("hidden");
    assistantTimeInput.closest("label")?.classList.remove("hidden");
    assistantNotesInput.closest("label")?.classList.remove("hidden");
    assistantSubjectInput.placeholder = "2, 3, or 5";
    assistantTimeInput.placeholder = "from 2-5, each hour, or all day";
    assistantNotesInput.placeholder = "make it fair, keep manager balance";
    assistantAssignmentSelect.disabled = false;
    return;
  }

  if (goal === "training") {
    assistantBuildRequestButton.classList.remove("hidden");
    assistantSubjectInput.closest("label")?.classList.remove("hidden");
    assistantAssignmentSelect.closest("label")?.classList.remove("hidden");
    assistantTimeInput.closest("label")?.classList.remove("hidden");
    assistantNotesInput.closest("label")?.classList.remove("hidden");
    assistantSubjectInput.placeholder = "Ireal and Nick";
    assistantTimeInput.placeholder = "from 9-1";
    assistantNotesInput.placeholder = "keep phones covered";
    assistantAssignmentSelect.disabled = true;
    return;
  }

  if (goal === "out") {
    assistantBuildRequestButton.classList.remove("hidden");
    assistantSubjectInput.closest("label")?.classList.remove("hidden");
    assistantAssignmentSelect.closest("label")?.classList.remove("hidden");
    assistantTimeInput.closest("label")?.classList.remove("hidden");
    assistantNotesInput.closest("label")?.classList.remove("hidden");
    assistantSubjectInput.placeholder = "Ezra or Ireal";
    assistantTimeInput.placeholder = "today or from 2-5";
    assistantNotesInput.placeholder = "optional extra details";
    assistantAssignmentSelect.disabled = true;
    return;
  }

  if (goal === "assignment") {
    assistantBuildRequestButton.classList.add("hidden");
    assistantSubjectInput.closest("label")?.classList.add("hidden");
    assistantAssignmentSelect.closest("label")?.classList.add("hidden");
    assistantTimeInput.closest("label")?.classList.add("hidden");
    assistantNotesInput.closest("label")?.classList.add("hidden");
    return;
  }

  if (goal === "insight") {
    assistantBuildRequestButton.classList.remove("hidden");
    assistantSubjectInput.closest("label")?.classList.remove("hidden");
    assistantAssignmentSelect.closest("label")?.classList.remove("hidden");
    assistantTimeInput.closest("label")?.classList.remove("hidden");
    assistantNotesInput.closest("label")?.classList.remove("hidden");
    assistantSubjectInput.placeholder = "Who is on phones today?";
    assistantTimeInput.placeholder = "optional";
    assistantNotesInput.placeholder = "ask a question about today's schedule";
    assistantAssignmentSelect.disabled = true;
    return;
  }

  assistantBuildRequestButton.classList.remove("hidden");
  assistantSubjectInput.closest("label")?.classList.remove("hidden");
  assistantAssignmentSelect.closest("label")?.classList.remove("hidden");
  assistantTimeInput.closest("label")?.classList.remove("hidden");
  assistantNotesInput.closest("label")?.classList.remove("hidden");
  assistantSubjectInput.placeholder = "Ezra, Tyler, or Ireal and Nick";
  assistantTimeInput.placeholder = "from 2-5 or all day";
  assistantNotesInput.placeholder = "make it fair, support only, avoid moving Ezra";
  assistantAssignmentSelect.disabled = false;
}

function buildAssistantRequestFromForm() {
  const goal = assistantGoalSelect?.value || "move";
  const subject = assistantSubjectInput?.value.trim() || "";
  const assignment = assistantAssignmentSelect?.value || "";
  const when = assistantTimeInput?.value.trim() || "";
  const notes = assistantNotesInput?.value.trim() || "";
  const countText = subject.replace(/\bpeople\b/gi, "").trim();

  let text = "";

  if (goal === "coverage") {
    text = `We need ${countText || "2"} people on ${assignment}${when ? ` ${when}` : " all day"}.`;
  } else if (goal === "training") {
    text = `${subject || "These people"} are in training${when ? ` ${when}` : ""}.`;
  } else if (goal === "out") {
    text = `${subject || "This person"} is out${when ? ` ${when}` : " today"}.`;
  } else if (goal === "assignment") {
    const action = notes.toLowerCase().includes("delete") || notes.toLowerCase().includes("remove") ? "Delete" : "Add";
    text = `${action} the assignment ${subject || "New Assignment"}.`;
  } else if (goal === "insight") {
    text = subject || notes || "Give me some general insights on the schedule.";
  } else {
    text = `Move ${subject || "these people"} to ${assignment}${when ? ` ${when}` : ""}.`;
  }

  if (notes && goal !== "insight") {
    text = `${text} ${notes}`;
  }

  commandInput.value = text.trim();
  commandInput.focus();
}

function normalizeText(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function containsAny(text, phrases) {
  return phrases.some((phrase) => text.includes(phrase));
}

function hexToRgba(hex, alpha) {
  const normalized = (hex || "").replace("#", "");
  if (normalized.length !== 6) return `rgba(0, 201, 210, ${alpha})`;
  const red = parseInt(normalized.slice(0, 2), 16);
  const green = parseInt(normalized.slice(2, 4), 16);
  const blue = parseInt(normalized.slice(4, 6), 16);
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

function formatBlockLabel(index) {
  return timeBlocks[index].label;
}

function getGroupedBlocks() {
  const groups = [];
  let index = 0;
  while (index < timeBlocks.length) {
    const inFocus =
      blockLayout.focus &&
      index >= blockLayout.focus.startIndex &&
      index < blockLayout.focus.endIndex;
    const size = inFocus ? blockLayout.focus.size : blockLayout.baseSize;
    const boundary = inFocus ? blockLayout.focus.endIndex : timeBlocks.length;
    const slice = timeBlocks.slice(index, Math.min(index + size, boundary));
    if (!slice.length) continue;
    groups.push({
      startIndex: index,
      blockIndexes: slice.map((_, offset) => index + offset),
      label: `${hourLabel(slice[0].start)}-${hourLabel(slice[slice.length - 1].end)}`,
    });
    index += slice.length;
  }
  return groups;
}

function parseBlockSizeRequest(text) {
  const normalized = normalizeText(text);
  const match =
    normalized.match(/(\d+)\s+hour\s+(?:time\s*)?blocks?/) ||
    normalized.match(/(\d+)\s*hour\s*timeblocks?/) ||
    normalized.match(/(\d+)\s*hour\s*block layout/);
  if (!match) return null;
  const hours = Number(match[1]);
  if (![1, 3, 4].includes(hours)) return null;
  return hours;
}

function parseMixedBlockRequest(text) {
  const normalized = normalizeText(text);
  if (!normalized.includes("outside")) return null;

  const rangeIndexes = parseTimeRange(text);
  if (!rangeIndexes?.length) return null;

  const outsideMatch =
    normalized.match(/outside(?: of)?(?: those)?(?: times| timeframes?)?.*?(\d+)\s+hour\s+blocks?/) ||
    normalized.match(/keep\s+(\d+)\s+hour\s+blocks?\s+outside/) ||
    normalized.match(/outside.*?(\d+)\s+hour\s+timeblocks?/);
  if (!outsideMatch) return null;

  const baseSize = Number(outsideMatch[1]);
  if (![1, 3, 4].includes(baseSize)) return null;

  const focusSize =
    normalized.includes("hour blocks") && !normalized.includes("1 hour blocks")
      ? 1
      : 1;

  return {
    baseSize,
    focusSize,
    startIndex: rangeIndexes[0],
    endIndex: rangeIndexes[rangeIndexes.length - 1] + 1,
  };
}

function addMessage(role, text) {
  messages.push({ role, text });
}

function setupVoiceInput() {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    voiceInputButton.disabled = true;
    voiceStatus.textContent = "Voice input is not supported in this browser.";
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.interimResults = true;
  recognition.continuous = false;

  recognition.onstart = () => {
    isListening = true;
    voiceInputButton.textContent = "Listening...";
    voiceStatus.textContent = "Listening now. Start talking.";
  };

  recognition.onresult = (event) => {
    const transcript = Array.from(event.results)
      .map((result) => result[0].transcript)
      .join(" ")
      .trim();

    commandInput.value = transcript;

    if (event.results[event.results.length - 1].isFinal) {
      voiceStatus.textContent = `Heard: "${transcript}"`;
    }
  };

  recognition.onerror = (event) => {
    isListening = false;
    voiceInputButton.textContent = "Start Voice";
    voiceStatus.textContent = `Voice input error: ${event.error}`;
  };

  recognition.onend = () => {
    isListening = false;
    voiceInputButton.textContent = "Start Voice";
    if (commandInput.value.trim()) {
      voiceStatus.textContent = `Ready to send: "${commandInput.value.trim()}"`;
    } else {
      voiceStatus.textContent = "Voice input stopped.";
    }
  };

  voiceInputButton.addEventListener("click", () => {
    if (isListening) {
      recognition.stop();
      return;
    }

    commandInput.focus();
    recognition.start();
  });
}

function renderMessages() {
  const visibleMessages = messages.filter((message) => message.text && message.text.trim());

  if (chatShell) {
    chatShell.classList.toggle("hidden", visibleMessages.length === 0);
  }

  chatHistory.innerHTML = visibleMessages
    .map(
      (message) => `
        <article class="chat-message ${message.role}">
          <span class="chat-label">${message.role === "assistant" ? "Ops Assistant" : "You"}</span>
          <div>${message.text}</div>
        </article>
      `
    )
    .join("");
  chatHistory.scrollTop = chatHistory.scrollHeight;
}

function setChatgptStatus(text) {
  if (!chatgptStatus) return;
  if (!text) {
    chatgptStatus.textContent = "";
    chatgptStatus.classList.add("hidden");
    return;
  }
  chatgptStatus.textContent = text;
  chatgptStatus.classList.remove("hidden");
}

function scopeMatchesAssignment(scope, assignment) {
  if (scope === "all") return true;
  if (scope === "phones") return assignment === "Tier 2 Phones";
  if (scope === "disputes") return assignment === "Disputes";
  if (scope === "training") return assignment === "Training";
  if (scope === "MOD") return assignment === "MOD";
  return assignment === scope;
}

function isManagerPerson(person) {
  return normalizeText(person?.title || "").includes("manager");
}

function getAgentAlertScopeOptions(person) {
  const options = [
    { value: "all", label: "All assignments" },
    ...assignmentOptions
      .filter((assignment) => !["all", "Open", "OOO/Sick/PTO", "MOD"].includes(assignment))
      .map((assignment) => ({
        value: assignment,
        label: assignment,
      })),
  ];

  if (isManagerPerson(person)) {
    options.push({ value: "MOD", label: "MOD only" });
  }

  return options;
}

function refreshAgentAlertScopeOptions(person, preferredScope) {
  if (!agentAlertScope) return "all";

  const options = getAgentAlertScopeOptions(person);
  const validValues = new Set(options.map((option) => option.value));
  const nextValue = validValues.has(preferredScope) ? preferredScope : "all";

  agentAlertScope.innerHTML = options
    .map(
      (option) => `<option value="${option.value}" ${option.value === nextValue ? "selected" : ""}>${option.label}</option>`
    )
    .join("");

  return nextValue;
}

function buildScheduleSnapshot() {
  const groups = getGroupedBlocks();
  return {
    generatedAt: new Date().toISOString(),
    groups: groups.map((group) => {
      const firstBlock = timeBlocks[group.blockIndexes[0]];
      const lastBlock = timeBlocks[group.blockIndexes[group.blockIndexes.length - 1]];
      return {
        label: group.label,
        startHour: firstBlock.start,
        endHour: lastBlock.end,
      };
    }),
    people: team.map((person) => ({
      id: personId(person),
      name: person.name,
      assignments: groups.map((group) => {
        const assignments = group.blockIndexes
          .map((blockIndex) => person.assignments[blockIndex][0])
          .filter(Boolean);
        return {
          label: group.label,
          assignment: assignments.length ? [...new Set(assignments)].join(" / ") : "Open",
          primaryAssignment: assignments[0] || "Open",
        };
      }),
    })),
  };
}

function buildSelectedAgentAlertRegistration() {
  if (!selectedAgentId) return null;
  const person = getPersonById(selectedAgentId);
  const preferences = loadAgentPreferences(selectedAgentId);
  if (!person) return null;
  return {
    agentId: selectedAgentId,
    agentName: person.name,
    enabled: preferences.alertsEnabled,
    alertTiming: preferences.alertTiming,
    alertScope: preferences.alertScope,
  };
}

function notificationsSupported() {
  return typeof window !== "undefined" && "Notification" in window;
}

function primeNotificationAudio() {
  if (typeof window === "undefined") return null;
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return null;
  if (!notificationAudioContext) {
    notificationAudioContext = new AudioContextClass();
  }
  if (notificationAudioContext.state === "suspended") {
    notificationAudioContext.resume().catch(() => {});
  }
  return notificationAudioContext;
}

function playNotificationSound() {
  const preferences = selectedAgentId ? loadAgentPreferences(selectedAgentId) : null;
  if (preferences && preferences.alertSoundEnabled === false) return false;

  const audioContext = primeNotificationAudio();
  if (!audioContext || audioContext.state !== "running") return false;

  const now = audioContext.currentTime;
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();

  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(880, now);
  oscillator.frequency.exponentialRampToValueAtTime(660, now + 0.18);

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.12, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);

  oscillator.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.start(now);
  oscillator.stop(now + 0.24);
  return true;
}

async function requestNotificationPermission() {
  if (!notificationsSupported()) {
    agentAlertStatus.textContent = "This browser does not support push notifications.";
    return "denied";
  }

  primeNotificationAudio();
  const permission = await Notification.requestPermission();
  render();
  return permission;
}

function showBrowserNotification(title, body) {
  if (!notificationsSupported() || Notification.permission !== "granted") return false;
  new Notification(title, { body, icon: "./playon-logo.svg" });
  playNotificationSound();
  return true;
}

function notificationMemoryKey(agentId, blockIndex, timing) {
  const dateKey = new Date().toISOString().slice(0, 10);
  return `daily-ops-notified:${dateKey}:${agentId}:${blockIndex}:${timing}`;
}

function hasShownNotification(agentId, blockIndex, timing) {
  return window.localStorage.getItem(notificationMemoryKey(agentId, blockIndex, timing)) === "1";
}

function markNotificationShown(agentId, blockIndex, timing) {
  window.localStorage.setItem(notificationMemoryKey(agentId, blockIndex, timing), "1");
}

function getAlertTriggerMinutes(blockStart, timing) {
  if (timing === "30") return blockStart - 30;
  if (timing === "15") return blockStart - 15;
  return blockStart;
}

function maybeSendScheduledNotification() {
  if (currentView !== "agent" || !selectedAgentId) return;
  const person = getPersonById(selectedAgentId);
  const preferences = loadAgentPreferences(selectedAgentId);
  if (!person || !preferences.alertsEnabled) return;
  if (!notificationsSupported() || Notification.permission !== "granted") return;

  const now = new Date();
  const minutesNow = now.getHours() * 60 + now.getMinutes();

  timeBlocks.forEach((block, blockIndex) => {
    if (!personWorksBlock(person, blockIndex)) return;
    const assignment = person.assignments[blockIndex]?.[0] || "Open";
    if (!scopeMatchesAssignment(preferences.alertScope, assignment)) return;

    const triggerMinutes = getAlertTriggerMinutes(block.start * 60, preferences.alertTiming);
    const blockEndMinutes = block.end * 60;
    if (minutesNow < triggerMinutes || minutesNow >= blockEndMinutes) return;
    if (hasShownNotification(selectedAgentId, blockIndex, preferences.alertTiming)) return;

    const intro =
      preferences.alertTiming === "start"
        ? "You are on"
        : `Coming up: you are on`;
    const sent = showBrowserNotification(
      "Shift Alert",
      `${intro} ${assignment} for ${block.label}.`
    );
    if (sent) {
      markNotificationShown(selectedAgentId, blockIndex, preferences.alertTiming);
    }
  });
}

function startNotificationWatcher() {
  if (notificationCheckTimer) {
    window.clearInterval(notificationCheckTimer);
  }
  notificationCheckTimer = window.setInterval(maybeSendScheduledNotification, 60000);
  maybeSendScheduledNotification();
}

async function sendTestNotification() {
  if (!selectedAgentId) return;
  const person = getPersonById(selectedAgentId);
  const preferences = loadAgentPreferences(selectedAgentId);
  if (!person || !preferences.alertsEnabled) {
    agentAlertStatus.textContent = "Turn alerts on first.";
    return;
  }

  if (!notificationsSupported()) {
    agentAlertStatus.textContent = "This browser does not support push notifications.";
    return;
  }

  if (Notification.permission !== "granted") {
    const permission = await requestNotificationPermission();
    if (permission !== "granted") {
      agentAlertStatus.textContent = "Notifications were not allowed.";
      return;
    }
  }

  const currentHour = new Date().getHours();
  const activeBlockIndex = Math.min(
    Math.max(currentHour - timeBlocks[0].start, 0),
    timeBlocks.length - 1
  );
  const assignment = person.assignments[activeBlockIndex]?.[0] || "Open";
  primeNotificationAudio();
  const sent = showBrowserNotification("Shift Alert", `Test: you are on ${assignment} for ${formatBlockLabel(activeBlockIndex)}.`);
  agentAlertStatus.textContent = sent
    ? "Test notification sent with an in-app chime."
    : "We tried to send the test notification, but your browser did not allow it.";
}

function buildChatgptInsightsPrompt() {
  const filteredTeam = getFilteredTeam();
  const groups = getGroupedBlocks();
  const intro = [
    "Please review this daily operations schedule and give short, useful insights.",
    "Focus on coverage gaps, repeat phone usage, uneven workload, risky staffing spots, and anything that stands out.",
    "Keep the answer simple and practical.",
    "",
    "Spreadsheet data:",
  ];

  const columns = ["Name", "Schedule", "Manager", "Team", ...groups.map((group) => group.label)];
  const rows = filteredTeam.map((person) => {
    const values = [
      person.name,
      person.schedule || "",
      person.manager || "",
      person.teamGroup === "aco" ? "ACO" : "Core",
      ...groups.map((group) => {
        const assignments = group.blockIndexes
          .map((blockIndex) => person.assignments[blockIndex][0])
          .filter(Boolean);
        return assignments.length ? [...new Set(assignments)].join(" / ") : "";
      }),
    ];
    return values.join("\t");
  });

  return [...intro, columns.join("\t"), ...rows].join("\n").trim();
}

async function openScheduleInChatgpt() {
  const prompt = buildChatgptInsightsPrompt();

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(prompt);
      setChatgptStatus("Copied today's schedule. Paste it into ChatGPT for insights.");
    } else {
      setChatgptStatus("Opened ChatGPT. Copying is not supported here, so you may need to paste manually.");
    }
  } catch {
    setChatgptStatus("Opened ChatGPT, but copying was blocked. You may need to paste manually.");
  }

  window.open("https://chatgpt.com/", "_blank", "noopener,noreferrer");
}

async function requestRemotePlan(text) {
  const response = await fetch("/api/plan", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: text,
      team: getAssistantScopedTeam(),
      timeBlocks: timeBlocks.map((block) => block.label),
      history: messages,
    }),
  });

  const payload = await response.json();
  if (!response.ok) {
    const details = payload.details ? ` ${payload.details}` : "";
    throw new Error((payload.error || "OpenAI planning failed.") + details);
  }

  assistantMode = payload.powered_by === "openai" ? "openai" : assistantMode;
  return payload.plan;
}

function renderPendingPlan() {
  applyPlanButton.disabled = !pendingPlan;
  discardPlanButton.disabled = !pendingPlan;

  if (!pendingPlan) {
    pendingPlanOverviewRoot.innerHTML = `
      <div class="empty-plan">
        No plan staged yet.
      </div>
    `;
    pendingPlanRoot.innerHTML = `
      <div class="empty-plan">
        No plan staged yet. Send a request in chat and I will turn it into concrete ops actions for review.
      </div>
    `;
    return;
  }

  pendingPlanOverviewRoot.innerHTML = `
    <div class="plan-card plan-overview-card">
      <div class="plan-overview-copy">
        <strong>${pendingPlan.title}</strong>
        <span>${pendingPlan.actions.length} change${pendingPlan.actions.length === 1 ? "" : "s"} ready.</span>
      </div>
    </div>
  `;

  pendingPlanRoot.innerHTML = `
    <div class="plan-card">
      <div class="plan-meta">
        <span class="meta-pill">${pendingPlan.scope}</span>
        <span class="meta-pill">${pendingPlan.actions.length} actions</span>
      </div>
      <div class="plan-list">
        ${pendingPlan.actions
          .map((action) => `<div class="plan-item">${describeAction(action)}</div>`)
          .join("")}
      </div>
    </div>
  `;
}

function describeAction(action) {
  if (action.type === "set_mixed_block_layout") {
    return `Use ${action.focusSize}-hour blocks during ${action.rangeLabel} and ${action.baseSize}-hour blocks outside that.`;
  }
  if (action.type === "set_block_size") {
    return `Use ${action.hours}-hour blocks for the whole board.`;
  }
  if (action.type === "mark_out_day") {
    return `${action.personName} will be marked out for the entire day.`;
  }
  if (action.type === "set_assignment_block") {
    return `${action.personName} will be set to ${action.assignment} during ${formatBlockLabel(
      action.blockIndex
    )}${action.reason ? ` (${action.reason})` : ""}.`;
  }
  if (action.type === "set_assignment_range") {
    return `${action.personName} will be moved to ${action.assignment} for ${action.blockIndexes
      .map(formatBlockLabel)
      .join(", ")}${action.reason ? ` (${action.reason})` : ""}.`;
  }
  return "Planned update.";
}

function personId(person) {
  return normalizeText(person.name).replace(/ /g, "-");
}

function getPersonById(id) {
  return team.find((person) => personId(person) === id);
}

function getAgentPreferenceKey(agentId) {
  return `daily-ops-agent-style:${agentId}`;
}

function getAutomationPreferenceKey() {
  return "daily-ops-automations";
}

function getSchedulingRulesKey() {
  return "daily-ops-scheduling-rules";
}

function getThemePreferenceKey() {
  return "daily-ops-theme";
}

function getSavedTheme() {
  try {
    return window.localStorage.getItem(getThemePreferenceKey()) || "light";
  } catch {
    return "light";
  }
}

function setTheme(theme) {
  document.body.dataset.theme = theme === "dark" ? "dark" : "light";
  if (themeToggleButton) {
    themeToggleButton.textContent = theme === "dark" ? "Light mode" : "Dark mode";
  }
  try {
    window.localStorage.setItem(getThemePreferenceKey(), document.body.dataset.theme);
  } catch {}
}

function defaultAgentPreferences() {
  return {
    blockColor: "#ffffff",
    textColor: "#0f172a",
    image: "",
    alertsEnabled: false,
    alertTiming: "start",
    alertScope: "all",
    alertSoundEnabled: true,
  };
}

function loadAgentPreferences(agentId) {
  if (!agentId) {
    return defaultAgentPreferences();
  }
  try {
    const raw = window.localStorage.getItem(getAgentPreferenceKey(agentId));
    if (!raw) return defaultAgentPreferences();
    const parsed = JSON.parse(raw);
    return {
      blockColor: parsed.blockColor || "#ffffff",
      textColor: parsed.textColor || "#0f172a",
      image: parsed.image || "",
      alertsEnabled: Boolean(parsed.alertsEnabled),
      alertTiming: parsed.alertTiming || "start",
      alertScope: parsed.alertScope || "all",
      alertSoundEnabled: parsed.alertSoundEnabled !== false,
    };
  } catch {
    return defaultAgentPreferences();
  }
}

function saveAgentPreferences(agentId, preferences) {
  if (!agentId) return;
  window.localStorage.setItem(getAgentPreferenceKey(agentId), JSON.stringify(preferences));
}

function saveCurrentAgentPreferences(partial) {
  if (!selectedAgentId) return;
  const current = loadAgentPreferences(selectedAgentId);
  saveAgentPreferences(selectedAgentId, {
    ...current,
    ...partial,
  });
}

function loadAutomationPreferences() {
  try {
    const raw = window.localStorage.getItem(getAutomationPreferenceKey());
    const parsed = raw ? JSON.parse(raw) : {};
    return automationDefinitions.map((automation) => ({
      ...automation,
      enabled: parsed[automation.id]?.enabled ?? false,
      time: parsed[automation.id]?.time ?? automation.time ?? "00:00",
    }));
  } catch {
    return automationDefinitions.map((automation) => ({
      ...automation,
      enabled: false,
      time: automation.time ?? "00:00",
    }));
  }
}

function saveAutomationPreferences(nextAutomations) {
  const payload = nextAutomations.reduce((result, automation) => {
    result[automation.id] = {
      enabled: Boolean(automation.enabled),
      time: automation.time ?? "00:00",
    };
    return result;
  }, {});
  window.localStorage.setItem(getAutomationPreferenceKey(), JSON.stringify(payload));
}

function updateAutomationSettings(automationId, updates) {
  const nextAutomations = loadAutomationPreferences().map((automation) =>
    automation.id === automationId ? { ...automation, ...updates } : automation
  );
  saveAutomationPreferences(nextAutomations);
}

const schedulingRuleScopes = ["all", "support", "aco"];
let activeSchedulingRuleScope = "all";
let schedulingRulesState = null;

function defaultSchedulingRules() {
  return {
    all: [""],
    support: [""],
    aco: [""],
  };
}

function cloneSchedulingRules(ruleGroups) {
  const defaults = defaultSchedulingRules();
  return {
    all: [...(ruleGroups?.all ?? defaults.all)],
    support: [...(ruleGroups?.support ?? defaults.support)],
    aco: [...(ruleGroups?.aco ?? defaults.aco)],
  };
}

function normalizeSchedulingRuleList(rules) {
  const cleaned = Array.isArray(rules)
    ? rules.map((rule) => String(rule || "").trimEnd())
    : [];
  return cleaned.length ? cleaned : [""];
}

function loadSchedulingRules() {
  if (schedulingRulesState) {
    return cloneSchedulingRules(schedulingRulesState);
  }
  try {
    const raw = window.localStorage.getItem(getSchedulingRulesKey());
    const parsed = raw ? JSON.parse(raw) : null;
    if (Array.isArray(parsed)) {
      schedulingRulesState = {
        all: normalizeSchedulingRuleList(parsed),
        support: [""],
        aco: [""],
      };
      return cloneSchedulingRules(schedulingRulesState);
    }
    const defaults = defaultSchedulingRules();
    schedulingRulesState = {
      all: normalizeSchedulingRuleList(parsed?.all ?? defaults.all),
      support: normalizeSchedulingRuleList(parsed?.support ?? defaults.support),
      aco: normalizeSchedulingRuleList(parsed?.aco ?? defaults.aco),
    };
    return cloneSchedulingRules(schedulingRulesState);
  } catch {
    schedulingRulesState = defaultSchedulingRules();
    return cloneSchedulingRules(schedulingRulesState);
  }
}

function saveSchedulingRules(ruleGroups) {
  const defaults = defaultSchedulingRules();
  schedulingRulesState = {
    all: normalizeSchedulingRuleList(ruleGroups?.all ?? defaults.all),
    support: normalizeSchedulingRuleList(ruleGroups?.support ?? defaults.support),
    aco: normalizeSchedulingRuleList(ruleGroups?.aco ?? defaults.aco),
  };
  window.localStorage.setItem(getSchedulingRulesKey(), JSON.stringify(schedulingRulesState));
  return cloneSchedulingRules(schedulingRulesState);
}

async function syncSchedulingRulesFromServer() {
  try {
    const response = await fetch('/api/scheduling-rules');
    if (!response.ok) throw new Error(`Failed to load rules (${response.status})`);
    const payload = await response.json();
    schedulingRulesState = saveSchedulingRules(payload?.rules || defaultSchedulingRules());
    renderSchedulingRules();
  } catch {
    renderSchedulingRules();
  }
}

async function persistSchedulingRules(ruleGroups) {
  try {
    const response = await fetch('/api/scheduling-rules', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rules: ruleGroups }),
    });
    if (!response.ok) throw new Error(`Failed to save rules (${response.status})`);
    const payload = await response.json();
    schedulingRulesState = saveSchedulingRules(payload?.rules || ruleGroups);
  } catch {}
}

function getSchedulingScopeLabel(scope) {
  return scope === "support" ? "Support" : scope === "aco" ? "ACO" : "All";
}

function renderSchedulingRules() {
  if (!schedulingRulesCard) return;

  const ruleGroups = loadSchedulingRules();
  const rules = normalizeSchedulingRuleList(ruleGroups[activeSchedulingRuleScope]);
  schedulingRulesCard.innerHTML = `
    <div class="rules-card">
      <div class="rules-scope-switcher">
        ${schedulingRuleScopes
          .map(
            (scope) => `
              <button
                type="button"
                class="rules-scope-button ${scope === activeSchedulingRuleScope ? "active" : ""}"
                data-rule-scope="${scope}"
              >
                ${getSchedulingScopeLabel(scope)}
              </button>
            `
          )
          .join("")}
      </div>
      <div class="rules-scope-copy">
        ${getSchedulingScopeLabel(activeSchedulingRuleScope)} rules only apply to ${
          activeSchedulingRuleScope === "all"
            ? "everyone"
            : activeSchedulingRuleScope === "support"
              ? "Support team members"
              : "ACO team members"
        }.
      </div>
      <div class="rules-list">
        ${rules
          .map(
            (rule, index) => `
              <div class="rule-row">
                <label class="rule-label" for="rule-input-${activeSchedulingRuleScope}-${index}">${getSchedulingScopeLabel(activeSchedulingRuleScope)} Rule ${index + 1}</label>
                <div class="rule-input-row">
                  <input
                    id="rule-input-${activeSchedulingRuleScope}-${index}"
                    type="text"
                    class="portal-input rule-input"
                    value="${rule.replace(/"/g, "&quot;")}"
                    placeholder="Example: Only assign people to skills they have"
                    data-rule-index="${index}"
                  />
                  ${
                    rules.length > 1
                      ? `<button type="button" class="secondary-button rule-remove-button" data-rule-remove="${index}">Remove</button>`
                      : ""
                  }
                </div>
              </div>
            `
          )
          .join("")}
      </div>
      <div class="rules-actions">
        <button type="button" class="secondary-button" id="add-scheduling-rule">Add More Rules</button>
      </div>
    </div>
  `;

  schedulingRulesCard.querySelectorAll("[data-rule-scope]").forEach((button) => {
    button.addEventListener("click", () => {
      activeSchedulingRuleScope = button.dataset.ruleScope || "all";
      renderSchedulingRules();
    });
  });

  schedulingRulesCard.querySelectorAll("[data-rule-index]").forEach((input) => {
    input.addEventListener("input", (event) => {
      const nextRuleGroups = loadSchedulingRules();
      const nextRules = normalizeSchedulingRuleList(nextRuleGroups[activeSchedulingRuleScope]);
      nextRules[Number(event.target.dataset.ruleIndex)] = event.target.value;
      nextRuleGroups[activeSchedulingRuleScope] = nextRules;
      const savedRules = saveSchedulingRules(nextRuleGroups);
      void persistSchedulingRules(savedRules);
    });
  });

  schedulingRulesCard.querySelectorAll("[data-rule-remove]").forEach((button) => {
    button.addEventListener("click", () => {
      const nextRuleGroups = loadSchedulingRules();
      nextRuleGroups[activeSchedulingRuleScope] = normalizeSchedulingRuleList(nextRuleGroups[activeSchedulingRuleScope]).filter(
        (_, index) => index !== Number(button.dataset.ruleRemove)
      );
      const savedRules = saveSchedulingRules(nextRuleGroups);
      void persistSchedulingRules(savedRules);
      renderSchedulingRules();
    });
  });

  schedulingRulesCard.querySelector("#add-scheduling-rule")?.addEventListener("click", () => {
    const nextRuleGroups = loadSchedulingRules();
    const nextRules = normalizeSchedulingRuleList(nextRuleGroups[activeSchedulingRuleScope]);
    nextRules.push("");
    nextRuleGroups[activeSchedulingRuleScope] = nextRules;
    const savedRules = saveSchedulingRules(nextRuleGroups);
    void persistSchedulingRules(savedRules);
    renderSchedulingRules();
  });
}

function escapeCsvValue(value) {
  const text = String(value ?? "");
  if (/[",\n]/.test(text)) {
    return `"${text.replace(/"/g, '""')}"`;
  }
  return text;
}

function buildArchiveCsvDocument() {
  const groups = getGroupedBlocks();
  const headers = ["Name", "Title", "Manager", "Shift", "Time Block", "Assignment"];
  const rows = team
    .flatMap((person) =>
      groups.map((group) => {
        const assignments = group.blockIndexes
          .map((blockIndex) => person.assignments[blockIndex][0])
          .filter(Boolean);
        const assignment = assignments.length ? [...new Set(assignments)].join(" / ") : "Open";
        return [
          person.name,
          person.title || "",
          person.manager || "",
          person.schedule || "",
          group.label,
          assignment,
        ]
          .map(escapeCsvValue)
          .join(",");
      })
    )
    .join("\n");

  return [headers.join(","), rows].join("\n");
}

function downloadArchiveFile(filename, csv) {
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function parseCsvLine(line) {
  const values = [];
  let current = "";
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const next = line[index + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        current += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      values.push(current);
      current = "";
      continue;
    }

    current += char;
  }

  values.push(current);
  return values;
}

function parseCsvDocument(text) {
  return text
    .split(/\r?\n/)
    .filter((line) => line.trim().length)
    .map(parseCsvLine);
}

function formatArchiveDateLabel(name) {
  const match = (name || "").match(/(\d{4})-(\d{2})-(\d{2})/);
  if (!match) return name || "Archive";
  const [, year, month, day] = match;
  const parsed = new Date(`${year}-${month}-${day}T12:00:00`);
  if (Number.isNaN(parsed.getTime())) return `${month}/${day}/${year}`;
  return parsed.toLocaleDateString([], {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
}

function findArchiveRowsForName(nameQuery) {
  const normalizedQuery = normalizeText(nameQuery || "");
  if (!normalizedQuery) return [];

  return archivePreviewRows.filter((row) => {
    const full = normalizeText(row.name || "");
    const first = normalizeText((row.name || "").split(" ")[0] || "");
    const last = normalizeText((row.name || "").split(" ").slice(1).join(" ") || "");
    return (
      normalizedQuery === full ||
      normalizedQuery === first ||
      (last && normalizedQuery === last) ||
      full.includes(normalizedQuery) ||
      normalizedQuery.includes(full)
    );
  });
}

function renderArchivePreviewTable(archive, csvText) {
  if (!archivePreview || !archivePreviewTable || !archivePreviewTitle || !archivePreviewMeta || !archivePreviewOpen) return;

  archivePreview.classList.remove("hidden");
  archivePreviewTitle.textContent = formatArchiveDateLabel(archive.name);
  archivePreviewMeta.textContent = archive.modifiedAt || "Saved archive";
  archivePreviewOpen.href = archive.url;

  const rows = parseCsvDocument(csvText);
  if (!rows.length) {
    archivePreviewTable.innerHTML = `<div class="archive-preview-empty">This archive is empty.</div>`;
    return;
  }

  const [headers, ...bodyRows] = rows;
  const columnIndex = Object.fromEntries(headers.map((header, index) => [header, index]));
  const requiredColumns = ["Name", "Title", "Manager", "Shift", "Time Block", "Assignment"];
  const hasExpectedColumns = requiredColumns.every((column) => Number.isInteger(columnIndex[column]));

  if (!hasExpectedColumns) {
    archivePreviewTable.innerHTML = `
      <table class="archive-preview-table">
        <thead>
          <tr>${headers.map((header) => `<th>${header}</th>`).join("")}</tr>
        </thead>
        <tbody>
          ${bodyRows
            .map(
              (row) => `
                <tr>${headers.map((_, index) => `<td>${row[index] || ""}</td>`).join("")}</tr>
              `
            )
            .join("")}
        </tbody>
      </table>
    `;
    return;
  }

  const groupedRows = new Map();
  archivePreviewRows = [];
  bodyRows.forEach((row) => {
    const blockLabel = row[columnIndex["Time Block"]] || "Unknown";
    const personRow = {
      name: row[columnIndex["Name"]] || "",
      title: row[columnIndex["Title"]] || "",
      manager: row[columnIndex["Manager"]] || "",
      schedule: row[columnIndex["Shift"]] || "",
      timeBlock: blockLabel,
      assignment: row[columnIndex["Assignment"]] || "Open",
    };
    archivePreviewRows.push(personRow);
    if (!groupedRows.has(blockLabel)) {
      groupedRows.set(blockLabel, []);
    }
    groupedRows.get(blockLabel).push(personRow);
  });

  const previewMarkup = Array.from(groupedRows.entries())
    .map(([blockLabel, people]) => `
      <section class="time-section">
        <div class="time-header">
          <div>
            <h3>${blockLabel}</h3>
            <div class="time-subtitle">Saved assignments in this block</div>
          </div>
          <div class="time-count">${people.length} assignments</div>
        </div>
        <div class="assignment-list">
          ${people
            .map(
              (person) => `
                <article class="assignment-row">
                  <div>
                    <div class="person-name">${person.name}</div>
                    <div class="person-meta">${person.title} • ${person.manager}</div>
                  </div>
                  <div class="assignment-main">
                    <span class="assignment-chip ${person.assignment === "OOO/Sick/PTO" ? "out" : person.assignment === "Open" ? "open" : ""}">${person.assignment}</span>
                    <div class="schedule-badge">${person.schedule}</div>
                  </div>
                </article>
              `
            )
            .join("")}
        </div>
      </section>
    `)
    .join("");

  archivePreviewTable.innerHTML = `<div class="assignment-board">${previewMarkup}</div>`;
  renderArchiveNameLookupResult();
}

async function loadArchivePreview(archive) {
  if (!archive || !archive.url) return;

  if (archivePreviewContent[archive.name]) {
    renderArchivePreviewTable(archive, archivePreviewContent[archive.name]);
    return;
  }

  if (archivePreviewTable) {
    archivePreviewTable.innerHTML = `<div class="archive-preview-empty">Loading archive preview...</div>`;
  }
  if (archivePreview) {
    archivePreview.classList.remove("hidden");
  }

  try {
    const response = await fetch(archive.url);
    const text = await response.text();
    archivePreviewContent = {
      ...archivePreviewContent,
      [archive.name]: text,
    };
    renderArchivePreviewTable(archive, text);
  } catch {
    archivePreviewRows = [];
    if (archivePreviewTable) {
      archivePreviewTable.innerHTML = `<div class="archive-preview-empty">Could not load that archive preview.</div>`;
    }
  }
}

async function refreshArchiveLibrary() {
  if (!backendAvailable) return;
    try {
      const response = await fetch("/api/archives/status");
      const payload = await response.json();
      if (!response.ok) {
        const details = payload.details ? ` ${payload.details}` : "";
        throw new Error((payload.error || "Could not load archive status.") + details);
      }
  archiveLibrary = {
      folder: payload.folder || archiveLibrary.folder,
      archives: payload.archives || [],
    };
    if (!archiveLibrary.archives.find((archive) => archive.name === selectedArchiveName)) {
      selectedArchiveName = archiveLibrary.archives[0]?.name || "";
    }
    archivePreviewContent = {};
    archiveStatus = {
      enabled: Boolean(payload.settings?.enabled),
      time: payload.settings?.time || "00:00",
      lastArchivedDate: payload.settings?.lastArchivedDate || "",
      lastArchivedAt: payload.settings?.lastArchivedAt || "",
      nextRun: payload.settings?.nextRun || "",
    };
  } catch {
    archiveLibrary = {
      ...archiveLibrary,
      archives: [],
    };
    selectedArchiveName = "";
    archiveStatus = {
      enabled: false,
      time: archiveStatus.time || "00:00",
      lastArchivedDate: "",
      lastArchivedAt: "",
      nextRun: "",
    };
  }
}

async function saveArchiveConfig(partial = {}) {
  if (!backendAvailable) return;
  const response = await fetch("/api/archives/config", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      enabled: partial.enabled ?? archiveStatus.enabled,
      time: partial.time ?? archiveStatus.time,
    }),
  });
  const payload = await response.json();
  if (!response.ok) {
    throw new Error(payload.error || "Could not save archive settings.");
  }
  await refreshArchiveLibrary();
}

function queueArchiveSnapshotSync() {
  if (!backendAvailable) return;
  const today = new Date().toISOString().slice(0, 10);
  const csv = buildArchiveCsvDocument();
  const signature = `${today}:${csv.length}:${team.map((person) => person.assignments.map((entry) => entry[0]).join("|")).join("||")}`;
  if (signature === lastArchiveSyncSignature) return;
  lastArchiveSyncSignature = signature;

  if (archiveSyncTimer) {
    window.clearTimeout(archiveSyncTimer);
  }

  archiveSyncTimer = window.setTimeout(async () => {
    try {
      await fetch("/api/archives/snapshot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: today,
          html: csv,
        }),
      });
      await refreshArchiveLibrary();
      renderAutomations();
      renderArchives();
    } catch {
      // Keep the app usable even if snapshot sync fails.
    }
  }, 350);
}

async function runAutomationTest(automationId) {
  const automation = loadAutomationPreferences().find((entry) => entry.id === automationId);
  if (!automation) return;

  if (automation.id === "rule-based-reshuffle") {
    try {
      const plan = await buildRuleBasedReshufflePlan();
      plan.actions.forEach(applyAction);
      lastReviewedPlan = cloneData(plan);
      automationTestState = {
        ...automationTestState,
        [automationId]: {
          message: `Reshuffled the schedule using ${plan.ruleCount} saved rule${plan.ruleCount === 1 ? "" : "s"}.`,
          timestamp: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
        },
      };
      addMessage("assistant", `I reshuffled today’s schedule using the saved All, Support, and ACO rules. ${plan.actions.length} change${plan.actions.length === 1 ? "" : "s"} were applied.`);
      await appendAuditLogEntry({
        actionType: "automation-reshuffle",
        summary: `Rule-based schedule reshuffle run by ${getCurrentAdminProfile().name}`,
        details: [
          `${plan.actions.length} change${plan.actions.length === 1 ? "" : "s"} applied`,
          ...plan.details.slice(0, 10),
        ],
      });
    } catch (error) {
      automationTestState = {
        ...automationTestState,
        [automationId]: {
          message: error.message,
          timestamp: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
        },
      };
    }
    render();
    return;
  }

  if (automation.id === "nightly-pdf-archive") {
    const filename = `daily-ops-schedule-${new Date().toISOString().slice(0, 10)}.csv`;
    const csv = buildArchiveCsvDocument();

    if (!backendAvailable) {
      downloadArchiveFile(filename, csv);
      automationTestState = {
        ...automationTestState,
        [automationId]: {
          message: "Downloaded the archive file because the local server is not running.",
          timestamp: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
        },
      };
      render();
      return;
    }

    try {
      const response = await fetch("/api/archives/run-test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: new Date().toISOString().slice(0, 10),
          html: csv,
        }),
      });
      const payload = await response.json();
      if (!response.ok) {
        const details = payload.details ? ` ${payload.details}` : "";
        throw new Error((payload.error || "Archive save failed.") + details);
      }
      await refreshArchiveLibrary();
      automationTestState = {
        ...automationTestState,
        [automationId]: {
          message: payload.message || "Saved a test archive locally.",
          timestamp: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
        },
      };
    } catch (error) {
      automationTestState = {
        ...automationTestState,
        [automationId]: {
          message: error.message,
          timestamp: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
        },
      };
    }
    render();
    return;
  }

  automationTestState = {
    ...automationTestState,
    [automationId]: {
      message: `Test ran for ${automation.name}.`,
      timestamp: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
    },
  };

  render();
}

function applyAgentPreferences() {
  agentShell.classList.remove("has-custom-bg");
  agentShell.style.backgroundImage = "";
  agentShell.style.backgroundSize = "";
  agentShell.style.backgroundPosition = "";
  agentShell.style.backgroundAttachment = "";
  agentShell.style.removeProperty("--agent-accent");
  agentShell.style.removeProperty("--agent-accent-soft");
  agentShell.style.removeProperty("--agent-block-bg");
  agentShell.style.removeProperty("--agent-text");
  agentShell.style.removeProperty("--agent-text-soft");

  const preferences = loadAgentPreferences(selectedAgentId);
  const person = getPersonById(selectedAgentId);
  agentThemeSelect.value = preferences.blockColor;
  agentTextSelect.value = preferences.textColor;
  agentAlertsEnabled.checked = preferences.alertsEnabled;
  agentAlertTiming.value = preferences.alertTiming;
  if (agentAlertSoundEnabled) agentAlertSoundEnabled.checked = preferences.alertSoundEnabled !== false;
  const nextScope = refreshAgentAlertScopeOptions(person, preferences.alertScope);
  if (nextScope !== preferences.alertScope) {
    saveCurrentAgentPreferences({ alertScope: nextScope });
    preferences.alertScope = nextScope;
  }
  agentShell.style.setProperty("--agent-accent", preferences.blockColor);
  agentShell.style.setProperty("--agent-accent-soft", hexToRgba(preferences.blockColor, 0.18));
  agentShell.style.setProperty("--agent-block-bg", preferences.blockColor);
  agentShell.style.setProperty("--agent-block-soft", hexToRgba(preferences.blockColor, 0.16));
  agentShell.style.setProperty("--agent-text", preferences.textColor);
  agentShell.style.setProperty("--agent-text-soft", hexToRgba(preferences.textColor, 0.72));
  if (preferences.image) {
    agentShell.classList.add("has-custom-bg");
    agentShell.style.backgroundImage = `linear-gradient(rgba(255,255,255,0.08), rgba(255,255,255,0.08)), url('${preferences.image}')`;
    agentShell.style.backgroundSize = "cover";
    agentShell.style.backgroundPosition = "center";
    agentShell.style.backgroundAttachment = "fixed";
  }

  if (agentAlertStatus) {
    if (!notificationsSupported()) {
      agentAlertStatus.textContent = "This browser does not support push notifications.";
      return;
    }
    if (Notification.permission === "denied") {
      agentAlertStatus.textContent = "Notifications are blocked in this browser.";
      return;
    }
    if (preferences.alertsEnabled) {
      const scopeLabel =
        preferences.alertScope === "all"
          ? "all assignments"
          : preferences.alertScope === "MOD"
            ? "MOD"
            : preferences.alertScope;
      const timingLabel =
        preferences.alertTiming === "start"
          ? "at the start of the block"
          : `${preferences.alertTiming} minutes before`;
      agentAlertStatus.textContent =
        Notification.permission === "granted"
          ? `Push alerts are on. You will get ${scopeLabel} alerts, ${timingLabel}.`
          : `Turn on browser notifications to get ${scopeLabel} alerts, ${timingLabel}.`;
    } else {
      agentAlertStatus.textContent = "Push notifications are off right now.";
    }
  }
}

function setView(nextView) {
  currentView = nextView;
  portalScreen.classList.toggle("hidden", nextView !== "portal");
  adminShell.classList.toggle("hidden", nextView !== "admin");
  agentShell.classList.toggle("hidden", nextView !== "agent");
  if (nextView === "admin") {
    void refreshAuditLog();
  }
}

function findPersonFromText(text) {
  return findPeopleFromText(text)[0] || null;
}

function findPeopleFromText(text) {
  const normalized = normalizeText(text);
  const scopedTeam = getAssistantScopedTeam();
  return scopedTeam.filter((person) => {
    const full = normalizeText(person.name);
    const first = normalizeText(person.name.split(" ")[0]);
    const last = normalizeText(person.name.split(" ").slice(1).join(" "));
    return (
      normalized.includes(full) ||
      normalized.includes(first) ||
      (last && normalized.includes(last))
    );
  });
}

function findAssignmentFromText(text) {
  const normalized = normalizeText(text);
  const match = assignmentAliases.find((entry) =>
    entry.phrases.some((phrase) => normalized.includes(normalizeText(phrase)))
  );
  return match ? match.canonical : null;
}

function findAssignmentsFromText(text) {
  const normalized = normalizeText(text);
  return assignmentAliases
    .filter((entry) =>
      entry.phrases.some((phrase) => normalized.includes(normalizeText(phrase)))
    )
    .map((entry) => entry.canonical)
    .filter((assignment, index, list) => list.indexOf(assignment) === index);
}

function hourWithSuffix(hour, suffix) {
  let value = Number(hour);
  if (suffix) {
    const normalized = suffix.toLowerCase();
    if (value === 12) value = 0;
    if (normalized.startsWith("p")) value += 12;
    return value;
  }
  return null;
}

function timeValueWithMinutes(hour, minutes, suffix) {
  const minuteValue = Number(minutes || 0) / 60;
  const withSuffix = hourWithSuffix(hour, suffix);
  if (withSuffix !== null) return withSuffix + minuteValue;
  return Number(hour) + minuteValue;
}

function inferRangeHours(startHour, endHour) {
  if (startHour >= 8 && startHour <= 11 && endHour <= 5) {
    return { start: startHour, end: endHour + 12 };
  }
  if (startHour >= 8 && endHour > startHour) {
    return { start: startHour, end: endHour };
  }
  if (startHour <= 7 && endHour <= 10) {
    return { start: startHour + 12, end: endHour + 12 };
  }
  if (startHour === 8 && endHour === 10) {
    return { start: 20, end: 22 };
  }
  return {
    start: startHour < 8 ? startHour + 12 : startHour,
    end: endHour <= 5 ? endHour + 12 : endHour,
  };
}

function parseTimeRange(text) {
  const normalized = String(text || "").toLowerCase();

  if (
    containsAny(normalized, [
      "each timeblock",
      "each time block",
      "every timeblock",
      "every time block",
      "every hour",
      "each hour",
      "per hour",
      "all timeblocks",
      "all time blocks",
      "every block",
      "each block",
      "all day",
      "throughout the day",
    ])
  ) {
    return timeBlocks.map((_, index) => index);
  }

  const match =
    normalized.match(/from\s+(\d{1,2})(?:\:(\d{2}))?\s*(am|pm|a|p)?\s*(?:-|to)\s*(\d{1,2})(?:\:(\d{2}))?\s*(am|pm|a|p)?/) ||
    normalized.match(/(\d{1,2})(?:\:(\d{2}))?\s*(am|pm|a|p)?\s*(?:-|to|\s+through\s+|\s+thru\s+|\s+until\s+|\s+)\s*(\d{1,2})(?:\:(\d{2}))?\s*(am|pm|a|p)?/);
  if (!match) return null;

  const [, startRaw, startMinutes, startSuffix, endRaw, endMinutes, endSuffix] = match;
  let start = startSuffix ? timeValueWithMinutes(startRaw, startMinutes, startSuffix) : null;
  let end = endSuffix ? timeValueWithMinutes(endRaw, endMinutes, endSuffix) : null;

  if (start === null || end === null) {
    const inferred = inferRangeHours(Number(startRaw), Number(endRaw));
    start = start === null ? inferred.start + Number(startMinutes || 0) / 60 : start;
    end = end === null ? inferred.end + Number(endMinutes || 0) / 60 : end;
  }

  if (end <= start) end += 12;

  const blockIndexes = timeBlocks
    .map((block, index) => ({ block, index }))
    .filter(({ block }) => start < block.end && end > block.start)
    .map(({ index }) => index);

  return blockIndexes.length ? blockIndexes : null;
}

function scheduleStartValue(schedule) {
  const match = schedule.match(/(\d+)\s*(am|pm)/i);
  if (!match) return 99;
  let hour = Number(match[1]);
  if (hour === 12) hour = 0;
  if (match[2].toLowerCase() === "pm") hour += 12;
  return hour;
}

function personIsOut(person) {
  return person.assignments.every(([assignment]) => assignment === "OOO/Sick/PTO");
}

function getManualAssignmentOptions(person) {
  return [
    ...new Set(
      [
        "Open",
        "School Support Queue",
        "Tier 2 Phones",
        "Disputes",
        "Calibrations",
        "Game Reports",
        "Training",
        "OOO/Sick/PTO",
        ...person.assignments.map(([assignment]) => assignment).filter(Boolean),
      ].filter((assignment) => {
        if (assignment === "Open" || assignment === "OOO/Sick/PTO" || assignment === "Training") return true;
        return !editableSkillAssignments.includes(assignment) || personHasSkill(person, assignment);
      })
    ),
  ];
}

function personWorksBlock(person, blockIndex) {
  return Boolean(person.assignments[blockIndex] && person.assignments[blockIndex][0] !== "");
}

function countAssignmentBlocks(person, assignment) {
  return person.assignments.reduce(
    (total, [currentAssignment]) => total + (currentAssignment === assignment ? 1 : 0),
    0
  );
}

function formatBlockRange(startIndex, endIndex) {
  if (startIndex === endIndex) return formatBlockLabel(startIndex);
  const startLabel = timeBlocks[startIndex]?.label || formatBlockLabel(startIndex);
  const endLabel = timeBlocks[endIndex]?.label || formatBlockLabel(endIndex);
  const startTime = startLabel.split("-")[0];
  const endTime = endLabel.split("-")[1];
  return `${startTime}-${endTime}`;
}

function getAssignmentRanges(person, assignment) {
  const matchingIndexes = person.assignments
    .map(([currentAssignment], blockIndex) => (currentAssignment === assignment ? blockIndex : null))
    .filter((blockIndex) => blockIndex !== null);

  const ranges = [];
  matchingIndexes.forEach((blockIndex) => {
    const lastRange = ranges[ranges.length - 1];
    if (lastRange && lastRange.endIndex + 1 === blockIndex) {
      lastRange.endIndex = blockIndex;
      return;
    }
    ranges.push({ startIndex: blockIndex, endIndex: blockIndex });
  });
  return ranges;
}

function answerWhenPersonOnPhones(text) {
  const normalized = normalizeText(text);
  const asksWhenOnPhones =
    (normalized.includes("when") && normalized.includes("phone")) ||
    normalized.includes("what time") ||
    normalized.includes("what times");

  if (!asksWhenOnPhones) return null;

  const matchedPerson = findPersonFromText(text);
  if (!matchedPerson) return null;

  const ranges = getAssignmentRanges(matchedPerson, "Tier 2 Phones");
  if (!ranges.length) {
    return `${matchedPerson.name} is not on phones today.`;
  }

  return `${matchedPerson.name} is on phones during ${ranges
    .map((range) => formatBlockRange(range.startIndex, range.endIndex))
    .join(", ")}.`;
}

function answerWhenPersonOnMod(text) {
  const normalized = normalizeText(text);
  const asksWhenOnMod =
    (normalized.includes("when") && normalized.includes("mod")) ||
    (normalized.includes("what time") && normalized.includes("mod")) ||
    (normalized.includes("what times") && normalized.includes("mod"));

  if (!asksWhenOnMod) return null;

  const matchedPerson = findPersonFromText(text);
  if (!matchedPerson) return null;

  const ranges = getAssignmentRanges(matchedPerson, "MOD");
  if (!ranges.length) {
    return `${matchedPerson.name} is not MOD today.`;
  }

  return `${matchedPerson.name} is MOD during ${ranges
    .map((range) => formatBlockRange(range.startIndex, range.endIndex))
    .join(", ")}.`;
}

function personHasSkill(person, assignment) {
  if (!editableSkillAssignments.includes(assignment)) return true;
  return (person.skills || []).includes(assignment);
}

function findFallbackAssignment(person, blockIndex) {
  for (let offset = 1; offset < person.assignments.length; offset += 1) {
    const left = blockIndex - offset;
    if (left >= 0) {
      const [assignment] = person.assignments[left];
      if (
        assignment &&
        assignment !== "Tier 2 Phones" &&
        assignment !== "OOO/Sick/PTO" &&
        personHasSkill(person, assignment)
      ) {
        return assignment;
      }
    }

    const right = blockIndex + offset;
    if (right < person.assignments.length) {
      const [assignment] = person.assignments[right];
      if (
        assignment &&
        assignment !== "Tier 2 Phones" &&
        assignment !== "OOO/Sick/PTO" &&
        personHasSkill(person, assignment)
      ) {
        return assignment;
      }
    }
  }

  const skillBackfillOrder = [
    "School Support Queue",
    "FST Queue",
    "Data Requests",
    "Disputes",
    "Calibrations",
    "Game Reports",
    "Flex",
    "All Channels",
    "Login Issues",
    "Bugs Escalation",
    "SSA State Assignments",
  ];

  const skilledFallback = skillBackfillOrder.find((assignment) => personHasSkill(person, assignment));
  return skilledFallback || "Open";
}

function uniqueByPerson(actions) {
  return [...new Map(actions.map((action) => [action.personId, action])).values()];
}

function parseCount(text) {
  const normalized = normalizeText(text);
  const match = normalized.match(/(\d+)\s+people/);
  if (match) return Number(match[1]);

  const wordToNumber = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
    ten: 10,
  };

  const wordMatch = normalized.match(
    /\b(one|two|three|four|five|six|seven|eight|nine|ten)\b\s+people/
  );
  return wordMatch ? wordToNumber[wordMatch[1]] : null;
}

function isPhoneRepeatChangeRequest(text) {
  const normalized = normalizeText(text);
  const mentionsPhones = normalized.includes("phone");
  const mentionsRepeats =
    normalized.includes("repeat") ||
    normalized.includes("same people") ||
    normalized.includes("too heavy") ||
    normalized.includes("heavy") ||
    normalized.includes("unfair") ||
    normalized.includes("not fair") ||
    normalized.includes("imbalanced") ||
    normalized.includes("even this out") ||
    normalized.includes("even it out") ||
    normalized.includes("spread this out") ||
    normalized.includes("spread it out") ||
    normalized.includes("too much phones") ||
    normalized.includes("stuck on phones");
  const soundsLikeChange = containsAny(normalized, [
    "dont want",
    "do not want",
    "avoid",
    "remove",
    "fix",
    "change",
    "rebalance",
    "rework",
    "spread out",
    "make it fair",
    "reduce",
    "minimize",
    "too many",
    "as much as possible",
    "cut down",
    "less of",
    "lighten",
    "ease up",
    "move off",
    "shuffle",
    "rotate",
    "feels",
    "feel",
  ]);

  const softPhoneLoadSignal =
    mentionsPhones &&
    containsAny(normalized, [
      "phones feel heavy",
      "phone feels heavy",
      "phones are heavy",
    "phones feel too heavy",
    "phones feel really heavy",
    "phones are too heavy",
    "phones feel rough",
    "phones are rough",
    "phones feel unfair",
    "phones are unfair",
    "phones feel unbalanced",
    "phones are unbalanced",
    ]);

  return (mentionsPhones && mentionsRepeats && soundsLikeChange) || softPhoneLoadSignal;
}

function isCoverageChangeRequest(text) {
  const normalized = normalizeText(text);
  const hasCount = Boolean(parseCount(text));
  const hasAssignment = Boolean(findAssignmentFromText(text));
  const hasTimeRange = Boolean(parseTimeRange(text));

  if (!hasCount || !hasAssignment || !hasTimeRange) return false;

  return containsAny(normalized, [
    "need",
    "put",
    "assign",
    "have",
    "want",
    "keep",
    "make",
    "staff",
    "cover",
    "schedule",
    "will be",
    "going to be",
    "set up",
    "should be",
    "make sure",
    "there are",
    "there should be",
  ]);
}

function buildOutPlan(text) {
  const people = findPeopleFromText(text);
  if (!people.length) {
    return { error: "I could not match that person to the current roster." };
  }

  const peopleLabel =
    people.length === 1
      ? people[0].name
      : `${people[0].name} and ${people.length - 1} others`;

  return {
    title: `Mark ${peopleLabel} out today`,
    summary: `${people.map((person) => person.name).join(", ")} will be marked as out for every time block today.`,
    scope: "Full day update",
    actions: people.map((person) => ({
        type: "mark_out_day",
        personId: personId(person),
        personName: person.name,
      })),
    assistantText: `I drafted a full-day out-of-office change for ${people
      .map((person) => person.name)
      .join(", ")}. Review it on the right, then apply it if it looks good.`,
  };
}

function buildBlockSizePlan(text) {
  const mixed = parseMixedBlockRequest(text);
  if (mixed) {
    return {
      title: "Switch to mixed block sizes",
      summary: `The board will use ${mixed.focusSize}-hour blocks during ${hourLabel(
        timeBlocks[mixed.startIndex].start
      )}-${hourLabel(timeBlocks[mixed.endIndex - 1].end)} and ${mixed.baseSize}-hour blocks outside that range.`,
      scope: "Display update",
      actions: [
        {
          type: "set_mixed_block_layout",
          baseSize: mixed.baseSize,
          focusSize: mixed.focusSize,
          startIndex: mixed.startIndex,
          endIndex: mixed.endIndex,
          rangeLabel: `${hourLabel(timeBlocks[mixed.startIndex].start)}-${hourLabel(
            timeBlocks[mixed.endIndex - 1].end
          )}`,
        },
      ],
      assistantText: `I prepared a mixed layout change with smaller blocks during the training window and larger blocks outside it.`,
      details: [
        `${hourLabel(timeBlocks[mixed.startIndex].start)}-${hourLabel(
          timeBlocks[mixed.endIndex - 1].end
        )}: ${mixed.focusSize}-hour blocks.`,
        `Outside that range: ${mixed.baseSize}-hour blocks.`,
      ],
    };
  }

  const hours = parseBlockSizeRequest(text);
  if (!hours) return null;

  return {
    title: `Switch to ${hours}-hour blocks`,
    summary: `The board will regroup into ${hours}-hour time blocks.`,
    scope: "Display update",
    actions: [
      {
        type: "set_block_size",
        hours,
      },
    ],
    assistantText: `I prepared a layout change to ${hours}-hour blocks.`,
    details: [`New block size: ${hours} hour${hours === 1 ? "" : "s"}.`],
  };
}

function buildMovePlan(text) {
  const people = findPeopleFromText(text);
  const assignment = findAssignmentFromText(text);
  const blockIndexes = parseTimeRange(text);

  if (!people.length || !assignment || !blockIndexes) return null;
  if (assignment === "OOO/Sick/PTO") return buildOutPlan(text);

  const actions = people.map((person) => ({
    type: "set_assignment_range",
    personId: personId(person),
    personName: person.name,
    assignment,
    blockIndexes,
  }));

  const unskilledPeople = people.filter((person) => !personHasSkill(person, assignment));
  if (unskilledPeople.length) {
    return {
      error: `${unskilledPeople.map((person) => person.name).join(", ")} do not have the ${assignment} skill yet.`,
    };
  }

  const peopleLabel =
    people.length === 1
      ? people[0].name
      : `${people[0].name} and ${people.length - 1} others`;

  return {
    title: `Move ${peopleLabel} to ${assignment}`,
    summary: `${people.map((person) => person.name).join(", ")} will be scheduled on ${assignment} for ${blockIndexes
      .map(formatBlockLabel)
      .join(", ")}.`,
    scope: blockIndexes.length > 1 ? "Multi-block update" : "Single block update",
    actions,
    assistantText: `I prepared a move for ${people.map((person) => person.name).join(", ")} into ${assignment} across ${blockIndexes
      .map(formatBlockLabel)
      .join(", ")}. Review it first, then apply it when you're ready.`,
  };
}

function buildMixPlan(text) {
  const normalized = normalizeText(text);
  if (!containsAny(normalized, ["mix", "split", "combination"])) return null;

  const person = findPersonFromText(text);
  const assignments = findAssignmentsFromText(text).filter(
    (assignment) => assignment !== "OOO/Sick/PTO" && assignment !== "Training"
  );

  if (!person || assignments.length < 2) return null;

  const missingSkills = assignments.filter((assignment) => !personHasSkill(person, assignment));
  if (missingSkills.length) {
    return {
      error: `${person.name} does not have the ${missingSkills.join(" and ")} skill yet.`,
    };
  }

  const blockIndexes = parseTimeRange(text) || timeBlocks
    .map((_, index) => index)
    .filter((blockIndex) => personWorksBlock(person, blockIndex));

  const actions = blockIndexes.map((blockIndex, index) => ({
    type: "set_assignment_block",
    personId: personId(person),
    personName: person.name,
    assignment: assignments[index % assignments.length],
    blockIndex,
    previousAssignment: person.assignments[blockIndex][0],
    reason: "creating a mixed day",
  }));

  return {
    title: `Create a mixed day for ${person.name}`,
    summary: `${person.name} will rotate between ${assignments.join(" and ")} across ${blockIndexes
      .map(formatBlockLabel)
      .join(", ")}.`,
    scope: "Day plan update",
    actions,
    assistantText: `I prepared a mixed day for ${person.name}, rotating between ${assignments.join(" and ")}.`,
    details: [`Assignments will alternate across ${blockIndexes.length} block${blockIndexes.length === 1 ? "" : "s"}.`],
  };
}

function pickPeopleForAssignment(targetCount, assignment, blockIndex, options) {
  const excludedIds = new Set(options.excludePersonIds || []);
  const managerSelected = {};
  const candidates = getAssistantScopedTeam()
    .filter((person) => personWorksBlock(person, blockIndex))
    .filter((person) => !personIsOut(person))
    .filter((person) => personHasSkill(person, assignment))
    .filter((person) => !excludedIds.has(personId(person)))
    .sort((a, b) => {
      const aAlready = a.assignments[blockIndex][0] === assignment ? -3 : 0;
      const bAlready = b.assignments[blockIndex][0] === assignment ? -3 : 0;
      if (aAlready !== bAlready) return aAlready - bAlready;

      const fairScore = countAssignmentBlocks(a, assignment) - countAssignmentBlocks(b, assignment);
      if (fairScore !== 0) return fairScore;

      const shiftScore = scheduleStartValue(a.schedule) - scheduleStartValue(b.schedule);
      if (shiftScore !== 0) return shiftScore;

      return a.name.localeCompare(b.name);
    });

  const selected = [];
  while (selected.length < targetCount && candidates.length > 0) {
    candidates.sort((a, b) => {
      const aAlreadyAssigned = a.assignments[blockIndex][0] === assignment ? -3 : 0;
      const bAlreadyAssigned = b.assignments[blockIndex][0] === assignment ? -3 : 0;
      if (aAlreadyAssigned !== bAlreadyAssigned) return aAlreadyAssigned - bAlreadyAssigned;

      if (options.balanceManagers) {
        const aManagerLoad = managerSelected[a.manager] || 0;
        const bManagerLoad = managerSelected[b.manager] || 0;
        if (aManagerLoad !== bManagerLoad) return aManagerLoad - bManagerLoad;
      }
      const aLoad = countAssignmentBlocks(a, assignment);
      const bLoad = countAssignmentBlocks(b, assignment);
      if (aLoad !== bLoad) return aLoad - bLoad;
      return scheduleStartValue(a.schedule) - scheduleStartValue(b.schedule);
    });

    const person = candidates.shift();
    selected.push(person);
    managerSelected[person.manager] = (managerSelected[person.manager] || 0) + 1;
  }

  return selected;
}

function buildTrainingCoveragePlan(text) {
  const normalized = normalizeText(text);
  if (!normalized.includes("training")) return null;

  const people = findPeopleFromText(text);
  const blockIndexes = parseTimeRange(text);
  if (!blockIndexes) {
    return {
      question: "What time should I mark as training?",
      missing: "time_range",
      originalRequest: text,
    };
  }

  if (!people.length) {
    return {
      question: "Who is in training?",
      missing: "people",
      originalRequest: text,
    };
  }

  const keepPhonesCovered = containsAny(normalized, [
    "keep phones covered",
    "cover phones",
    "rework coverage",
    "keep phones staffed",
    "phones staffed",
    "keep phones full",
    "keep phone coverage",
    "keep coverage",
    "make sure phones are covered",
  ]);

  const trainingActions = people.map((person) => ({
    type: "set_assignment_range",
    personId: personId(person),
    personName: person.name,
    assignment: "Training",
    blockIndexes,
    reason: "scheduled for training",
  }));

  const backfillActions = [];
  const detailLines = [
    `Training window: ${blockIndexes.map(formatBlockLabel).join(", ")}.`,
    `Training attendees: ${people.map((person) => person.name).join(", ")}.`,
  ];

  if (keepPhonesCovered) {
    blockIndexes.forEach((blockIndex) => {
      const affectedPhonePeople = people.filter(
        (person) => person.assignments[blockIndex][0] === "Tier 2 Phones"
      );

      if (!affectedPhonePeople.length) return;

      const replacements = pickPeopleForAssignment(
        affectedPhonePeople.length,
        "Tier 2 Phones",
        blockIndex,
        {
          balanceManagers: containsAny(normalized, [
            "manager",
            "balanced",
            "balance leads",
            "keep it balanced",
          ]),
          excludePersonIds: people.map((person) => personId(person)),
        }
      );

      replacements.forEach((person) => {
        backfillActions.push({
          type: "set_assignment_block",
          personId: personId(person),
          personName: person.name,
          assignment: "Tier 2 Phones",
          blockIndex,
          previousAssignment: person.assignments[blockIndex][0],
          reason: "backfilling phones during training",
        });
      });

      detailLines.push(
        `${formatBlockLabel(blockIndex)}: ${affectedPhonePeople
          .map((person) => person.name)
          .join(", ")} moved to training; ${replacements.length
          ? replacements.map((person) => person.name).join(", ")
          : "no one available"} drafted to cover phones.`
      );
    });
  }

  const actions = [...trainingActions, ...backfillActions];

  return {
    title: `Training coverage plan`,
    summary: keepPhonesCovered
      ? `I drafted training time for ${people.map((person) => person.name).join(", ")} and backfilled phone coverage where training would pull people off phones.`
      : `I drafted training time for ${people.map((person) => person.name).join(", ")}.`,
    scope: blockIndexes.length > 1 ? "Multi-block scenario" : "Single block scenario",
    actions,
    assistantText: keepPhonesCovered
      ? `I marked the training window and then checked each affected block for phone coverage gaps. Where training removed someone from phones, I drafted replacements based on availability and fairness.`
      : `I marked the training window for the people you named.`,
    details: detailLines,
  };
}

function continueFromPendingQuestion(text) {
  if (!pendingQuestion) return null;

  const combinedRequest = `${pendingQuestion.originalRequest} ${text}`.trim();
  pendingQuestion = null;
  return buildPlanFromCommand(combinedRequest);
}

function mergePlans(plans) {
  const validPlans = plans.filter(Boolean);
  if (!validPlans.length) return null;

  const questionPlan = validPlans.find((plan) => plan.question);
  if (questionPlan) return questionPlan;

  const errorPlans = validPlans.filter((plan) => plan.error);
  if (errorPlans.length === validPlans.length) return errorPlans[0];

  const concretePlans = validPlans.filter((plan) => !plan.error && !plan.question);
  if (!concretePlans.length) return null;

  if (concretePlans.length === 1) return concretePlans[0];

  return {
    title: "Combined ops plan",
    summary: concretePlans.map((plan) => plan.summary).join(" "),
    scope: "Multi-part request",
    actions: concretePlans.flatMap((plan) => plan.actions || []),
    assistantText: concretePlans.map((plan) => plan.assistantText).join(" "),
    details: concretePlans.flatMap((plan) => plan.details || []),
  };
}

function summarizePlanForChat(plan) {
  if (!plan) return "";

  const parts = [plan.assistantText || plan.summary].filter(Boolean);

  if (plan.actions?.length) {
    parts.push(`${plan.actions.length} change${plan.actions.length === 1 ? "" : "s"} ready to review.`);
  }

  if (plan.details?.length) {
    parts.push("The step-by-step details are in the review panel.");
  }

  return parts.join(" ");
}

function buildCoveragePlan(text) {
  const normalized = normalizeText(text);
  if (!isCoverageChangeRequest(text)) return null;

  const targetCount = parseCount(text);
  const assignment = findAssignmentFromText(text);
  const blockIndexes = parseTimeRange(text);
  if (!targetCount || !assignment || !blockIndexes) return null;
  const minimumOnly = containsAny(normalized, [
    "at least",
    "minimum",
    "min ",
    "no fewer than",
  ]);
  const exactTarget = !minimumOnly;
  const scopedTeam = getAssistantScopedTeam();

  const options = {
    balanceManagers: containsAny(normalized, [
      "manager",
      "balanced",
      "balance leads",
      "keep it balanced",
    ]),
  };

  const actions = [];
  const planLines = [];

  blockIndexes.forEach((blockIndex) => {
    const chosen = pickPeopleForAssignment(targetCount, assignment, blockIndex, options);
    const chosenIds = new Set(chosen.map((person) => personId(person)));
    const currentAssigned = scopedTeam.filter(
      (person) => person.assignments[blockIndex][0] === assignment
    );

    if (exactTarget && currentAssigned.length > targetCount) {
      currentAssigned
        .filter((person) => !chosenIds.has(personId(person)))
        .forEach((person) => {
          const fallbackAssignment = findFallbackAssignment(person, blockIndex);
          actions.push({
            type: "set_assignment_block",
            personId: personId(person),
            personName: person.name,
            assignment: fallbackAssignment,
            blockIndex,
            previousAssignment: assignment,
            reason: `reducing ${assignment} to ${targetCount} total`,
          });
        });
    }

    chosen.forEach((person) => {
      const currentAssignment = person.assignments[blockIndex][0];
      actions.push({
        type: "set_assignment_block",
        personId: personId(person),
        personName: person.name,
        assignment,
        blockIndex,
        previousAssignment: currentAssignment,
      });
    });
    planLines.push(`${formatBlockLabel(blockIndex)}: ${chosen.map((person) => person.name).join(", ") || "no available staff"
      }`);
  });

  if (!actions.length) {
    return { error: `I could not find anyone available for ${assignment} in that time range.` };
  }

  return {
    title: `Coverage plan for ${assignment}`,
    summary: `I drafted coverage for ${assignment} across ${blockIndexes
      .map(formatBlockLabel)
      .join(", ")} with ${exactTarget ? `${targetCount}` : `at least ${targetCount}`} people per block.`,
    scope: blockIndexes.length > 1 ? "Multi-block rebalancing" : "Single block rebalancing",
    actions,
    assistantText: `I mapped out a ${assignment} coverage plan${exactTarget ? ` and trimmed extra coverage down to ${targetCount} per block` : ""}. I prioritized fairness and${
      options.balanceManagers ? " manager balance" : " availability"
    }. Review the specific changes on the right before applying them.`,
    details: planLines,
  };
}

function buildNoPhoneRepeatsPlan(text) {
  if (!isPhoneRepeatChangeRequest(text)) return null;

  const scopedTeam = getAssistantScopedTeam();
  const selectedPhoneBlocks = new Map();
  const actions = [];
  const detailLines = [];
  let unresolvedCount = 0;

  timeBlocks.forEach((block, blockIndex) => {
    const currentPhonePeople = scopedTeam.filter(
      (person) => person.assignments[blockIndex][0] === "Tier 2 Phones"
    );

    if (!currentPhonePeople.length) return;

    const keep = [];
    currentPhonePeople.forEach((person) => {
      if (!selectedPhoneBlocks.has(personId(person))) {
        keep.push(person);
        selectedPhoneBlocks.set(personId(person), blockIndex);
      }
    });

    const repeatsToReplace = currentPhonePeople.filter(
      (person) => !keep.some((kept) => personId(kept) === personId(person))
    );

    const replacements = [];
    repeatsToReplace.forEach((repeatedPerson) => {
      const replacement = scopedTeam
        .filter((person) => personWorksBlock(person, blockIndex))
        .filter((person) => !personIsOut(person))
        .filter((person) => personId(person) !== personId(repeatedPerson))
        .filter((person) => personHasSkill(person, "Tier 2 Phones"))
        .filter((person) => !selectedPhoneBlocks.has(personId(person)))
        .sort((a, b) => {
          const aCurrentPhone = a.assignments[blockIndex][0] === "Tier 2 Phones" ? 1 : 0;
          const bCurrentPhone = b.assignments[blockIndex][0] === "Tier 2 Phones" ? 1 : 0;
          if (aCurrentPhone !== bCurrentPhone) return aCurrentPhone - bCurrentPhone;

          const aPhoneLoad = countAssignmentBlocks(a, "Tier 2 Phones");
          const bPhoneLoad = countAssignmentBlocks(b, "Tier 2 Phones");
          if (aPhoneLoad !== bPhoneLoad) return aPhoneLoad - bPhoneLoad;

          return scheduleStartValue(a.schedule) - scheduleStartValue(b.schedule);
        })[0];

      if (!replacement) {
        unresolvedCount += 1;
        detailLines.push(
          `${formatBlockLabel(blockIndex)}: I could not fully remove a repeat for ${repeatedPerson.name} because no one else was available.`
        );
        return;
      }

      const fallbackAssignment = findFallbackAssignment(repeatedPerson, blockIndex);
      actions.push({
        type: "set_assignment_block",
        personId: personId(repeatedPerson),
        personName: repeatedPerson.name,
        assignment: fallbackAssignment,
        blockIndex,
        previousAssignment: "Tier 2 Phones",
        reason: "removing a repeat phone block",
      });
      actions.push({
        type: "set_assignment_block",
        personId: personId(replacement),
        personName: replacement.name,
        assignment: "Tier 2 Phones",
        blockIndex,
        previousAssignment: replacement.assignments[blockIndex][0],
        reason: `taking a phone block so ${repeatedPerson.name} does not repeat`,
      });

      selectedPhoneBlocks.set(personId(replacement), blockIndex);
      replacements.push(`${repeatedPerson.name} -> ${replacement.name}`);
    });

    if (replacements.length) {
      detailLines.push(`${formatBlockLabel(blockIndex)}: ${replacements.join(", ")}.`);
    }
  });

  if (!actions.length && !unresolvedCount) {
    return {
      error: "I do not see any phone repeats to fix right now.",
    };
  }

  return {
    title: "Reduce phone repeats",
    summary:
      unresolvedCount > 0
        ? "I drafted changes to reduce phone repeats where I could, but a few blocks still need coverage help."
        : "I drafted changes to spread phone coverage out so the same people are not repeating on phones.",
    scope: "Daywide rebalancing",
    actions,
    assistantText:
      unresolvedCount > 0
        ? "I reworked the phone schedule as much as I could. A few repeat phone blocks could not be removed because there was no extra coverage available."
        : "I reworked the phone schedule to reduce repeats and spread the phone blocks across more people.",
    details: detailLines,
  };
}

function getRuleScopedTeam(scope, teamData = team) {
  if (scope === "support") return teamData.filter((person) => person.teamGroup === "core");
  if (scope === "aco") return teamData.filter((person) => person.teamGroup === "aco");
  return teamData;
}

function getAllBlockIndexes() {
  return timeBlocks.map((_, index) => index);
}

function parseRuleBlockIndexes(ruleText) {
  const allBlockIndexes = getAllBlockIndexes();
  const outsideMatch = String(ruleText || "").match(/outside(?:\s+of)?\s+([^.]+)/i);
  if (outsideMatch) {
    const insideBlocks = parseTimeRange(outsideMatch[1]);
    if (insideBlocks?.length) {
      return allBlockIndexes.filter((index) => !insideBlocks.includes(index));
    }
  }

  const parsed = parseTimeRange(ruleText);
  if (parsed?.length) return parsed;

  return allBlockIndexes;
}

function isMinimumCoverageRule(ruleText) {
  const normalized = normalizeText(ruleText || "");
  return containsAny(normalized, [
    "at least",
    "minimum",
    "min ",
    "if possible",
    "whenever coverage allows",
    "whenever staffing allows",
    "as much as possible",
    "fill as much",
  ]);
}

function ruleMentionsPhoneFairness(ruleText) {
  const normalized = normalizeText(ruleText || "");
  return normalized.includes("phone") && containsAny(normalized, [
    "fair",
    "previous days",
    "current week",
    "same week",
    "minimize repeat",
    "more than 3",
    "3 total hours",
    "three hours",
  ]);
}

function parseCoverageRule(ruleText, scope) {
  const cleaned = String(ruleText || "").trim();
  if (!cleaned) return null;

  const assignment = findAssignmentFromText(cleaned);
  const count = parseCount(cleaned);
  if (!assignment || !count) return null;

  return {
    scope,
    assignment,
    count,
    minimumOnly: isMinimumCoverageRule(cleaned),
    blockIndexes: parseRuleBlockIndexes(cleaned),
    raw: cleaned,
  };
}

function getCurrentWeekStartDate() {
  const today = new Date(`${getTodayKey()}T12:00:00`);
  const day = today.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  today.setDate(today.getDate() + diff);
  today.setHours(0, 0, 0, 0);
  return today;
}

async function loadArchiveCsvText(archive) {
  if (!archive?.name || !archive?.url) return "";
  if (archivePreviewContent[archive.name]) return archivePreviewContent[archive.name];
  const response = await fetch(archive.url);
  const text = await response.text();
  archivePreviewContent = {
    ...archivePreviewContent,
    [archive.name]: text,
  };
  return text;
}

async function getWeeklyPhoneHistoryCounts() {
  const counts = {};
  if (!backendAvailable) return counts;
  if (!archiveLibrary.archives?.length) {
    await refreshArchiveLibrary();
  }

  const weekStart = getCurrentWeekStartDate();
  const todayKey = getTodayKey();
  const candidateArchives = (archiveLibrary.archives || []).filter((archive) => {
    const match = String(archive.name || "").match(/(\d{4})-(\d{2})-(\d{2})/);
    if (!match) return false;
    const dateKey = `${match[1]}-${match[2]}-${match[3]}`;
    if (dateKey >= todayKey) return false;
    const archiveDate = new Date(`${dateKey}T12:00:00`);
    return archiveDate >= weekStart;
  });

  for (const archive of candidateArchives) {
    try {
      const csvText = await loadArchiveCsvText(archive);
      const rows = parseCsvDocument(csvText);
      if (rows.length < 2) continue;
      const [headers, ...bodyRows] = rows;
      const columnIndex = Object.fromEntries(headers.map((header, index) => [header, index]));
      const assignmentIndex = columnIndex["Assignment"];
      const nameIndex = columnIndex["Name"];
      if (!Number.isInteger(assignmentIndex) || !Number.isInteger(nameIndex)) continue;
      bodyRows.forEach((row) => {
        if ((row[assignmentIndex] || "") !== "Tier 2 Phones") return;
        const name = row[nameIndex] || "";
        if (!name) return;
        counts[name] = (counts[name] || 0) + 1;
      });
    } catch {
      // Ignore archive rows that cannot be read so the reshuffle can still proceed.
    }
  }

  return counts;
}

function setAssignmentOnTeam(teamData, action) {
  const person = teamData.find((entry) => personId(entry) === action.personId);
  if (!person) return;
  person.assignments[action.blockIndex] = [
    action.assignment,
    action.assignment === "Tier 2 Phones",
  ];
}

function buildAssignmentAction(person, blockIndex, assignment, reason) {
  return {
    type: "set_assignment_block",
    personId: personId(person),
    personName: person.name,
    assignment,
    blockIndex,
    previousAssignment: person.assignments[blockIndex][0],
    reason,
  };
}

function upsertAssignmentAction(actionMap, orderedKeys, action) {
  const key = `${action.personId}:${action.blockIndex}`;
  if (!orderedKeys.includes(key)) orderedKeys.push(key);
  actionMap.set(key, action);
}

function pickRulePeopleForAssignment(teamData, targetCount, assignment, blockIndex, options = {}) {
  const excludedIds = new Set(options.excludePersonIds || []);
  const managerSelected = {};
  const weeklyPhoneCounts = options.weeklyPhoneCounts || {};
  const candidates = teamData
    .filter((person) => personWorksBlock(person, blockIndex))
    .filter((person) => !personIsOut(person))
    .filter((person) => personHasSkill(person, assignment))
    .filter((person) => !excludedIds.has(personId(person)))
    .sort((a, b) => {
      const aAlready = a.assignments[blockIndex][0] === assignment ? -3 : 0;
      const bAlready = b.assignments[blockIndex][0] === assignment ? -3 : 0;
      if (aAlready !== bAlready) return aAlready - bAlready;

      if (assignment === "Tier 2 Phones") {
        const aWeekly = weeklyPhoneCounts[a.name] || 0;
        const bWeekly = weeklyPhoneCounts[b.name] || 0;
        if (aWeekly !== bWeekly) return aWeekly - bWeekly;
      }

      const aLoad = countAssignmentBlocks(a, assignment);
      const bLoad = countAssignmentBlocks(b, assignment);
      if (assignment === "Tier 2 Phones") {
        const aPenalty = aLoad >= 3 ? aLoad - 2 : 0;
        const bPenalty = bLoad >= 3 ? bLoad - 2 : 0;
        if (aPenalty !== bPenalty) return aPenalty - bPenalty;
      }
      if (aLoad !== bLoad) return aLoad - bLoad;

      if (options.balanceManagers) {
        const aManagerLoad = managerSelected[a.manager] || 0;
        const bManagerLoad = managerSelected[b.manager] || 0;
        if (aManagerLoad !== bManagerLoad) return aManagerLoad - bManagerLoad;
      }

      const shiftScore = scheduleStartValue(a.schedule) - scheduleStartValue(b.schedule);
      if (shiftScore !== 0) return shiftScore;
      return a.name.localeCompare(b.name);
    });

  const selected = [];
  while (selected.length < targetCount && candidates.length > 0) {
    candidates.sort((a, b) => {
      const aAlready = a.assignments[blockIndex][0] === assignment ? -3 : 0;
      const bAlready = b.assignments[blockIndex][0] === assignment ? -3 : 0;
      if (aAlready !== bAlready) return aAlready - bAlready;

      if (assignment === "Tier 2 Phones") {
        const aWeekly = weeklyPhoneCounts[a.name] || 0;
        const bWeekly = weeklyPhoneCounts[b.name] || 0;
        if (aWeekly !== bWeekly) return aWeekly - bWeekly;

        const aPhoneLoad = countAssignmentBlocks(a, assignment);
        const bPhoneLoad = countAssignmentBlocks(b, assignment);
        const aPenalty = aPhoneLoad >= 3 ? aPhoneLoad - 2 : 0;
        const bPenalty = bPhoneLoad >= 3 ? bPhoneLoad - 2 : 0;
        if (aPenalty !== bPenalty) return aPenalty - bPenalty;
      }

      if (options.balanceManagers) {
        const aManagerLoad = managerSelected[a.manager] || 0;
        const bManagerLoad = managerSelected[b.manager] || 0;
        if (aManagerLoad !== bManagerLoad) return aManagerLoad - bManagerLoad;
      }

      const aLoad = countAssignmentBlocks(a, assignment);
      const bLoad = countAssignmentBlocks(b, assignment);
      if (aLoad !== bLoad) return aLoad - bLoad;
      return scheduleStartValue(a.schedule) - scheduleStartValue(b.schedule);
    });

    const person = candidates.shift();
    selected.push(person);
    managerSelected[person.manager] = (managerSelected[person.manager] || 0) + 1;
  }

  return selected;
}

async function buildRuleBasedReshufflePlan() {
  const ruleGroups = loadSchedulingRules();
  const filledRules = {
    all: normalizeSchedulingRuleList(ruleGroups.all).filter((rule) => String(rule || "").trim()),
    support: normalizeSchedulingRuleList(ruleGroups.support).filter((rule) => String(rule || "").trim()),
    aco: normalizeSchedulingRuleList(ruleGroups.aco).filter((rule) => String(rule || "").trim()),
  };

  const allRuleText = [...filledRules.all, ...filledRules.support, ...filledRules.aco];
  if (!allRuleText.length) {
    throw new Error("Add at least one scheduling rule before running the reshuffle.");
  }

  const coverageRules = [
    ...filledRules.all.map((rule) => parseCoverageRule(rule, "all")),
    ...filledRules.support.map((rule) => parseCoverageRule(rule, "support")),
    ...filledRules.aco.map((rule) => parseCoverageRule(rule, "aco")),
  ].filter(Boolean);

  if (!coverageRules.length) {
    throw new Error("I could not find any coverage targets in the saved rules yet.");
  }

  const shouldUseWeeklyPhoneHistory = allRuleText.some(ruleMentionsPhoneFairness);
  const weeklyPhoneCounts = shouldUseWeeklyPhoneHistory ? await getWeeklyPhoneHistoryCounts() : {};
  const simulationTeam = cloneData(team);
  const actionMap = new Map();
  const orderedKeys = [];
  const detailLines = [];

  coverageRules.forEach((rule) => {
    const scopedTeam = getRuleScopedTeam(rule.scope, simulationTeam);
    rule.blockIndexes.forEach((blockIndex) => {
      const chosen = pickRulePeopleForAssignment(scopedTeam, rule.count, rule.assignment, blockIndex, {
        balanceManagers: true,
        weeklyPhoneCounts,
      });
      const chosenIds = new Set(chosen.map((person) => personId(person)));
      const currentAssigned = scopedTeam.filter(
        (person) => person.assignments[blockIndex][0] === rule.assignment
      );

      if (!rule.minimumOnly && currentAssigned.length > rule.count) {
        currentAssigned
          .filter((person) => !chosenIds.has(personId(person)))
          .forEach((person) => {
            const fallbackAssignment = findFallbackAssignment(person, blockIndex);
            const action = buildAssignmentAction(
              person,
              blockIndex,
              fallbackAssignment,
              `reshuffle rule: reduce ${rule.assignment} to ${rule.count}`
            );
            upsertAssignmentAction(actionMap, orderedKeys, action);
            setAssignmentOnTeam(simulationTeam, action);
          });
      }

      chosen.forEach((person) => {
        const action = buildAssignmentAction(
          person,
          blockIndex,
          rule.assignment,
          `reshuffle rule: ${rule.raw}`
        );
        upsertAssignmentAction(actionMap, orderedKeys, action);
        setAssignmentOnTeam(simulationTeam, action);
      });

      const names = chosen.map((person) => person.name).join(", ") || "no available staff";
      detailLines.push(`${getSchedulingScopeLabel(rule.scope)} • ${formatBlockLabel(blockIndex)} • ${rule.assignment}: ${names}`);
    });
  });

  const actions = orderedKeys.map((key) => actionMap.get(key)).filter(Boolean);
  if (!actions.length) {
    throw new Error("The saved rules did not require any schedule changes right now.");
  }

  return {
    title: "Rule-based schedule reshuffle",
    summary: `Applied ${coverageRules.length} scheduling rule${coverageRules.length === 1 ? "" : "s"} across All, Support, and ACO.`,
    actions,
    details: detailLines,
    ruleCount: coverageRules.length,
  };
}

function answerFollowUpQuestion(text) {
  const normalized = normalizeText(text);
  const plan = pendingPlan || lastReviewedPlan;

  if (!plan) return null;

  const movementQuestion =
    containsAny(normalized, [
      "who got moved",
      "who changed",
      "what changed",
      "who did you move",
      "who was moved",
      "why did you choose",
      "why were they chosen",
      "why those people",
      "why them",
    ]);

  if (movementQuestion) {
    const changedActions = plan.actions.filter(
      (action) => action.type === "set_assignment_block" || action.type === "set_assignment_range"
    );

    if (!changedActions.length) {
      return "That plan did not move anyone, so there are no staffing changes to explain.";
    }

    return changedActions
      .map((action) => {
        const timing =
          action.type === "set_assignment_range"
            ? action.blockIndexes.map(formatBlockLabel).join(", ")
            : formatBlockLabel(action.blockIndex);
        return `${action.personName} -> ${action.assignment} during ${timing}${
          action.reason ? ` because ${action.reason}` : ""
        }.`;
      })
      .join(" ");
  }

  const phoneSelectionQuestion =
    containsAny(normalized, [
      "already on phones",
      "already on phone",
      "were any selected",
      "already selected on phones",
      "were they already on phones",
      "did you move anyone who was already on phones",
    ]);

  if (!phoneSelectionQuestion) return null;

  const phoneActions = plan.actions.filter(
    (action) => action.type === "set_assignment_block" && action.assignment === "Tier 2 Phones"
  );

  if (!phoneActions.length) {
    return "That plan did not select anyone for phones, so there is nothing to compare there.";
  }

  const alreadyOnPhones = [];
  const newlyMovedToPhones = [];

  phoneActions.forEach((action) => {
    const previousAssignment =
      action.previousAssignment ??
      (getPersonById(action.personId)?.assignments?.[action.blockIndex]?.[0] || "");

    const entry = `${action.personName} in ${formatBlockLabel(action.blockIndex)}`;
    if (previousAssignment === "Tier 2 Phones") {
      alreadyOnPhones.push(entry);
    } else {
      newlyMovedToPhones.push(entry);
    }
  });

  if (alreadyOnPhones.length && newlyMovedToPhones.length) {
    return `Yes. Already on phones: ${alreadyOnPhones.join(", ")}. Newly moved to phones: ${newlyMovedToPhones.join(", ")}.`;
  }

  if (alreadyOnPhones.length) {
    return `Yes. Everyone I selected was already on phones: ${alreadyOnPhones.join(", ")}.`;
  }

  return `No. None of the selected people were already on phones. They were all newly moved there: ${newlyMovedToPhones.join(", ")}.`;
}

function answerInsightFollowUpQuestion(text) {
  const normalized = normalizeText(text);
  const phoneTimingAnswer = answerWhenPersonOnPhones(text);
  if (phoneTimingAnswer) return phoneTimingAnswer;
  const modTimingAnswer = answerWhenPersonOnMod(text);
  if (modTimingAnswer) return modTimingAnswer;
  if (!lastInsight) return null;

  const asksMeaning =
    normalized.includes("what does") ||
    normalized.includes("what do you mean") ||
    normalized.includes("what does that mean") ||
    normalized.includes("mean");

  if (!asksMeaning) return null;

  if (lastInsight.type === "phone_repeats") {
    const matchedEntry = lastInsight.entries.find((entry) =>
      normalized.includes(normalizeText(entry.name))
    );

    if (matchedEntry) {
      return `${matchedEntry.name} (${matchedEntry.count}) means ${matchedEntry.name} is scheduled on phones for ${matchedEntry.count} time blocks today.`;
    }

    return "The number in parentheses is how many time blocks that person is scheduled on phones today.";
  }

  return null;
}

function answerInsightQuestion(text) {
  const normalized = normalizeText(text);
  const scopedTeam = getAssistantScopedTeam();
  const phoneTimingAnswer = answerWhenPersonOnPhones(text);
  if (phoneTimingAnswer) return phoneTimingAnswer;
  const modTimingAnswer = answerWhenPersonOnMod(text);
  if (modTimingAnswer) return modTimingAnswer;

  const asksForGeneralInsights = containsAny(normalized, [
    "general insights",
    "insights on the schedule",
    "schedule insights",
    "what stands out",
    "give me insights",
    "overall insights",
  ]);

  if (asksForGeneralInsights) {
    const outCount = scopedTeam.filter(personIsOut).length;
    const busiestAssignments = Object.entries(
      scopedTeam.reduce((counts, person) => {
        person.assignments.forEach(([assignment]) => {
          if (!assignment || assignment === "OOO/Sick/PTO") return;
          counts[assignment] = (counts[assignment] || 0) + 1;
        });
        return counts;
      }, {})
    )
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);

    const phoneRepeats = scopedTeam.filter(
      (person) => countAssignmentBlocks(person, "Tier 2 Phones") > 1
    ).length;

    const openBlocks = scopedTeam.reduce((total, person) => {
      return (
        total +
        person.assignments.filter(([assignment]) => assignment === "").length
      );
    }, 0);

    return `Quick read: ${outCount} people are out today. Top coverage is ${busiestAssignments
      .map(([name, count]) => `${name} (${count})`)
      .join(", ")}. ${phoneRepeats} people have repeat phone blocks. There are ${openBlocks} open blocks right now.`;
  }

  const oneShiftAssignment = findAssignmentFromText(text);
  const asksWhoHasOneAssignmentShift =
    Boolean(oneShiftAssignment) &&
    containsAny(normalized, [
      "who only has 1",
      "who only has one",
      "who has 1",
      "who has one",
      "who has exactly 1",
      "who has exactly one",
      "only has 1",
      "only has one",
      "exactly 1",
      "exactly one",
    ]) &&
    containsAny(normalized, ["shift", "block", "hour"]);

  if (asksWhoHasOneAssignmentShift) {
    const oneShiftPeople = scopedTeam
      .map((person) => ({
        name: person.name,
        count: countAssignmentBlocks(person, oneShiftAssignment),
      }))
      .filter((entry) => entry.count === 1)
      .sort((a, b) => a.name.localeCompare(b.name));

    if (!oneShiftPeople.length) {
      return `No one only has one ${oneShiftAssignment} shift today.`;
    }

    return `People with exactly 1 ${oneShiftAssignment} shift today: ${oneShiftPeople
      .map((entry) => entry.name)
      .join(", ")}.`;
  }

  const asksAboutPhoneRepeats =
    containsAny(normalized, [
      "repeats on phones",
      "repeat on phones",
      "phone repeats",
      "any phone repeats",
      "have any phone repeats",
      "repeat phone shifts",
      "repeated phone shifts",
      "repeat phone shift",
      "phone shift repeats",
      "repeat shifts on phones",
      "repeat shifts today",
      "who is on phones the most",
      "any repeats on phones",
      "who has phones more than once",
      "anyone stuck on phones",
      "too much phones",
    ]) ||
    (normalized.includes("phones") && normalized.includes("repeat"));

  if (asksAboutPhoneRepeats) {
    const phoneCounts = scopedTeam
      .map((person) => ({
        name: person.name,
        count: countAssignmentBlocks(person, "Tier 2 Phones"),
      }))
      .filter((entry) => entry.count > 0)
      .sort((a, b) => b.count - a.count);

    if (!phoneCounts.length) {
      lastInsight = {
        type: "phone_repeats",
        entries: [],
      };
      return "No one is on phones today.";
    }

    const repeats = phoneCounts.filter((entry) => entry.count > 1);

    if (!repeats.length) {
      lastInsight = {
        type: "phone_repeats",
        entries: phoneCounts,
      };
      return "No repeats on phones today. Everyone on phones only appears once.";
    }

    lastInsight = {
      type: "phone_repeats",
      entries: repeats,
    };
    return `Yes. Repeats on phones today: ${repeats
      .map((entry) => `${entry.name} (${entry.count})`)
      .join(", ")}.`;
  }

  const asksWhoIsOnPhones =
    containsAny(normalized, [
      "who all is on phones",
      "who is on phones",
      "who's on phones",
      "who all is on phone",
      "who is on phone",
      "who all has phones",
      "who has phones today",
      "who is doing phones",
      "who's doing phones",
    ]) ||
    (normalized.includes("phones") && normalized.includes("who all"));

  if (asksWhoIsOnPhones) {
    const phonePeople = scopedTeam
      .map((person) => ({
        name: person.name,
        count: countAssignmentBlocks(person, "Tier 2 Phones"),
      }))
      .filter((entry) => entry.count > 0)
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));

    if (!phonePeople.length) {
      return "No one is on phones today.";
    }

    return `On phones today: ${phonePeople
      .map((entry) => `${entry.name} (${entry.count})`)
      .join(", ")}.`;
  }

  const asksAboutMod = containsAny(normalized, [
    "who's mod",
    "who is mod",
    "who is the mod",
    "who's the mod",
    "mod and when",
    "who has mod",
    "who is on mod",
    "who's on mod",
  ]);

  if (asksAboutMod) {
    const modAssignments = scopedTeam
      .flatMap((person) =>
        person.assignments
          .map(([assignment], blockIndex) => ({
            person: person.name,
            assignment,
            blockIndex,
          }))
          .filter((entry) => entry.assignment === "MOD")
      )
      .sort((a, b) => a.blockIndex - b.blockIndex || a.person.localeCompare(b.person));

    if (!modAssignments.length) {
      return "No one is scheduled as MOD today.";
    }

    const groupedAssignments = [];

    modAssignments.forEach((entry) => {
      const lastGroup = groupedAssignments[groupedAssignments.length - 1];
      if (
        lastGroup &&
        lastGroup.person === entry.person &&
        lastGroup.endIndex + 1 === entry.blockIndex
      ) {
        lastGroup.endIndex = entry.blockIndex;
        return;
      }

      groupedAssignments.push({
        person: entry.person,
        startIndex: entry.blockIndex,
        endIndex: entry.blockIndex,
      });
    });

    const formatRange = (startIndex, endIndex) => {
      if (startIndex === endIndex) return formatBlockLabel(startIndex);
      const startLabel = timeBlocks[startIndex]?.label || formatBlockLabel(startIndex);
      const endLabel = timeBlocks[endIndex]?.label || formatBlockLabel(endIndex);
      const startTime = startLabel.split("-")[0];
      const endTime = endLabel.split("-")[1];
      return `${startTime}-${endTime}`;
    };

    return `MOD today: ${groupedAssignments
      .map((entry) => `${entry.person} (${formatRange(entry.startIndex, entry.endIndex)})`)
      .join(", ")}.`;
  }

  const asksAboutCoverageGaps =
    normalized.includes("coverage gaps") ||
    normalized.includes("any gaps") ||
    normalized.includes("where are the gaps");

  if (asksAboutCoverageGaps) {
    const gaps = getGroupedBlocks()
      .map((group) => {
        const phoneCount = scopedTeam.reduce((total, person) => {
          return (
            total +
            group.blockIndexes.reduce((sum, blockIndex) => {
              const [assignment] = person.assignments[blockIndex];
              return sum + (assignment === "Tier 2 Phones" ? 1 : 0);
            }, 0)
          );
        }, 0);
        return { label: group.label, phoneCount };
      })
      .filter((entry) => entry.phoneCount === 0);

    if (!gaps.length) {
      return "I do not see any phone coverage gaps right now.";
    }

    return `Coverage gaps: ${gaps.map((gap) => gap.label).join(", ")}.`;
  }

  const asksAboutWorkload =
    normalized.includes("heaviest workload") ||
    normalized.includes("who is busiest") ||
    normalized.includes("who has the most work");

  if (asksAboutWorkload) {
    const loads = scopedTeam
      .map((person) => ({
        name: person.name,
        count: person.assignments.filter(
          ([assignment]) => assignment && assignment !== "OOO/Sick/PTO"
        ).length,
      }))
      .sort((a, b) => b.count - a.count);

    if (!loads.length || loads[0].count === 0) {
      return "I do not see any active workload today.";
    }

    const maxLoad = loads[0].count;
    const busiest = loads.filter((entry) => entry.count === maxLoad);
    return `Heaviest workload: ${busiest
      .map((entry) => `${entry.name} (${entry.count})`)
      .join(", ")}.`;
  }

  const asksAboutAssignmentChanges =
    normalized.includes("changes assignments the most") ||
    normalized.includes("most variety in assignments") ||
    normalized.includes("who changes assignments the most");

  if (asksAboutAssignmentChanges) {
    const changes = scopedTeam
      .map((person) => {
        const assignments = person.assignments
          .map(([assignment]) => assignment)
          .filter((assignment) => assignment && assignment !== "OOO/Sick/PTO");
        return {
          name: person.name,
          variety: new Set(assignments).size,
        };
      })
      .sort((a, b) => b.variety - a.variety);

    if (!changes.length || changes[0].variety === 0) {
      return "I do not see assignment changes today.";
    }

    const maxVariety = changes[0].variety;
    const top = changes.filter((entry) => entry.variety === maxVariety);
    return `Most assignment variety: ${top
      .map((entry) => `${entry.name} (${entry.variety})`)
      .join(", ")}.`;
  }

  return null;
}

function buildPlanFromCommand(text) {
  const normalized = normalizeText(text);
  const plans = [];

  const blockSizePlan = buildBlockSizePlan(text);
  if (blockSizePlan) plans.push(blockSizePlan);

  const noPhoneRepeatsPlan = buildNoPhoneRepeatsPlan(text);
  if (noPhoneRepeatsPlan) plans.push(noPhoneRepeatsPlan);

  if (
    containsAny(normalized, [
      "out today",
      "is out",
      "pto",
      "sick",
      "is off today",
      "off today",
      "will be out",
      "not here today",
      "is out all day",
    ])
  ) {
    plans.push(buildOutPlan(text));
  }

  const trainingPlan = buildTrainingCoveragePlan(text);
  if (trainingPlan) plans.push(trainingPlan);

  const coveragePlan = buildCoveragePlan(text);
  if (coveragePlan) plans.push(coveragePlan);

  const mixPlan = buildMixPlan(text);
  if (mixPlan) plans.push(mixPlan);

  const movePlan = buildMovePlan(text);
  if (movePlan) plans.push(movePlan);

  const mergedPlan = mergePlans(plans);
  if (mergedPlan) return mergedPlan;

  return {
    error:
      "I do not understand that request yet. Try a person-out request, a direct move like 'move Ezra to Game Reports from 5-8', or a staffing request like 'we need 5 people on phones from 2-5'.",
  };
}

function applyAction(action) {
  if (action.type === "set_mixed_block_layout") {
    blockLayout = {
      baseSize: action.baseSize,
      focus: {
        size: action.focusSize,
        startIndex: action.startIndex,
        endIndex: action.endIndex,
      },
    };
    return;
  }

  if (action.type === "set_block_size") {
    blockLayout = {
      baseSize: action.hours,
      focus: null,
    };
    return;
  }

  const person = getPersonById(action.personId);
  if (!person) return;

  if (action.type === "mark_out_day") {
    person.assignments = person.assignments.map(() => ["OOO/Sick/PTO", false]);
    return;
  }

  if (action.type === "set_assignment_block") {
    person.assignments[action.blockIndex] = [
      action.assignment,
      action.assignment === "Tier 2 Phones",
    ];
    return;
  }

  if (action.type === "set_assignment_range") {
    action.blockIndexes.forEach((blockIndex) => {
      person.assignments[blockIndex] = [
        action.assignment,
        action.assignment === "Tier 2 Phones",
      ];
    });
  }
}

async function submitChatRequest() {
  const text = commandInput.value.trim();
  if (!text) return;

  addMessage("user", text);
  commandInput.value = "";
  sendMessageButton.disabled = true;
  sendMessageButton.textContent = "Thinking...";
  render();

  try {
    const insightFollowUpAnswer = answerInsightFollowUpQuestion(text);
    if (insightFollowUpAnswer) {
      addMessage("assistant", insightFollowUpAnswer);
      return;
    }

    if (!isPhoneRepeatChangeRequest(text)) {
      const insightAnswer = answerInsightQuestion(text);
      if (insightAnswer) {
        addMessage("assistant", insightAnswer);
        return;
      }
    }

    const followUpAnswer = answerFollowUpQuestion(text);
    if (followUpAnswer) {
      addMessage("assistant", followUpAnswer);
      return;
    }

    if (pendingQuestion) {
      const continuedPlan = continueFromPendingQuestion(text);
      if (continuedPlan?.question) {
        pendingQuestion = continuedPlan;
        addMessage("assistant", continuedPlan.question);
        return;
      }
      if (continuedPlan) {
        pendingPlan = continuedPlan;
        lastReviewedPlan = cloneData(continuedPlan);
        addMessage("assistant", summarizePlanForChat(continuedPlan));
        return;
      }
    }

    let plan;
    const localPlan = buildPlanFromCommand(text);

    if (!localPlan.error || localPlan.question) {
      plan = localPlan;
      assistantMode = "local";
    } else if (backendAvailable) {
      plan = await requestRemotePlan(text);
    } else {
      plan = localPlan;
      assistantMode = "local";
    }

    if (plan.error) {
      pendingPlan = null;
      addMessage("assistant", plan.error);
    } else if (plan.question) {
      pendingQuestion = plan;
      addMessage("assistant", plan.question);
    } else {
      pendingPlan = plan;
      lastReviewedPlan = cloneData(plan);
      const assistantText = summarizePlanForChat(plan);
      addMessage(
        "assistant",
        assistantMode === "openai"
          ? `${assistantText} This draft came from the OpenAI planner.`
          : assistantText
      );
    }
  } catch (error) {
    pendingPlan = null;
    assistantMode = "local";
    const fallbackPlan = buildPlanFromCommand(text);
    if (fallbackPlan && !fallbackPlan.error) {
      pendingPlan = fallbackPlan;
      lastReviewedPlan = cloneData(fallbackPlan);
      addMessage("assistant", summarizePlanForChat(fallbackPlan));
    } else {
      addMessage("assistant", `The OpenAI planner was unavailable. ${error.message}`);
    }
  } finally {
    sendMessageButton.disabled = false;
    sendMessageButton.textContent = "Send Request";
    render();
  }
}

function applyPendingPlan() {
  if (!pendingPlan) return;
  const appliedPlan = cloneData(pendingPlan);
  pendingPlan.actions.forEach(applyAction);
  addMessage("assistant", `Applied plan: ${pendingPlan.title}. The board, summary, and graph are now updated.`);
  lastReviewedPlan = cloneData(pendingPlan);
  pendingPlan = null;
  void appendAuditLogEntry({
    actionType: "plan-applied",
    summary: `Applied plan: ${appliedPlan.title}`,
    details: [
      `${appliedPlan.actions.length} change${appliedPlan.actions.length === 1 ? "" : "s"}`,
      ...(appliedPlan.details || []),
    ],
  });
  render();
}

function discardPendingPlan() {
  if (!pendingPlan) return;
  addMessage("assistant", `Discarded the staged plan: ${pendingPlan.title}.`);
  pendingPlan = null;
  render();
}

function getFilteredTeam() {
  return getAdminVisibleTeam(team).filter((person) => {
    const teamMatch = teamFilter.value === "all" || person.teamGroup === teamFilter.value;
    const managerMatch = managerFilter.value === "all" || formatManagerName(person.manager) === managerFilter.value;
    const assignmentMatch =
      assignmentFilter.value === "all" ||
      person.assignments.some(([assignment]) => assignment === assignmentFilter.value);
    const personMatch = personFilter.value === "all" || personId(person) === personFilter.value;
    const outMatch = !showOutOnly.checked || personIsOut(person);
    return teamMatch && managerMatch && assignmentMatch && personMatch && outMatch;
  });
}

function renderStats(filteredTeam) {
  document.getElementById("team-count").textContent = filteredTeam.length;
  document.getElementById("block-count").textContent = getGroupedBlocks().length;
  document.getElementById("out-count").textContent = filteredTeam.filter(personIsOut).length;
  document.getElementById("support-out-count").textContent = filteredTeam.filter(
    (person) => person.teamGroup === "core" && personIsOut(person)
  ).length;
  document.getElementById("aco-out-count").textContent = filteredTeam.filter(
    (person) => person.teamGroup === "aco" && personIsOut(person)
  ).length;
}

function renderOutOnlyCard(filteredTeam) {
  if (!outOnlyCard || !outOnlyNames) return;

  const outPeople = filteredTeam.filter(personIsOut);
  outOnlyCard.classList.toggle("hidden", !showOutOnly.checked);

  if (!showOutOnly.checked) {
    outOnlyNames.innerHTML = "";
    return;
  }

  if (!outPeople.length) {
    outOnlyNames.innerHTML = `<div class="empty-state">No one is marked out today.</div>`;
    return;
  }

  outOnlyNames.innerHTML = outPeople
    .map((person) => `<span class="out-name-chip">${person.name}</span>`)
    .join("");
}

function renderSummary(filteredTeam) {
  const summaryGrid = document.getElementById("summary-grid");
  const counts = {};

  filteredTeam.forEach((person) => {
    person.assignments.forEach(([assignment, phones]) => {
      if (!assignment || assignment === "OOO/Sick/PTO") return;
      counts[assignment] ??= { total: 0, phones: 0 };
      counts[assignment].total += 1;
      if (phones) counts[assignment].phones += 1;
    });
  });

  summaryGrid.innerHTML = Object.entries(counts)
    .sort((a, b) => b[1].total - a[1].total)
    .map(
      ([name, value]) => `
        <article class="summary-card">
          <h3>${name}</h3>
          <div class="summary-value">${value.total}</div>
        </article>
      `
    )
    .join("");
}

function renderWorkspaceTabs() {
  const showingBoard = activeWorkspaceTab === "board";
  const showingShift = activeWorkspaceTab === "shift";
  const showingSkills = activeWorkspaceTab === "skills";
  const showingAutomations = activeWorkspaceTab === "automations";
  const showingAdmin = activeWorkspaceTab === "admin";

  boardView.classList.toggle("hidden", !showingBoard);
  shiftView.classList.toggle("hidden", !showingShift);
  skillsView.classList.toggle("hidden", !showingSkills);
  automationsView.classList.toggle("hidden", !showingAutomations);
  adminView.classList.toggle("hidden", !showingAdmin);

  boardTabButton.classList.toggle("active", showingBoard);
  shiftTabButton.classList.toggle("active", showingShift);
  skillsTabButton.classList.toggle("active", showingSkills);
  automationsTabButton.classList.toggle("active", showingAutomations);
  adminTabButton.classList.toggle("active", showingAdmin);
}

function renderAdminPasswordManager() {
  if (!adminPasswordCard) return;

  const profile = getCurrentAdminProfile();
  adminPasswordCard.innerHTML = `
    <form id="admin-password-form" class="admin-password-form">
      <label>
        <span>Signed in as</span>
        <input type="text" class="portal-input" value="${profile.name}" disabled />
      </label>
      <label>
        <span>Current password</span>
        <input id="admin-current-password" type="password" class="portal-input" placeholder="Enter current password" />
      </label>
      <label>
        <span>New password</span>
        <input id="admin-new-password" type="password" class="portal-input" placeholder="Enter a new password" />
      </label>
      <label>
        <span>Confirm new password</span>
        <input id="admin-confirm-password" type="password" class="portal-input" placeholder="Re-enter the new password" />
      </label>
      <div class="assistant-builder-actions">
        <button type="submit" class="secondary-button">Save Password</button>
      </div>
      <div class="portal-feedback ${adminPasswordSaveState.tone === "success" ? "portal-feedback-success" : ""}">
        ${adminPasswordSaveState.message}
      </div>
    </form>
  `;

  adminPasswordCard.querySelector("#admin-password-form")?.addEventListener("submit", async (event) => {
    event.preventDefault();

    const currentPassword = adminPasswordCard.querySelector("#admin-current-password")?.value || "";
    const newPassword = adminPasswordCard.querySelector("#admin-new-password")?.value || "";
    const confirmPassword = adminPasswordCard.querySelector("#admin-confirm-password")?.value || "";
    const currentExpectedPassword = getAdminPasswordForProfile(profile.id);

    if (currentPassword !== currentExpectedPassword) {
      adminPasswordSaveState = {
        message: "Current password is incorrect.",
        tone: "error",
      };
      renderAdminPasswordManager();
      return;
    }

    if (newPassword.trim().length < 4) {
      adminPasswordSaveState = {
        message: "Use at least 4 characters for the new password.",
        tone: "error",
      };
      renderAdminPasswordManager();
      return;
    }

    if (newPassword !== confirmPassword) {
      adminPasswordSaveState = {
        message: "New password and confirmation do not match.",
        tone: "error",
      };
      renderAdminPasswordManager();
      return;
    }

    try {
      const nextPasswords = {
        ...loadAdminPasswords(),
        [profile.id]: newPassword,
      };
      await persistAdminPasswords(nextPasswords);
      adminPasswordSaveState = {
        message: "Password updated.",
        tone: "success",
      };
      await appendAuditLogEntry({
        actionType: "password_change",
        summary: `${profile.name} changed their admin password`,
        details: ["Password updated successfully."],
      });
    } catch (error) {
      adminPasswordSaveState = {
        message: error.message || "Unable to update the password right now.",
        tone: "error",
      };
    }

    renderAdminPasswordManager();
  });
}

function renderAutomations() {
  if (!automationsList) return;

  const automations = loadAutomationPreferences().sort((a, b) => {
    if (a.id === "rule-based-reshuffle") return -1;
    if (b.id === "rule-based-reshuffle") return 1;
    return 0;
  });
  automationsList.innerHTML = automations
    .map((automation) => {
      const testState = automationTestState[automation.id];
      return `
        <article class="automation-card">
          <div class="automation-copy">
            <div>
              <h3>${automation.name}</h3>
              <p>${automation.description}</p>
            </div>
            ${
              automation.kind === "pdf-archive"
                ? `
                  <div class="automation-settings">
                    <label>
                      <span>Run time</span>
                      <input type="time" value="${archiveStatus.time || automation.time || "00:00"}" data-automation-time="${automation.id}" />
                    </label>
                    <div class="automation-cloud-status automation-settings-wide">
                      <span>Supabase archive</span>
                      <div class="automation-cloud-note">
                        ${archiveLibrary.folder || "Supabase bucket: daily-ops-archives"}
                      </div>
                      <div class="automation-cloud-note">
                        ${
                          archiveStatus.lastArchivedDate
                            ? `Last archived day: ${archiveStatus.lastArchivedDate}${archiveStatus.lastArchivedAt ? ` • ${new Date(archiveStatus.lastArchivedAt).toLocaleString()}` : ""}`
                            : "No archived day yet."
                        }
                      </div>
                      <div class="automation-cloud-note">
                        ${archiveStatus.nextRun ? `Next run: ${new Date(archiveStatus.nextRun).toLocaleString()}` : "Next run will appear here after the server refreshes."}
                      </div>
                      <div class="automation-cloud-note">
                        If the app already saved that day’s schedule snapshot, a missed midnight run can catch up the next time your computer and server come back on.
                      </div>
                    </div>
                  </div>
                `
                : automation.kind === "schedule-reshuffle"
                  ? `
                    <div class="automation-settings">
                      <div class="automation-cloud-status automation-settings-wide">
                        <span>Rule-based schedule automation</span>
                        <div class="automation-cloud-note">Manual run applies the saved All, Support, and ACO scheduling rules to today’s board.</div>
                        <div class="automation-cloud-note">Use this after updating scheduling rules when you want the board reshuffled to match them.</div>
                      </div>
                    </div>
                  `
                  : ""
            }
            <div class="automation-meta">
              ${
                testState
                  ? `<div class="automation-test-note">${testState.message} ${testState.timestamp}</div>`
                  : `<div class="automation-test-note">No test has been run yet.</div>`
              }
            </div>
          </div>
          <div class="automation-actions">
            <label class="automation-switch">
              <input type="checkbox" data-automation-toggle="${automation.id}" ${automation.enabled ? "checked" : ""} />
              <span class="automation-switch-track" aria-hidden="true"></span>
              <span class="automation-switch-label">${automation.enabled ? "Enabled" : "Disabled"}</span>
            </label>
            <button type="button" class="secondary-button automation-test-button" data-automation-test="${automation.id}">
              ${automation.kind === "schedule-reshuffle" ? "Reshuffle Now" : "Manual Run"}
            </button>
          </div>
        </article>
      `;
    })
    .join("");

  automationsList.querySelectorAll("[data-automation-toggle]").forEach((input) => {
    input.addEventListener("change", async (event) => {
      updateAutomationSettings(event.target.dataset.automationToggle, {
        enabled: event.target.checked,
      });
      try {
        await saveArchiveConfig({ enabled: event.target.checked });
      } catch (error) {
        automationTestState = {
          ...automationTestState,
          [event.target.dataset.automationToggle]: {
            message: error.message,
            timestamp: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
          },
        };
      }
      render();
    });
  });

  automationsList.querySelectorAll("[data-automation-time]").forEach((input) => {
    input.addEventListener("change", async (event) => {
      updateAutomationSettings(event.target.dataset.automationTime, {
        time: event.target.value || "00:00",
      });
      try {
        await saveArchiveConfig({ time: event.target.value || "00:00" });
      } catch (error) {
        automationTestState = {
          ...automationTestState,
          [event.target.dataset.automationTime]: {
            message: error.message,
            timestamp: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
          },
        };
      }
      render();
    });
  });

  automationsList.querySelectorAll("[data-automation-test]").forEach((button) => {
    button.addEventListener("click", async () => {
      await runAutomationTest(button.dataset.automationTest);
    });
  });
}

function renderArchives() {
  if (!archivesList) return;

  if (!archiveLibrary.archives.length) {
    archivesList.innerHTML = `<div class="empty-state">No saved archives yet.</div>`;
    if (archivePreview) {
      archivePreview.classList.add("hidden");
    }
    return;
  }

  const selectedArchive =
    archiveLibrary.archives.find((archive) => archive.name === selectedArchiveName) ||
    archiveLibrary.archives[0];

  selectedArchiveName = selectedArchive?.name || "";

  archivesList.innerHTML = archiveLibrary.archives
    .map(
      (archive) => `
        <button type="button" class="archive-row ${archive.name === selectedArchiveName ? "active" : ""}" data-archive-name="${archive.name}">
          <div>
            <strong>${archive.name}</strong>
            <div class="archive-meta">${archive.modifiedAt}</div>
          </div>
          <div class="archive-row-actions">
            <span class="secondary-button">View here</span>
          </div>
        </button>
      `
    )
    .join("");

  archivesList.querySelectorAll("[data-archive-name]").forEach((button) => {
    button.addEventListener("click", () => {
      selectedArchiveName = button.dataset.archiveName || "";
      renderArchives();
    });
  });

  if (archivePreview && archivePreviewTitle && archivePreviewMeta && archivePreviewTable && archivePreviewOpen) {
    if (!selectedArchive) {
      archivePreview.classList.add("hidden");
      return;
    }
    loadArchivePreview(selectedArchive);
  }
}

function renderSkillsMatrix(filteredTeam) {
  skillsMatrix.innerHTML = `
    <table class="skills-table">
      <thead>
        <tr>
          <th class="skills-name">Team Member</th>
          ${editableSkillAssignments.map((skill) => `<th>${skill}</th>`).join("")}
        </tr>
      </thead>
      <tbody>
        ${filteredTeam
          .map(
            (person) => `
              <tr>
                <td class="skills-name">
                  <strong>${person.name}</strong>
                  <span class="skills-role">${person.title}</span>
                </td>
                ${editableSkillAssignments
                  .map(
                    (skill) => `
                      <td>
                        <label class="skill-toggle">
                          <input
                            type="checkbox"
                            data-person-id="${personId(person)}"
                            data-skill="${skill}"
                            ${personHasSkill(person, skill) ? "checked" : ""}
                          />
                        </label>
                      </td>
                    `
                  )
                  .join("")}
              </tr>
            `
          )
          .join("")}
      </tbody>
    </table>
  `;

  skillsMatrix.querySelectorAll("input[type='checkbox']").forEach((checkbox) => {
    checkbox.addEventListener("change", (event) => {
      const { personId: id, skill } = event.target.dataset;
      const person = getPersonById(id);
      if (!person) return;
      person.skills = person.skills || [];
      if (event.target.checked) {
        if (!person.skills.includes(skill)) person.skills.push(skill);
      } else {
        person.skills = person.skills.filter((entry) => entry !== skill);
      }
      render();
    });
  });
}

function renderChart(filteredTeam) {
  const blockData = getGroupedBlocks().map((group) => {
    const counts = {};
    filteredTeam.forEach((person) => {
      group.blockIndexes.forEach((blockIndex) => {
        const [assignment] = person.assignments[blockIndex];
        if (!assignment) return;
        counts[assignment] = (counts[assignment] || 0) + 1;
      });
    });
    const total = Object.values(counts).reduce((sum, value) => sum + value, 0);
    return { block: group.label, counts, total };
  });

  const legendAssignments = [...new Set(blockData.flatMap(({ counts }) => Object.keys(counts)))];

  chartRoot.innerHTML = `
    ${blockData
      .map(({ block, counts, total }, index) => {
        const group = getGroupedBlocks()[index];
        const segments = Object.entries(counts)
          .sort((a, b) => b[1] - a[1])
          .map(([assignment, count]) => {
            const width = total ? (count / total) * 100 : 0;
            const label = `${assignment} (${count})`;
            return `
              <div class="chart-segment" style="width:${width}%; background:${assignmentColors[assignment] || "#6b7280"}">
                <span>${label}</span>
              </div>
            `;
          })
          .join("");

        return `
          <div class="chart-row">
            <button
              type="button"
              class="chart-label-button"
              data-target="time-block-${group?.startIndex ?? index}"
            >${block}</button>
            <div class="chart-track">${segments}</div>
            <div class="chart-total">${total} assigned</div>
          </div>
        `;
      })
      .join("")}
    <div class="chart-legend">
      ${legendAssignments
        .map(
          (assignment) => `
            <div class="legend-chip">
              <span class="legend-swatch" style="background:${assignmentColors[assignment] || "#6b7280"}"></span>
              <span>${assignment}</span>
            </div>
          `
        )
        .join("")}
    </div>
  `;

  chartRoot.querySelectorAll(".chart-label-button").forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.getElementById(button.dataset.target || "");
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function renderAgentCoverageChart(person) {
  if (!agentCoverageChart || !agentCoverageTitle || !agentCoverageSubtitle) return;
  if (!person) {
    agentCoverageChart.innerHTML = `<div class="empty-state">Choose a name to see team coverage.</div>`;
    return;
  }

  const teamLabel = person.teamGroup === "aco" ? "ACO" : "Support";
  agentCoverageTitle.textContent = `${teamLabel} Coverage`;
  agentCoverageSubtitle.textContent = `${teamLabel} assignments by time block across the day.`;

  const relevantTeam = team.filter((entry) => entry.teamGroup === person.teamGroup);
  const blockData = getGroupedBlocks().map((group) => {
    const counts = {};
    relevantTeam.forEach((entry) => {
      group.blockIndexes.forEach((blockIndex) => {
        const [assignment] = entry.assignments[blockIndex];
        if (!assignment) return;
        counts[assignment] = (counts[assignment] || 0) + 1;
      });
    });
    const total = Object.values(counts).reduce((sum, value) => sum + value, 0);
    return { block: group.label, counts, total };
  });

  const legendAssignments = [...new Set(blockData.flatMap(({ counts }) => Object.keys(counts)))];

  agentCoverageChart.innerHTML = `
    ${blockData
      .map(({ block, counts, total }) => {
        const segments = Object.entries(counts)
          .sort((a, b) => b[1] - a[1])
          .map(([assignment, count]) => {
            const width = total ? (count / total) * 100 : 0;
            const label = width > 16 ? `${assignment} (${count})` : count;
            return `
              <div class="chart-segment" style="width:${width}%; background:${assignmentColors[assignment] || "#6b7280"}">
                <span>${label}</span>
              </div>
            `;
          })
          .join("");

        return `
          <div class="chart-row">
            <div class="chart-label-button static">${block}</div>
            <div class="chart-track">${segments}</div>
            <div class="chart-total">${total} assigned</div>
          </div>
        `;
      })
      .join("")}
    <div class="chart-legend">
      ${legendAssignments
        .map(
          (assignment) => `
            <div class="legend-chip">
              <span class="legend-swatch" style="background:${assignmentColors[assignment] || "#6b7280"}"></span>
              <span>${assignment}</span>
            </div>
          `
        )
        .join("")}
    </div>
  `;
}

function renderBoard(filteredTeam) {
  const board = document.getElementById("ops-board");
  const groups = getGroupedBlocks();

  boardJumpRoot.innerHTML = "";

  board.innerHTML = groups
    .map((group) => {
      const rows = filteredTeam
        .map((person) => {
          const assignments = group.blockIndexes
            .map((blockIndex) => person.assignments[blockIndex][0])
            .filter(Boolean);
          if (!assignments.length) return null;
          const primaryAssignment = assignments[0];
          const mixedAssignments = [...new Set(assignments)];
          const rowKey = `${personId(person)}:${group.startIndex}`;
          const isEditing = editingBoardRow === rowKey;
          const isEditingShift = editingShiftPersonId === personId(person);
          const manualOptions = getManualAssignmentOptions(person);
          const currentShiftWindow = parseScheduleWindow(person.schedule) || {
            normalizedStart: 8,
            normalizedEnd: 17,
          };
          const currentStartHour = Math.max(8, Math.floor(currentShiftWindow.normalizedStart));
          const currentEndHour = Math.min(24, Math.ceil(currentShiftWindow.normalizedEnd));
          const shiftOptionMarkup = shiftTimeOptions
            .map(
              (hour) => `<option value="${hour}" ${hour === currentStartHour ? "selected" : ""}>${formatShiftHour(hour)}</option>`
            )
            .join("");
          const shiftEndMarkup = shiftTimeOptions
            .filter((hour) => hour > currentStartHour)
            .map(
              (hour) => `<option value="${hour}" ${hour === currentEndHour ? "selected" : ""}>${formatShiftHour(hour)}</option>`
            )
            .join("");
          return `
            <article class="assignment-row">
              <div>
                <div class="person-name">${person.name}</div>
                <div class="person-meta">${person.title} • ${person.manager}</div>
              </div>
              <div class="assignment-main">
                ${
                  isEditing
                    ? `
                      <div class="manual-edit-row">
                        <select class="manual-edit-select" data-person-id="${personId(person)}" data-group-start="${group.startIndex}">
                          ${manualOptions
                            .map(
                              (assignment) => `
                                <option value="${assignment}" ${assignment === primaryAssignment ? "selected" : ""}>${assignment}</option>
                              `
                            )
                            .join("")}
                        </select>
                        <div class="manual-edit-actions">
                          <button type="button" class="manual-save-button" data-person-id="${personId(person)}" data-group-start="${group.startIndex}">Save</button>
                          <button type="button" class="secondary-button manual-cancel-button" data-row-key="${rowKey}">Cancel</button>
                        </div>
                      </div>
                    `
                    : `
                      <button type="button" class="assignment-chip assignment-chip-button ${primaryAssignment === "OOO/Sick/PTO" ? "out" : ""}" data-row-key="${rowKey}">${mixedAssignments.join(" / ")}</button>
                    `
                }
                <div class="assignment-row-footer">
                  <div class="schedule-badge">${person.schedule}</div>
                  <button type="button" class="secondary-button shift-edit-button" data-person-id="${personId(person)}">Edit Shift</button>
                </div>
                ${
                  isEditingShift
                    ? `
                      <div class="shift-edit-panel">
                        <div class="shift-edit-grid">
                          <label>
                            <span>Start time</span>
                            <select class="shift-edit-select shift-edit-start" data-person-id="${personId(person)}">
                              ${shiftOptionMarkup}
                            </select>
                          </label>
                          <label>
                            <span>End time</span>
                            <select class="shift-edit-select shift-edit-end" data-person-id="${personId(person)}">
                              ${shiftEndMarkup}
                            </select>
                          </label>
                        </div>
                        <div class="shift-edit-scope">
                          <label class="shift-scope-option">
                            <input type="radio" name="shift-scope-${personId(person)}" value="today" checked />
                            <span>Apply to today only</span>
                          </label>
                          <label class="shift-scope-option">
                            <input type="radio" name="shift-scope-${personId(person)}" value="permanent" />
                            <span>Make this permanent</span>
                          </label>
                        </div>
                        <div class="manual-edit-actions">
                          <button type="button" class="shift-save-button" data-person-id="${personId(person)}">Save Shift</button>
                          <button type="button" class="secondary-button shift-cancel-button" data-person-id="${personId(person)}">Cancel</button>
                        </div>
                      </div>
                    `
                    : ""
                }
              </div>
            </article>
          `;
        })
        .filter(Boolean)
        .join("");

      return `
        <section class="time-section" id="time-block-${group.startIndex}">
          <div class="time-header">
            <div>
              <h3>${group.label}</h3>
              <div class="time-subtitle">Current assignments in this block</div>
            </div>
            <div class="time-count">${rows ? (rows.match(/assignment-row/g) || []).length : 0} assignments</div>
          </div>
          <div class="assignment-list">
            ${rows || `<div class="empty-state">No assignments in this block.</div>`}
          </div>
        </section>
      `;
    })
    .join("");

  board.querySelectorAll(".assignment-chip-button").forEach((button) => {
    button.addEventListener("click", () => {
      editingBoardRow = button.dataset.rowKey;
      render();
    });
  });

  board.querySelectorAll(".manual-cancel-button").forEach((button) => {
    button.addEventListener("click", () => {
      editingBoardRow = null;
      render();
    });
  });

  board.querySelectorAll(".manual-save-button").forEach((button) => {
    button.addEventListener("click", () => {
      const person = getPersonById(button.dataset.personId || "");
      const group = groups.find(
        (entry) => String(entry.startIndex) === String(button.dataset.groupStart || "")
      );
      const select = board.querySelector(
        `.manual-edit-select[data-person-id="${button.dataset.personId}"][data-group-start="${button.dataset.groupStart}"]`
      );
      if (!person || !group || !select) return;

      const nextAssignment = select.value;
      const previousAssignments = [
        ...new Set(group.blockIndexes.map((blockIndex) => person.assignments[blockIndex][0]).filter(Boolean)),
      ];
      group.blockIndexes.forEach((blockIndex) => {
        person.assignments[blockIndex] = [
          nextAssignment === "Open" ? "" : nextAssignment,
          nextAssignment === "Tier 2 Phones",
        ];
      });
      void appendAuditLogEntry({
        actionType: "assignment-updated",
        summary: `Updated ${person.name}: ${group.label}`,
        details: [
          `From ${previousAssignments.length ? previousAssignments.join(" / ") : "Open"}`,
          `To ${nextAssignment}`,
        ],
      });
      editingBoardRow = null;
      render();
    });
  });

  board.querySelectorAll(".shift-edit-button").forEach((button) => {
    button.addEventListener("click", () => {
      editingBoardRow = null;
      editingShiftPersonId = button.dataset.personId || null;
      render();
    });
  });

  board.querySelectorAll(".shift-cancel-button").forEach((button) => {
    button.addEventListener("click", () => {
      editingShiftPersonId = null;
      render();
    });
  });

  board.querySelectorAll(".shift-edit-start").forEach((select) => {
    select.addEventListener("change", () => {
      const personKey = select.dataset.personId || "";
      const endSelect = board.querySelector(`.shift-edit-end[data-person-id="${personKey}"]`);
      if (!endSelect) return;
      const startValue = Number(select.value);
      const previousEnd = Number(endSelect.value || startValue + 1);
      endSelect.innerHTML = shiftTimeOptions
        .filter((hour) => hour > startValue)
        .map((hour) => `<option value="${hour}" ${hour === previousEnd ? "selected" : ""}>${formatShiftHour(hour)}</option>`)
        .join("");
      if (!endSelect.value) {
        endSelect.value = String(Math.min(24, startValue + 1));
      }
    });
  });

  board.querySelectorAll(".shift-save-button").forEach((button) => {
    button.addEventListener("click", () => {
      const person = getPersonById(button.dataset.personId || "");
      if (!person) return;

      const startSelect = board.querySelector(`.shift-edit-start[data-person-id="${button.dataset.personId}"]`);
      const endSelect = board.querySelector(`.shift-edit-end[data-person-id="${button.dataset.personId}"]`);
      const modeInput = board.querySelector(`input[name="shift-scope-${button.dataset.personId}"]:checked`);
      if (!startSelect || !endSelect || !modeInput) return;

      const startHour = Number(startSelect.value);
      const endHour = Number(endSelect.value);
      if (!Number.isFinite(startHour) || !Number.isFinite(endHour) || endHour <= startHour) return;

      saveShiftChange(person, formatScheduleValue(startHour, endHour), modeInput.value);
      editingShiftPersonId = null;
      render();
    });
  });
}

function renderShiftEditor() {
  if (!shiftEditorList) return;

  const normalizedQuery = normalizeText(shiftSearchTerm || "").trim();
  const visiblePeople = [...getAdminVisibleTeam(team)]
    .filter((person) => {
      if (!normalizedQuery) return true;
      const haystack = normalizeText(
        [person.name, person.manager, person.title, person.schedule].filter(Boolean).join(" ")
      );
      return haystack.includes(normalizedQuery);
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  if (!visiblePeople.length) {
    shiftEditorList.innerHTML = `<div class="empty-state">No specialists match that search.</div>`;
    return;
  }

  shiftEditorList.innerHTML = visiblePeople
    .map((person) => {
      const currentShiftWindow = parseScheduleWindow(person.schedule) || {
        normalizedStart: 8,
        normalizedEnd: 17,
      };
      const currentStartHour = Math.max(8, Math.floor(currentShiftWindow.normalizedStart));
      const currentEndHour = Math.min(24, Math.ceil(currentShiftWindow.normalizedEnd));
      const shiftOptionMarkup = shiftTimeOptions
        .map(
          (hour) =>
            `<option value="${hour}" ${hour === currentStartHour ? "selected" : ""}>${formatShiftHour(hour)}</option>`
        )
        .join("");
      const shiftEndMarkup = shiftTimeOptions
        .filter((hour) => hour > currentStartHour)
        .map(
          (hour) =>
            `<option value="${hour}" ${hour === currentEndHour ? "selected" : ""}>${formatShiftHour(hour)}</option>`
        )
        .join("");

      return `
        <article class="shift-editor-card">
          <div class="shift-editor-copy">
            <div class="person-name">${person.name}</div>
            <div class="person-meta">${person.title} • ${person.manager}</div>
            <div class="schedule-badge">Current shift: ${person.schedule}</div>
          </div>
          <div class="shift-edit-panel shift-editor-panel">
            <div class="shift-edit-grid">
              <label>
                <span>Start time</span>
                <select class="shift-edit-select shift-edit-start" data-person-id="${personId(person)}">
                  ${shiftOptionMarkup}
                </select>
              </label>
              <label>
                <span>End time</span>
                <select class="shift-edit-select shift-edit-end" data-person-id="${personId(person)}">
                  ${shiftEndMarkup}
                </select>
              </label>
            </div>
            <div class="shift-edit-scope">
              <label class="shift-scope-option">
                <input type="radio" name="shift-editor-scope-${personId(person)}" value="today" checked />
                <span>Apply to today only</span>
              </label>
              <label class="shift-scope-option">
                <input type="radio" name="shift-editor-scope-${personId(person)}" value="permanent" />
                <span>Make this permanent</span>
              </label>
            </div>
            <div class="manual-edit-actions">
              <button type="button" class="shift-save-button" data-person-id="${personId(person)}">Save Shift</button>
            </div>
          </div>
        </article>
      `;
    })
    .join("");

  shiftEditorList.querySelectorAll(".shift-edit-start").forEach((select) => {
    select.addEventListener("change", () => {
      const personKey = select.dataset.personId || "";
      const endSelect = shiftEditorList.querySelector(`.shift-edit-end[data-person-id="${personKey}"]`);
      if (!endSelect) return;
      const startValue = Number(select.value);
      const previousEnd = Number(endSelect.value || startValue + 1);
      endSelect.innerHTML = shiftTimeOptions
        .filter((hour) => hour > startValue)
        .map(
          (hour) =>
            `<option value="${hour}" ${hour === previousEnd ? "selected" : ""}>${formatShiftHour(hour)}</option>`
        )
        .join("");
      if (!endSelect.value) {
        endSelect.value = String(Math.min(24, startValue + 1));
      }
    });
  });

  shiftEditorList.querySelectorAll(".shift-save-button").forEach((button) => {
    button.addEventListener("click", () => {
      const person = getPersonById(button.dataset.personId || "");
      if (!person) return;

      const startSelect = shiftEditorList.querySelector(
        `.shift-edit-start[data-person-id="${button.dataset.personId}"]`
      );
      const endSelect = shiftEditorList.querySelector(
        `.shift-edit-end[data-person-id="${button.dataset.personId}"]`
      );
      const modeInput = shiftEditorList.querySelector(
        `input[name="shift-editor-scope-${button.dataset.personId}"]:checked`
      );
      if (!startSelect || !endSelect || !modeInput) return;

      const startHour = Number(startSelect.value);
      const endHour = Number(endSelect.value);
      if (!Number.isFinite(startHour) || !Number.isFinite(endHour) || endHour <= startHour) return;

      saveShiftChange(person, formatScheduleValue(startHour, endHour), modeInput.value);
      render();
    });
  });
}

function renderAgentBoard() {
  const person = getPersonById(selectedAgentId);
  if (!person) {
    agentBoard.innerHTML = `<div class="empty-state">Choose a name to see a schedule.</div>`;
    renderAgentCoverageChart(null);
    return;
  }

  applyAgentPreferences();

  agentHeroName.textContent = `${person.name}'s schedule`;
  agentNameStat.textContent = person.name;
  agentScheduleStat.textContent = person.schedule;
  agentManagerStat.textContent = person.manager;
  agentSubtitle.textContent = `${person.title} • ${person.states}`;

  const groupedBlocks = getGroupedBlocks();
  const currentHour = new Date().getHours();
  const currentGroup =
    groupedBlocks.find((group) => {
      const firstBlock = timeBlocks[group.blockIndexes[0]];
      const lastBlock = timeBlocks[group.blockIndexes[group.blockIndexes.length - 1]];
      return currentHour >= firstBlock.start && currentHour < lastBlock.end;
    }) || groupedBlocks[0];

  const activeBlockIndex = Math.min(
    Math.max(currentHour - timeBlocks[0].start, 0),
    timeBlocks.length - 1
  );
  const currentAssignment =
    person.assignments[activeBlockIndex]?.[0] ||
    currentGroup.blockIndexes.map((blockIndex) => person.assignments[blockIndex][0]).filter(Boolean)[0] ||
    "Open";
  const currentModPeople = team.filter(
    (member) => member.assignments[activeBlockIndex]?.[0] === "MOD"
  );
  const currentModLabel = currentModPeople.length
    ? currentModPeople.map((member) => member.name).join(", ")
    : "No MOD assigned";

  const remainingGroups = groupedBlocks.filter((group) => {
    const lastBlock = timeBlocks[group.blockIndexes[group.blockIndexes.length - 1]];
    return lastBlock.end > currentHour;
  });

  const fullDayMarkup = remainingGroups
    .map((group) => {
      const assignments = group.blockIndexes
        .map((blockIndex) => person.assignments[blockIndex][0])
        .filter(Boolean);
      const assignment = assignments[0] || "Open";
      return `
        <article class="agent-day-row">
          <div>
            <div class="person-name">${group.label}</div>
            <div class="person-meta">${person.schedule}</div>
          </div>
          <div class="assignment-main">
            <span class="assignment-chip ${assignment === "OOO/Sick/PTO" ? "out" : assignment === "Open" ? "open" : ""}">${assignment}</span>
          </div>
        </article>
      `;
    })
    .join("");

  agentBoard.innerHTML = `
    <article class="agent-now-card">
      <div class="agent-now-header">
        <div>
          <div class="time-subtitle">Current block</div>
          <h3>${currentGroup.label}</h3>
        </div>
        <span class="schedule-badge">Now</span>
      </div>
      <div class="agent-now-body">
        <span class="assignment-chip agent-now-assignment ${currentAssignment === "OOO/Sick/PTO" ? "out" : currentAssignment === "Open" ? "open" : ""}">${currentAssignment}</span>
        <div class="person-meta">${person.name} • ${person.schedule}</div>
      </div>
    </article>

    <article class="agent-mod-card">
      <div class="time-subtitle">Current MOD</div>
      <div class="agent-mod-name">${currentModLabel}</div>
      <div class="person-meta">${currentGroup.label}</div>
    </article>

    <details class="agent-day-details">
      <summary>${remainingGroups.length ? "Expand • See rest of day" : "No more blocks today"}</summary>
      <div class="agent-day-list">
        ${fullDayMarkup}
      </div>
    </details>
  `;

  const details = agentBoard.querySelector(".agent-day-details");
  const summary = details?.querySelector("summary");
  if (details && summary && remainingGroups.length) {
    const syncSummaryLabel = () => {
      summary.textContent = details.open ? "Collapse • Hide rest of day" : "Expand • See rest of day";
    };
    syncSummaryLabel();
    details.addEventListener("toggle", syncSummaryLabel);
  }

  renderAgentCoverageChart(person);
}

function render() {
  refreshAssignmentCollections();
  refreshAssignmentControls();
  setView(currentView);
  populateManagerFilter();
  populatePersonFilter();
  populateAssistantManagerFilter();
  renderAssistantScopeButtons();
  renderAdminIdentityBadge();
  const filteredTeam = getFilteredTeam();
  renderMessages();
  renderPendingPlan();
  renderStats(filteredTeam);
  renderOutOnlyCard(filteredTeam);
  renderSummary(filteredTeam);
  renderWorkspaceTabs();
  renderChart(filteredTeam);
  renderBoard(filteredTeam);
  renderShiftEditor();
  renderSkillsMatrix(filteredTeam);
  renderAssignmentManager();
  renderSchedulingRules();
  renderAdminPasswordManager();
  renderAutomations();
  renderAuditLog();
  renderArchives();
  renderAgentBoard();
  queueArchiveSnapshotSync();
}

teamFilter.addEventListener("change", render);
managerFilter.addEventListener("change", render);
assignmentFilter.addEventListener("change", render);
personFilter.addEventListener("change", render);
showOutOnly.addEventListener("change", render);
boardTabButton.addEventListener("click", () => {
  activeWorkspaceTab = "board";
  render();
});
shiftTabButton.addEventListener("click", () => {
  activeWorkspaceTab = "shift";
  render();
});
skillsTabButton.addEventListener("click", () => {
  activeWorkspaceTab = "skills";
  render();
});
automationsTabButton.addEventListener("click", () => {
  activeWorkspaceTab = "automations";
  render();
});
adminTabButton.addEventListener("click", () => {
  activeWorkspaceTab = "admin";
  render();
});
shiftSearchInput?.addEventListener("input", (event) => {
  shiftSearchTerm = event.target.value || "";
  renderShiftEditor();
});
assistantGoalSelect.addEventListener("change", syncAssistantBuilder);
assistantBuildRequestButton.addEventListener("click", buildAssistantRequestFromForm);
sendMessageButton.addEventListener("click", submitChatRequest);
sendToChatgptButton.addEventListener("click", openScheduleInChatgpt);
applyPlanButton.addEventListener("click", applyPendingPlan);
discardPlanButton.addEventListener("click", discardPendingPlan);
resetDataButton.addEventListener("click", () => {
  window.localStorage.removeItem(shiftOverrideStorageKey);
  team = cloneData(initialTeam);
  editingBoardRow = null;
  editingShiftPersonId = null;
  pendingPlan = null;
  lastReviewedPlan = null;
  pendingQuestion = null;
  blockLayout = {
    baseSize: 1,
    focus: null,
  };
  messages = [
    {
      role: "assistant",
      text:
        "Demo data reset. I can help you draft another set of changes whenever you're ready.",
    },
  ];
  render();
});
adminLoginButton.addEventListener("click", handleAdminLogin);
agentOpenButton.addEventListener("click", handleAgentOpen);
agentThemeSelect.addEventListener("change", () => {
  saveCurrentAgentPreferences({
    blockColor: agentThemeSelect.value,
  });
  render();
});
agentTextSelect.addEventListener("change", () => {
  saveCurrentAgentPreferences({
    textColor: agentTextSelect.value,
  });
  render();
});
agentBackgroundUpload.addEventListener("change", async (event) => {
  const file = event.target.files?.[0];
  if (!file || !selectedAgentId) return;
  const reader = new FileReader();
  reader.onload = () => {
    saveCurrentAgentPreferences({
      image: typeof reader.result === "string" ? reader.result : "",
    });
    render();
  };
  reader.readAsDataURL(file);
});
clearAgentBackgroundButton.addEventListener("click", () => {
  saveCurrentAgentPreferences({
    image: "",
  });
  if (agentBackgroundUpload) {
    agentBackgroundUpload.value = "";
  }
  render();
});
agentAlertsEnabled.addEventListener("change", () => {
  saveCurrentAgentPreferences({
    alertsEnabled: agentAlertsEnabled.checked,
  });
  render();
});
agentAlertTiming.addEventListener("change", () => {
  saveCurrentAgentPreferences({
    alertTiming: agentAlertTiming.value,
  });
  render();
});
agentAlertScope.addEventListener("change", () => {
  saveCurrentAgentPreferences({
    alertScope: agentAlertScope.value,
  });
  render();
});
agentAlertSoundEnabled?.addEventListener("change", () => {
  saveCurrentAgentPreferences({
    alertSoundEnabled: agentAlertSoundEnabled.checked,
  });
  render();
});
assistantScopeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    assistantTeamMode = button.dataset.scope || "all";
    render();
  });
});
assistantManagerFilter?.addEventListener("change", () => {
  assistantManagerMode = assistantManagerFilter.value || "all";
  render();
});
agentEnableNotificationsButton.addEventListener("click", async () => {
  await requestNotificationPermission();
  render();
});
agentTestAlertButton.addEventListener("click", sendTestNotification);
backToHomeAdminButton.addEventListener("click", () => {
  setView("portal");
  render();
});
backToHomeAgentButton.addEventListener("click", () => {
  setView("portal");
  render();
});
commandInput.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
    submitChatRequest();
  }
});
assistantAddAssignmentButton?.addEventListener("click", () => {
  const nextAssignment = assistantNewAssignmentInput?.value || "";
  if (!addCustomAssignment(nextAssignment)) {
    if (assistantNewAssignmentInput) {
      assistantNewAssignmentInput.value = "";
      assistantNewAssignmentInput.focus();
    }
    return;
  }
  addMessage("assistant", `Added the assignment ${String(nextAssignment).trim()}.`);
  if (assistantNewAssignmentInput) {
    assistantNewAssignmentInput.value = "";
    assistantNewAssignmentInput.focus();
  }
  render();
});
assistantNewAssignmentInput?.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    assistantAddAssignmentButton?.click();
  }
});

setupVoiceInput();
startNotificationWatcher();
archivePreviewDetails?.addEventListener("toggle", () => {
  if (archivePreviewSummaryAction) {
    archivePreviewSummaryAction.textContent = archivePreviewDetails.open ? "Collapse" : "Expand";
  }
});
refreshArchiveLibrary().finally(() => {
  render();
  void syncSchedulingRulesFromServer();
  void syncAdminPasswordsFromServer();
});
