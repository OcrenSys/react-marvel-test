import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignContent: "center",
    position: "absolute",
    left: "50%",
    bottom: "3vh",
    transform: "translate(-50%, -50%)",
  },
});

const Spinner = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root} sx={{ display: "flex" }}>
      <CircularProgress />
    </Box>
  );
};

export default Spinner;
