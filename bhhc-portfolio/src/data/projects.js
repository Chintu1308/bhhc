export const projects = [
  {
    id: 1,
    title: "Borderless Safety",
    subtitle: "International Travel Intelligence Platform",
    description:
      "A platform enabling travelers to stay legally informed, culturally aware, and practically prepared across borders. Features country comparison, real-time advisories, emergency contacts, and live currency exchange APIs.",
    tags: ["React", "API Integration", "Currency Exchange", "Travel Tech", "Legal Data"],
    github: "https://github.com/Chintu1308/borderless-safety",
    live: "https://bs.bhhc.me/",
    color: "#0dcfc0",
  },
  {
    id: 2,
    title: "EnergyMeter",
    subtitle: "Enterprise Energy Management Platform",
    description:
      "End-to-end IoT platform for real-time power consumption tracking, remote device control, and hardware management. Features live telemetry dashboards, historical analytics, and relay switches.",
    tags: ["IoT", "MQTT", "WebSocket", "MongoDB", "Supabase", "Python", "React", "Time-Series"],
    github: null,
    live: "https://em.skjal.com/",
    color: "#39d353",
  },
  {
    id: 3,
    title: "IT Service Desk",
    subtitle: "Enterprise Internal Ticketing System (JK Paper Ltd.)",
    description:
      "Enterprise internal IT ticketing system with role-based workflows, RESTful APIs, and a full-stack architecture built during summer internship at JK Paper Ltd.",
    tags: ["React", "Spring Boot", "MS SQL", "RBAC", "Enterprise", "REST API"],
    github: null,
    live: null,
    color: "#00ff88",
    internship: true,
  },
];

export const pipeline = [
  { branch: "feature/ai-safety-monitor",  status: "IN PROGRESS", color: "#f59e0b" },
  { branch: "feature/devsecops-toolkit",  status: "PLANNING",    color: "#818cf8" },
  { branch: "feature/aquatic-ai-system",  status: "PATENT FILED", color: "#0dcfc0" },
];
