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
import InfiniteScroll from "react-infinite-scroll-component";
import { TOption } from "../types/TOption";
import { constants } from "../utils/constant";
import { RETRIEVE_CHARACTERS } from "../store/actions/characters.action";

let loadNextTimeout: NodeJS.Timeout;

export const Characters = (): React.ReactElement => {
  const dispatch = useDispatch();

  const { loading, results, count, limit, total } = useSelector(
    GET_CHARACTERS_SELECTOR
  );

  const [search, setSearch] = useState<string>();
  const [offset, setOffset] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [characters, setCharacters] = useState<TCharacter[]>([]);
  const [comicSelected, setComicSelected] = useState<TOption>({
    label: "",
    id: "",
  });
  const debounced: string = useDebounce(search, 600);

  let data: TCharacter[] = useMemo(() => {
    let result: TCharacter[] = characters;

    if (debounced)
      result = characters.filter((character: TCharacter) =>
        hasSearch(character.name, debounced)
      );

    if (comicSelected?.id)
      result = characters.filter((character: TCharacter) =>
        hasComic(character?.comics?.items, comicSelected?.id)
      );

    return result;
  }, [characters, debounced, comicSelected]);

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

  const handleDistpach = useCallback((titleStartsWith: string): AnyAction => {
    return RETRIEVE_COMICS({ titleStartsWith: titleStartsWith || "" });
  }, []);

  const handleNext = () => {
    console.log("handleNext...");
    setHasMore(false);
    clearTimeout(loadNextTimeout);

    loadNextTimeout = setTimeout(() => {
      setOffset((prev) => prev + constants.offset);
    }, 3000);
  };

  useEffect(() => {
    console.log("setCharacters...");

    setHasMore(true);
    setCharacters((prev) => [...prev, ...results]);
  }, [results, offset]);

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
          <Image
            title={c.name}
            largeImage={`${c.thumbnail.path}.${c.thumbnail.extension}`}
            smallImage={`${c.thumbnail.path}.${c.thumbnail.extension}`}
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
          <h2>Characters</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit duis sed
            dapibus leonec.
          </p>
          <div className="content-center-row">
            <AutoCompleteFilter
              variant={"outlined"}
              value={comicSelected}
              onDispatch={handleDistpach}
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

        <div id="scrollableDiv">
          <InfiniteScroll
            dataLength={characters.length}
            next={handleNext}
            // style={{ display: "flex", flexDirection: "column-reverse" }} //To put endMessage and loader to the top.
            hasMore={hasMore}
            loader={
              <Typography variant="h5" gutterBottom component="div">
                Loading
              </Typography>
            }
            height={"70vh"}
            scrollableTarget="scrollableDiv"
          >
            {RenderContainer()}
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
};
