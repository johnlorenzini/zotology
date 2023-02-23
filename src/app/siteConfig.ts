interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
}

interface SiteConfig {
  name: string;
  subHeading: string;
  description: string;
  mainNav: NavItem[];
  links: {
    uciHome: string;
  };
  currentUser: {
    netID: string;
    formattedName: string;
  };
}

export const siteConfig: SiteConfig = {
  name: "WebReg",
  subHeading: "University Registrar",
  description:
    "UCI WebReg, reimagined by Zotology.",
  mainNav: [
    {
      title: "UCI Home",
      href: "https://uci.edu/",
    },
    {
      title: "StudentAccess",
      href: "https://www.reg.uci.edu/access/student/welcome/",
    },
    {
      title: "WebAdmin",
      href: "https://www.reg.uci.edu/webadmin/staff/welcome/",
    },
  ],
  links: {
    uciHome: "uci.edu",
  },
  currentUser: {
    netID: "panteate",
    formattedName: "Anteater, Peter the",
  },
};

export const sampleEvents: Array<any> = [
  {
    type: "lec",
    time: 11,
    days: "TuTh",
    course: "Writing 60",
    location: "RH 104",
    instructor: "Maurer",
    enrollment: 103,
    capacity: 200,
    status: "pending",
  },
  {
    type: "lec",
    time: 15,
    days: "MWF",
    duration: 0.833,
    day: 0,
    course: "CS 171",
    location: "SSH 100",
    instructor: "Kask",
    enrollment: 143,
    capacity: 300,
    status: "pending",
  },
  {
    type: "dis",
    time: 8,
    days: "F",
    duration: 0.833,
    day: 4,
    course: "CS 171 Dis",
    location: "RH 104",
    instructor: "STAFF",
    enrollment: 143,
    capacity: 300,
    status: "pending",
  },
  {
    type: "lec",
    time: 8,
    days: "TuTh",
    duration: 1.33,
    day: 1,
    course: "ICS 53",
    location: "ALP 2300",
    instructor: "Wong-Ma",
    enrollment: 202,
    capacity: 250,
    status: "pending",
  },
  {
    type: "dis",
    time: 17,
    days: "M",
    duration: 0.833,
    day: 0,
    course: "ICS 53 Dis",
    location: "SSL 100",
    instructor: "STAFF",
    enrollment: 30,
    capacity: 50,
    status: "pending",
  },
  {
    type: "lab",
    time: 18.5,
    days: "MW",
    duration: 0.833,
    day: 0,
    course: "ICS 53 Lab",
    location: "ICS 124",
    instructor: "STAFF",
    enrollment: 50,
    capacity: 60,
    status: "pending",
  },
];

export const sampleWaitlist: Array<any> = [
  {
    time: 11,
    duration: 1.33,
    days: "TuTh",
    day: 1,
    type: "lec",
    course: "Writing 60",
    location: "RH 104",
    instructor: "Alberts",
    enrollment: 0,
    capacity: 200,
    position: 28,
    status: "waitlist",
    finalDate: "March 22 | 1PM - 3PM",
  },
  {
    time: 11,
    duration: 1.33,
    days: "TuTh",
    day: 1,
    type: "lec",
    course: "CS 161",
    location: "EH 1200",
    instructor: "Shindler",
    enrollment: 0,
    capacity: 200,
    position: 23,
    status: "waitlist",
    finalDate: "March 22 | 1PM - 3PM",
  },
  {
    time: 11,
    duration: 1.33,
    days: "TuTh",
    day: 1,
    type: "lec",
    course: "SOCIOL 1",
    location: "HH 100",
    instructor: "STAFF",
    enrollment: 0,
    capacity: 200,
    position: 15,
    status: "waitlist",
    finalDate: "March 22 | 1PM - 3PM",
  },
];
