import React from "react";
import { Suspense, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Skeleton, Typography } from "@mui/material";
import { AnyAction } from "@reduxjs/toolkit";
import { GET_CHARACTERS_SELECTOR } from "../../store/selectors/characters.selector";
import { RETRIEVE_CHARACTERS } from "../../store/actions/characters.action";
import { RETRIEVE_COMICS } from "../../store/actions/comic.actions";
import { constants, REQUEST } from "../../utils/constant";
import { NavigateOptions, useNavigate } from "react-router-dom";
import { getSrc, getStoragedFavorites } from "../../utils/helpers";
import TParameters from "../../types/parameters";
import TOption from "../../types/TOption";
import useDebounce from "../../hooks/useDebounce";
import TCharacter from "../../types/character";
import { useAuth0 } from "@auth0/auth0-react";
import { GET_FAVORITES_ACTION } from "../../store/actions/favorite.action";
import { GET_FAVORITES_SELECTOR } from "../../store/selectors/favorites.selector";
import TFavorites, { TFavorite } from "../../types/favorite";

const CardComponent = React.lazy(
  () =>
    import(
      /* webpackChunkName: "__Chunk__CardComponent__" */ "../../components/Card"
    )
);
const SearchComponent = React.lazy(
  () =>
    import(
      /* webpackChunkName: "__Chunk__SearchComponent__" */ "../../components/Search"
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

const Favorites = (): React.ReactElement => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { list } = useSelector(GET_FAVORITES_SELECTOR);

  const [search, setSearch] = useState<string>("");
  const [favoriteCharacters, setFavoriteCharacters] = useState<TFavorite[]>(
    getStoragedFavorites("", "characters")
  );
  const [favoriteComics, setFavoriteComics] = useState<TFavorite[]>(
    getStoragedFavorites("", "comics")
  );
  const [favoriteStories, setFavoriteStories] = useState<TFavorite[]>(
    getStoragedFavorites("", "stories")
  );
  const [offset, setOffset] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const searchDebounced: string = useDebounce(search, 600);

  const handleNext = () => {
    setHasMore(false);
    clearTimeout(loadNextTimeout);

    loadNextTimeout = setTimeout(() => {
      setOffset((prev) => prev + constants.offset);
    }, 500);
  };

  const handleRedirect = (
    id: number | string,
    type: "characters" | "comics" | "stories" | ""
  ) => {
    const options: NavigateOptions = {
      replace: false,
      state: {},
    };
    return navigate(`/${type}/details/${id}`, options);
  };

  const handleChangeSearch = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    setFavoriteCharacters([]);
    setHasMore(false);
    setOffset(0);
    setSearch(value);
  };

  useEffect(() => {
    console.log("characters list...", list);

    setFavoriteCharacters((prev) => [...prev, ...(list || [])]);
    setHasMore(
      1 > constants.offset ? favoriteCharacters.length < 1 : false
    );

    return () => {};
  }, []);

  useEffect(() => {
    let parameters: TFavorites = {
      userId: "",
      type: "characters",
    };

    parameters = {
      ...parameters,
    };

    dispatch(GET_FAVORITES_ACTION(parameters));
  }, [dispatch, searchDebounced]);

  const renderContainer = (): React.ReactElement | React.ReactElement[] => (
    <div className="">
      <div className="portfolio-items">
        {favoriteCharacters.length ? (
          favoriteCharacters?.map((favorite: TFavorite, i: number) => (
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
                  title={favorite.title}
                  src={getSrc(
                    favorite?.thumbnail?.path,
                    favorite?.thumbnail?.extension
                  )}
                  entity={favorite}
                  onRedirect={() => handleRedirect(favorite.id, "characters")}
                />
              </Suspense>
            </div>
          ))
        ) : !favoriteCharacters.length ? (
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
          <h2>Favorites</h2>

          <div className="content-center-row">
            <SearchComponent
              label="Search favorites"
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
            length={favoriteCharacters.length}
            scrollableTarget={scrollTarget}
          >
            {renderContainer()}
          </InfiniteScrollWrapper>
        </div>
      </div>
    </div>
  );
};

export default Favorites;
