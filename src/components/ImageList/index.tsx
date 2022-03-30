import { useEffect, useState } from "react";
import { TComicExtended } from "../../types/comic";
import { useDispatch, useSelector } from "react-redux";
import { getData, getDispatch, getSelector, getSrc } from "../../utils/helpers";
import { Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { paperTheme } from "../../utils/themes";
import Paper from "@mui/material/Paper";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Spinner from "../Spinners";
import { TStoryExtended } from "../../types/stories";

type QuitedImageListprops = {
  id: number | string | undefined;
  type: "character" | "comic" | "story";
  message?: string;
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
  const { id, type, message } = props;

  const dispatch = useDispatch();

  const { loading, results, total } = useSelector(getSelector(type));

  const [data, setData] = useState<TComicExtended[] | TComicExtended[] | TStoryExtended[]>([]);

  useEffect(() => {
    dispatch(getDispatch(type, id));
  }, [dispatch, id]);

  useEffect(() => {
    setData(getData(results));
  }, [results]);

  const renderContainer = () => {
    return data?.length > 0 ? (
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
                {data.map(
                  ({ images: [first, ], id, title, col, row }: TComicExtended | TComicExtended | TStoryExtended) => (
                    <ImageListItem key={id} cols={col} rows={row}>
                      <img
                        {...srcset(
                          getSrc(first?.path, first?.extension),
                          data.length,
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
        variant="h3"
        gutterBottom
        color="text.secondary"
        component="div"
      >
       {message}
      </Typography>
    );
  };

  return !loading ? <>{renderContainer()}</> : <Spinner />;
};

QuiltedImageList.defaultProps = {
  message: "No results found..."
}

export default QuiltedImageList;
