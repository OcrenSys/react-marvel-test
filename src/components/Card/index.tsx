import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { CardActions, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

type TCardProps = {
  title: string;
  description?: string;
  src: string;
  onRedirect?: () => void;
};

const CardComponent = ({ title, description, src, onRedirect }: TCardProps) => {
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
          {title}
        </Typography>
        {description !== null && (
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
            {description || ""}
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
          onClick={onRedirect}
        >
          <FavoriteIcon />
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
