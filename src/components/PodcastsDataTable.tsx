import { Link } from "react-router-dom";

import { ROUTES } from "../constants/app.constants";

import { Podcast } from "../modules/podcasts/domain/Podcast";

import {
  WebPlayerActionTypes,
  useWebPlayerContext,
  useWebPlayerDispatch,
} from "../context/WebPlayerContext";

import { usePodcasts } from "../hooks/podcasts/usePodcasts";

import { cn } from "../utils/helpers";

import {
  Table,
  TableBody,
  TableData,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/Table";

import { useMemo } from "react";
import { Icon, Icons } from "./Icon";

const headings = ["#", "Name", "Description", "Released"];
const headingSize = ["w-auto", "w-5/12", "w-6/12", "w-1/12"];

const PodcastsDataTable = ({
  podcasts,
}: {
  podcasts: Podcast[] | undefined;
}) => {
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
              <div className="flex gap-5">
                <img
                  width="45"
                  height="45"
                  className="rounded-lg"
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
    []
  );

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
      type: WebPlayerActionTypes.SET_CURRENT_PODCAST,
      payload: {
        ...state,
        currentPodcastId: podcast.id,
      },
    });

    dispatch({
      type: WebPlayerActionTypes.SET_TRACKS,
      payload: {
        ...state,
        tracks: episodes!,
      },
    });
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          {headings.map((heading, i) => (
            <TableHeader
              className={cn([
                headingSize[i],
                "text-white pb-6 border-b border-white border-opacity-5 text-opacity-30 text-sm font-semibold text-left",
              ])}
              key={heading}
            >
              {heading}
            </TableHeader>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {podcasts?.map((podcast) => (
          <TableRow
            className="border-b border-white border-opacity-5"
            key={podcast.id}
          >
            {dataTableRender.map((data, i) => (
              <TableData
                className={cn([
                  i === 0 ? "align-middle" : "align-top",
                  "py-3.5 pr-8 text-white text-opacity-30 text-base font-medium",
                ])}
                key={`table-data-${i}`}
              >
                {data.render(podcast)}
              </TableData>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PodcastsDataTable;
