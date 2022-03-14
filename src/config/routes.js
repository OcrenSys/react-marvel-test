import React from 'react';
import { About } from "../components/about";
import { Gallery } from "../components/gallery";
import { Contact } from "../components/contact";
import { RouteURLS } from '../constant/routes';
import App from '../App';


export const ApiRoutes = () => {
    const urls = {
        path: '/',
        element: <App />,
        children: [
            {
                path: RouteURLS.CHARACTERS.ROOT,
                element: <Contact />,
                title: 'Characters'
            },
            {
                path: RouteURLS.COMICS.ROOT,
                element: <Gallery />,
                title: 'Comics'
            },
            {
                path: RouteURLS.STORIES.ROOT,
                element: <About />,
                title: 'Stories'
            },
        ]
    }
        
    return {
        urls
    }
}