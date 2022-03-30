import {
  RETRIEVE_CHARACTER_COMICS,
  RETRIEVE_CHARACTER_STORIES,
} from "../store/actions/characters.action";
import { RETRIEVE_COMIC_CHARACTERS } from "../store/actions/comic.actions";
import { RETRIEVE_STORY_CHARACTERS } from "../store/actions/stories.actions";
import {
  GET_CHARACTERS_COMICS_SELECTOR,
  GET_CHARACTERS_SELECTOR,
  GET_CHARACTERS_STORIES_SELECTOR,
} from "../store/selectors/characters.selector";
import {
  GET_COMICS_SELECTOR,
  GET_COMIC_CHARACTERS_SELECTOR,
} from "../store/selectors/comics.selector";
import {
  GET_STORIES_SELECTOR,
  GET_STORY_CHARACTERS_SELECTOR,
} from "../store/selectors/stories.selector";
import { REQUEST } from "./constant";
import TCharacter, { TCharacterExtended } from "../types/character";
import TComic, { TComicExtended } from "../types/comic";
import TStory, { TStoryExtended } from "../types/stories";

export const hasSearch = (property: string, search: string): boolean =>
  property.toLowerCase().includes(search.toLowerCase());

export const getNumberBetween = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getData = (
  data: TCharacter[] | TComic[] | TStory[] | any
): TCharacterExtended[] | TComicExtended[] | TStoryExtended[] | any => {
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

    if (count <= 3) {
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
    path || "img/not_found"
  }.${extension || "png"}`;

export const getSelector = (type: REQUEST): any => {
  switch (type) {
    /* CHARACTERS SECTION */
    case REQUEST.GET_CHARACTERS:
      return GET_CHARACTERS_SELECTOR;

    case REQUEST.GET_CHARACTER_COMICS:
      return GET_CHARACTERS_COMICS_SELECTOR;

    case REQUEST.GET_CHARACTER_STORIES:
      return GET_CHARACTERS_STORIES_SELECTOR;

    /* COMICS SECTION */
    case REQUEST.GET_COMICS:
      return GET_COMICS_SELECTOR;

    case REQUEST.GET_COMIC_CHARACTERS:
      return GET_COMIC_CHARACTERS_SELECTOR;

    /* STORIES SECTION */
    case REQUEST.GET_STORIES:
      return GET_STORIES_SELECTOR;

    case REQUEST.GET_STORY_CHARACTERS:
      return GET_STORY_CHARACTERS_SELECTOR;
  }
};

export const getDispatch = (
  type: REQUEST,
  id: number | string | undefined
): any => {
  switch (type) {
    case REQUEST.GET_CHARACTER_COMICS:
      return RETRIEVE_CHARACTER_COMICS(id);

    case REQUEST.GET_CHARACTER_STORIES:
      return RETRIEVE_CHARACTER_STORIES(id);

    case REQUEST.GET_COMIC_CHARACTERS:
      return RETRIEVE_COMIC_CHARACTERS(id);

    case REQUEST.GET_STORY_CHARACTERS:
      return RETRIEVE_STORY_CHARACTERS(id);
    default:
      return RETRIEVE_CHARACTER_COMICS(id);
  }
};
