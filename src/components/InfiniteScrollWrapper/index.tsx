import { Typography } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../Spinners";

type TinfiniteScrollWrapperProps = {
  hasMore: boolean;
  handleNext: () => void;
  length: number;
  scrollableTarget: string;
  children: React.ReactElement | React.ReactElement[];
};

const InfiniteScrollWrapper = ({
  hasMore,
  handleNext,
  length,
  scrollableTarget,
  children,
}: TinfiniteScrollWrapperProps) => {
  return (
    <InfiniteScroll
      //height={"70vh"}
      hasMore={hasMore}
      next={handleNext}
      dataLength={length}
      loader={
        <Typography variant="h5" gutterBottom component="div">
          loading...
        </Typography>
      }
      scrollableTarget={scrollableTarget}
    >
      {children}
    </InfiniteScroll>
  );
};

export default InfiniteScrollWrapper;
