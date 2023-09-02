import { useMemo } from "react";
import { Episode } from "../modules/podcasts/domain/Episode";

import { msToDuration } from "../utils/formatters";
import DataTable from "./DataTable";

const headings = {
  data: ["#", "Title", "Topic", "Released", "⏱"],
  sizes: ["w-12", "w-2/6", "w-2/6", "w-2/6", "w-2/6"],
};

const EpisodesDataTable = ({
  episodes,
}: {
  episodes: Episode[] | undefined;
}) => {
  const dataRenders = useMemo(
    () => [
      {
        render: (episode: Episode) => {
          return episode.id;
        },
      },
      {
        render: (episode: Episode) => {
          return episode.title;
        },
      },
      {
        render: (episode: Episode) => {
          return <span className="line-clamp-2">{episode.description}</span>;
        },
      },
      {
        render: (episode: Episode) => {
          return new Date(episode.releaseDate).toLocaleDateString();
        },
      },
      {
        render: (episode: Episode) => {
          return msToDuration(episode.duration);
        },
      },
    ],
    []
  );

  if (!episodes) return null;

  return (
    <DataTable
      className="w-full"
      dataset={episodes}
      options={{ headings, dataRenders }}
    />
  );
};

export default EpisodesDataTable;
