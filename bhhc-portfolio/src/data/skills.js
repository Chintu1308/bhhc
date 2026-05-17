export const skillCategories = [
  {
    id: "frontend",
    label: "Frontend",
    color: "#0dcfc0",
    skills: [
      { name: "React", context: "Used in EnergyMeter, Borderless Safety, IT Desk" },
      { name: "HTML/CSS", context: "Foundation of all UI work" },
      { name: "Figma", context: "UI design & prototyping" },
      { name: "Framer Motion", context: "Animations & micro-interactions" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    color: "#39d353",
    skills: [
      { name: "Spring Boot", context: "Used in IT Service Desk @ JK Paper" },
      { name: "REST APIs", context: "All backend services & integrations" },
      { name: "RBAC/Auth", context: "Role-based access control in IT Desk" },
    ],
  },
  {
    id: "devops",
    label: "DevOps/Cloud",
    color: "#00ff88",
    skills: [
      { name: "Git", context: "Version control across all projects" },
      { name: "GitHub", context: "Open source & collaboration" },
      { name: "AWS", context: "Cloud deployment & services" },
      { name: "MongoDB", context: "NoSQL DB in EnergyMeter" },
      { name: "MySQL", context: "Relational DB in enterprise apps" },
    ],
  },
  {
    id: "iot",
    label: "IoT/Hardware",
    color: "#f59e0b",
    skills: [
      { name: "MQTT", context: "Real-time messaging in EnergyMeter" },
      { name: "WebSocket", context: "Live telemetry streams" },
      { name: "Supabase", context: "Backend-as-a-service for EnergyMeter" },
      { name: "Time-Series DB", context: "Historical energy analytics" },
    ],
  },
  {
    id: "languages",
    label: "Languages",
    color: "#818cf8",
    skills: [
      { name: "JavaScript", context: "Primary frontend & scripting language" },
      { name: "Java", context: "Spring Boot & enterprise backend" },
      { name: "Python", context: "IoT scripts & ML experiments" },
      { name: "C/C++", context: "Low-level systems & competitive programming" },
    ],
  },
];
