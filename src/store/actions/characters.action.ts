import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosConfig from "../../config/axiosConfig";
import routesApi from "../../config/routesApi";
import { TParameters } from "../../types/parameters";

export const RETRIEVE_CHARACTERS: any = createAsyncThunk(
  "CHARACTERS/RETRIEVE_CHARACTERS",
  async ({ offset }: TParameters) => {
    const response = await axiosConfig.get(
      routesApi.characters.root, 
      {
        params: {
          offset,
        },
      },
    );
    return response.data?.data;
  }
);
