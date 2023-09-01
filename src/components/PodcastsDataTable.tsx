import { Link } from "react-router-dom";

import { Podcast } from "../modules/podcasts/domain/Podcast";

import {
  WebPlayerActionTypes,
  useWebPlayerContext,
  useWebPlayerDispatch,
} from "../context/WebPlayerContext";

import { ROUTES } from "../constants/app.constants";
import {
  Table,
  TableBody,
  TableData,
  TableHead,
  TableHeader,
  TableRow,
} from "./Table";

import { usePodcasts } from "../hooks/podcasts/usePodcasts";

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
          <TableHeader>#</TableHeader>
          <TableHeader>Name</TableHeader>
          <TableHeader>Description</TableHeader>
          <TableHeader>Released</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {podcasts?.map((podcast) => (
          <TableRow key={podcast.id}>
            <TableData>
              <button
                onClick={() => handlePlay(podcast)}
                aria-label={`${
                  podcastIsPlaying(podcast) ? "pause" : "play"
                } playlist`}
              >
                {podcastIsPlaying(podcast) ? "pause" : "play"}
              </button>
              {podcast.id}
            </TableData>
            <TableData>
              <Link to={`${ROUTES.PODCAST}/${podcast.id}`}>
                {podcast.title} - {podcast.author}
              </Link>
            </TableData>
            <TableData>{podcast.description}</TableData>
            <TableData>an hour ago</TableData>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PodcastsDataTable;
