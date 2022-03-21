import { TUrl, TItem, TDate, TThumbnail, TPrice, TGeneric } from "./Response";

type TComic = {
  id: number;
  digitalId: number;
  title: string;
  issueNumber: number;
  variantDescription: string;
  description: string;
  modified: string;
  isbn: string;
  upc: string;
  diamondCode: string;
  ean: string;
  issn: string;
  format: string;
  pageCount: 112;
  textObjects: [];
  resourceURI: string;
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

export default TComic;
