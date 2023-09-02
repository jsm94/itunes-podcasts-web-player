import { Link } from "react-router-dom";

import { ROUTES } from "../constants/app.constants";

import { Podcast } from "../modules/podcasts/domain/Podcast";

import {
  WebPlayerActionTypes,
  useWebPlayerContext,
  useWebPlayerDispatch,
} from "../context/WebPlayerContext";

import { usePodcasts } from "../hooks/podcasts/usePodcasts";

import { useMemo } from "react";
import DataTable from "./DataTable";
import { Icon, Icons } from "./Icon";

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
        currentPodcastId: podcast.id,
      },
    });
  };

  const dataTableRender = useMemo(
    () => [
      {
        render: (podcast: Podcast) => {
          return (
            <button
              onClick={() => handlePlay(podcast)}
              aria-label={`${
                podcastIsPlaying(podcast) ? "pause" : "play"
              } playlist`}
            >
              {podcastIsPlaying(podcast) ? (
                <Icon icon={Icons.PAUSE} />
              ) : (
                <Icon icon={Icons.PLAY} />
              )}
            </button>
          );
        },
      },
      {
        render: (podcast: Podcast) => {
          return (
            <Link to={`${ROUTES.PODCAST}/${podcast.id}`}>
              <div className="flex gap-5 items-center">
                <img
                  width="45"
                  height="45"
                  className="rounded-lg max-h-[45px]"
                  loading="lazy"
                  src={podcast.image}
                  alt={podcast.title}
                />
                <div className="flex flex-col">
                  <span className="text-white text-base font-medium">
                    {podcast.title}
                  </span>
                  <span className="text-white text-opacity-30 text-sm font-medium">
                    {podcast.author}
                  </span>
                </div>
              </div>
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
        render: () => {
          return <span>an hour ago</span>;
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
