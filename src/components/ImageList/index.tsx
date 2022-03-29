import React, { useEffect, useState } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import TComic, { TComicExtended } from "../../types/comic";
import { useDispatch, useSelector } from "react-redux";
import { GET_CHARACTERS_COMICS_SELECTOR } from "../../store/selectors/characters.selector";
import { RETRIEVE_CHARACTER_COMICS } from "../../store/actions/characters.action";
import { getData, getSrc } from "../../utils/helpers";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import Spinner from "../Spinners";
// import { makeStyles } from "@mui/styles";
import { ThemeProvider } from "@mui/material/styles";
import { paperTheme } from "../../utils/themes";

type QuitedImageListprops = {
  characterId: number | string | undefined;
};

const srcset = (image: string, size: number, rows = 1, cols = 1) => {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
};

const QuiltedImageList = (props: QuitedImageListprops) => {
  const { characterId } = props;

  const dispatch = useDispatch();
  const { loading, results, total } = useSelector(
    GET_CHARACTERS_COMICS_SELECTOR
  );

  const [comics, setComics] = useState<TComicExtended[]>([]);

  useEffect(() => {
    dispatch(RETRIEVE_CHARACTER_COMICS(characterId));
  }, [dispatch, characterId]);

  useEffect(() => {
    setComics(getData(results));
  }, [results]);

  const renderContainer = () => {
    return comics?.length > 0 ? (
      <>
        <Typography noWrap variant="body1" color="text.secondary">
          {`Comics by character (${total} items)`}
        </Typography>
        <ThemeProvider theme={paperTheme}>
          <Paper
            sx={{ width: "100%" }}
            elevation={9}
            children={
              <ImageList
                style={{ borderRadius: 8 }}
                sx={{ width: "100%", height: 400 }}
                variant="quilted"
                cols={4}
                rowHeight={200}
              >
                {comics.map(
                  ({ images, id, title, col, row }: TComicExtended) => (
                    <ImageListItem key={id} cols={col} rows={row}>
                      <img
                        {...srcset(
                          getSrc(images[0]?.path, images[0]?.extension),
                          comics.length,
                          row,
                          col
                        )}
                        alt={title}
                        loading="lazy"
                      />
                    </ImageListItem>
                  )
                )}
              </ImageList>
            }
          />
        </ThemeProvider>
      </>
    ) : (
      <Typography
        className="text-center"
        variant="h5"
        gutterBottom
        color="text.secondary"
        component="div"
      >
        No hay comics relacionados...
      </Typography>
    );
  };

  return !loading ? <>{renderContainer()}</> : <Spinner />;
};

export default QuiltedImageList;
