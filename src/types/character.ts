import TComic from "./comic";
import { TGeneric, TThumbnail, TUrl } from "./Response";

type TCharacter = {
  id: number | string;
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

export default TCharacter;
