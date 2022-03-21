import { TItem } from "../types/Response";

export const getComicIdByResourceURI = (resourceURI: string): string => {
    console.log('getComicIdByResourceURI', resourceURI)
    const elements = resourceURI.split('/');
    return elements[elements.length-1];
}

export const hasComic = (items: TItem[], comicId: string): boolean => {
    // console.log("hasComic.items...", items)
   // debugger

    return items.some((item: TItem) => {
        // console.log("item.name...", item.name)
        return getComicIdByResourceURI(item.resourceURI).toString() === comicId
    })
}