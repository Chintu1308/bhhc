// City Mode — District config, camera waypoints, metadata
export const DISTRICTS = [
  {
    id: 0,
    name: 'RK Beach Promenade',
    tag: 'Hero · Landing',
    icon: '🏖️',
    color: '#0dcfc0',
    cameraPos: [-18, 10, 22],
    cameraTarget: [0, 0, 0],
    worldPos: [0, 0, 0],
    description: 'The iconic seafront. Where it all begins.',
  },
  {
    id: 1,
    name: 'Tech HQ Tower',
    tag: 'About · Bio',
    icon: '🏢',
    color: '#39d353',
    cameraPos: [18, 14, 18],
    cameraTarget: [12, 4, 0],
    worldPos: [12, 0, 0],
    description: 'The command center. Who is BHHC?',
  },
  {
    id: 2,
    name: 'Project District',
    tag: 'Projects · Builds',
    icon: '🏗️',
    color: '#f59e0b',
    cameraPos: [-8, 12, 28],
    cameraTarget: [0, 2, 8],
    worldPos: [0, 0, 8],
    description: 'Where ideas become infrastructure.',
  },
  {
    id: 3,
    name: 'GVP Campus',
    tag: 'Education · Experience',
    icon: '🎓',
    color: '#818cf8',
    cameraPos: [28, 10, 12],
    cameraTarget: [18, 0, 8],
    worldPos: [18, 0, 8],
    description: 'The training grounds. Knowledge forged here.',
  },
  {
    id: 4,
    name: 'Skill Forge',
    tag: 'Skills · Tech Stack',
    icon: '⚡',
    color: '#a3e635',
    cameraPos: [2, 18, -12],
    cameraTarget: [0, 3, -18],
    worldPos: [0, 0, -18],
    description: 'The reactor core. Every tool mastered.',
  },
  {
    id: 5,
    name: 'Hackathon Arena',
    tag: 'Achievements · Patent',
    icon: '🏆',
    color: '#f0c040',
    cameraPos: [-18, 12, -8],
    cameraTarget: [-12, 2, -12],
    worldPos: [-12, 0, -12],
    description: 'The battleground. Trophies won.',
  },
  {
    id: 6,
    name: 'Comm Tower',
    tag: 'Contact · Blog',
    icon: '📡',
    color: '#ef4444',
    cameraPos: [8, 22, -22],
    cameraTarget: [0, 8, -24],
    worldPos: [0, 0, -24],
    description: 'The signal. Reach out.',
  },
];

// Mini-map SVG positions (normalized 0-100)
export const MINIMAP_POSITIONS = [
  { x: 20, y: 15 },  // RK Beach
  { x: 65, y: 15 },  // Tech HQ
  { x: 45, y: 35 },  // Projects
  { x: 80, y: 40 },  // GVP Campus
  { x: 45, y: 58 },  // Skill Forge
  { x: 25, y: 72 },  // Arena
  { x: 55, y: 88 },  // Comm Tower
];
