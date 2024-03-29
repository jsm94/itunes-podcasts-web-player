import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Episode } from "../modules/podcasts/domain/Episode";
import { Podcast } from "../modules/podcasts/domain/Podcast";

import {
  OrderByActionTypes,
  useOrderByContext,
} from "../context/OrderByContext";
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

import ButtonPlay from "../components/ButtonPlay";
import DataTableSkeleton from "../components/DataTableSkeleton";
import EpisodesDataTable from "../components/EpisodesDataTable";
import { Icon, IconSizes, Icons } from "../components/Icon";
import OrderBySelect from "../components/OrderBySelect";
import { Option } from "../components/ui/Select";
import { ROUTES } from "../constants/app.constants";

const PodcastPage = () => {
  const param = useParams();
  const navigate = useNavigate();
  const state = useWebPlayerContext();
  const { currentPodcastId, isPlaying } = useTrackContext();
  const dispatch = useWebPlayerDispatch();
  const trackDispatcher = useTrackDispatch();
  const { episodesOrder } = useOrderByContext();

  const [podcast, setPodcast] = useState<Podcast>();
  const [episodes, setEpisodes] = useState<Episode[]>();
  const { getPodcasts, getEpisodes } = usePodcasts();

  const loadPodcastData = async () => {
    const podcasts = await getPodcasts();
    const podcastFinded = podcasts?.find((podcast) => podcast.id === param.id);
    if (!podcastFinded) navigate(ROUTES.NOT_FOUND);
    setPodcast(podcasts?.find((podcast) => podcast.id === param.id));
  };

  const loadEpisodesData = async () => {
    const e = await getEpisodes(podcast?.id as string);
    setEpisodes(e);
  };

  const podcastIsPlaying = (podcast?: Podcast) => {
    return podcast?.id === currentPodcastId && isPlaying;
  };

  const handlePlay = () => {
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
          currentPodcastId: podcast?.id as string,
          currentTrackId: 0,
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
        type: WebPlayerActionTypes.SET_TRACK_INDEX,
        payload: {
          ...state,
          currentTrackIndex: 0,
        },
      });
    }

    if (podcastIsPlaying(podcast!)) {
      trackDispatcher({
        type: TrackActionTypes.PAUSE,
      });
      return;
    }

    trackDispatcher({
      type: TrackActionTypes.PLAY,
    });
  };

  useEffect(() => {
    loadPodcastData();
    window.scrollTo(0, 0);
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
          disabled={!episodes?.length}
          onClick={handlePlay}
          isPlaying={podcastIsPlaying(podcast)}
          size={IconSizes.LARGE}
        />
        <div className="flex items-center gap-2">
          <h1 className="m-w-[480px] text-white text-[32px] font-bold">
            {podcast?.title}
          </h1>
          <Icon icon={Icons.VERIFY} size={IconSizes.MEDIUM} />
        </div>
        <OrderBySelect
          orderByAction={OrderByActionTypes.SET_EPISODES_ORDER}
          defaultValue={episodesOrder}
        >
          <Option value="orderBy">Order by</Option>
          <Option value="duration">Duration</Option>
        </OrderBySelect>
      </div>
      {!episodes?.length && <DataTableSkeleton />}
      {episodes?.length && (
        <EpisodesDataTable podcast={podcast} episodes={episodes} />
      )}
    </div>
  );
};

export default PodcastPage;
