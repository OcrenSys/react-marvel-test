import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TParameters } from "../../types/parameters";
import { NavigateOptions, useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { GET_STORIES_SELECTOR } from "../../store/selectors/stories.selector";
import { RETRIEVE_STORIES } from "../../store/actions/stories.actions";
import { constants, REQUEST } from "../../utils/constant";
import TStory from "../../types/stories";
/* CUSTOM COMPONENTS */
import CardComponent from "../../components/Card";
import InfiniteScrollWrapper from "../../components/InfiniteScrollWrapper";

import useDebounce from "../../hooks/useDebounce";
import { getSrc } from "../../utils/helpers";
import AutoCompleteFilter from "../../components/Autocomplete/AutoCompleteFilter";
import TOption from "../../types/TOption";
import { AnyAction } from "@reduxjs/toolkit";
import { RETRIEVE_COMICS } from "../../store/actions/comic.actions";
import { RETRIEVE_CHARACTERS } from "../../store/actions/characters.action";

let loadNextTimeout: NodeJS.Timeout;
const scrollTarget: string = "scrollableCharacterDiv";

export const Stories = (): React.ReactElement => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, results, total } = useSelector(GET_STORIES_SELECTOR);

  const [searchComics] = useState<string>("");
  const [searchCharacters] = useState<string>("");
  const [offset, setOffset] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [stories, setStories] = useState<TStory[]>(results);
  const searchComicsDebounced: string = useDebounce(searchComics, 600);
  const searchCharactersDebounced: string = useDebounce(searchCharacters, 600);
  const [comicSelected, setComicSelected] = useState<TOption>({
    label: "",
    id: "",
  });
  const [characterSelected, setCharacterSelected] = useState<TOption>({
    label: "",
    id: "",
  });

  const onReset = () => {
    setStories([]);
    setHasMore(false);
    setOffset(0);
  };

  const handleNext = () => {
    setHasMore(false);
    clearTimeout(loadNextTimeout);

    loadNextTimeout = setTimeout(() => {
      setOffset((prev) => prev + constants.offset);
    }, 500);
  };

  const handleRedirect = (id: number | string) => {
    const options: NavigateOptions = {
      replace: false,
      state: {},
    };
    return navigate(`/stories/details/${id}`, options);
  };

  const handleChangeComicAutoComplete = useCallback(
    (event: React.SyntheticEvent, value: { label: string; id: string }) => {
      onReset();
      setComicSelected(value);
    },
    [setComicSelected]
  );

  const handleChangeCharacterAutoComplete = useCallback(
    (event: React.SyntheticEvent, value: { label: string; id: string }) => {
      onReset();
      setCharacterSelected(value);
    },
    [setCharacterSelected]
  );

  const handleDispatchComics = useCallback(
    ({ titleStartsWith }: TParameters): AnyAction => {
      let parameters: TParameters = {
        ...(searchComicsDebounced !== "" && {
          titleStartsWith: titleStartsWith,
        }),
      };
      return RETRIEVE_COMICS(parameters);
    },
    []
  );

  const handleDispatchCharacters = useCallback(
    ({ nameStartsWith }: TParameters): AnyAction => {
      let parameters: TParameters = {
        ...(searchCharactersDebounced !== "" && {
          nameStartsWith: nameStartsWith,
        }),
      };
      return RETRIEVE_CHARACTERS(parameters);
    },
    []
  );

  useEffect(() => {
    setStories((prev) => [...prev, ...results]);
    setHasMore(total > constants.offset ? stories.length < total : false);
    return () => {};
  }, [results, total]);

  useEffect(() => {
    let parameters: TParameters = {
      offset: offset,
    };

    if (comicSelected?.id)
      parameters = {
        ...parameters,
        ...(comicSelected?.id && { comics: parseInt(comicSelected?.id) }),
        ...(characterSelected?.id && {
          characters: parseInt(characterSelected?.id),
        }),
      };

    dispatch(RETRIEVE_STORIES(parameters));
  }, [dispatch, offset, comicSelected, characterSelected]);

  const renderContainer = (): React.ReactElement | React.ReactElement[] => (
    <div className="">
      <div className="portfolio-items">
        {stories.length ? (
          stories?.map((story: TStory, i: number) => (
            <div
              key={i}
              style={{ paddingRight: 4, paddingLeft: 4 }}
              className="col-sm-4 col-md-3 col-lg-3"
            >
              <CardComponent
                title={story.title}
                src={getSrc(
                  story?.thumbnail?.path,
                  story?.thumbnail?.extension
                )}
                description={`${story.description}`}
                onRedirect={() => handleRedirect(story.id)}
              />
            </div>
          ))
        ) : !loading && !stories.length ? (
          <Typography variant="h5" gutterBottom component="div">
            No se encontraron registros
          </Typography>
        ) : (
          <></>
        )}
      </div>
    </div>
  );

  return (
    <div className="top-100  text-center">
      <div className="container">
        <div className="section-title">
          <h2>Stories</h2>

          <div className="content-center-row">
            <AutoCompleteFilter
              label="Select comic..."
              type={REQUEST.GET_COMICS}
              variant={"outlined"}
              value={comicSelected}
              onDispatch={handleDispatchComics}
              onChange={handleChangeComicAutoComplete}
            />

            <AutoCompleteFilter
              label="Select character..."
              type={REQUEST.GET_CHARACTERS}
              variant={"outlined"}
              value={characterSelected}
              onDispatch={handleDispatchCharacters}
              onChange={handleChangeCharacterAutoComplete}
            />
          </div>
        </div>

        <div id={scrollTarget}>
          <InfiniteScrollWrapper
            hasMore={hasMore}
            handleNext={handleNext}
            length={stories.length}
            scrollableTarget={scrollTarget}
          >
            {renderContainer()}
          </InfiniteScrollWrapper>
        </div>
      </div>
    </div>
  );
};
