import { Podcast } from "../modules/podcasts/domain/Podcast";

import {
  Table,
  TableBody,
  TableData,
  TableHead,
  TableHeader,
  TableRow,
} from "./Table";

const PodcastsDataTable = ({ podcasts }: { podcasts: Podcast[] }) => {
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
        {podcasts.map((podcast) => (
          <TableRow key={podcast.id}>
            <TableData>{podcast.id}</TableData>
            <TableData>
              {podcast.title} - {podcast.author}
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
