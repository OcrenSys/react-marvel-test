import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosConfig from "../../config/axiosConfig";
import routesApi from "../../config/routesApi";
import { TCharacters } from "../../types/characters";
import { TData, TResponse } from "../../types/Response";

export const RETRIEVE_CHARACTERS = createAsyncThunk(
  "CHARACTERS/RETRIEVE_CHARACTERS",
  async () => {
    const response = await axiosConfig.get(
      routesApi.characters.root
    );
    console.log('RETRIEVE_CHARACTERS', response.data?.data)
    return response.data?.data;
  }
);
