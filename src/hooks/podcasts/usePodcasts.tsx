import { useEffect, useRef } from "react";

import { PodcastService } from "../../modules/podcasts/application/PodcastService";
import { Episode } from "../../modules/podcasts/domain/Episode";
import { Podcast } from "../../modules/podcasts/domain/Podcast";
import { ApiPodcastService } from "../../modules/podcasts/infra/ApiPodcastService";

import { useLocalStorage } from "../localStorage/useLocalStorage";

const KEY_PODCASTS = "podcasts";
const KEY_EPISODES = "episodes";
const NUMBER_OF_PODCASTS = 100;

type Element = Podcast[] | Episode[];

export const usePodcasts = () => {
  const { setItem, getItem } = useLocalStorage<
    Element | Map<string, Episode[]>
  >();

  const abortController = useRef(new AbortController());

  useEffect(() => {
    abortController.current = new AbortController();

    return () => {
      abortController.current.abort();
    };
  }, []);

  const getPodcasts = async () => {
    const cachedPodcasts = getItem(KEY_PODCASTS) as Podcast[];
    if (cachedPodcasts?.length) {
      return cachedPodcasts;
    }
    const podcastApi = new PodcastService(
      new ApiPodcastService(abortController.current)
    );

    try {
      const response = await podcastApi.getMostPopularPodcasts(
        NUMBER_OF_PODCASTS
      );
      setItem(KEY_PODCASTS, response);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const getEpisodes = async (podcastId: string) => {
    const cachedEpisodes = new Map<string, Episode[]>(
      getItem(KEY_EPISODES) as Map<string, Episode[]>
    );

    if (cachedEpisodes?.has(podcastId)) {
      return cachedEpisodes.get(podcastId);
    }

    const podcastApi = new PodcastService(
      new ApiPodcastService(abortController.current)
    );

    try {
      const response = await podcastApi.getEpisodesByPodcastId(podcastId);
      cachedEpisodes?.set(podcastId, response);
      setItem(KEY_EPISODES, cachedEpisodes);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getPodcasts,
    getEpisodes,
  };
};
