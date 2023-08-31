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

  const handlePlay = async (podcast: Podcast) => {
    const episodes = await getEpisodes(podcast.id as string);

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
              <button onClick={() => handlePlay(podcast)}>play</button>
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
