import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosConfig from "../../config/axiosConfig";
import routesApi from "../../config/routesApi";
import { TParameters } from "../../types/parameters";

export const RETRIEVE_STORIES: any = createAsyncThunk(
  "STORIES/RETRIEVE_STORIES",
  async (parameters: TParameters) => {
    const response = await axiosConfig.get(routesApi.stories.root, {
      params: {
        ...parameters,
      },
    });
    return response.data?.data;
  }
);

export const RETRIEVE_STORY_DETAILS: any = createAsyncThunk(
  "STORIES/RETRIEVE_STORY_DETAILS",
  async (id: number) => {
    const response = await axiosConfig.get(routesApi.stories.details(id), {
      params: {
        id,
      },
    });
    return response.data?.data;
  }
);
export const RETRIEVE_STORY_CHARACTERS: any = createAsyncThunk(
  "STORIES/RETRIEVE_STORY_CHARACTERS",
  async (id: number) => {
    const response = await axiosConfig.get(routesApi.stories.characters(id));
    return response.data?.data;
  }
);
