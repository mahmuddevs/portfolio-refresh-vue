import devflowImg from '../assets/projects/devflow.png';
import fintrendImg from '../assets/projects/fintrend.png';
import taskifyImg from '../assets/projects/taskify.png';

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
}

const projects: Project[] = [
  {
    id: "devflow",
    slug: "devflow",
    title: "DevFlow - Developer Q&A Platform",
    description: "A premium software development Q&A platform featuring rich text editing, AI-powered answer summaries, customizable profile dashboards, and detailed search filtering.",
    image: devflowImg,
    tags: ["Next.js", "React", "MongoDB", "Tailwind CSS", "Clerk"],
    githubUrl: "https://github.com/mahmuddevs/devflow",
    liveUrl: "https://devflow-showcase.vercel.app",
    featured: true
  },
  {
    id: "fintrend",
    slug: "fintrend",
    title: "FinTrend - Fintech Dashboard",
    description: "A high-performance financial analytics dashboard displaying live stock indices and cryptocurrency trends with interactive, responsive gradient charting.",
    image: fintrendImg,
    tags: ["Vue.js", "Vite", "Pinia", "Chart.js", "Tailwind CSS"],
    githubUrl: "https://github.com/mahmuddevs/fintrend",
    liveUrl: "https://fintrend-showcase.vercel.app",
    featured: true
  },
  {
    id: "taskify",
    slug: "taskify",
    title: "Taskify - Collaborative Kanban Board",
    description: "An elegant, highly interactive team collaboration workspace featuring drag-and-drop task boards, workspace switching, activity logs, and real-time status updates.",
    image: taskifyImg,
    tags: ["React", "Redux Toolkit", "Express", "Node.js", "PostgreSQL"],
    githubUrl: "https://github.com/mahmuddevs/taskify",
    liveUrl: "https://taskify-showcase.vercel.app",
    featured: true
  }
];

export default projects;
