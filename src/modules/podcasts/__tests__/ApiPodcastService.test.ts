import { ApiPodcastService } from "../infra/ApiPodcastService";
import { mockEpisodesListData } from "../infra/mocks/mockEpisodesListData";
import { mockPodcastsListData } from "../infra/mocks/mockPodcastsListData";

const abortControllerMock = {
  signal: jest.fn(),
};

describe("ApiPodcastService", () => {
  describe("getMostPopular", () => {
    beforeEach(() => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockPodcastsListData),
        })
      ) as jest.Mock<Promise<Response>>;
    });

    it("should return a list of podcasts", async () => {
      const apiPodcastService = new ApiPodcastService(
        abortControllerMock as any
      );
      const podcasts = await apiPodcastService.getMostPopular(1);
      expect(podcasts).toHaveLength(1);
    });

    it("should return an error when limit is <= 0 or > 200", async () => {
      const apiPodcastService = new ApiPodcastService(
        abortControllerMock as any
      );
      await expect(apiPodcastService.getMostPopular(0)).rejects.toThrow();
      await expect(apiPodcastService.getMostPopular(201)).rejects.toThrow();
    });
  });

  describe("getEpisodes", () => {
    beforeEach(() => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockEpisodesListData),
        })
      ) as jest.Mock<Promise<Response>>;
    });

    it("should return a list of episodes", async () => {
      const apiPodcastService = new ApiPodcastService(
        abortControllerMock as any
      );
      const episodes = await apiPodcastService.getEpisodes("123");
      expect(episodes).toHaveLength(1);
    });
  });
});
