import { Episode } from "../modules/podcasts/domain/Episode";
import { Podcast } from "../modules/podcasts/domain/Podcast";

import { Orders } from "../context/OrderByContext";

const isEpisode = (element: Podcast | Episode): element is Episode => {
  return (element as Episode).duration !== undefined;
};

export const filterTracks = (
  elements: Podcast[] | Episode[],
  order: Orders
) => {
  return [...elements].sort((a, b) => {
    if (order === Orders.DEFAULT) {
      return 0;
    }

    if (order === Orders.RELEASE_DATE) {
      return (
        new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
      );
    }

    if (order === Orders.DURATION && isEpisode(a) && isEpisode(b)) {
      return b.duration! - a.duration!;
    }

    return 0;
  });
};
