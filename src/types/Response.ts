import { TCharacters } from "./characters";

export type TResponse  = {
  code: number;
  status: string;
  etag: String;
  data: TData;
};

export type TData  = {
  offset: number;
  limit: number;
  total: number;
  count: number;
  loading: boolean;
  error: boolean;
  results: TCharacters [];
};


export type TThumbnail = {
  path: string;
  extension: string;
};
