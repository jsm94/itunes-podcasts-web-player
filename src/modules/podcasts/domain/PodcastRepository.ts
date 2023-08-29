import { Episode } from "./Episode";
import { Podcast } from "./Podcast";

export interface PodcastRepository {
  getMostPopular(limit: number): Promise<Podcast[]>;
  getEpisodes(id: string): Promise<Episode[]>;
}
