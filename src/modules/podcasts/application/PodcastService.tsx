import { Episode } from "../domain/Episode";
import { Podcast } from "../domain/Podcast";
import { PodcastRepository } from "../domain/PodcastRepository";

export class PodcastService {
  constructor(private readonly repository: PodcastRepository) {}

  getMostPopularPodcasts(limit: number): Promise<Podcast[]> {
    return this.repository.getMostPopular(limit);
  }

  getEpisodesByPodcastId(id: string): Promise<Episode[]> {
    return this.repository.getEpisodes(id);
  }
}
