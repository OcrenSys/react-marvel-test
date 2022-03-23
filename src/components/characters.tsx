import {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_CHARACTERS_SELECTOR } from "../store/selectors/characters.selector";
import TCharacter from "../types/character";
import { Image } from "./image";
import useDebounce from "../hooks/useDebounce";
import SearchComponent from "./Search";
import Spinner from "./Spinners";
import { hasComic, hasSearch } from "../utils/helpers";
import { RETRIEVE_COMICS } from "../store/actions/comic.actions";
import { AnyAction } from "@reduxjs/toolkit";
import AutoCompleteFilter from "./Autocomplete/AutoCompleteFilter";
import { TOption } from "../types/TOption";
import { constants } from "../utils/constant";
import { RETRIEVE_CHARACTERS } from "../store/actions/characters.action";
import InfiniteScrollWrapper from "./InfiniteScrollWrapper";
import CardComponent from "./Card";

let loadNextTimeout: NodeJS.Timeout;
const scrollTarget: string = "scrollableCharacterDiv";

export const Characters = (): React.ReactElement => {
  const dispatch = useDispatch();
  const { loading, results, count, limit, total } = useSelector(
    GET_CHARACTERS_SELECTOR
  );

  const [search, setSearch] = useState<string>();
  const [offset, setOffset] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [characters, setCharacters] = useState<TCharacter[]>(results);
  const searchDebounced: string = useDebounce(search, 600);
  const [comicSelected, setComicSelected] = useState<TOption>({
    label: "",
    id: "",
  });

  let data: TCharacter[] = useMemo(() => {
    let result: TCharacter[] = characters;

    if (searchDebounced)
      result = characters.filter((character: TCharacter) =>
        hasSearch(character.name, searchDebounced)
      );

    if (comicSelected?.id)
      result = characters.filter((character: TCharacter) =>
        hasComic(character?.comics?.items, comicSelected?.id)
      );

    return result;
  }, [characters, searchDebounced, comicSelected]);

  const handleChangeSearch = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    setSearch(value);
  };

  const handleChangeAutoComplete = useCallback(
    (
      event: React.SyntheticEvent,
      value: { label: string; id: string },
      reason: AutocompleteChangeReason,
      details?: AutocompleteChangeDetails<any>
    ) => {
      setComicSelected(value);
    },
    [setComicSelected]
  );

  const handleDistpachComics = useCallback((titleStartsWith: string): AnyAction => {
    return RETRIEVE_COMICS({ titleStartsWith: titleStartsWith || "" });
  }, []);

  const handleNext = () => {
    console.log("handleNext...");
    setHasMore(false);
    clearTimeout(loadNextTimeout);

    loadNextTimeout = setTimeout(() => {
      setOffset((prev) => prev + constants.offset);
    }, 300);
  };

  useEffect(() => {
    console.log("setCharacters...");

    setCharacters((prev) => [...prev, ...results]);
    setHasMore(true);

    return () => {}
  }, [results, offset]) ;

  useEffect(() => {
    dispatch(RETRIEVE_CHARACTERS({ offset: offset || 0 }));
  }, [dispatch, offset]);

  const RenderContainer = (): React.ReactElement | React.ReactElement[] => (
    <div className="content-center-row">
      <div className="portfolio-items">{RenderCharacters()}</div>
    </div>
  );

  const RenderCharacters = (): React.ReactElement | React.ReactElement[] =>
    data.length ? (
      data?.map((c: TCharacter, i: number) => (
        <div key={i} className="col-sm-4 col-md-3 col-lg-3">
           <CardComponent
            title={c.name}
            src={`${c.thumbnail.path}.${c.thumbnail.extension}`}
            description={`${c.description}`}
          />
        </div>
      ))
    ) : (
      <Typography variant="h5" gutterBottom component="div">
        No se encontraron registros
      </Typography>
    );

  return (
    <div className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>Charactersc</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit duis sed
            dapibus leonec.
            {characters.length}
          </p>
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

        <div className="cotainer" id={scrollTarget} style={{ height: "70vh", overflow: "auto" }}>
          <InfiniteScrollWrapper
            hasMore={hasMore}
            handleNext={handleNext}
            length={characters.length}
            scrollableTarget={scrollTarget}
          >
            {RenderContainer()}
          </InfiniteScrollWrapper>
        </div>
      </div>
    </div>
  );
};
