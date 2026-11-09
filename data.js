// Edit this file to change the site's copy, links, commands, and portfolio data.
// Some v0 portfolio entries below are reference placeholders pending Ayush-specific content.

export const PROFILE = {
  pageTitle: "ayush",
  metaDescription: "Ayush — full stack and AI engineer. I love to make and break stuff.",
  greeting: "Hi, I'm",
  name: "ayush",
  wave: "👋",
  headlinePrefix: "& i love to",
  rotatingWords: ["make stuff", "break stuff"],
  introParagraphs: [
    "Hey, I'm Ayush. I build across the stack, play with AI, and obsess over how things feel, not just how they work. When I'm not pushing pixels or shipping code, I'm probably pushing my limits in the gym. Always building, inside and out.",
    "I'm currently a bachelors student at IIT Rookree, and also a part of InfoSecIITR as a reversing engineering player, though I'm inactive from a couple of months.",

  ],
  terminalPlaceholder: "hi lol, type / and know more about me :)",
  githubUsername: "24aysh",
};

export const SOCIALS = [
  { title: "GitHub", link: "https://github.com/24aysh" },
  { title: "X", terminalTitle: "X / Twitter", link: "https://x.com/24aysh" },
  { title: "LinkedIn", link: "https://www.linkedin.com/in/c0ntinental/" },
  { title: "Email", link: "mailto:ayushkumar2122.ak@gmail.com" },
];

export const COMMANDS = [
  { name: "/about", description: "know more about me" },
  { name: "/projects", description: "see what I have built" },
  { name: "/achievements", description: "view my achievements" },
  { name: "/education", description: "see where I studied" },
  { name: "/socials", description: "find me on the internet" },
  { name: "/experience", description: "view my work experience" },
  { name: "/skills", description: "explore the tech stack" },
  { name: "/clear", description: "clear terminal output" },
];

export const ABOUT = `
I'm a pre-final year Chemical Engineering student at IIT Roorkee with a strong interest in software engineering. My interests span across the stack, from building intuitive user interfaces to exploring low-level systems, distributed architectures, and Agentic AI. I've worked on diverse projects ranging from full-stack applications and distributed microservices to building my own Git implementation, HTTP server, and AI-powered developer tools. I enjoy understanding how things work under the hood, experimenting with new technologies, and occasionally creating and solving CTF challenges.
`;

export const EDUCATION = [
  {
    title: "Indian Institute of Technology, Roorkee",
    description:
      "B.Tech in Chemical Engineering",
    startTime: "2024-07",
    link: "https://www.iitr.ac.in/",
  },
  {
    title: "St. Mary's Academy, Mission Compound, Saharanpur",
    description:
      "10th - 93.4% | 12th - 95.2%",
    startTime: "2018-04",
    endTime: "2024-04",
    link: "https://stmaryssaharanpur.org/",
  },
];

export const EXPERIENCE = [
  {
    company: "InfoSecIITR",
    role: "CTF Player",
    startTime: "2025-07",
    endTime: "Present",
    logo: "/assets/infoseciitr.png",
    location: "IIT Roorkee",
    link: "https://infoseciitr.in/",
    bullets: [
      "Student run information security and Capture The Flag (CTF) club IIT Roorkee",
      "Conducted BackdoorCTF 2025 with 1200+ participants globally",
      "Conducted n00bCTF 2026 with over 200 participants throughout the institute",
    ],
    techStack: ["Reverse Engineering", "Low-Level"],
  },
];



