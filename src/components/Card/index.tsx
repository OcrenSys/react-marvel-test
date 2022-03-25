import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Button, CardActionArea, CardActions } from "@mui/material";

type TCardProps = {
  title: string;
  description?: string;
  src: string;
  onRedirect?: () => void;
};

const CardComponent = ({
  title,
  description,
  src,
  onRedirect,
}: TCardProps) => {
  return (
    <Card style={{ marginBottom: 8 }} sx={{ maxWidth: 345, height: 260 }}>
      <CardMedia component="img" height="140" image={src} alt={title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography noWrap variant="body1" color="text.secondary">
          {description || ""}
        </Typography>
      </CardContent>

      <CardActions
        style={{
          display: "flex",
          alignContent: "center",
          justifyContent: "flex-end",
        }}
      >
        <Button
          color="primary"
          variant="outlined"
          endIcon={<ArrowForwardIosIcon style={{ fontSize: 10 }} />}
          size="small"
          onClick={onRedirect}
        >
          Ver más
        </Button>
      </CardActions>
    </Card>
  );
};

export default CardComponent;
