import { createSelector } from "@reduxjs/toolkit";
import { TAppState } from "..";

const getStories = (state: TAppState) => state.stories
const getStoryDetails = (state: TAppState) => state.storyDetails

export const GET_STORIES_SELECTOR = createSelector(
    getStories,
    (state) => state
    
)

export const GET_STORY_DETAILS_SELECTOR = createSelector(
    getStoryDetails,
    (state) => state

)
