import { render, screen, waitFor } from "@testing-library/react";

import App from "./App";

import { mockEpisodesListData } from "./modules/podcasts/infra/mocks/mockEpisodesListData";
import { mockPodcastsListData } from "./modules/podcasts/infra/mocks/mockPodcastsListData";

describe("App", () => {
  beforeEach(() => {
    console.log("beforeAll");
    global.fetch = jest.fn((url) => {
      console.log(url);
      if (
        url ===
        "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json"
      ) {
        return Promise.resolve({
          json: () => Promise.resolve(mockPodcastsListData),
        });
      }
      return Promise.resolve({
        json: () => Promise.resolve(mockEpisodesListData),
      });
    }) as jest.Mock<Promise<Response>>;
  });

  it("renders App component", async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByPlaceholderText(/podcast/i)).toBeInTheDocument();
    });
  });

  it("renders a table", async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByRole("table")).toBeInTheDocument();
    });
  });

  it('renders a table with podcasts data "A History of Rock Music in 500 Songs"', async () => {
    render(<App />);
    await waitFor(() => {
      expect(
        screen.getByText(/A History of Rock Music in 500 Songs/i)
      ).toBeInTheDocument();
    });
  });
});
