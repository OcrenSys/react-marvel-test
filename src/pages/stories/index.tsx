import React, { Suspense, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavigateOptions, useNavigate } from "react-router-dom";
import { Skeleton, Typography } from "@mui/material";
import { GET_STORIES_SELECTOR } from "../../store/selectors/stories.selector";
import { RETRIEVE_STORIES } from "../../store/actions/stories.actions";
import { constants, REQUEST } from "../../utils/constant";
import { AnyAction } from "@reduxjs/toolkit";
import { RETRIEVE_COMICS } from "../../store/actions/comic.actions";
import { RETRIEVE_CHARACTERS } from "../../store/actions/characters.action";
import { getSrc } from "../../utils/helpers";
import TParameters from "../../types/parameters";
import TOption from "../../types/TOption";
import TStory from "../../types/stories";
import useDebounce from "../../hooks/useDebounce";

const CardComponent = React.lazy(
  () =>
    import(
      /* webpackChunkName: "__Chunk__CardComponent__" */ "../../components/Card"
    )
);
const AutoCompleteFilter = React.lazy(
  () =>
    import(
      /* webpackChunkName: "__Chunk__AutoCompleteFilter__" */ "../../components/Autocomplete/AutoCompleteFilter"
    )
);
const InfiniteScrollWrapper = React.lazy(
  () =>
    import(
      /* webpackChunkName: "__Chunk__InfiniteScrollWrapper__" */ "../../components/InfiniteScrollWrapper"
    )
);

let loadNextTimeout: NodeJS.Timeout;
const scrollTarget: string = "scrollableCharacterDiv";

const Stories = (): React.ReactElement => {
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

  const handleReset = useCallback(() => {
    setStories([]);
    setHasMore(false);
    setOffset(0);
  }, [setStories, setHasMore, setOffset]);

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

      handleReset();
      setComicSelected(value);
    },
    [setComicSelected, handleReset]
  );

  const handleChangeCharacterAutoComplete = useCallback(
    (event: React.SyntheticEvent, value: { label: string; id: string }) => {

      handleReset();
      setCharacterSelected(value);
    },
    [setCharacterSelected, handleReset]
  );

  const handleDispatchComics = useCallback(
    ({ titleStartsWith }: TParameters): AnyAction => {
      
      let parameters: TParameters = {
        ...(titleStartsWith !== "" && {
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
        ...(nameStartsWith !== "" && {
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
              <Suspense
                fallback={
                  <Skeleton
                    animation="pulse"
                    height={200}
                    width={260}
                    style={{ marginBottom: 6, borderRadius: 16 }}
                  />
                }
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
              </Suspense>
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
    <div className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>Stories</h2>

          <div className="content-center-row">
            <AutoCompleteFilter
              label="Select comic..."
              type={REQUEST.GET_COMICS}
              value={comicSelected}
              onDispatch={handleDispatchComics}
              onChange={handleChangeComicAutoComplete}
            />
            <Suspense fallback={<div>Loading...</div>}>
              <AutoCompleteFilter
                label="Select character..."
                type={REQUEST.GET_CHARACTERS}
                value={characterSelected}
                onDispatch={handleDispatchCharacters}
                onChange={handleChangeCharacterAutoComplete}
              />
            </Suspense>
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

export default Stories;
