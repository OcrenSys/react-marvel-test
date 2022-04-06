import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData, getDispatch, getSelector, getSrc } from "../../utils/helpers";
import { ImageListItemBar, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { paperTheme } from "../../utils/themes";
import { REQUEST } from "../../utils/constant";
import { TData, TThumbnail } from "../../types";
import TCharacter from "../../types/character";
import TComic, { TComicExtended } from "../../types/comic";
import TStory, { TStoryExtended } from "../../types/story";
import Paper from "@mui/material/Paper";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Spinner from "../Spinners";

type QuitedImageListprops = {
  id: number | string | undefined;
  type: REQUEST;
  title?: string;
  variant?: "quilted" | "masonry";
  message?: string;
  onRedirect?: (id: number | string) => void;
};

const srcset = (image: string, size: number, rows = 1, cols = 1) => {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
};

const QuiltedImageList = (props: QuitedImageListprops): React.ReactElement => {
  const { id, type, variant, title, message, onRedirect } = props;

  const dispatch = useDispatch();
  const selector: any = useSelector(getSelector(type));
  const { loading, results, total } = selector;

  const [data, setData] = useState<
    TComicExtended[] | TComicExtended[] | TStoryExtended[]
  >([]);

  useEffect(() => {
    dispatch(getDispatch(type, id));
  }, [dispatch, id]);

  useEffect(() => {
    setData(getData(results));
  }, [results]);

  const getImage = (thumbnail?: TThumbnail, images?: any[]) => {
    return {
      path: thumbnail
        ? thumbnail?.path
        : images?.length
        ? images[0]?.path
        : undefined,
      extension: thumbnail
        ? thumbnail?.extension
        : images?.length
        ? images[0]?.extension
        : undefined,
    };
  };

  const getSrcImage = (
    thumbnail?: TThumbnail,
    images?: any[]
  ): { src: string; srcSet: string } => {
    const result: string = getSrc(
      getImage(thumbnail, images).path,
      getImage(thumbnail, images).extension
    );

    return result === "img/not_found.png"
      ? {
          src: `${result}`,
          srcSet: `${result}`,
        }
      : {
          src: `${result}?w=248&fit=crop&auto=format`,
          srcSet: `${result}?w=248&fit=crop&auto=format&dpr=2 2x`,
        };
  };

  const quilted = (): React.ReactElement => (
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
          {data?.map(
            ({
              images,
              thumbnail,
              id,
              title,
              col,
              row,
            }: TComicExtended | TComicExtended | TStoryExtended) => (
              <ImageListItem key={id} cols={col} rows={row}>
                <img
                  {...srcset(
                    getSrc(
                      getImage(thumbnail, images).path,
                      getImage(thumbnail, images).extension
                    ),
                    data.length,
                    row,
                    col
                  )}
                  alt={title}
                  loading="lazy"
                  onClick={() => onRedirect && onRedirect(id)}
                />
              </ImageListItem>
            )
          )}
        </ImageList>
      }
    />
  );

  const masonry = (): React.ReactElement => (
    <Paper
      sx={{ width: "100%", height: 450, overflowY: "scroll" }}
      elevation={9}
      children={
        <ImageList variant="masonry" cols={3} gap={8}>
          {data?.map(
            ({
              images,
              thumbnail,
              id,
              title,
              name,
            }: TComicExtended | TComicExtended | TStoryExtended, index: number) => (
              <div key={index}>
                <ImageListItem>
                  <img
                    src={getSrcImage(thumbnail, images).src}
                    srcSet={getSrcImage(thumbnail, images).srcSet}
                    alt={name || title || "---"}
                    loading="lazy"
                    onClick={() => onRedirect && onRedirect(id)}
                  />
                </ImageListItem>
                <ImageListItemBar position="below" title={title} />
              </div>
            )
          )}
        </ImageList>
      }
    />
  );

  const renderContainer = (): React.ReactElement => {
    return data?.length > 0 ? (
      <>
        <Typography noWrap variant="h4" color="text.secondary">
          {`${title} (${total} items)`}
        </Typography>
        <ThemeProvider theme={paperTheme}>
          {variant === "quilted" ? quilted() : masonry()}
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
  message: "No results found...",
  title: "Resultados, ",
  variant: "quilted",
};

export default QuiltedImageList;
