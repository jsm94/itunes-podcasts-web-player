import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Episode } from "../modules/podcasts/domain/Episode";
import { Podcast } from "../modules/podcasts/domain/Podcast";

import EpisodesDataTable from "../components/EpisodesDataTable";
import { usePodcasts } from "../hooks/podcasts/usePodcasts";

const PodcastPage = () => {
  const param = useParams();
  const [podcast, setPodcast] = useState<Podcast>();
  const [episodes, setEpisodes] = useState<Episode[]>();
  const { getPodcasts, getEpisodes } = usePodcasts();

  const loadPodcastData = async () => {
    const podcasts = await getPodcasts();
    setPodcast(podcasts?.find((podcast) => podcast.id === param.id));
  };

  const loadEpisodesData = async () => {
    const e = await getEpisodes(podcast?.id as string);
    setEpisodes(e);
  };

  useEffect(() => {
    loadPodcastData();
  }, []);

  useEffect(() => {
    if (!podcast) return;
    loadEpisodesData();
  }, [podcast]);

  return (
    <div className="flex flex-col gap-10">
      <h1>{podcast?.title}</h1>
      <EpisodesDataTable episodes={episodes} />
    </div>
  );
};

export default PodcastPage;
