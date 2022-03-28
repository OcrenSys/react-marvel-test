import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TParameters } from "../../types/parameters";
import { NavigateOptions, useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { GET_STORIES_SELECTOR } from "../../store/selectors/stories.selector";
import { RETRIEVE_STORIES } from "../../store/actions/stories.actions";
import { constants } from "../../utils/constant";
import TStory from "../../types/stories";
/* CUSTOM COMPONENTS */
import SearchComponent from "../../components/Search";
import CardComponent from "../../components/Card";
import InfiniteScrollWrapper from "../../components/InfiniteScrollWrapper";

import useDebounce from "../../hooks/useDebounce";
import { getSrc } from "../../utils/helpers";
import AutoCompleteFilter from "../../components/Autocomplete/AutoCompleteFilter";
import TOption from "../../types/TOption";
import { AnyAction } from "@reduxjs/toolkit";
import { RETRIEVE_COMICS } from "../../store/actions/comic.actions";

let loadNextTimeout: NodeJS.Timeout;
const scrollTarget: string = "scrollableCharacterDiv";

export const Stories = (): React.ReactElement => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, results, total } = useSelector(GET_STORIES_SELECTOR);

  const [search, setSearch] = useState<string>("");
  const [offset, setOffset] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [stories, setStories] = useState<TStory[]>(results);
  const searchDebounced: string = useDebounce(search, 600);
  const [comicSelected, setComicSelected] = useState<TOption>({
    label: "",
    id: "",
  });

  const handleNext = () => {
    setHasMore(false);
    clearTimeout(loadNextTimeout);

    loadNextTimeout = setTimeout(() => {
      setOffset((prev) => prev + constants.offset);
    }, 500);
  };

  const handleRedirect = (characterId: number | string) => {
    const options: NavigateOptions = {
      replace: false,
      state: {},
    };
    // return navigate(`/stories/details/${characterId}`, options);
  };

  const handleChangeAutoComplete = useCallback(
    (event: React.SyntheticEvent, value: { label: string; id: string }) => {
      setStories([]);
      setHasMore(false);
      setOffset(0);
      setComicSelected(value);
    },
    [setComicSelected]
  );

  const handleDistpachComics = useCallback(
    (titleStartsWith: string): AnyAction => {
      let parameters: TParameters = {
        ...(searchDebounced !== "" && { titleStartsWith: titleStartsWith }),
      };
      return RETRIEVE_COMICS(parameters);
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
      };

    dispatch(RETRIEVE_STORIES(parameters));
  }, [dispatch, offset, comicSelected]);

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
              variant={"outlined"}
              value={comicSelected}
              onDispatch={handleDistpachComics}
              onChange={handleChangeAutoComplete}
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
