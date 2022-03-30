import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import QuiltedImageList from "../../components/ImageList";
import { ThemeProvider } from "@mui/material/styles";
import { paperTheme } from "../../utils/themes";
import { GET_COMICS_DETAILS_SELECTOR } from "../../store/selectors/comics.selector";
import TComic from "../../types/comic";
import { RETRIEVE_COMIC_DETAILS } from "../../store/actions/comic.actions";
import { getSrc } from "../../utils/helpers";

export const ComicDetails = (): React.ReactElement => {
  let { id } = useParams();

  const dispatch = useDispatch();
  const [comic, setComic] = useState<TComic>();
  const { loading, results, total } = useSelector(
    GET_COMICS_DETAILS_SELECTOR
  );

  useEffect(() => {
    const [first, ] = results;
    setComic(first);
  }, [results]);

  useEffect(() => {
    dispatch(RETRIEVE_COMIC_DETAILS(id));
  }, [dispatch, id]);

  return (
    <div className="top-100">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <ThemeProvider theme={paperTheme}>
              <Paper
                style={{ borderRadius: 8 }}
                elevation={9}
                children={
                  <img
                    style={{ borderRadius: 8, minHeight: 600}}
                    src={getSrc(comic?.thumbnail?.path, comic?.thumbnail?.extension)}
                    className="img-responsive"
                    alt=""
                  />
                }
              />
            </ThemeProvider>
          </div>

          <div className="col-xs-12 col-md-6">
            <div className="about-text">
              <div className=" col-xs-12">
                <div className="section-title text-center">
                  <Typography gutterBottom variant="h2" component="div">
                    {comic?.title}
                  </Typography>
                  <Typography noWrap variant="body1" color="text.secondary">
                    {comic?.description || ""}
                  </Typography>
                </div>

                <QuiltedImageList id={id} type={"comic"} message={"Characters not found"}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
