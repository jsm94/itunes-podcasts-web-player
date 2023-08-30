export interface Episode {
  id: number;
  title: string;
  description: string | undefined;
  releaseDate: Date | string;
  duration: number | undefined;
  audio: string | undefined;
}
