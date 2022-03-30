const routesApi =  {
    characters: {
        root : '/characters',
        details: (id: number | string ): string =>  `/characters/${id}`,
        comics: (id: number | string ): string =>  `/characters/${id}/comics`,
        stories: (id: number | string ): string =>  `/characters/${id}/stories`,
    },
    comics: {
        root : '/comics',
        details: (id: number | string ): string =>  `/comics/${id}`,
        characters: (id: number | string ): string =>  `/comics/${id}/characters`,
    },
    stories: {
        root : '/stories',
        details: (id: number | string ): string =>  `/stories/${id}`,
        characters: (id: number | string ): string =>  `/stories/${id}/characters`
    },
}

export default routesApi;