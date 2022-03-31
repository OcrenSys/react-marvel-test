import React from "react";
import { RouteObject, useRoutes } from "react-router-dom";

const Layout = React.lazy(() => import('../pages/Layout'));

const Characters = React.lazy(() => import('../pages/characters'));
const CharacterDetails = React.lazy(() => import('../pages/characters/details'));
const Comics = React.lazy(() => import('../pages/comics'));
const ComicDetails = React.lazy(() => import('../pages/comics/details'));
const Stories = React.lazy(() => import('../pages/stories'));
const StoryDetails = React.lazy(() => import('../pages/stories/details'));


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
          path: "/characters",
          element: <Characters />,
        },
        {
          path: "/characters/details/:id",
          element: <CharacterDetails />,
        },
        {
          path: "/comics",
          element: <Comics />,
        },
        {
          path: "/comics/details/:id",
          element: <ComicDetails />,
        },
        {
          path: "/stories",
          element: <Stories />,
        },
        {
          path: "/stories/details/:id",
          element: <StoryDetails />,
        },
        {
          path: "/*",
          element: <Characters />,
        },
      ],
    },
  ];
  return useRoutes(routes);
};

export default Router;
