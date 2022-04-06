import { TThumbnail } from ".";

type TFavorites = {
  userId: string;
  type: "characters" | "comics" | "stories" | "";
  list?: TFavorite[];
};

export type TFavorite = {
  id: number;
  title: string;
  description: string;
  thumbnail: TThumbnail;
};

export default TFavorites;
