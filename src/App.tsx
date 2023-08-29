import { useEffect, useState } from "react";

import { Podcast } from "./modules/podcasts/domain/Podcast";

import { usePodcasts } from "./hooks/podcasts/usePodcasts";

import Layout from "./layouts/Layout";

import PodcastsDataTable from "./components/PodcastsDataTable";

import "./App.css";

function App() {
  const [podcasts, setPodcasts] = useState<Podcast[] | undefined>([]);
  const { getPodcasts } = usePodcasts();

  const loadData = async () => {
    const podcastsData = await getPodcasts();
    setPodcasts(podcastsData);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Layout>
      <PodcastsDataTable podcasts={podcasts} />
    </Layout>
  );
}

export default App;
