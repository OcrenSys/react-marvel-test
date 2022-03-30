import { RETRIEVE_CHARACTER_COMICS } from "../store/actions/characters.action";
import { RETRIEVE_COMIC_CHARACTERS } from "../store/actions/comic.actions";
import { GET_CHARACTERS_COMICS_SELECTOR } from "../store/selectors/characters.selector";
import { GET_COMIC_CHARACTERS_SELECTOR } from "../store/selectors/comics.selector";
import { TItem } from "../types/Response";
import TCharacter from "../types/character";
import TComic, { TComicExtended } from "../types/comic";
import TStory from "../types/stories";

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

export const getNumberBetween = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getData = (
  data: TCharacter[] | TComic[] | TStory[]
): TComicExtended[] => {
  let count: number = 0;
  let temporalData: any[] = [];
  let realData: any = [];

  data.forEach((element: TCharacter | TComic | TStory) => {
    switch (count) {
      case 0:
        temporalData = [...temporalData, { ...element, row: 2, col: 2 }];
        break;
      case 1:
      case 2:
        temporalData = [...temporalData, { ...element, row: 1, col: 1 }];
        break;
      case 3:
        temporalData = [...temporalData, { ...element, row: 1, col: 2 }];
        break;
    }

    if (count === 3) {
      realData = [...realData, ...temporalData];
      temporalData = [];
      count = 0;
    }

    count++;
  });

  return realData;
};

export const getSrc = (
  path: string | undefined,
  extension: string | undefined
): string =>
  `${
    path || "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available"
  }.${extension || "jpg"}`;

  
 export  const getSelector = (type: string) => {
    switch (type) {
      case "character":
        return GET_CHARACTERS_COMICS_SELECTOR;
      case "comic":
        return GET_COMIC_CHARACTERS_SELECTOR;
      default:
        return GET_CHARACTERS_COMICS_SELECTOR;
    }
  };

  export const getDispatch = (type: string, id: number | string | undefined) => {
    switch (type) {
      case "character":
        return RETRIEVE_CHARACTER_COMICS(id);
      case "comic":
        return RETRIEVE_COMIC_CHARACTERS(id);
      default:
        return RETRIEVE_CHARACTER_COMICS(id);
    }
  };
