import { useMemo } from "react";
import { Episode } from "../modules/podcasts/domain/Episode";

import {
  WebPlayerActionTypes,
  useWebPlayerContext,
  useWebPlayerDispatch,
} from "../context/WebPlayerContext";
import { Podcast } from "../modules/podcasts/domain/Podcast";
import { msToDuration } from "../utils/formatters";
import ButtonPlay from "./ButtonPlay";
import DataTable from "./DataTable";
import TrackDetail from "./TrackDetail";

type EpisodesDataTableProps = {
  podcast: Podcast | undefined;
  episodes: Episode[] | undefined;
};

const headings = {
  data: ["#", "Title", "Topic", "Released", "⏱"],
  sizes: ["w-auto", "w-5/12", "w-6/12", "w-1/12", "w-2/12"],
};

const EpisodesDataTable = ({ podcast, episodes }: EpisodesDataTableProps) => {
  const state = useWebPlayerContext();
  const dispatch = useWebPlayerDispatch();

  const { currentPodcastId, currentTrackId, isPlaying } = state;

  const trackIsPlaying = (episode: Episode) => {
    return episode.id === currentTrackId && isPlaying;
  };

  const handlePlay = (episode: Episode) => {
    if (podcast?.id !== currentPodcastId) {
      dispatch({
        type: WebPlayerActionTypes.SET_TRACKS,
        payload: {
          ...state,
          tracks: episodes!,
        },
      });

      dispatch({
        type: WebPlayerActionTypes.SET_CURRENT_PODCAST,
        payload: {
          ...state,
          currentPodcastId: podcast?.id as string,
        },
      });
    }

    if (trackIsPlaying(episode)) {
      dispatch({
        type: WebPlayerActionTypes.PAUSE,
      });
      return;
    }

    if (episode.id === currentTrackId && !isPlaying) {
      dispatch({
        type: WebPlayerActionTypes.PLAY,
      });
      return;
    }

    dispatch({
      type: WebPlayerActionTypes.SET_CURRENT_TRACK,
      payload: {
        ...state,
        currentTrackId: episode.id,
      },
    });
  };

  const dataRenders = useMemo(
    () => [
      {
        render: (episode: Episode) => {
          return (
            <ButtonPlay
              onClick={() => handlePlay(episode)}
              isPlaying={trackIsPlaying(episode)}
            />
          );
        },
      },
      {
        render: (episode: Episode) => {
          return (
            <TrackDetail
              image={podcast!.image}
              title={episode.title}
              author={podcast!.author}
            />
          );
        },
      },
      {
        render: (episode: Episode) => {
          return <span className="line-clamp-2">{episode.description}</span>;
        },
      },
      {
        render: (episode: Episode) => {
          return new Date(episode.releaseDate).toLocaleDateString();
        },
      },
      {
        render: (episode: Episode) => {
          return msToDuration(episode.duration);
        },
      },
    ],
    [podcast, trackIsPlaying]
  );

  if (!episodes) return null;

  return (
    <DataTable
      className="w-full"
      dataset={episodes}
      options={{ headings, dataRenders }}
    />
  );
};

export default EpisodesDataTable;
