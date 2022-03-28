import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosConfig from "../../config/axiosConfig";
import routesApi from "../../config/routesApi";
import { TParameters } from "../../types/parameters";

export const RETRIEVE_COMICS: any = createAsyncThunk(
  "COMICS/RETRIEVE_COMICS",
  async (parameters: TParameters) => {
    const response = await axiosConfig.get(routesApi.comics.root, {
      params: {
       ...parameters
      },
    });
    return response.data?.data;
  }
);

export const RETRIEVE_COMIC_DETAILS: any = createAsyncThunk(
  "COMICS/RETRIEVE_COMIC_DETAILS",
  async (id: number) => {
    const response = await axiosConfig.get(routesApi.comics.details(id), {
      params: {
        id,
      },
    });
    return response.data?.data;
  }
);
