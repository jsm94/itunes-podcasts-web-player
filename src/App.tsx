import { useEffect, useRef, useState } from "react";

import { Podcast } from "./modules/podcasts/domain/Podcast";

import { usePodcasts } from "./hooks/podcasts/usePodcasts";

import Layout from "./layouts/Layout";

import PodcastsDataTable from "./components/PodcastsDataTable";

import "./App.css";
import { useSearch } from "./context/SearchContext";

function App() {
  const search = useSearch();

  const [filteredPodcasts, setPodcasts] = useState<Podcast[] | undefined>([]);
  const { getPodcasts } = usePodcasts();

  const podcastsRef = useRef<Podcast[] | undefined>([]);

  const loadData = async () => {
    podcastsRef.current = await getPodcasts();
    setPodcasts(podcastsRef.current);
  };

  const filterPodcasts = (podcasts: Podcast[]) => {
    return podcasts.filter((podcast) => {
      return (
        podcast.title.toLowerCase().includes(search.toLowerCase()) ||
        podcast.author.toLowerCase().includes(search.toLowerCase())
      );
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    setPodcasts(filterPodcasts(podcastsRef.current!));
  }, [search]);

  return (
    <Layout>
      <PodcastsDataTable podcasts={filteredPodcasts} />
    </Layout>
  );
}

export default App;
