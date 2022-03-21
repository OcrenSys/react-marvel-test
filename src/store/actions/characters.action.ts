import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosConfig from "../../config/axiosConfig";
import routesApi from "../../config/routesApi";

export const RETRIEVE_CHARACTERS = createAsyncThunk(
  "CHARACTERS/RETRIEVE_CHARACTERS",
  async () => {
    const response = await axiosConfig.get(
      routesApi.characters.root
    );
    return response.data?.data;
  }
);
