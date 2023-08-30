import { Link } from "react-router-dom";
import { Podcast } from "../modules/podcasts/domain/Podcast";

import { ROUTES } from "../constants/app.constants";
import {
  Table,
  TableBody,
  TableData,
  TableHead,
  TableHeader,
  TableRow,
} from "./Table";

const PodcastsDataTable = ({
  podcasts,
}: {
  podcasts: Podcast[] | undefined;
}) => {
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
            <TableData>{podcast.id}</TableData>
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
