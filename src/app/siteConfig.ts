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
  finalExam: string;
  sectionCode: string;
  sectionType: string;
  units: string;
  instructors: Array<string>;
  meetings: Array<any>;
  [otherOptions: string]: unknown;
}

export const sampleEvents: Array<CourseSection> = [
  {
    "sectionCode": "35641",
    "sectionType": "Dis",
    "sectionNum": "A1",
    "units": "0",
    "instructors": ["STAFF", "GASSKO, I."],
    "meetings": [{ "days": "MW", "time": " 3:00- 3:50p", "bldg": "SSL 228" }],
    "finalExam": "",
    "maxCapacity": "100",
    "numCurrentlyEnrolled": { "totalEnrolled": "0", "sectionEnrolled": "" },
    "numOnWaitlist": "0",
    "numRequested": "0",
    "numNewOnlyReserved": "0",
    "restrictions": "A",
    "status": "OPEN",
    "sectionComment": "",
    "deptCode": "I&C SCI",
    "courseNumber": "6D",
    "courseComment": "Covers essential tools from discrete mathematics used in computer science with an emphasis on the process of abstracting computational problems and analyzing them mathematically. Topics include mathematical induction, combinatorics, and recurrence relations.",
    "courseTitle": "Discrete Mathematics for Computer Science",
    "prerequisiteLink": "I&C SCI 6B AND ( SCHOOL OF I&C SCI ONLY OR COMPUTER SCI & ENGR MAJORS ONLY )",
    "courseFull": "I&C SCI 6D"
  },
  {
    "sectionCode": "35640",
    "sectionType": "Lec",
    "sectionNum": "A",
    "units": "4",
    "instructors": ["GASSKO, I."],
    "meetings": [{ "days": "MWF", "time": "12:00-12:50p", "bldg": "ELH 100" }],
    "finalExam": "Wed Jun 14 4:00-6:00pm",
    "maxCapacity": "300",
    "numCurrentlyEnrolled": { "totalEnrolled": "0", "sectionEnrolled": "" },
    "numOnWaitlist": "0",
    "numRequested": "0",
    "numNewOnlyReserved": "0",
    "restrictions": "A",
    "status": "OPEN",
    "sectionComment": "",
    "deptCode": "I&C SCI",
    "courseNumber": "6D",
    "courseComment": "Covers essential tools from discrete mathematics used in computer science with an emphasis on the process of abstracting computational problems and analyzing them mathematically. Topics include mathematical induction, combinatorics, and recurrence relations.",
    "courseTitle": "Discrete Mathematics for Computer Science",
    "prerequisiteLink": "I&C SCI 6B AND ( SCHOOL OF I&C SCI ONLY OR COMPUTER SCI & ENGR MAJORS ONLY )",
    "courseFull": "I&C SCI 6D"
  },
  {
    "sectionCode": "35700",
    "sectionType": "Lec",
    "sectionNum": "A",
    "units": "4",
    "instructors": ["MOSHIRPOUR, M."],
    "meetings": [
      { "days": "TuTh", "time": " 3:30- 4:50p", "bldg": "HSLH 100A" }
    ],
    "finalExam": "Tue Jun 13 4:00-6:00pm",
    "maxCapacity": "308",
    "numCurrentlyEnrolled": { "totalEnrolled": "0", "sectionEnrolled": "" },
    "numOnWaitlist": "0",
    "numRequested": "0",
    "numNewOnlyReserved": "0",
    "restrictions": "A",
    "status": "OPEN",
    "sectionComment": "",
    "deptCode": "I&C SCI",
    "courseNumber": "31",
    "courseComment": "Introduction to fundamental concepts and techniques for writing software in a high-level programming language. Covers the syntax and semantics of data types, expressions, exceptions, control structures, input/output, methods, classes, and pragmatics of programming.",
    "courseTitle": "Introduction to Programming",
    "prerequisiteLink": "",
    "courseFull": "I&C SCI 31"
  },
  {
    "sectionCode": "35701",
    "sectionType": "Lab",
    "sectionNum": "1",
    "units": "0",
    "instructors": ["STAFF", "MOSHIRPOUR, M."],
    "meetings": [{ "days": "MWF", "time": " 8:00- 9:20 ", "bldg": "ICS 183" }],
    "finalExam": "",
    "maxCapacity": "40",
    "numCurrentlyEnrolled": { "totalEnrolled": "0", "sectionEnrolled": "" },
    "numOnWaitlist": "0",
    "numRequested": "0",
    "numNewOnlyReserved": "0",
    "restrictions": "A",
    "status": "OPEN",
    "sectionComment": "",
    "deptCode": "I&C SCI",
    "courseNumber": "31",
    "courseComment": "Introduction to fundamental concepts and techniques for writing software in a high-level programming language. Covers the syntax and semantics of data types, expressions, exceptions, control structures, input/output, methods, classes, and pragmatics of programming.",
    "courseTitle": "Introduction to Programming",
    "prerequisiteLink": "",
    "courseFull": "I&C SCI 31"
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
