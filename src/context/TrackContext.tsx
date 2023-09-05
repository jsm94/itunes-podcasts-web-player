import { createContext, useContext, useReducer } from "react";

export enum TrackActionTypes {
  SET_CURRENT_PODCAST_ID = "set_current_podcast_id",
  SET_CURRENT_TRACK_ID = "set_current_track_id",
  PLAY = "play",
  PAUSE = "pause",
}

export type TrackState = {
  currentPodcastId: string;
  currentTrackId: number;
  isPlaying: boolean;
};

export type TrackActionPayload = {
  currentPodcastId: string;
  currentTrackId: number;
};

export type TrackAction = {
  type: TrackActionTypes;
  payload?: TrackActionPayload;
};

const initialState: TrackState = {
  currentPodcastId: "",
  currentTrackId: 0,
  isPlaying: false,
};

const TrackReducer = (state: TrackState, action: TrackAction) => {
  switch (action.type) {
    case TrackActionTypes.SET_CURRENT_PODCAST_ID: {
      return { ...state, currentPodcastId: action.payload!.currentPodcastId };
    }
    case TrackActionTypes.SET_CURRENT_TRACK_ID: {
      return { ...state, currentTrackId: action.payload!.currentTrackId };
    }
    case TrackActionTypes.PLAY: {
      return { ...state, isPlaying: true };
    }
    case TrackActionTypes.PAUSE: {
      return { ...state, isPlaying: false };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
};

const TrackContext = createContext(initialState);

const TrackDispatchContext = createContext(
  (() => {}) as React.Dispatch<TrackAction>
);

type TrackProviderProps = {
  children: React.ReactNode;
};

export const TrackProvider = ({ children }: TrackProviderProps) => {
  const [state, dispatch] = useReducer(TrackReducer, initialState);

  return (
    <TrackContext.Provider value={state}>
      <TrackDispatchContext.Provider value={dispatch}>
        {children}
      </TrackDispatchContext.Provider>
    </TrackContext.Provider>
  );
};

export const useTrackContext = () => {
  return useContext(TrackContext);
};

export const useTrackDispatch = () => {
  return useContext(TrackDispatchContext);
};
