type TFavorites = {
  userId: string;
  type: "characters" | "comics" | "stories" | "";
  list?: TFavorite[];
};

export type TFavorite = {
  userId?: string;
  itemId: number;
};

export default TFavorites;
