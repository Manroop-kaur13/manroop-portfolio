import type { Project } from "@/types/project";

export const projects: Project[] = [
 {
  id: "drivesafe-ai",

  title: "DriveSafe AI",

  emoji: "🚗",

  tagline:
    "AI-powered multimodal driver monitoring system for real-time drowsiness and alcohol detection.",

  status: "Building",

  heroImage: "/images/projects/drivesafe/hero.jpeg",

  sections: [
    {
      type: "overview",

      title: "Project Overview",

      description:
        "DriveSafe AI is an intelligent edge-AI based driver monitoring system designed to improve road safety by detecting driver drowsiness and alcohol consumption in real time. The system combines computer vision, facial landmark analysis, head pose estimation, alcohol sensing and edge deployment on NVIDIA Jetson Nano to deliver reliable fatigue monitoring while maintaining low latency."
    },

    {
      type: "tech-stack",

      title: "Technologies Used",

      technologies: [
        "Python",
        "OpenCV",
        "MediaPipe Face Mesh",
        "NumPy",
        "PyTorch",
        "NVIDIA Jetson Nano",
        "Linux",
        "Git",
        "GitHub"
      ]
    },

    {
      type: "hardware",

      title: "Hardware Components",

      hardware: [
        "NVIDIA Jetson Nano",
        "USB Camera",
        "MQ-3 Alcohol Sensor",
        "ADS1115 ADC",
        "Buzzer",
        "Power Supply",
        "Breadboard Prototype"
      ]
    },

    {
      type: "features",

      title: "Key Features",

      features: [
        "Real-time driver drowsiness detection",
        "Alcohol detection using MQ-3 sensor",
        "Eye Aspect Ratio (EAR) based blink analysis",
        "Mouth Aspect Ratio (MAR) based yawning detection",
        "Head pose estimation",
        "468-point facial landmark tracking using MediaPipe Face Mesh",
        "Visual warning system",
        "Buzzer-based driver alert",
        "Edge deployment on NVIDIA Jetson Nano",
        "Real-time video processing",
        "Modular architecture for future multimodal expansion"
      ]
    },

    {
      type: "pipeline",

      title: "AI Pipeline",

      steps: [
        "Camera Input",
        "MediaPipe Face Mesh",
        "Facial Landmark Extraction",
        "EAR & MAR Computation",
        "Head Pose Estimation",
        "Alcohol Detection",
        "Fatigue Decision Engine",
        "Driver Alert System"
      ]
    },

    {
      type: "contributions",

      title: "My Contributions",

      contributions: [
        "Designed and developed the complete computer vision pipeline.",
        "Integrated NVIDIA Jetson Nano with camera and alcohol sensor.",
        "Implemented real-time drowsiness detection using facial landmarks.",
        "Worked on alcohol detection hardware integration.",
        "Designed system architecture.",
        "Prepared technical documentation and presentation.",
        "Optimized the complete pipeline for edge deployment."
      ]
    },

    {
      type: "results",

      title: "Project Outcomes",

      results: [
        "Successfully deployed on NVIDIA Jetson Nano.",
        "Real-time fatigue monitoring with low-latency inference.",
        "Integrated computer vision and alcohol sensing into a single edge device.",
        "Demonstrated as part of the Experiential Learning Course (ELC).",
        "Research work currently being prepared for publication."
      ]
    },

    {
      type: "architecture",

      title: "System Architecture",

      image:
        "/images/projects/drivesafe/gallery/system-architecture.jpg",

      description:
        "Overall system architecture showing image acquisition, facial landmark extraction, fatigue estimation, alcohol sensing, decision logic and alert generation running on NVIDIA Jetson Nano."
    },

    {
      type: "gallery",

      title: "Project Gallery",

      images: [
        "/images/projects/drivesafe/gallery/1.jpeg",
        "/images/projects/drivesafe/gallery/2.jpeg",
        "/images/projects/drivesafe/gallery/3.jpeg",
        "/images/projects/drivesafe/gallery/4.jpg"
      ]
    },

    {
      type: "video",

      title: "Project Demonstration",

      video: "/videos/drivesafe/demo.mp4",

      thumbnail:
        "/images/projects/drivesafe/hero.jpeg"
    },

  

    {
      type: "links",

      title: "Resources",

      links: [
        {
          label: "LinkedIn Project",
          url: "https://www.linkedin.com/posts/manroop-kaur13_drivesafeai-edgeai-computervision-ugcPost-7486100154261893121-O_4Q/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFH1K_YBOdkpZrsBy59knlZtI9azZVFxKpY",
          icon: "linkedin"
        }
      ]
    }
  ]
},
 

  {
    id: "carbon-commit",

    title: "Carbon Commit",

    emoji: "🌱",

    tagline:
      "A sustainability-focused web platform that helps individuals and institutions monitor, reduce and commit to lowering their carbon footprint.",

    status: "Completed",

    heroImage: "/images/projects/carbon-commit/cc-hero.jpg",

    sections: [
      {
        type: "overview",

        title: "Project Overview",

        description:
          "Carbon Commit is a full-stack sustainability platform developed as a DBMS team project. It enables users to calculate their carbon footprint, monitor environmental impact, visualize statistics and encourage greener practices through an interactive web platform."
      },

      {
        type: "tech-stack",

        title: "Technologies Used",

        technologies: [
          "HTML",
          "CSS",
          "JavaScript",
          "Node.js",
          "Express.js",
          "MongoDB",
          "Chart.js",
          "Git",
          "GitHub"
        ]
      },

      {
        type: "features",

        title: "Key Features",

        features: [
          "Carbon footprint calculator",
          "Interactive sustainability dashboard",
          "Emission tracking",
          "Environmental awareness platform",
          "Database driven architecture",
          "Responsive user interface"
        ]
      },

      {
        type: "contributions",

        title: "My Contributions",

        contributions: [
          "Developed major frontend components.",
          "Worked on database integration.",
          "Collaborated on feature implementation.",
          "Designed user interface improvements.",
          "Participated in testing and project documentation."
        ]
      },

      {
        type: "gallery",

        title: "Project Gallery",

        images: [
          "/images/projects/carbon-commit/cc1.jpg",
          "/images/projects/carbon-commit/cc2.jpg",
          "/images/projects/carbon-commit/cc3.jpg"
        ]
      },
            {
        type: "links",

        title: "Resources",

        links: [
          {
            label: "GitHub Repository",
            url: "https://github.com/Manroop-kaur13/Carbon-Commit",
            icon: "github"
          },
          {
            label: "LinkedIn Project",
            url: "https://www.linkedin.com/feed/update/urn:li:activity:7464005923594969088/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFH1K_YBOdkpZrsBy59knlZtI9azZVFxKpY",
            icon: "linkedin"
          }
        ]
      }
    ]
  },

  {
    id: "whatsapp-portfolio",

    title: "WhatsApp Portfolio",

    emoji: "💬",

    tagline:
      "A portfolio that feels like a real WhatsApp conversation instead of another scrolling website.",

    status: "Building",

    heroImage: "/images/projects/portfolio/hero.jpeg",

    sections: [
      {
        type: "overview",

        title: "Project Overview",

        description:
          "Instead of building a traditional portfolio website, I wanted to create an experience that recruiters would actually remember. This portfolio recreates the WhatsApp interface, where every section of my portfolio becomes a chat and every interaction feels like a conversation rather than navigating webpages."
      },

      {
        type: "tech-stack",

        title: "Technologies Used",

        technologies: [
          "Next.js 16",
          "React",
          "TypeScript",
          "Tailwind CSS",
          "Framer Motion",
          "shadcn/ui",
          "Lucide React"
        ]
      },

      {
        type: "features",

        title: "Key Features",

        features: [
          "WhatsApp-inspired interface",
          "Interactive recruiter experience",
          "Dark & Light theme support",
          "Animated chat conversations",
          "Dynamic project exploration",
          "Reusable component architecture",
          "Fully responsive design",
          "Modern UI with smooth transitions"
        ]
      },

      {
        type: "contributions",

        title: "My Contributions",

        contributions: [
          "Designed the complete portfolio concept.",
          "Created the UI/UX inspired by WhatsApp.",
          "Developed the application using Next.js and TypeScript.",
          "Built reusable React components.",
          "Implemented animations using Framer Motion.",
          "Designed a scalable project architecture."
        ]
      },

      {
        type: "links",

        title: "Resources",

        links: [
          {
            label: "GitHub Repository",
            url: "https://github.com/Manroop-kaur13/manroop-portfolio",
            icon: "github"
          }
        ]
      }
    ]
  }
];