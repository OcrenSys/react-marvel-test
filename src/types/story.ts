import { TDate, TGeneric, TItem, TPrice, TThumbnail, TUrl } from "./Response";

type TStory = {
  id: number;
  upc: string;
  name: string;
  ean: string;
  issn: string;
  isbn: string;
  title: string;
  format: string;
  modified: string;
  digitalId: number;
  pageCount: number;
  issueNumber: number;
  description: string;
  diamondCode: string;
  resourceURI: string;
  variantDescription: string;
  textObjects: any[];
  urls: TUrl[];
  series: TItem;
  variants: TItem[];
  collections: [];
  collectedIssues: [];
  dates: TDate[];
  prices: TPrice[];
  thumbnail: TThumbnail;
  images: [];
  creators: TGeneric;
  characters: TGeneric;
  stories: TGeneric;
  events: TGeneric;
};

export type TStoryExtended = TStory & { col: number; row: number };


export default TStory;
