import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@mui/material";

import AutoCompleteFilter from "../../components/Autocomplete/AutoCompleteFilter";
import InfiniteScrollWrapper from "../../components/InfiniteScrollWrapper";
import SearchComponent from "../../components/Search";
import CardComponent from "../../components/Card";
import useDebounce from "../../hooks/useDebounce";

import { GET_CHARACTERS_SELECTOR } from "../../store/selectors/characters.selector";
import TCharacter from "../../types/character";
import TOption from "../../types/TOption";
import { RETRIEVE_COMICS } from "../../store/actions/comic.actions";
import { AnyAction } from "@reduxjs/toolkit";
import { TParameters } from "../../types/parameters";
import { RETRIEVE_CHARACTERS } from "../../store/actions/characters.action";
import { constants } from "../../utils/constant";
import { Navigate, NavigateOptions, useNavigate } from "react-router-dom";

let loadNextTimeout: NodeJS.Timeout;
const scrollTarget: string = "scrollableCharacterDiv";

export const Characters = (): React.ReactElement => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, results, total } = useSelector(GET_CHARACTERS_SELECTOR);

  const [search, setSearch] = useState<string>("");
  const [offset, setOffset] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [characters, setCharacters] = useState<TCharacter[]>(results);
  const searchDebounced: string = useDebounce(search, 600);
  const [comicSelected, setComicSelected] = useState<TOption>({
    label: "",
    id: "",
  });

  const handleChangeSearch = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    setCharacters([]);
    setHasMore(false);
    setOffset(0);
    setSearch(value);
  };

  const handleChangeAutoComplete = useCallback(
    (event: React.SyntheticEvent, value: { label: string; id: string }) => {
      setCharacters([]);
      setHasMore(false);
      setOffset(0);
      setComicSelected(value);
    },
    [setComicSelected]
  );

  const handleDistpachComics = useCallback(
    (titleStartsWith: string): AnyAction => {
      return RETRIEVE_COMICS({ titleStartsWith: titleStartsWith || "" });
    },
    []
  );

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
    return navigate(`/characters/details/${characterId}`, options);
  };

  const renderContainer = (): React.ReactElement | React.ReactElement[] => (
    <div className="">
      <div className="portfolio-items">
        {characters.length ? (
          characters?.map((c: TCharacter, i: number) => (
            <div
              key={i}
              style={{ paddingRight: 4, paddingLeft: 4 }}
              className="col-sm-4 col-md-3 col-lg-3"
            >
              <CardComponent
                title={c.name}
                src={`${c.thumbnail.path}.${c.thumbnail.extension}`}
                description={`${c.description}`}
                onRedirect={() => handleRedirect(c.id)}
              />
            </div>
          ))
        ) : !loading && !characters.length ? (
          <Typography variant="h5" gutterBottom component="div">
            No se encontraron registros
          </Typography>
        ) : (
          <></>
        )}
      </div>
    </div>
  );

  useEffect(() => {
    setCharacters((prev) => [...prev, ...results]);
    setHasMore(total > constants.offset ? characters.length < total : false);

    return () => {};
  }, [results, total]);

  useEffect(() => {
    let parameters: TParameters = {
      offset: offset,
    };
    if (searchDebounced !== "")
      parameters = {
        ...parameters,
        nameStartsWith: searchDebounced,
      };
    if (comicSelected?.id)
      parameters = {
        ...parameters,
        comics: parseInt(comicSelected?.id),
      };

    dispatch(RETRIEVE_CHARACTERS(parameters));
  }, [dispatch, offset, searchDebounced, comicSelected]);
  
  return (
    <div className="top-100  text-center">
      <div className="container">
        <div className="section-title">
          <h2>Charactersc</h2>

          <div className="content-center-row">
            <AutoCompleteFilter
              variant={"outlined"}
              value={comicSelected}
              onDispatch={handleDistpachComics}
              onChange={handleChangeAutoComplete}
            />
            <SearchComponent
              label="Search characters"
              variant={"outlined"}
              value={search}
              onChange={handleChangeSearch}
            ></SearchComponent>
          </div>
        </div>

        <div id={scrollTarget}>
          <InfiniteScrollWrapper
            hasMore={hasMore}
            handleNext={handleNext}
            length={characters.length}
            scrollableTarget={scrollTarget}
          >
            {renderContainer()}
          </InfiniteScrollWrapper>
        </div>
      </div>
    </div>
  );
};
