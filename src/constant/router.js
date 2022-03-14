import { useRoutes } from "react-router-dom";
import {About} from "../components/about";
import {Contact} from "../components/contact";
import {Gallery} from "../components/gallery";
import {Image} from "../components/image";
import Layout from "../components/layout";
import {Services} from "../components/services";

const Router = () => {
    let routes = [
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    index: true,
                    element: <Gallery />
                },
                {
                    path: "/characters",
                    element: <Gallery />,
                    children: [
                        {
                            index: true,
                            element: <Contact />
                        }, {
                            path: "/characters/:id",
                            element: <Image />
                        },
                    ]
                },
                {
                    path: "/comics",
                    element: <Services />
                },
                {
                    path: "/stories",
                    element: <About />
                },
            ],
        },
    ];
    return useRoutes(routes);
}

export default  Router;