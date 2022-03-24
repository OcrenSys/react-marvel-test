import { Box, CircularProgress, Typography } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";

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
      height={"70vh"}
      hasMore={hasMore}
      next={handleNext}
      dataLength={length}
      loader={
        <Box sx={{ width: "100%", marginTop: 16, marginBottom: 16 }}>
          <CircularProgress />
        </Box>
      }
      scrollableTarget={scrollableTarget}
    >
      {children}
    </InfiniteScroll>
  );
};

export default InfiniteScrollWrapper;
