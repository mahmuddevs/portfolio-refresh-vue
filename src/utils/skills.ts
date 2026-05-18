import htmlIcon from '../assets/icons/html.png';
import cssIcon from '../assets/icons/css.png';
import sassIcon from '../assets/icons/sass.png';
import bootstrapIcon from '../assets/icons/bootstrap.png';
import tailwindIcon from '../assets/icons/tailwind.png';
import javascriptIcon from '../assets/icons/javascript.png';
import typescriptIcon from '../assets/icons/typescript.png';
import reactIcon from '../assets/icons/react.png';
import reduxIcon from '../assets/icons/redux.png';
import nextjsIcon from '../assets/icons/nextjs.png';
import vueIcon from '../assets/icons/vue.png';
import nodeIcon from '../assets/icons/node.png';
import expressIcon from '../assets/icons/express.png';
import mongodbIcon from '../assets/icons/mongodb.png';
import mysqlIcon from '../assets/icons/mysql.png';
import postgresqlIcon from '../assets/icons/postgresql.png';
import gitIcon from '../assets/icons/git.png';
import dockerIcon from '../assets/icons/docker.png';

interface Skill {
  name: string;
  icon: string;
}

const skills: Skill[] = [
  {
    name: "HTML",
    icon: htmlIcon,
  },
  {
    name: "CSS",
    icon: cssIcon,
  },
  {
    name: "Sass",
    icon: sassIcon,
  },
  {
    name: "Bootstrap",
    icon: bootstrapIcon,
  },
  {
    name: "Tailwind CSS",
    icon: tailwindIcon,
  },
  {
    name: "JavaScript",
    icon: javascriptIcon,
  },
  {
    name: "TypeScript",
    icon: typescriptIcon,
  },
  {
    name: "React",
    icon: reactIcon,
  },
  {
    name: "Redux",
    icon: reduxIcon,
  },
  {
    name: "Next.js",
    icon: nextjsIcon,
  },
  {
    name: "Vue.js",
    icon: vueIcon,
  },
  {
    name: "Node.js",
    icon: nodeIcon,
  },
  {
    name: "Express",
    icon: expressIcon,
  },
  {
    name: "MongoDB",
    icon: mongodbIcon,
  },
  {
    name: "MySQL",
    icon: mysqlIcon,
  },
  {
    name: "PostgreSQL",
    icon: postgresqlIcon,
  },
  {
    name: "Git",
    icon: gitIcon,
  },
  {
    name: "Docker",
    icon: dockerIcon,
  },
];

export default skills;
