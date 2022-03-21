import { AsyncThunkPayloadCreator, createAsyncThunk } from "@reduxjs/toolkit";
import axiosConfig from "../../config/axiosConfig";
import routesApi from "../../config/routesApi";
import { TParameters } from "../../types/parameters";

export const RETRIEVE_COMICS: any = createAsyncThunk(
    'COMICS/RETRIEVE_COMICS',
    async ({ titleStartsWith }: TParameters) => {

      const response = await axiosConfig.get(
        routesApi.comics.root, titleStartsWith ?
        {
          params: {
            titleStartsWith,
          },
        } : {},
      );
      // console.log('RETRIEVE_COMICS', response.data?.data)
      return response.data?.data;
    }
  );