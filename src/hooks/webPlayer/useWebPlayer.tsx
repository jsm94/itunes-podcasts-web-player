import { useCallback, useEffect, useRef, useState } from "react";

import { Episode } from "../../modules/podcasts/domain/Episode";

import {
  WebPlayerActionTypes,
  useWebPlayerContext,
  useWebPlayerDispatch,
} from "../../context/WebPlayerContext";

export const useWebPlayer = () => {
  const state = useWebPlayerContext();
  const {
    tracks,
    currentTime,
    currentTrackIndex,
    isLooping,
    isPlaying,
    isShuffling,
    volume,
  } = state;
  const dispatch = useWebPlayerDispatch();

  const [currentTimeCalc, setCurrentTimeCalc] = useState<number>(0);

  const tracksPlayingRef = useRef<Episode[] | undefined>([]);
  const tracksPlaying = tracksPlayingRef.current;

  const audioRef = useRef(new Audio());
  const { currentTime: currentRefTime } = audioRef.current;

  const updateTimer = useCallback(() => {
    const { duration } = audioRef.current;
    dispatch({
      type: WebPlayerActionTypes.SEEK,
      payload: {
        ...state,
        currentTime: currentRefTime,
      },
    });
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

      dispatch({
        type: WebPlayerActionTypes.SET_CURRENT_TRACK,
        payload: {
          ...state,
          currentTrackId: tracksPlayingRef.current![index].id!,
        },
      });

      dispatch({
        type: WebPlayerActionTypes.PLAY,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!tracks.length) return;
    tracksPlayingRef.current = tracks;
    loadTrack(currentTrackIndex);
  }, [tracks]);

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
    const beforeCurrent = tracksPlaying?.slice(0, currentTrackIndex);
    const afterCurrent = tracksPlaying?.slice(currentTrackIndex + 1);

    const shuffledTracks = [
      ...beforeCurrent!.sort(() => Math.random() - 0.5),
      tracksPlaying![currentTrackIndex],
      ...afterCurrent!.sort(() => Math.random() - 0.5),
    ];

    tracksPlayingRef.current = shuffledTracks;
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
    currentTimeCalc,
  };
};
