import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosConfig from "../../config/axiosConfig";
import routesApi from "../../config/routesApi";
import TParameters from "../../types/parameters";

export const RETRIEVE_CHARACTERS: any = createAsyncThunk(
  "CHARACTERS/RETRIEVE_CHARACTERS",
  async (parameters: TParameters) => {
    const response = await axiosConfig.get(routesApi.characters.root, {
      params: {
        ...parameters
      },
    });
    return response.data?.data;
  }
);

export const RETRIEVE_CHARACTER_DETAILS: any = createAsyncThunk(
  "CHARACTERS/RETRIEVE_CHARACTER_DETAILS",
  async (id: number) => {
    const response = await axiosConfig.get(routesApi.characters.details(id), {
      params: {
        id,
      },
    });
    return response.data?.data;
  }
);

export const RETRIEVE_CHARACTER_COMICS: any = createAsyncThunk(
  "CHARACTERS/RETRIEVE_CHARACTER_COMICS",
  async (id: number) => {
    const response = await axiosConfig.get(routesApi.characters.comics(id));
    return response.data?.data;
  }
);

export const RETRIEVE_CHARACTER_STORIES: any = createAsyncThunk(
  "CHARACTERS/RETRIEVE_CHARACTER_STORIES",
  async (id: number) => {
    const response = await axiosConfig.get(routesApi.characters.stories(id));
    return response.data?.data;
  }
);

