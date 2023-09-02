import { createContext, useContext, useReducer } from "react";
import { Episode } from "../modules/podcasts/domain/Episode";
import { Podcast } from "../modules/podcasts/domain/Podcast";

export enum WebPlayerActionTypes {
  SET_TRACKS = "set_tracks",
  SET_TRACK_INDEX = "set_track_index",
  SET_CURRENT_TRACK = "set_current_track",
  SET_CURRENT_PODCAST_ID = "set_current_podcast_id",
  SET_CURRENT_PODCAST = "set_current_podcast",
  PLAY = "play",
  PAUSE = "pause",
  NEXT = "next",
  PREV = "prev",
  LOOP = "loop",
  SHUFFLE = "shuffle",
  SEEK = "seek",
  SET_VOLUME = "set_volume",
}

export type WebPlayerState = {
  tracks: Episode[];
  currentTrackIndex: number;
  currentTrackId: number;
  currentPodcastId: string;
  podcast: Podcast | undefined;
  isPlaying: boolean;
  isLooping: boolean;
  isShuffling: boolean;
  volume: number;
  currentTime: number;
};

export type WebPlayerAction = {
  type: WebPlayerActionTypes;
  payload?: WebPlayerState;
};

const initialState: WebPlayerState = {
  tracks: [],
  currentTrackIndex: 0,
  currentTrackId: 0,
  currentPodcastId: "",
  podcast: undefined,
  isPlaying: false,
  isLooping: false,
  isShuffling: false,
  volume: 0.02,
  currentTime: 0,
};

const WebPlayerReducer = (state: WebPlayerState, action: WebPlayerAction) => {
  switch (action.type) {
    case WebPlayerActionTypes.SET_TRACKS: {
      return { ...state, tracks: action.payload!.tracks };
    }
    case WebPlayerActionTypes.SET_TRACK_INDEX: {
      return { ...state, currentTrackIndex: action.payload!.currentTrackIndex };
    }
    case WebPlayerActionTypes.SET_CURRENT_TRACK: {
      return { ...state, currentTrackId: action.payload!.currentTrackId };
    }
    case WebPlayerActionTypes.SET_CURRENT_PODCAST_ID: {
      return { ...state, currentPodcastId: action.payload!.currentPodcastId };
    }
    case WebPlayerActionTypes.SET_CURRENT_PODCAST: {
      return { ...state, podcast: action.payload!.podcast };
    }
    case WebPlayerActionTypes.PLAY: {
      return { ...state, isPlaying: true };
    }
    case WebPlayerActionTypes.PAUSE: {
      return { ...state, isPlaying: false };
    }
    case WebPlayerActionTypes.NEXT: {
      const nextTrackIndex =
        state.currentTrackIndex === state.tracks.length - 1
          ? 0
          : state.currentTrackIndex + 1;
      return { ...state, currentTrackIndex: nextTrackIndex };
    }
    case WebPlayerActionTypes.PREV: {
      const prevTrackIndex =
        state.currentTrackIndex === 0
          ? state.tracks.length - 1
          : state.currentTrackIndex - 1;
      return { ...state, currentTrackIndex: prevTrackIndex };
    }
    case WebPlayerActionTypes.LOOP: {
      return { ...state, isLooping: !state.isLooping };
    }
    case WebPlayerActionTypes.SHUFFLE: {
      return { ...state, isShuffling: !state.isShuffling };
    }
    case WebPlayerActionTypes.SEEK: {
      return { ...state, currentTime: action.payload!.currentTime };
    }
    case WebPlayerActionTypes.SET_VOLUME: {
      return { ...state, volume: action.payload!.volume };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
};

const WebPlayerContext = createContext(initialState);

const WebPlayerDispatchContext = createContext(
  (() => {}) as React.Dispatch<WebPlayerAction>
);

type WebPlayerProviderProps = {
  children: React.ReactNode;
};

export const WebPlayerProvider = ({ children }: WebPlayerProviderProps) => {
  const [state, dispatch] = useReducer(WebPlayerReducer, initialState);

  return (
    <WebPlayerContext.Provider value={state}>
      <WebPlayerDispatchContext.Provider value={dispatch}>
        {children}
      </WebPlayerDispatchContext.Provider>
    </WebPlayerContext.Provider>
  );
};

export const useWebPlayerContext = () => {
  return useContext(WebPlayerContext);
};

export const useWebPlayerDispatch = () => {
  return useContext(WebPlayerDispatchContext);
};
