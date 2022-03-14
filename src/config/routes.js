import React from 'react';
import { RouteURLS } from '../constant/routes';
import App from '../App';
import { Characters } from '../components/characters';
import { Comics } from '../components/comics';
import { Stories } from '../components/stories';


export const ApiRoutes = () => {
    const urls = {
        path: '/',
        element: <App />,
        children: [
            {
                path: RouteURLS.CHARACTERS.ROOT,
                element: <Characters />,
                title: 'Characters'
            },
            {
                path: RouteURLS.COMICS.ROOT,
                element: <Comics />,
                title: 'Comics'
            },
            {
                path: RouteURLS.STORIES.ROOT,
                element: <Stories />,
                title: 'Stories'
            },
        ]
    }
        
    return {
        urls
    }
}