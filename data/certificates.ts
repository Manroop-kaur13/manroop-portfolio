export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  image: string;
}

export const certificates: Certificate[] = [
  {
    id: "mckinsey-forward",
    title: "McKinsey.org Forward Program",
    issuer: "McKinsey.org",
    image: "/images/certificates/mckinsey-forward.jpg",
  },

  {
    id: "python-bootcamp",
    title: "100 Days of Code: Python Pro Bootcamp",
    issuer: "Udemy • Dr. Angela Yu",
    image: "/images/certificates/python-bootcamp.jpg",
  },

  {
    id: "relief-mission",
    title: "Graphic Designer Internship",
    issuer: "Relief Mission Foundation",
    image: "/images/certificates/relief-mission-internship.jpg",
  },

  {
    id: "robotic-arm-elc",
    title: "Robotic Arm Activity",
    issuer: "Experiential Learning Centre • TIET",
    image: "/images/certificates/robotic-arm-elc.jpg",
  },

  {
    id: "resumecraft",
    title: "ResumeCraft Hackathon",
    issuer: "UnsaidTalks Education Pvt. Ltd.",
    image: "/images/certificates/resumecraft-hackathon.png",
  },

  {
    id: "younity",
    title: "Social Entrepreneurship",
    issuer: "Younity",
    image: "/images/certificates/younity-achievement.jpg",
  },
];