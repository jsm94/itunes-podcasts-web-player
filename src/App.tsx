import "./App.css";
import PodcastsDataTable from "./components/PodcastsDataTable";
import Layout from "./layouts/Layout";
import { Podcast } from "./modules/podcasts/domain/Podcast";

function App() {
  const podcasts: Podcast[] = [
    {
      id: "1",
      title: "The Joe Rogan Experience",
      author: "Joe Rogan",
      description: "The podcast of Comedian Joe Rogan..",
      episodes: [],
      image: "",
    },
  ];

  return (
    <Layout>
      <PodcastsDataTable podcasts={podcasts} />
    </Layout>
  );
}

export default App;
