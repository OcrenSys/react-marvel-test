import React from "react";
import { RouteObject, useRoutes } from "react-router-dom";
import Layout from "../components/layout";
import { Characters } from "../pages/characters";
import { CharacterDetails } from "../pages/characters/details";
import { Comics } from "../pages/comics";
import { Stories } from "../pages/stories";

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
          path: "/stories",
          element: <Stories />,
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
