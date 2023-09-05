import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { ROUTES } from "../constants/app.constants";

import { humanizeDiferenceDate } from "../utils/formatters";

import { Podcast } from "../modules/podcasts/domain/Podcast";

import {
  OrderByActionTypes,
  useOrderByContext,
} from "../context/OrderByContext";
import { useSearch } from "../context/SearchContext";
import {
  TrackActionTypes,
  useTrackContext,
  useTrackDispatch,
} from "../context/TrackContext";
import {
  WebPlayerActionTypes,
  useWebPlayerContext,
  useWebPlayerDispatch,
} from "../context/WebPlayerContext";

import { usePodcasts } from "../hooks/podcasts/usePodcasts";

import { filterTracks } from "../utils/filters";
import ButtonPlay from "./ButtonPlay";
import DataTable from "./DataTable";
import DataTableSkeleton from "./DataTableSkeleton";
import OrderBySelect from "./OrderBySelect";
import TrackDetail from "./TrackDetail";
import { Option } from "./ui/Select";

const headings = ["#", "Name", "Description", "Released"];
const headingSize = ["w-auto", "w-5/12", "w-6/12", "w-1/12"];

const PodcastsDataTable = ({
  podcasts,
}: {
  podcasts: Podcast[] | undefined;
}) => {
  const dispatch = useWebPlayerDispatch();
  const trackDispatcher = useTrackDispatch();
  const state = useWebPlayerContext();
  const { currentPodcastId, isPlaying } = useTrackContext();
  const search = useSearch();
  const { podcastsOrder } = useOrderByContext();

  const { getEpisodes } = usePodcasts();

  const [podcastLoading, setPodcastLoading] = useState("");

  const podcastIsPlaying = (podcast: Podcast) =>
    podcast.id === currentPodcastId && isPlaying;

  const podcastIsLoading = (podcast: Podcast) => {
    return podcastLoading === podcast.id;
  };

  const handlePlay = async (podcast: Podcast) => {
    if (podcastIsPlaying(podcast)) {
      dispatch({
        type: WebPlayerActionTypes.PAUSE,
      });
      trackDispatcher({
        type: TrackActionTypes.PAUSE,
      });
      return;
    }

    if (podcast.id === currentPodcastId && !isPlaying) {
      dispatch({
        type: WebPlayerActionTypes.PLAY,
      });
      trackDispatcher({
        type: TrackActionTypes.PLAY,
      });
      return;
    }

    setPodcastLoading(podcast.id);
    const episodes = await getEpisodes(podcast.id as string);
    setPodcastLoading("");

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
    trackDispatcher({
      type: TrackActionTypes.SET_CURRENT_PODCAST_ID,
      payload: {
        currentTrackId: 0,
        currentPodcastId: podcast.id,
      },
    });

    dispatch({
      type: WebPlayerActionTypes.SET_TRACK_INDEX,
      payload: {
        ...state,
        currentTrackIndex: 0,
      },
    });

    trackDispatcher({
      type: TrackActionTypes.PLAY,
    });
  };

  const dataTableRender = [
    {
      render: (podcast: Podcast) => {
        return (
          <ButtonPlay
            isLoading={podcastIsLoading(podcast)}
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
          <Link
            to={`${ROUTES.PODCAST}/${podcast.id}`}
            className="flex hover:bg-zinc-700 focus:bg-zinc-700 focus:outline-0 rounded-[15px]"
          >
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
  ];

  const MemoDataTable = useMemo(
    () => (
      <div className="flex gap-4 flex-col">
        <div className="flex align-center justify-end">
          <OrderBySelect
            orderByAction={OrderByActionTypes.SET_PODCASTS_ORDER}
            defaultValue={podcastsOrder}
          >
            <Option value="orderBy">Order by</Option>
            <Option value="releaseDate">Release Date</Option>
          </OrderBySelect>
        </div>
        <DataTable
          dataset={filterTracks(podcasts!, podcastsOrder)}
          options={{
            headings: {
              data: headings,
              sizes: headingSize,
            },
            dataRenders: dataTableRender,
          }}
        />
      </div>
    ),
    [podcasts, podcastsOrder, currentPodcastId, isPlaying]
  );

  if (!podcasts?.length && !search) return <DataTableSkeleton />;
  if (!podcasts?.length)
    return <div className="text-white">No results found</div>;

  return MemoDataTable;
};

export default PodcastsDataTable;
