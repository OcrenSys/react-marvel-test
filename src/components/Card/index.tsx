import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { CardActions, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_FAVORITES_ACTION,
  SET_FAVORITES_ACTION,
} from "../../store/actions/favorite.action";
import TFavorites, { TFavorite } from "../../types/favorite";
import TCharacter from "../../types/character";
import TComic from "../../types/comic";
import TStory from "../../types/story";
import { useAuth0 } from "@auth0/auth0-react";
import { getStoragedUser } from "../../utils/helpers";
import User from "../../types/user";
import { GET_FAVORITES_SELECTOR } from "../../store/selectors/favorites.selector";

type TCardProps = {
  title: string;
  entity: TComic | TCharacter | TStory;
  src: string;
  onRedirect?: () => void;
};

const CardComponent = ({ entity, title, src, onRedirect }: TCardProps) => {
  const dispatch = useDispatch();
  const { list } = useSelector(GET_FAVORITES_SELECTOR);

  const { isLoading, isAuthenticated, loginWithRedirect, user } = useAuth0();
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [userStorage, setUserStorage] = useState<User>(getStoragedUser());

  const handleFavorite = () => {
    if (userStorage) {
      const params: TFavorites = {
        userId: userStorage?.sub,
        type: "characters",
      };

      dispatch(SET_FAVORITES_ACTION(params, { itemId: entity.id }));
    } else loginWithRedirect();
  };

  useEffect(() => {
    if (isAuthenticated) localStorage.setItem("user", JSON.stringify(user));
  });

  useEffect(() => {
    if (userStorage)
      dispatch(
        GET_FAVORITES_ACTION({ userId: userStorage?.sub, type: "characters" })
      );
  }, [dispatch, userStorage]);

  useEffect(() => {
    setIsFavorite(
      (list || []).some(({ itemId }: TFavorite) => itemId === entity.id) ||
        false
    );
  }, [dispatch, list, entity.id]);

  return (
    <Card style={{ marginBottom: 8 }} sx={{ maxWidth: 345, height: 260 }}>
      <CardMedia component="img" height="140" image={src} alt={title} />
      <CardContent>
        <Typography
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          gutterBottom
          variant="h5"
          component="div"
        >
          {entity.id} | {title}
        </Typography>
        {entity?.description !== null && (
          <Typography
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            noWrap
            variant="body1"
            color="text.secondary"
          >
            {entity?.description || ""}
          </Typography>
        )}
      </CardContent>

      <CardActions
        style={{
          display: "flex",
          alignContent: "center",
          justifyContent: "flex-end",
        }}
      >
        <IconButton
          aria-label="add to favorites"
          color="primary"
          onClick={handleFavorite}
        >
          {(isFavorite && <FavoriteIcon />) || <FavoriteBorderIcon />}
        </IconButton>
        <IconButton
          aria-label="more details"
          color="primary"
          onClick={onRedirect}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default CardComponent;
