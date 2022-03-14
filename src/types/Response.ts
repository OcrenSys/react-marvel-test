export interface IResponse {
  code: number;
  status: string;
  etag: String;
  data: IData;
}

interface IData {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: any[];
}
