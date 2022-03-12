import React from 'react';
import { Header } from "../components/header";
import { About } from "../components/about";
import { Gallery } from "../components/gallery";
import { RouteURLS } from '../constant/routes';
import App from '../App';


export const ApiRoutes = () => {
    const urls = {
        path: '/',
        element: <App />,
        children: [
            {
                path: RouteURLS.CHARACTERS.ROOT,
                element:<Header />,
                index: true,
                title: 'Characters'
            },
            {
                path: RouteURLS.COMICS.ROOT,
                element:<Gallery />,
                index: false,
                title: 'Comics'
            },
            {
                path: RouteURLS.STORIES.ROOT,
                element: <About />,
                index: false,
                title: 'Stories'
            },
        ]
    }
        
    return {
        urls
    }
}