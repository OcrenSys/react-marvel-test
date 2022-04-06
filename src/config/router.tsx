import React from "react";
import { RouteObject, useRoutes } from "react-router-dom";
import { paths } from "../constant/routesConfig";
import Favorites from "../pages/favorites";

const Layout = React.lazy(() => import("../pages/Layout"));

const Characters = React.lazy(() => import("../pages/characters"));
const CharacterDetails = React.lazy(
  () => import("../pages/characters/details")
);
const Comics = React.lazy(() => import("../pages/comics"));
const ComicDetails = React.lazy(() => import("../pages/comics/details"));
const Stories = React.lazy(() => import("../pages/stories"));
const StoryDetails = React.lazy(() => import("../pages/stories/details"));

const Router = (): React.ReactElement | null => {
  let routes: RouteObject[] = [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Characters />,
        },
        {
          path: paths.characters,
          element: <Characters />,
        },
        {
          path: paths.characterDetails,
          element: <CharacterDetails />,
        },
        {
          path: paths.comics,
          element: <Comics />,
        },
        {
          path: paths.comicDetails,
          element: <ComicDetails />,
        },
        {
          path: paths.stories,
          element: <Stories />,
        },
        {
          path: paths.storyDetails,
          element: <StoryDetails />,
        },
        {
          path: paths.favorites,
          element: <Favorites />,
        },
        {
          path: paths.notfound,
          element: <Characters />,
        },
      ],
    },
  ];
  return useRoutes(routes);
};

export default Router;
