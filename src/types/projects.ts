export interface Project {
  id?: string;
  _id?: string;
  slug: string;
  title: string;
  description: string;
  image?: string;
  images: string[];
  tags: string[];
  githubFrontendUrl?: string;
  githubBackendUrl?: string;
  liveUrl: string;
  featured: boolean;
}