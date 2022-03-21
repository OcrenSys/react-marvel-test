import {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { GET_CHARACTERS_SELECTOR } from "../store/selectors/characters.selector";
import TCharacter from "../types/character";
import { Image } from "./image";
import useDebounce from "../hooks/useDebounce";
import SearchComponent from "./Search";
import Spinner from "./Spinners";
import AutoCompleteFilter from "./Select/AutoCompleteFilter";
import { hasComic, hasSearch } from "../utils/helpers";
import { RETRIEVE_COMICS } from "../store/actions/comic.actions";
import { AnyAction } from "@reduxjs/toolkit";

export const Characters = (): React.ReactElement => {
  const { loading, results } = useSelector(GET_CHARACTERS_SELECTOR);

  const [search, setSearch] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [comicSelected, setComicSelected] = useState<{
    label: string;
    id: string;
  }>({ label: "", id: "" });
  const debounced: string = useDebounce(search, 600);

  let characters: TCharacter[] = useMemo(() => {
    setIsLoading(false);

    let result: TCharacter[] = results;

    console.log(debounced)
    if (debounced)
      result = results.filter((character: TCharacter) =>
        hasSearch(character.name, debounced)
      );

    if (comicSelected?.id)
      result = results.filter((character: TCharacter) =>
        hasComic(character?.comics?.items, comicSelected?.id)
      );

    return result;
  }, [results, debounced, comicSelected]);

  const handleChangeSearch = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    setIsLoading(true);
    setSearch(value);
  };

  const handleChangeAutoComplete = (
    event: React.SyntheticEvent,
    value: { label: string; id: string },
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<any>
  ) => {
    setIsLoading(true);
    setComicSelected(value);
  };

  useEffect(() => {
    setIsLoading(loading);
  }, [loading]);

  const handleDistpach = (titleStartsWith: string): AnyAction => {
    return RETRIEVE_COMICS({
      titleStartsWith: titleStartsWith || "",
    })
  }

  const RenderCharacters = (): React.ReactElement | React.ReactElement[] =>
    characters.length ? (
      characters?.map((c: TCharacter, i: number) => (
        <div key={i} className="col-sm-6 col-md-4 col-lg-4">
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
    <div id="portfolio" className="text-center">
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
              onDispatch={handleDistpach}
              onChange={handleChangeAutoComplete}
            />
            <hr />
            <SearchComponent
              label="Search characters"
              variant={"outlined"}
              value={search}
              onChange={handleChangeSearch}
            ></SearchComponent>
          </div>
        </div>

        <div className="row">
          <div className="portfolio-items">
            {!isLoading ? RenderCharacters() : <Spinner />}
          </div>
        </div>
      </div>
    </div>
  );
};
