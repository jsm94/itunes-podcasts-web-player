import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePodcasts } from "../hooks/podcasts/usePodcasts";
import { Podcast } from "../modules/podcasts/domain/Podcast";

const PodcastPage = () => {
  const param = useParams();
  const [podcast, setPodcast] = useState<Podcast>();
  const { getPodcasts } = usePodcasts();

  const loadData = async () => {
    const podcasts = await getPodcasts();
    setPodcast(podcasts?.find((podcast) => podcast.id === param.id));
  };

  useEffect(() => {
    loadData();
  }, []);

  return <h1>{podcast?.title}</h1>;
};

export default PodcastPage;
