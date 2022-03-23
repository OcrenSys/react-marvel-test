import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

type TCardProps = {
  title: string;
  description?: string;
  src: string;
};

export default function CardComponent({
  title,
  description,
  src,
}: TCardProps) {
  return (
    <Card style={{marginBottom: 16}} sx={{ maxWidth: 345, minHeight: 300}}>
      <CardActionArea>
        <CardMedia component="img" height="140" image={src} alt={title} />
        <CardContent >
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          {description && (
            <Typography variant="body1" color="text.secondary">
              {description}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}