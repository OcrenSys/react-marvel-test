export type TResponse <T> = {
  code: number;
  status: string;
  etag: String;
  data: TData <T> ;
};

export type TData <T>  = {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: T[];
};


export type TThumbnail = {
  path: string;
  extension: string;
};
