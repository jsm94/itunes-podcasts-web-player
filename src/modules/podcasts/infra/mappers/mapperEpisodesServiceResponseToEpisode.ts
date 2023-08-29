import { Episode } from "../../domain/Episode";
import { ApiEpisodesServiceResponse } from "../types/ApiEpisodesServiceResponse";

export const mapperEpisodesServiceResponseToEpisode = (
  podcastServiceResponse: ApiEpisodesServiceResponse,
): Episode[] => {
  return podcastServiceResponse.results
    .filter((result) => result.wrapperType === "podcastEpisode")
    .map((episode) => ({
      id: episode.trackId,
      title: episode.trackName,
      description: episode.description,
      audio: episode.previewUrl,
      releaseDate: new Date(episode.releaseDate),
      duration: episode.trackTimeMillis,
    }));
};
