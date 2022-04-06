import { TGeneric, TThumbnail, TUrl } from "./Response";

type TCharacter = {
  id: number;
  name: string;
  description: string;
  modified: string;
  thumbnail: TThumbnail;
  resourceURI: string;
  comics:TGeneric;
  series: TGeneric[];
  stories: TGeneric[];
  events: TGeneric[];
  urls: TUrl[];
};

export type TCharacterExtended = TCharacter & { col: number; row: number };


export default TCharacter;
