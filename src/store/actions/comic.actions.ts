import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosConfig from "../../config/axiosConfig";
import routesApi from "../../config/routesApi";

export const RETRIEVE_COMICS = createAsyncThunk(
    "COMICS/RETRIEVE_COMICS",
    async () => {
      const response = await axiosConfig.get(
        routesApi.comics.root
      );
      console.log('RETRIEVE_COMICS', response.data?.data)
      return response.data?.data;
    }
  );