import React from "react";
import { RouteObject, useRoutes } from "react-router-dom";
import { Characters } from "../components/characters";
import { Comics } from "../components/comics";
import Layout from "../components/layout";
import { Stories } from "../components/stories";

const Router = (): React.ReactElement | null => {
    let routes: RouteObject [] = [
        {
            path: "/",
            element: <Layout /> ,
            children: [
                {
                    index: true,
                    element: <Characters />
                },
                {
                    path: "/characters",
                    element: <Characters />,
                   /*  children: [
                        {
                            index: true,
                            element: <About />
                        }, {
                            path: "/characters/:id",
                            element: <About />
                        },
                    ] */
                },
                {
                    path: "/comics",
                    element: <Comics />,
                },
                {
                    path: "/stories",
                    element: <Stories />,
                },
            ],
        },
    ];
    return useRoutes(routes);
}

export default  Router;