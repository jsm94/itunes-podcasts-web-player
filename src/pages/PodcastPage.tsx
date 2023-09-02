import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Episode } from "../modules/podcasts/domain/Episode";
import { Podcast } from "../modules/podcasts/domain/Podcast";

import {
  WebPlayerActionTypes,
  useWebPlayerContext,
  useWebPlayerDispatch,
} from "../context/WebPlayerContext";
import { usePodcasts } from "../hooks/podcasts/usePodcasts";

import ButtonPlay from "../components/ButtonPlay";
import EpisodesDataTable from "../components/EpisodesDataTable";
import { Icon, IconSizes, Icons } from "../components/Icon";

const PodcastPage = () => {
  const param = useParams();
  const state = useWebPlayerContext();
  const { currentPodcastId, isPlaying } = state;
  const dispatch = useWebPlayerDispatch();

  const [podcast, setPodcast] = useState<Podcast>();
  const [episodes, setEpisodes] = useState<Episode[]>();
  const { getPodcasts, getEpisodes } = usePodcasts();

  const loadPodcastData = async () => {
    const podcasts = await getPodcasts();
    setPodcast(podcasts?.find((podcast) => podcast.id === param.id));
  };

  const loadEpisodesData = async () => {
    const e = await getEpisodes(podcast?.id as string);
    setEpisodes(e);
  };

  const podcastIsPlaying = (podcast?: Podcast) => {
    console.log(podcast?.id, currentPodcastId, isPlaying);
    return podcast?.id === currentPodcastId && isPlaying;
  };

  const handlePlay = () => {
    if (podcast?.id !== currentPodcastId) {
      console.log("entra");
      dispatch({
        type: WebPlayerActionTypes.SET_TRACKS,
        payload: {
          ...state,
          tracks: episodes!,
        },
      });
      dispatch({
        type: WebPlayerActionTypes.SET_TRACK_INDEX,
        payload: {
          ...state,
          currentTrackIndex: 0,
        },
      });
      dispatch({
        type: WebPlayerActionTypes.SET_CURRENT_PODCAST_ID,
        payload: {
          ...state,
          currentPodcastId: podcast?.id as string,
        },
      });
      dispatch({
        type: WebPlayerActionTypes.SET_CURRENT_PODCAST,
        payload: {
          ...state,
          podcast: podcast,
        },
      });
    }

    if (podcastIsPlaying(podcast!)) {
      dispatch({
        type: WebPlayerActionTypes.PAUSE,
      });
      return;
    }

    dispatch({
      type: WebPlayerActionTypes.PLAY,
    });
  };

  useEffect(() => {
    loadPodcastData();
  }, []);

  useEffect(() => {
    if (!podcast) return;
    loadEpisodesData();
  }, [podcast]);

  return (
    <div className="flex flex-col gap-10">
      <img height="280" src="/thumbnail.webp" alt={podcast?.title} />
      <div className="flex items-center justify-between">
        <ButtonPlay
          onClick={handlePlay}
          isPlaying={podcastIsPlaying(podcast)}
          size={IconSizes.LARGE}
        />
        <div className="flex items-center gap-2">
          <h1 className="text-white text-[32px] font-bold">{podcast?.title}</h1>
          <Icon icon={Icons.VERIFY} size={IconSizes.MEDIUM} />
        </div>
        <div></div>
      </div>
      <EpisodesDataTable podcast={podcast} episodes={episodes} />
    </div>
  );
};

export default PodcastPage;
