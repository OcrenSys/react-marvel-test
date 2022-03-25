const routesApi =  {
    characters: {
        root : '/characters',
        details: (id: number | string ): string =>  `/characters/${id}`,
        comics: (id: number | string ): string =>  `/characters/${id}/comics`,
    },
    comics: {
        root : '/comics',
        details: (id: number | string ): string =>  `/comics/${id}`,
    },
    stories: {
        root : '/stories',
        details: (id: number | string ): string =>  `/stories/${id}`
    },
}

export default routesApi;