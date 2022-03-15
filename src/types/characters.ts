import { TThumbnail } from "./Response";

export type TCharacters = {
    id: number | string;
    name: string;
    description: string;
    modified: string;
    thumbnail: TThumbnail;
    resourceURI: string;
  };