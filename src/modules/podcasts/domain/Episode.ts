export interface Episode {
  id: number;
  title: string;
  description: string | undefined;
  releaseDate: Date;
  duration: number | undefined;
  audio: string | undefined;
}
