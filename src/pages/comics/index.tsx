import React, { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RETRIEVE_COMICS } from "../../store/actions/comic.actions";
import { constants } from "../../utils/constant";
import { NavigateOptions, useNavigate } from "react-router-dom";
import { GET_COMICS_SELECTOR } from "../../store/selectors/comics.selector";
import { SelectChangeEvent, Skeleton, Typography } from "@mui/material";
import { getSrc } from "../../utils/helpers";
import TParameters from "../../types/parameters";
import TComic from "../../types/comic";
import TOption from "../../types/TOption";
import useDebounce from "../../hooks/useDebounce";

const CardComponent = React.lazy(() => import(/* webpackChunkName: "__Chunk__CardComponent__" */ "../../components/Card"));
const SelectComponent = React.lazy(() => import(/* webpackChunkName: "__Chunk__SelectComponent__" */ "../../components/Select"));
const SearchComponent = React.lazy(() => import(/* webpackChunkName: "__Chunk__SearchComponent__" */ "../../components/Search"));
const InfiniteScrollWrapper = React.lazy(
  () => import(/* webpackChunkName: "__Chunk__InfiniteScrollWrapper__" */ "../../components/InfiniteScrollWrapper")
);

let loadNextTimeout: NodeJS.Timeout;
const scrollTarget: string = "scrollableCharacterDiv";

const formatFilter: TOption[] = [
  {
    id: "comic",
    label: "Comic",
  },
  {
    id: "magazine",
    label: "Magazine",
  },
  {
    id: "trade paperback",
    label: "Trade Paperback",
  },
  {
    id: "hardcover",
    label: "Hard Cover",
  },
  {
    id: "digest",
    label: "Digest",
  },
  {
    id: "graphic novel",
    label: "Graphic Novel",
  },
  {
    id: "digital comic",
    label: "Digital Comic",
  },
  {
    id: "infinite comic",
    label: "Infinite Scroll",
  },
];
const orderByFilter = [
  { label: "FOC Date", id: "focDate" },
  { label: "On Sale Data", id: "onSaleData" },
  { label: "Title", id: "title" },
  { label: "Issue Number", id: "issueNumber" },
  { label: "Modified", id: "modified" },
];

const Comics = (): React.ReactElement => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, results, total } = useSelector(GET_COMICS_SELECTOR);

  const [search, setSearch] = useState<string>("");
  const [formatSelected, setFormatSelected] = useState<string>("");
  const [offset, setOffset] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [comics, setComics] = useState<TComic[]>(results);
  const searchDebounced: string = useDebounce(search, 600);

  const handleChangeSearch = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    setComics([]);
    setHasMore(false);
    setOffset(0);
    setSearch(value);
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
    return navigate(`/comics/details/${id}`, options);
  };

  const handleFormatSelect = (event: SelectChangeEvent<string>) => {
    setComics([]);
    setHasMore(false);
    setOffset(0);
    setFormatSelected(event.target.value);
  };

  useEffect(() => {
    setComics((prev) => [...prev, ...results]);
    setHasMore(total > constants.offset ? comics.length < total : false);

    return () => {};
  }, [results, total]);

  useEffect(() => {
    let parameters: TParameters = {
      offset: offset,
      ...(formatSelected !== "" && { format: formatSelected }),
      ...(searchDebounced !== "" && { titleStartsWith: searchDebounced }),
    };

    dispatch(RETRIEVE_COMICS(parameters));
  }, [dispatch, offset, searchDebounced, formatSelected]);

  const renderContainer = (): React.ReactElement | React.ReactElement[] => (
    <div className="">
      <div className="portfolio-items">
        {comics.length ? (
          comics?.map((comic: TComic, i: number) => (
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
                  title={comic.title}
                  src={getSrc(
                    comic?.thumbnail?.path,
                    comic?.thumbnail?.extension
                  )}
                  entity={comic}
                  onRedirect={() => handleRedirect(comic.id)}
                />
              </Suspense>
            </div>
          ))
        ) : !loading && !comics.length ? (
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
          <h2>Comics</h2>

          <div className="content-center-row">
            <SelectComponent
              label={"Comic Format"}
              value={""}
              filters={formatFilter}
              onChange={handleFormatSelect}
            />
            <SearchComponent
              label="Search comics"
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
            length={comics.length}
            scrollableTarget={scrollTarget}
          >
            {renderContainer()}
          </InfiniteScrollWrapper>
        </div>
      </div>
    </div>
  );
};

export default Comics;
