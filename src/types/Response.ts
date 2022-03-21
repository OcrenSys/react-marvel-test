export type TResponse <T> = {
  code: number;
  status: string;
  etag: String;
  data: TData<T>;
};

export type TData <T> = {
  offset: number;
  limit: number;
  total: number;
  count: number;
  loading: boolean;
  error: boolean;
  results: T[];
};

export type TThumbnail = {
  path: string;
  extension: string;
};

export type TUrl = {
  type: string;
  url: string;
};

export type TDate = {
  type: string;
  date: string;
};

export type TPrice = {
  type: string;
  price: number;
};

export type TGeneric = {
  available: number;
  returned: number;
  collectionURI: string;
  items: TItem[];
};

export type TItem = {
  resourceURI: string;
  name: string;
  type?: string;
};
