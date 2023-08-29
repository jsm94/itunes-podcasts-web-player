import { Podcast } from "../../domain/Podcast";
import { ApiPodcastServiceResponse } from "../types/ApiPodcastServiceResponse";

export const mapperPodcastServiceResponseToPodcast = (
  podcastServiceResponse: ApiPodcastServiceResponse,
): Podcast[] => {
  return podcastServiceResponse.feed.entry.map((entry) => ({
    id: entry.id.attributes["im:id"],
    title: entry["im:name"].label,
    author: entry["im:artist"].label,
    description: entry.summary.label,
    image: entry["im:image"][2].label,
    episodes: [],
  }));
};
