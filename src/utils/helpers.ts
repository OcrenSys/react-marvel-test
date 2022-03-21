import { GET_CHARACTERS_SELECTOR } from "../store/selectors/characters.selector";
import { GET_COMICS_SELECTOR } from "../store/selectors/comics.selector";
import { TData, TItem } from "../types/Response";

export const getComicIdByResourceURI = (resourceURI: string): string => {
  const elements = resourceURI.split("/");
  return elements[elements.length - 1];
};

export const hasComic = (items: TItem[], comicId: string): boolean =>
  items.some(
    (item: TItem) =>
      getComicIdByResourceURI(item.resourceURI).toString() === comicId
  );

export const hasSearch = (property: string, search: string): boolean =>
  property.toLowerCase().includes(search.toLowerCase());
