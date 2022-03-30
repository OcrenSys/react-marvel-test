import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavigateOptions, useNavigate, useParams } from "react-router-dom";
import { RETRIEVE_CHARACTER_DETAILS } from "../../store/actions/characters.action";
import { GET_CHARACTERS_DETAILS_SELECTOR } from "../../store/selectors/characters.selector";
import TCharacter from "../../types/character";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import QuiltedImageList from "../../components/ImageList";
import { ThemeProvider } from "@mui/material/styles";
import { paperTheme } from "../../utils/themes";
import { getSrc } from "../../utils/helpers";
import { REQUEST } from "../../utils/constant";

export const CharacterDetails = (): React.ReactElement => {
  let navigate = useNavigate();
  let { id } = useParams();

  const dispatch = useDispatch();
  const [character, setCharacter] = useState<TCharacter>();
  const { loading, results, total } = useSelector(
    GET_CHARACTERS_DETAILS_SELECTOR
  );

  const handleRedirect = (url: string) => {
    const options: NavigateOptions = {
      replace: false,
      state: {},
    };
    return navigate(url, options);
  };

  useEffect(() => {
    const [first] = results;
    setCharacter(first);
  }, [results]);

  useEffect(() => {
    dispatch(RETRIEVE_CHARACTER_DETAILS(id));
  }, [dispatch, id]);

  return (
    <div className="top-100">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-4">
            <ThemeProvider theme={paperTheme}>
              <Paper
                style={{ borderRadius: 8 }}
                elevation={9}
                children={
                  <img
                    style={{ borderRadius: 8, minHeight: 600 }}
                    src={getSrc(
                      character?.thumbnail?.path,
                      character?.thumbnail?.extension
                    )}
                    className="img-responsive"
                    alt=""
                  />
                }
              />
            </ThemeProvider>
          </div>

          <div className="col-xs-12 col-md-8">
            <div className="about-text">
              <div className=" col-xs-6">
                <div className="section-title text-center">
                  <Typography gutterBottom variant="h2" component="div">
                    {character?.name}
                  </Typography>
                  <Typography noWrap variant="body1" color="text.secondary">
                    {character?.description || ""}
                  </Typography>
                </div>

                <QuiltedImageList
                  id={id}
                  variant={"masonry"}
                  title={"Comic's characters, "}
                  message={"Characters not found..."}
                  type={REQUEST.GET_CHARACTER_COMICS}
                  onRedirect={(id) => handleRedirect(`/comics/details/${id}`)}
                />
              </div>

              <div className=" col-xs-6">
                <div className="section-title text-center">
                  <Typography gutterBottom variant="h2" component="div">
                    {character?.name}
                  </Typography>
                  <Typography noWrap variant="body1" color="text.secondary">
                    {character?.description || ""}
                  </Typography>
                </div>

                <QuiltedImageList
                  id={id}
                  variant={"masonry"}
                  title={"Story's characters, "}
                  message={"Stories not found..."}
                  type={REQUEST.GET_CHARACTER_STORIES}
                  onRedirect={(id) => handleRedirect(`/stories/details/${id}`)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
