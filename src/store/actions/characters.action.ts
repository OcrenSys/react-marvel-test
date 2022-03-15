import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosConfig from "../../config/axiosConfig";
import routesApi from "../../config/routesApi";
import { TCharacters } from "../../types/characters";
import { TResponse, TData } from "../../types/Response";

export const RETRIEVE_CHARACTERS = createAsyncThunk(
  "CHARACTERS/RETRIEVE_CHARACTERS",
  async () => {
    const response = await axiosConfig.get<TResponse<TData<TCharacters>[]>>(
      routesApi.characters.root
    );
    return response.data.data;
  }
);
