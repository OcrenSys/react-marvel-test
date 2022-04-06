type TRoutes = {
  path: string;
  title?: string;
};

export const paths = {
  characters: "/characters",
  characterDetails: "/characters/details/:id",
  comics: "/comics",
  comicDetails: "/comics/details/:id",
  stories: "/stories",
  storyDetails: "/stories",
  favorites: "/favorites",
  notfound: "/*",
};

const routesConfig = (): TRoutes[] => [
  {
    path: paths.characters,
    title: "Characters",
  },
  {
    path: paths.comics,
    title: "Comics",
  },
  {
    path: paths.stories,
    title: "Stories",
  },
  {
    path: paths.favorites,
    title: "Favorites",
  },
  {
    path: paths.notfound,
  },
];

export default routesConfig;
