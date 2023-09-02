export const msToDuration = (ms: number | undefined): string => {
  if (!ms) return "-";
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);

  const hoursStr = hours < 10 ? `0${hours}` : hours;
  const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
  const secondsStr = seconds < 10 ? `0${seconds}` : seconds;

  return `${
    hoursStr === "00" ? "" : `${hoursStr}:`
  }${minutesStr}:${secondsStr}`;
};

export const secondsToDuration = (seconds: number | undefined): string => {
  if (!seconds) return "-";
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secondsLeft = Math.floor(seconds % 60);

  const hoursStr = hours < 10 ? `0${hours}` : hours;
  const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
  const secondsStr = secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft;

  return `${
    hoursStr === "00" ? "" : `${hoursStr}:`
  }${minutesStr}:${secondsStr}`;
};
