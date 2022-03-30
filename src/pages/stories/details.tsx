import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavigateOptions, useNavigate, useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { paperTheme } from "../../utils/themes";
import { GET_COMICS_DETAILS_SELECTOR } from "../../store/selectors/comics.selector";
import { RETRIEVE_COMIC_DETAILS } from "../../store/actions/comic.actions";
import { getSrc } from "../../utils/helpers";
import { REQUEST } from "../../utils/constant";
import QuiltedImageList from "../../components/ImageList";
import Paper from "@mui/material/Paper";
import TComic from "../../types/comic";

export const StoryDetails = (): React.ReactElement => {
  let navigate = useNavigate();
  let { id } = useParams();

  const dispatch = useDispatch();
  const [story, setStory] = useState<TComic>();
  const { loading, results, total } = useSelector(GET_COMICS_DETAILS_SELECTOR);

  const handleRedirect = (url: string) => {
    const options: NavigateOptions = {
      replace: false,
      state: {},
    };
    return navigate(url, options);
  };

  useEffect(() => {
    const [first] = results;
    setStory(first);
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
                    style={{ borderRadius: 8, minHeight: 600 }}
                    src={getSrc(
                      story?.thumbnail?.path,
                      story?.thumbnail?.extension
                    )}
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
                    {story?.title}
                  </Typography>
                  <Typography noWrap variant="body1" color="text.secondary">
                    {story?.description || ""}
                  </Typography>
                </div>

                <QuiltedImageList
                  id={id}
                  variant={"masonry"}
                  title={"Character's story, "}
                  message={"Characters not found..."}
                  type={REQUEST.GET_STORY_CHARACTERS}
                  onRedirect={(id) => handleRedirect(`/characters/details/${id}`)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
