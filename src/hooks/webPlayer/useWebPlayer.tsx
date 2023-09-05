import { useCallback, useEffect, useRef, useState } from "react";

import { Episode } from "../../modules/podcasts/domain/Episode";

import {
  TrackActionTypes,
  useTrackContext,
  useTrackDispatch,
} from "../../context/TrackContext";
import {
  WebPlayerActionTypes,
  useWebPlayerContext,
  useWebPlayerDispatch,
} from "../../context/WebPlayerContext";

export const useWebPlayer = () => {
  const state = useWebPlayerContext();
  const { tracks, currentTrackIndex, isLooping, isShuffling, volume } = state;
  const dispatch = useWebPlayerDispatch();
  const { currentTrackId, isPlaying } = useTrackContext();
  const trackDispatcher = useTrackDispatch();

  const [currentTimeCalc, setCurrentTimeCalc] = useState<number>(0);

  const tracksPlayingRef = useRef<Episode[] | undefined>([]);
  const tracksPlaying = tracksPlayingRef.current;

  const audioRef = useRef(new Audio());
  const { currentTime: currentRefTime } = audioRef.current;

  const changeCurrentTime = (value: number) => {
    const calc = (value * audioRef.current.duration) / 100;
    if (isNaN(calc)) return;
    audioRef.current.currentTime = calc;
  };

  const shuffleTracks = (tracks: Episode[]) => {
    const beforeCurrent = tracks.slice(0, currentTrackIndex);
    const afterCurrent = tracks.slice(currentTrackIndex + 1);

    const shuffledTracks = [
      ...beforeCurrent.sort(() => Math.random() - 0.5),
      tracks[currentTrackIndex],
      ...afterCurrent.sort(() => Math.random() - 0.5),
    ];

    return shuffledTracks;
  };

  const updateTimer = useCallback(() => {
    const { duration } = audioRef.current;
    setCurrentTimeCalc((currentRefTime * 100) / duration);
  }, [currentRefTime]);

  const nextTrack = useCallback(() => {
    dispatch({
      type: WebPlayerActionTypes.NEXT,
    });
  }, []);

  useEffect(() => {
    audioRef.current.addEventListener("timeupdate", updateTimer);
    return () => {
      audioRef.current.removeEventListener("timeupdate", updateTimer);
    };
  }, [updateTimer]);

  useEffect(() => {
    audioRef.current.addEventListener("ended", nextTrack);
    return () => {
      audioRef.current.removeEventListener("ended", nextTrack);
    };
  }, [nextTrack]);

  const loadTrack = async (index: number) => {
    audioRef.current.src = tracksPlayingRef.current![index].audio!;
    audioRef.current.load();
    audioRef.current.volume = volume;
    try {
      await audioRef.current.play();

      trackDispatcher({
        type: TrackActionTypes.SET_CURRENT_TRACK_ID,
        payload: {
          currentPodcastId: "",
          currentTrackId: tracksPlayingRef.current![index].id!,
        },
      });

      trackDispatcher({
        type: TrackActionTypes.PLAY,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!tracks?.length) return;
    let tracksResult = tracks;
    if (isShuffling) tracksResult = shuffleTracks(tracks);
    tracksPlayingRef.current = tracksResult;
    loadTrack(currentTrackIndex);
  }, [tracks]);

  useEffect(() => {
    const trackIndex = tracksPlaying?.findIndex(
      (track) => track.id === currentTrackId
    );
    if (trackIndex === -1) return;
    dispatch({
      type: WebPlayerActionTypes.SET_TRACK_INDEX,
      payload: {
        ...state,
        currentTrackIndex: trackIndex!,
      },
    });
  }, [tracksPlaying, currentTrackId]);

  useEffect(() => {
    if (!tracksPlaying?.length) return;
    loadTrack(currentTrackIndex);
  }, [currentTrackIndex]);

  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    audioRef.current.loop = isLooping;
  }, [isLooping]);

  useEffect(() => {
    if (!isShuffling) {
      tracksPlayingRef.current = tracks;
      return;
    }

    tracksPlayingRef.current = shuffleTracks(tracks);
  }, [isShuffling]);

  useEffect(() => {
    if (!isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  }, [isPlaying]);

  return {
    tracksPlaying,
    currentTrackIndex,
    currentRefTime,
    currentTimeCalc,
    changeCurrentTime,
  };
};
