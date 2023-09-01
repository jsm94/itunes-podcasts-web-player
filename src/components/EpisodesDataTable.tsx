import { Episode } from "../modules/podcasts/domain/Episode";

import { msToDuration } from "../utils/formatters";

import {
  Table,
  TableBody,
  TableData,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/Table";

const EpisodesDataTable = ({
  episodes,
}: {
  episodes: Episode[] | undefined;
}) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeader>#</TableHeader>
          <TableHeader>Title</TableHeader>
          <TableHeader>Topic</TableHeader>
          <TableHeader>Released</TableHeader>
          <TableHeader>⏱</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {episodes?.map((episode) => (
          <TableRow key={episode.id}>
            <TableData>{episode.id}</TableData>
            <TableData>{episode.title}</TableData>
            <TableData>{episode.description}</TableData>
            <TableData>
              {new Date(episode.releaseDate).toLocaleDateString()}
            </TableData>
            <TableData>{msToDuration(episode.duration)}</TableData>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default EpisodesDataTable;
