import { Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SelectChangeEvent } from "@mui/material/Select";

import { GET_CHARACTERS_STATE } from "../store/selectors/characters.selector";
import TCharacter from "../types/character";
import { Image } from "./image";
import useDebounce from "../hooks/useDebounce";
import SearchComponent from "./Search";
import Spinner from "./Spinners";
import SelectComics from "./Select/SelectComics";
import { RETRIEVE_COMICS } from "../store/actions/comic.actions";
import { hasComic } from "../utils/helpers";

export const Characters = (): React.ReactElement => {
  const { loading, results } = useSelector(GET_CHARACTERS_STATE);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(RETRIEVE_COMICS());
  }, [dispatch]);

  const [search, setSearch] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [comicSelected, setComicSelected] = useState<string>("");
  const debounced = useDebounce(search, 600);

  let characters: TCharacter[] = useMemo(() => {
    setIsLoading(false);
    return results.filter(
      (character: TCharacter) =>
        character.name.toLowerCase().includes(debounced.toLowerCase()) &&
        (!!comicSelected
          ? hasComic(character?.comics?.items, comicSelected)
          : true)
    );
  }, [results, debounced, comicSelected]);

  const handleChangeSearch = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    setIsLoading(true);
    setSearch(value);
  };

  const handleChangeSelect = ({ target }: SelectChangeEvent) => {
    const { value } = target;
    setIsLoading(true);
    setComicSelected(value);
  };

  useEffect(() => {
    setIsLoading(loading);
  }, [loading]);

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
            <SelectComics
              value={comicSelected}
              variant={"outlined"}
              onChange={handleChangeSelect}
            />
            <SearchComponent
              label="Search characters"
              variant={"outlined"}
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
