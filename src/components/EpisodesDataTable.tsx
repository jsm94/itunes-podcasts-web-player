import { useMemo } from "react";

import { Episode } from "../modules/podcasts/domain/Episode";

import { Podcast } from "../modules/podcasts/domain/Podcast";

import { filterTracks } from "../utils/filters";
import {
  humanizeDiferenceDate,
  msToDuration,
  parseLongUrl,
} from "../utils/formatters";

import {
  WebPlayerActionTypes,
  useWebPlayerContext,
  useWebPlayerDispatch,
} from "../context/WebPlayerContext";

import { useOrderByContext } from "../context/OrderByContext";

import {
  TrackActionTypes,
  useTrackContext,
  useTrackDispatch,
} from "../context/TrackContext";
import ButtonPlay from "./ButtonPlay";
import DataTable from "./DataTable";
import { Icon, Icons } from "./Icon";
import TrackDetail from "./TrackDetail";

type EpisodesDataTableProps = {
  podcast: Podcast | undefined;
  episodes: Episode[] | undefined;
};

const headings = {
  data: [
    "#",
    "Title",
    "Topic",
    "Released",
    <div className="pl-4 pt-1">
      <Icon icon={Icons.CLOCK} />
    </div>,
  ],
  sizes: ["w-auto", "w-5/12", "w-6/12", "w-1/12", "w-2/12"],
};

const EpisodesDataTable = ({ podcast, episodes }: EpisodesDataTableProps) => {
  const state = useWebPlayerContext();
  const { currentPodcastId, currentTrackId, isPlaying } = useTrackContext();
  const dispatch = useWebPlayerDispatch();
  const trackDispatcher = useTrackDispatch();
  const { episodesOrder } = useOrderByContext();

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

      trackDispatcher({
        type: TrackActionTypes.SET_CURRENT_PODCAST_ID,
        payload: {
          currentTrackId: episode.id,
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

    if (trackIsPlaying(episode)) {
      trackDispatcher({
        type: TrackActionTypes.PAUSE,
      });
      return;
    }

    if (episode.id === currentTrackId && !isPlaying) {
      trackDispatcher({
        type: TrackActionTypes.PLAY,
      });
      return;
    }

    trackDispatcher({
      type: TrackActionTypes.SET_CURRENT_TRACK_ID,
      payload: {
        currentPodcastId: podcast?.id as string,
        currentTrackId: episode.id,
      },
    });
  };

  const dataRenders = [
    {
      render: (episode: Episode) => {
        return (
          <ButtonPlay
            onClick={() => handlePlay(episode)}
            isPlaying={trackIsPlaying(episode)}
            aria-label={`${
              trackIsPlaying(episode) ? "pause" : "play"
            } episode ${episode?.id}
              `}
          />
        );
      },
    },
    {
      render: (episode: Episode) => {
        return (
          <TrackDetail
            image={episode?.image ?? podcast!.image}
            title={episode.title}
            author={podcast!.author}
          />
        );
      },
    },
    {
      render: (episode: Episode) => {
        return (
          <span className="line-clamp-2">
            {parseLongUrl(episode.description)}
          </span>
        );
      },
    },
    {
      render: (episode: Episode) => {
        return humanizeDiferenceDate(episode.releaseDate);
      },
    },
    {
      render: (episode: Episode) => {
        return msToDuration(episode.duration);
      },
    },
  ];

  const MemoDataTable = useMemo(
    () => (
      <DataTable
        className="w-full"
        dataset={filterTracks(episodes!, episodesOrder)}
        options={{ headings, dataRenders }}
      />
    ),
    [episodes, episodesOrder, currentTrackId, isPlaying]
  );

  if (!episodes) return null;

  return MemoDataTable;
};

export default EpisodesDataTable;