export const PROJECTS = [
  {
    title: "Sage",
    description:
      "An autonomous coding agent that solves GitHub issues in isolated Docker sandboxes. Uses a LangGraph-based solver, deterministic verification, and an independent AI reviewer before creating draft pull requests.",
    tags: ["Python", "LangGraph", "Docker", "OpenAI", "GitHub Actions"],
    github: "https://github.com/24aysh/sage",
  },
  {
    title: "Intervue.AI",
    description:
      "AI-powered technical interviewer that conducts real-time voice interviews based on your GitHub projects. Uses OpenAI Realtime for conversations, Deepgram for transcription, and Gemini to evaluate responses with scores and feedback.",
    tags: ["React", "Express", "WebRTC", "OpenAI", "Deepgram", "Prisma", "Turborepo"],
    github: "https://github.com/24aysh/intervue.ai",
  },
  {
    title: "Sentinel",
    description:
      "An in-process safety gateway for AI applications. A TypeScript SDK that sits between your application and LLM providers, handling PII redaction, prompt injection detection, structured output validation, and tool call filtering.",
    tags: ["TypeScript", "Bun", "ONNX", "LLM", "SDK", "Turborepo"],
    github: "https://github.com/24aysh/sentinel",
  },
  {
    title: "OpenLoop",
    description:
      "A voice-first AI memory system, inspired by Moonshot (YC S26). Uses real-time conversations to extract and reconcile semantic, episodic, and prospective memories, with background workers for commitment tracking and reminders.",
    tags: ["TypeScript", "PostgreSQL", "OpenAI Realtime", "WebRTC", "LLM", "SSE"],
    github: "https://github.com/24aysh/openloop",
  },
  {
    title: "Verz",
    description:
      "A lightweight Git implementation written from scratch in C++. A learning project to deep dive into Git internals, supporting repository initialization, staging, commits, branching, and cloning remote repositories.",
    tags: ["C++", "Git", "OpenSSL", "zlib", "libcurl"],
    github: "https://github.com/24aysh/verz",
  },
  {
    title: "Tollify",
    description:
      "A distributed toll calculation system that processes real-time vehicle GPS data using Apache Kafka. Built with Go microservices communicating over gRPC and REST, with Prometheus and Grafana for monitoring and observability.",
    tags: ["Go", "Kafka", "gRPC", "Docker", "Prometheus", "Grafana"],
    github: "https://github.com/24aysh/tollify",
  },
  {
    title: "Stayo",
    description:
      "A hotel reservation backend system built with Go Fiber and MongoDB. Provides REST APIs for room bookings, hotel management, JWT authentication, and role-based access control for users and administrators.",
    tags: ["Go", "Fiber", "MongoDB", "JWT", "REST API", "Docker"],
    github: "https://github.com/24aysh/stayo",
  },
  {
    title: "Echo-er",
    description:
      "A real-time chat application built on the MERN stack. Supports one-to-one messaging using WebSockets, video calling through ZegoCloud's WebRTC SDK, and Redis for caching and message brokering.",
    tags: ["React", "Node.js", "MongoDB", "Socket.IO", "Redis", "WebRTC"],
    github: "https://github.com/24aysh/echo-er",
  },
];


export const SKILL_SET = {
  languages: ["TypeScript", "Go", "Python", "C/C++"],
  technologies: [
    "LangGraph",
    "Docker",
    "Vite",
    "Next.js",
    "React",
    "Tailwind CSS",
    "Flask",
    "Django",
    "Linux",
    "Git",
  ],
};


export const TIMELINE = [
  {
    title: "Flare-On 12",
    description: "Successfully completed Flare-On 12 reverse engineering challenge organised by Mandiant",
    timestamp: "2025",
  },
  {
    title: "squ1rrel CTF 2025",
    description: "Achieved 3rd rank in squ1rrel CTF 2025 globally with InfosecIITR",
    timestamp: "2025",
  },
  {
    title: "BreachCTF 2025",
    description: "Achieved 2nd rank in BreachCTF 2025 globally with InfosecIITR",
    timestamp: "2025",
  },
  {
    title: "1753CTF 2025",
    description: "Achieved 5th rank in 1753CTF 2025 globally with InfosecIITR",
    timestamp: "2025",
  },
  {
    title: "Winterhack 2024 CTF",
    description: "Secured 2nd place in Winterhack 2024 CTF organized by InfosecIITR",
    timestamp: "2024",
  },
  {
    title: "NoobCTF 2025",
    description: "Achieved 6th rank in NoobCTF 2025 organized by InfosecIITR",
    timestamp: "2025",
  },
  {
    title: "JEE Mains 2024",
    description: "Ranked AIR 9110 among 1.4M+ candidates nationwide",
    timestamp: "2024",
  },
];
