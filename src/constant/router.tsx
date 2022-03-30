import React from "react";
import { RouteObject, useRoutes } from "react-router-dom";
import Layout from "../pages/Layout";
import { Characters } from "../pages/characters";
import { CharacterDetails } from "../pages/characters/details";
import { Comics } from "../pages/comics";
import { ComicDetails } from "../pages/comics/details";
import { Stories } from "../pages/stories";
import { StoryDetails } from "../pages/stories/details";

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
