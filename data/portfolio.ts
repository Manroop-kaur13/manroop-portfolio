import type {
  ChatMessage,
  ChatType,
} from "@/types/chat";

export interface ChatData {
  title: string;
  subtitle: string;
  avatar: string;
  messages: ChatMessage[];
}

export const portfolio: Record<ChatType, ChatData> = {
  about: {
  title: "About Me",
  subtitle: "A little about me 👋",
  avatar: "👩🏻‍💻",

  messages: [
    {
      id: 1,
      type: "text",
      sender: "me",
      text: "Hey there! 👋\nWelcome to my portfolio.",
      time: "10:24 PM",
    },

    {
      id: 2,
      type: "text",
      sender: "me",
      text: "I'm Manroop Kaur, a third-year Computer Science & Engineering student at Thapar Institute of Engineering & Technology.",
      time: "10:24 PM",
    },

    {
      id: 3,
      type: "text",
      sender: "me",
      text: "I'm passionate about Artificial Intelligence, Software Development, and building technology that solves real-world problems.",
      time: "10:25 PM",
    },

    {
      id: 4,
      type: "text",
      sender: "me",
      text: "My work spans AI/ML, Computer Vision, Full-Stack Development, Embedded AI, and research.",
      time: "10:25 PM",
    },

    {
      id: 5,
      type: "text",
      sender: "me",
      text: "Along the way, I've worked on everything from an Edge AI driver monitoring system to full-stack applications and student-led ventures.",
      time: "10:26 PM",
    },

    {
      id: 6,
      type: "text",
      sender: "me",
      text: "I've organized this portfolio into conversations - each chat tells you a little more about my work and journey.",
      time: "10:26 PM",
    },

    {
      id: 7,
      type: "text",
      sender: "me",
      text: "Feel free to open any chat and explore.\nThanks for stopping by! 😊",
      time: "10:27 PM",
    },
  ],
},

 education: {
  title: "Education",
  subtitle: "Academic Journey",
  avatar: "🎓",

  messages: [
    {
      id: 1,
      sender: "other",
      type: "text",
      text: "Can you tell me about your academic background?",
      time: "10:30 AM",
    },

    {
      id: 2,
      sender: "me",
      type: "text",
      text: "Sure! 😊 Here's a quick overview of my educational journey.",
      time: "10:30 AM",
    },

    {
      id: 3,
      sender: "me",
      type: "education",
      title: "🎓 CLASS X",
      institution:
        "B.R. International Public School, Kurukshetra, Haryana",
      duration: "2022",
      percentage: "98.8%",
      board:
        "Central Board of Secondary Education (CBSE)",
      subjects: [
        "English",
        "Hindi",
        "Mathematics",
        "Science",
        "Social Science",
        "Punjabi",
        "Information Technology",
      ],
      time: "10:31 AM",
    },

    {
      id: 4,
      sender: "me",
      type: "education",
      title: "🎓 CLASS XII",
      institution:
        "DAV Public School, Kurukshetra, Haryana",
      duration: "2024",
      percentage: "95%",
      board:
        "Central Board of Secondary Education (CBSE)",
      subjects: [
        "English",
        "Physics",
        "Chemistry",
        "Mathematics",
        "Computer Science",
      ],
      time: "10:32 AM",
    },

    {
      id: 5,
      sender: "me",
      type: "education",
      title: "🎓 B.E. COMPUTER SCIENCE & ENGINEERING",
      institution:
        "Thapar Institute of Engineering & Technology, Patiala, Punjab",
      duration: "2028",
      cgpa: "9.14 / 10",
      coursework: [
        "Data Structures & Algorithms",
        "Object-Oriented Programming",
        "Database Management Systems",
        "Operating Systems",
        "Computer Networks",
        "Artificial Intelligence",
      ],
      time: "10:33 AM",
    },

    {
      id: 6,
      sender: "other",
      type: "text",
      text: "That's a remarkable academic journey! 👏",
      time: "10:34 AM",
    },

    {
      id: 7,
      sender: "me",
      type: "text",
      text:
        "Thank you! 😊 ",
        time: "10:34 AM",
    },
  ],
},
  skills: {
    title: "Skills",
    subtitle: "Technical Skills",
    avatar: "💻",

    messages: [
  {
    id: 1,
    type: "text",
    sender: "other",
    text: "What's your tech stack like?",
    time: "10:30 AM",
  },

  {
    id: 2,
    type: "text",
    sender: "me",
    text:
      "I mainly work across AI, Full-Stack Development, and Embedded Systems. Here's my current toolkit 👇",
    time: "10:30 AM",
  },

  {
    id: 3,
    type: "skill-card",
    sender: "me",
    title: "Programming Languages",
    emoji: "💻",
    skills: [
      "C",
      "C++",
      "Python",
      "JavaScript",
      "SQL",
      "HTML5",
      "TypeScript",
      "CSS3",
    ],
    time: "10:31 AM",
  },

  {
    id: 4,
    type: "skill-card",
    sender: "me",
    title: "AI & Computer Vision",
    emoji: "🧠",
    skills: [
      "Artificial Intelligence",
      "Machine Learning",
      "Deep Learning",
      "Computer Vision",
      "OpenCV",
      "MediaPipe",
      "PyTorch",
    ],
    time: "10:31 AM",
  },

  {
    id: 5,
    type: "skill-card",
    sender: "me",
    title: "Edge AI & Embedded Systems",
    emoji: "⚡",
    skills: [
      "Jetson Nano",
      "Edge AI",
      "Embedded Systems",
      "Sensor Integration",
      "I²C",
      "ADS1115",
      "IoT",
    ],
    time: "10:32 AM",
  },

  {
    id: 6,
    type: "skill-card",
    sender: "me",
    title: "Full-Stack Development",
    emoji: "🌐",
    skills: [
      "React.js",
      "Next.js",
      "Node.js",
      "Tailwind CSS",
      "REST APIs",
    ],
    time: "10:32 AM",
  },

  {
    id: 7,
    type: "skill-card",
    sender: "me",
    title: "Research & Documentation",
    emoji: "📚",
    skills: [
      "Research",
      "Data Analysis",
      "Scientific Writing",
      "Literature Review",
      "Technical Documentation",
    ],
    time: "10:33 AM",
  },

  {
    id: 8,
    type: "skill-card",
    sender: "me",
    title: "Development Tools",
    emoji: "🛠️",
    skills: [
      "VS Code",
      "Linux",
      "Jupyter Notebook",
      "Canva",
      "Arduino IDE",
      "Git",
      "Github",
    ],
    time: "10:33 AM",
  },

  {
    id: 9,
    type: "skill-card",
    sender: "me",
    title: "Professional Skills",
    emoji: "🤝",
    skills: [
      "Problem Solving",
      "Teamwork",
      "Leadership",
      "Public Speaking",
      "Project Management",
    ],
    time: "10:34 AM",
  },

  {
    id: 10,
    type: "text",
    sender: "other",
    text: "That's a strong and diverse skill set! 🚀",
    time: "10:34 AM",
  },
  {
    id: 11,
    type: "text",
    sender: "me",
    text: "Thank you!",
    time: "10:34 AM",
  },
],
  },
  
    projects: {
    title: "Projects",
    subtitle: "Featured Work",
    avatar: "🚀",

   messages: [
  {
    id: 1,
    type: "text",
    sender: "other",
    text: "I'd love to know about your projects.",
    time: "10:50 PM",
  },
  {
    id: 2,
    type: "text",
    sender: "me",
    text: "Here are some of the projects I've built. Feel free to open any project below to explore its architecture, implementation, results and demo. 🚀",
    time: "10:51 PM",
  },
  {
    id: 3,
    type: "project-selector",
    sender: "me",
    time: "10:51 PM",
  },
],},
experience: {
  title: "Experience",
  subtitle: "Roles • Internships • Impact",
  avatar: "💼",

  messages: [
    {
      id: 1,
      type: "text",
      sender: "me",
      text: "Here’s a glimpse of where I’ve worked, built, researched, and contributed so far 💼",
      time: "10:30 PM",
    },
{
  id: 2,
  type: "experience-card",
  sender: "me",

  title: "Summer Intern",
  organization: "Experiential Learning Centre (ELC), TIET",
  duration: "Summer 2026",

  description:
    "Worked on AI research and edge-based driver monitoring, bridging computer vision, machine learning, and embedded systems.",

  highlights: [
    "Co-authored an ongoing research manuscript on camera-based driver drowsiness detection, focusing on subject-independent evaluation and model generalization.",
    "Worked on benchmarking drowsiness detection approaches across multiple public datasets using Leave-One-Subject-Out (LOSO) evaluation.",
    "Developed DriveSafeAI 2.0, a real-time driver monitoring system on NVIDIA Jetson Nano integrating vision-based drowsiness detection with embedded sensor inputs.",
  ],

  tags: [
    "AI Research",
    "Computer Vision",
    "Edge AI",
    "Jetson Nano",
    "Machine Learning",
  ],

  time: "10:31 PM",
},
    {
      id: 3,
      type: "experience-card",
      sender: "me",

      title: "Operations & Design Team Member",
      organization: "GeoThermX Venture",
      duration: "Sept 2025 – Present",

      description:
        "Working with a student-led venture focused on geothermal cooling solutions, across operations, design, outreach, and prototype development.",

      highlights: [
        "Grew GeoThermX's LinkedIn following by 356% through 31+ posts and consistent outreach.",
        "Designed social media posts and presentation materials for events and outreach.",
        "Sourced AC units and hardware components supporting prototype development.",
      ],

      tags: [
        "Operations",
        "Design",
        "LinkedIn",
        "Procurement",
        "Hardware",
      ],

      time: "10:31 PM",
    },

    {
      id: 4,
      type: "experience-card",
      sender: "me",

      title: "Graphic Designer Intern",
      organization: "Relief Mission Foundation",
      duration: "Nov 2025 – Jan 2026",

      description:
        "Completed a three-month graphic design internship, creating visual content for organizational communication.",

      highlights: [
        "Designed 40+ posters and presentation materials for organizational use.",
        "Maintained visual consistency across digital content.",
      ],

      tags: [
        "Graphic Design",
        "Canva",
        "Visual Communication",
      ],

      time: "10:32 PM",
    },

    {
      id: 5,
      type: "text",
      sender: "me",
      text: "Each experience has given me a different perspective - from contributing to a tech venture to creating for a real-world organization. 🚀",
      time: "10:33 PM",
    },
  ],
},
  achievements: {
    title: "Achievements",
    subtitle: "Awards & Recognition",
    avatar: "🏆",

    messages: [
  {
    id: 1,
    type: "text",
    sender: "other",
    text: "Any achievements outside academics? 🏆",
    time: "11:00 PM",
  },

  {
    id: 2,
    type: "text",
    sender: "me",
    text: "Here are a few highlights I'm proud of! 🏆",
    time: "11:00 PM",
  },

 {
  id: 3,
  type: "achievement-gallery",
  sender: "me",
  title: "Markfin Hackathon",
  images: [
    "/images/achievements/hackathons/hackathon1.jpg",
    "/images/achievements/hackathons/hackathon2.jpg",
    "/images/achievements/hackathons/hackathon3.jpeg",
  ],
  time: "11:01 PM",
},
{
  id: 4,
  type: "contact",
  sender: "me",
  icon: "linkedin",
  title: "LinkedIn Post",
  value: "Emporia 4.0 • Winning Moment",
  url: "https://www.linkedin.com/posts/manroop-kaur13_geothermx-sustainability-geothermalcooling-activity-7398338240941813760-Q0WP?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFH1K_YBOdkpZrsBy59knlZtI9azZVFxKpY",
  buttonText: "View Post",
  time: "10:06 AM",
},
{
  id: 5,
  type: "text",
  sender: "me",
  text: "🏆 Winner: Markfin Hackathon",
  time: "11:01 PM",
},

  {
    id: 6,
    type: "text",
    sender: "me",
    text:
      "🏅 Merit Scholarship\nAwarded for academic excellence at Thapar Institute of Engineering & Technology.",
    time: "11:03 PM",
  },

  {
    id: 7,
    type: "text",
    sender: "me",
    text:
      "🎯 JEE Main\n96.04 Percentile",
    time: "11:04 PM",
  },

  {
    id: 8,
    type: "text",
    sender: "me",
    text:
      "🥇 Class 10 School Topper\n98.8% (CBSE)",
    time: "11:05 PM",
  },

  {
    id: 9,
    type: "text",
    sender: "other",
    text: "That's an impressive journey. 👏",
    time: "11:05 PM",
  },
],
  },

 certificates: {
  title: "Certificates",
  subtitle: "Certifications & Learning",
  avatar: "📜",

  messages: [
    {
      id: 1,
      type: "text",
      sender: "me",
      text: "Here are some certifications I've earned along the way 📜",
      time: "11:15 PM",
    },

   {
  id: 2,
  type: "certificate-gallery",
  sender: "me",
  time: "11:15 PM",
},

    {
      id: 3,
      type: "text",
      sender: "me",
      text: "Always learning, building, and exploring something new. 🚀",
      time: "11:16 PM",
    },
  ],
},

 resume: {
  title: "Resume",
  subtitle: "Professional Profile",
  avatar: "📄",

  messages: [
    {
      id: 1,
      type: "text",
      sender: "me",
      text: "Here's my resume! 😊",
      time: "11:10 PM",
    },

    {
      id: 2,
      type: "resume",
      sender: "me",
      preview: "/images/resume/resume-preview.jpg",
      file: "/resume/Manroop_Kaur_Resume.pdf",
      time: "11:10 PM",
    },

    {
      id: 3,
      type: "text",
      sender: "me",
      text: "Feel free to open it or save a copy for later.",
      time: "11:11 PM",
    },
  ],
},

  contact: {
    title: "Contact",
    subtitle: "Let's Connect",
    avatar: "📞",

    messages: [
      {
        id: 1,
        type: "text",
        sender: "other",
        text: "How can I reach you?",
        time: "11:15 PM",
      },

      {
        id: 2,
        type: "contact",
        sender: "me",
        title: "Email",
        value: "mkaur4_be24@thapar.edu",
        icon: "email",
        copy: true,
        buttonText: "Copy Email",
        time: "11:16 PM",
      },

      {
        id: 3,
        type: "contact",
        sender: "me",
        title: "LinkedIn",
        value: "linkedin.com/in/manroop-kaur13",
        url: "https://linkedin.com/in/manroop-kaur13",
        icon: "linkedin",
        buttonText: "Open LinkedIn",
        time: "11:17 PM",
      },

      {
        id: 4,
        type: "contact",
        sender: "me",
        title: "GitHub",
        value: "github.com/Manroop-kaur13",
        url: "https://github.com/Manroop-kaur13",
        icon: "github",
        buttonText: "Open GitHub",
        time: "11:18 PM",
      },

      {
        id: 5,
        type: "contact",
        sender: "me",
        title: "LeetCode",
        value: "leetcode.com/u/Manroop_kaur13",
        url: "https://leetcode.com/u/Manroop_kaur13",
        icon: "leetcode",
        buttonText: "Open LeetCode",
        time: "11:19 PM",
      },

      {
        id: 6,
        type: "text",
        sender: "other",
        text: "Thanks for sharing! Looking forward to staying in touch.",
        time: "11:20 PM",
      },

      {
        id: 7,
        type: "text",
        sender: "me",
        text: "Thank you for visiting my portfolio! 😊",
        time: "11:20 PM",
      },
    ],
  },
};