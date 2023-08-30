import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { mockEpisodesListData } from "./modules/podcasts/infra/mocks/mockEpisodesListData";
import { mockPodcastsListData } from "./modules/podcasts/infra/mocks/mockPodcastsListData";

import { SearchProvider } from "./context/SearchContext";

import { withProviders } from "./router/router-provider";

import App from "./App";

const renderWithProviders = () => {
  return render(
    withProviders(
      <SearchProvider>
        <App />
      </SearchProvider>
    )
  );
};

describe("App", () => {
  beforeEach(() => {
    global.fetch = jest.fn((url) => {
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
    renderWithProviders();
    await waitFor(() => {
      expect(screen.getByPlaceholderText(/podcast/i)).toBeInTheDocument();
    });
  });

  it("renders a table", async () => {
    renderWithProviders();
    await waitFor(() => {
      expect(screen.getByRole("table")).toBeInTheDocument();
    });
  });

  it('renders a table with podcasts data "A History of Rock Music in 500 Songs"', async () => {
    renderWithProviders();
    await waitFor(() => {
      expect(
        screen.getByText(/A History of Rock Music in 500 Songs/i)
      ).toBeInTheDocument();
    });
  });

  it('when user types "test" on searchbar doesnt render any podcast', async () => {
    renderWithProviders();
    const input = screen.getByPlaceholderText(/podcast/i);
    await waitFor(() => {
      expect(input).toBeInTheDocument();
    });

    fireEvent.change(input, {
      target: { value: "test" },
    });

    await waitFor(() => {
      expect(
        screen.queryByText(/A History of Rock Music in 500 Songs/i)
      ).not.toBeInTheDocument();
    });
  });

  it('when user clicks on "A History of Rock Music in 500 Songs" navigates to podcast page', async () => {
    renderWithProviders();

    const podcastName = /A History of Rock Music in 500 Songs/i;
    let podcast: HTMLElement;

    await waitFor(() => {
      podcast = screen.getByText(podcastName);
      expect(podcast).toBeInTheDocument();
    });

    fireEvent.click(podcast!);

    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: podcastName })
      ).toBeInTheDocument();
    });
  });

  it('should render a table with episodes"', async () => {
    renderWithProviders();

    const podcastName = /A History of Rock Music in 500 Songs/i;
    let podcast: HTMLElement;

    await waitFor(() => {
      podcast = screen.getByText(podcastName);
      expect(podcast).toBeInTheDocument();
    });

    fireEvent.click(podcast!);

    await waitFor(() => {
      expect(screen.getByRole("table")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText(/Bakar - Hell N Back/i)).toBeInTheDocument();
    });
  });
});
