import { useMemo } from "react";
import { Link } from "react-router-dom";

import { ROUTES } from "../constants/app.constants";

import { humanizeDiferenceDate } from "../utils/formatters";

import { Podcast } from "../modules/podcasts/domain/Podcast";

import {
  WebPlayerActionTypes,
  useWebPlayerContext,
  useWebPlayerDispatch,
} from "../context/WebPlayerContext";

import { usePodcasts } from "../hooks/podcasts/usePodcasts";

import ButtonPlay from "./ButtonPlay";
import DataTable from "./DataTable";
import TrackDetail from "./TrackDetail";

const headings = ["#", "Name", "Description", "Released"];
const headingSize = ["w-auto", "w-5/12", "w-6/12", "w-1/12"];

const PodcastsDataTable = ({
  podcasts,
}: {
  podcasts: Podcast[] | undefined;
}) => {
  const dispatch = useWebPlayerDispatch();
  const state = useWebPlayerContext();
  const { getEpisodes } = usePodcasts();

  const { currentPodcastId, isPlaying } = state;

  const podcastIsPlaying = (podcast: Podcast) => {
    return podcast.id === currentPodcastId && isPlaying;
  };

  const handlePlay = async (podcast: Podcast) => {
    if (podcastIsPlaying(podcast)) {
      dispatch({
        type: WebPlayerActionTypes.PAUSE,
      });
      return;
    }

    if (podcast.id === currentPodcastId && !isPlaying) {
      dispatch({
        type: WebPlayerActionTypes.PLAY,
      });
      return;
    }

    const episodes = await getEpisodes(podcast.id as string);

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
        podcast: podcast,
      },
    });

    dispatch({
      type: WebPlayerActionTypes.SET_CURRENT_PODCAST_ID,
      payload: {
        ...state,
        currentPodcastId: podcast.id,
      },
    });
  };

  const dataTableRender = useMemo(
    () => [
      {
        render: (podcast: Podcast) => {
          return (
            <ButtonPlay
              onClick={() => handlePlay(podcast)}
              isPlaying={podcastIsPlaying(podcast)}
              aria-label={`${
                podcastIsPlaying(podcast) ? "pause" : "play"
              } podcast ${podcast.id}`}
            />
          );
        },
      },
      {
        render: (podcast: Podcast) => {
          return (
            <Link to={`${ROUTES.PODCAST}/${podcast.id}`}>
              <TrackDetail
                image={podcast.image}
                title={podcast.title}
                author={podcast.author}
              />
            </Link>
          );
        },
      },
      {
        render: (podcast: Podcast) => {
          return <span className="line-clamp-2">{podcast.description}</span>;
        },
      },
      {
        render: (podcast: Podcast) => {
          return <span>{humanizeDiferenceDate(podcast.releaseDate)}</span>;
        },
      },
    ],
    [podcastIsPlaying]
  );

  if (!podcasts) return null;

  return (
    <DataTable
      dataset={podcasts}
      options={{
        headings: {
          data: headings,
          sizes: headingSize,
        },
        dataRenders: dataTableRender,
      }}
    />
  );
};

export default PodcastsDataTable;
