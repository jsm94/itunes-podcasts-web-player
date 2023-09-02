import { useEffect, useRef, useState } from "react";

import { Podcast } from "../modules/podcasts/domain/Podcast";

import { useSearch } from "../context/SearchContext";

import { usePodcasts } from "../hooks/podcasts/usePodcasts";

import PodcastsDataTable from "../components/PodcastsDataTable";

const Home = () => {
  const search = useSearch();

  const [filteredPodcasts, setPodcasts] = useState<Podcast[] | undefined>([]);
  const { getPodcasts } = usePodcasts();

  const podcastsRef = useRef<Podcast[] | undefined>([]);

  const filterPodcasts = (podcasts: Podcast[]) => {
    return podcasts.filter((podcast) => {
      return (
        podcast.title.toLowerCase().includes(search.toLowerCase()) ||
        podcast.author.toLowerCase().includes(search.toLowerCase())
      );
    });
  };

  const loadData = async () => {
    podcastsRef.current = await getPodcasts();
    let filteredPodcasts = podcastsRef.current;
    if (search) {
      filteredPodcasts = filterPodcasts(podcastsRef.current!);
    }
    setPodcasts(filteredPodcasts);
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    setPodcasts(filterPodcasts(podcastsRef.current!));
  }, [search]);

  return <PodcastsDataTable podcasts={filteredPodcasts} />;
};

export default Home;
