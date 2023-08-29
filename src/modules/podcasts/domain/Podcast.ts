import { Episode } from "./Episode";

export interface Podcast {
  id: string;
  title: string;
  author: string;
  description: string;
  image: string;
  episodes: Episode[];
}
