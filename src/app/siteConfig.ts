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
  description: "UCI WebReg, reimagined by Zotology.",
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

export interface CourseSection {
  courseTitle?: string;
  courseFull?: string;
  finalExam?: string;
  sectionCode: string;
  sectionType: string;
  units: string;
  instructors: Array<string>;
  meetings: Array<any>;
  maxCapacity: string;
  numCurrentlyEnrolled?: {
    totalEnrolled?: string;
    sectionEnrolled?: string;
  }
  [otherOptions: string]: unknown;
}

export const sampleEvents: Array<CourseSection> = [
  {
    "sectionCode": "38050",
    "sectionType": "Lec",
    "sectionNum": "A",
    "units": "4",
    "instructors": ["DREZNER, Z."],
    "meetings": [
      { "days": "TuTh", "time": " 8:00- 9:20 ", "bldg": "SB1 2100" }
    ],
    "finalExam": "Tue Jun 13 8:00-10:00am",
    "maxCapacity": "90",
    "numCurrentlyEnrolled": { "totalEnrolled": "0", "sectionEnrolled": "" },
    "numOnWaitlist": "0",
    "numRequested": "0",
    "numNewOnlyReserved": "0",
    "restrictions": "L and J",
    "status": "OPEN",
    "sectionComment": "",
    "deptCode": "MGMT",
    "courseNumber": "101",
    "courseComment": "Concepts and methods of management science, which applies mathematical modeling and analysis to management problems. Topics include linear and integer programming, project scheduling, inventory management, queuing analysis, decision analysis, and simulation.",
    "courseTitle": "Management Science",
    "prerequisiteLink": "( MATH 7 OR MGMT 7 OR STATS 7 OR ECON 15A OR ECON 15B OR AP STATISTICS )",
    "courseFull": "MGMT 101"
  },
  {
    "sectionCode": "38061",
    "sectionType": "Lec",
    "sectionNum": "A",
    "units": "4",
    "instructors": ["LETOURNEAU, D."],
    "meetings": [{ "days": "MW", "time": " 8:00- 9:20 ", "bldg": "SB1 2100" }],
    "finalExam": "TBA",
    "maxCapacity": "90",
    "numCurrentlyEnrolled": { "totalEnrolled": "0", "sectionEnrolled": "" },
    "numOnWaitlist": "n/a",
    "numRequested": "0",
    "numNewOnlyReserved": "0",
    "restrictions": "L and J",
    "status": "OPEN",
    "sectionComment": "",
    "deptCode": "MGMT",
    "courseNumber": "105",
    "courseComment": "Basic marketing concepts; discussion of the role marketing plays in modern society. Topics include industrial and consumer marketing, promotion, distribution, and pricing theory.",
    "courseTitle": "Introduction to Marketing",
    "prerequisiteLink": "",
    "courseFull": "MGMT 105"
  },
  {
    "sectionCode": "44100",
    "sectionType": "Lec",
    "sectionNum": "A",
    "units": "4",
    "instructors": ["LEHMAN, R."],
    "meetings": [
      { "days": "MF", "time": "10:00-10:50 ", "bldg": "ON LINE" },
      { "days": "W", "time": "10:00-10:50 ", "bldg": "ALP 1300" }
    ],
    "finalExam": "Sat Jun 10 1:30-3:30pm",
    "maxCapacity": "300",
    "numCurrentlyEnrolled": { "totalEnrolled": "0", "sectionEnrolled": "" },
    "numOnWaitlist": "0",
    "numRequested": "0",
    "numNewOnlyReserved": "0",
    "restrictions": "A",
    "status": "OPEN",
    "sectionComment": "",
    "deptCode": "MATH",
    "courseNumber": "2B",
    "courseComment": "Definite integrals; the fundamental theorem of calculus. Applications of integration including finding areas and volumes. Techniques of integration. Infinite sequences and series.",
    "courseTitle": "Single-Variable Calculus II",
    "prerequisiteLink": " MATH 2A or MATH 5A or MATH 7A or AP Calculus AB or AP Calculus BC. AP Calculus AB with a minimum score of 4. AP Calculus BC with a minimum score of 3",
    "courseFull": "MATH 2B"
  },
  {
    "sectionCode": "44101",
    "sectionType": "Dis",
    "sectionNum": "A1",
    "units": "0",
    "instructors": ["STAFF"],
    "meetings": [
      { "days": "TuTh", "time": " 3:00- 3:50p", "bldg": "MSTB 122" }
    ],
    "finalExam": "",
    "maxCapacity": "50",
    "numCurrentlyEnrolled": { "totalEnrolled": "0", "sectionEnrolled": "" },
    "numOnWaitlist": "0",
    "numRequested": "0",
    "numNewOnlyReserved": "0",
    "restrictions": "A",
    "status": "OPEN",
    "sectionComment": "",
    "deptCode": "MATH",
    "courseNumber": "2B",
    "courseComment": "Definite integrals; the fundamental theorem of calculus. Applications of integration including finding areas and volumes. Techniques of integration. Infinite sequences and series.",
    "courseTitle": "Single-Variable Calculus II",
    "prerequisiteLink": " MATH 2A or MATH 5A or MATH 7A or AP Calculus AB or AP Calculus BC. AP Calculus AB with a minimum score of 4. AP Calculus BC with a minimum score of 3",
    "courseFull": "MATH 2B"
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
