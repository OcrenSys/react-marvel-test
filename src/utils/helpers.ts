import { debug } from "console";
import { GET_CHARACTERS_SELECTOR } from "../store/selectors/characters.selector";
import { GET_COMICS_SELECTOR } from "../store/selectors/comics.selector";
import TComic, { TComicExtended } from "../types/comic";
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

export const getNumberBetween = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getData = (comics: TComic[]): TComicExtended[] => {
  let count: number = 0;
  let temporalData: any[] = [];
  let realData: any = [];

  comics.forEach((element: any) => {
    // debugger;

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
