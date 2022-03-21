import { SelectChangeEvent } from "@mui/material";
import { useSelector } from "react-redux";
import SelectComponent from ".";
import { GET_COMICS_SELECTOR } from "../../store/selectors/comics.selector";
import TComic from "../../types/comic";

type TProps = {
  variant: "filled" | "standard" | "outlined" | undefined;
  onChange: (event: SelectChangeEvent) => void;
  value?: string;
};

const SelectComics = (props: TProps) => {
  const { loading, results } = useSelector(GET_COMICS_SELECTOR);

  const { variant, value, onChange } = props;

  return (
    <SelectComponent
      label={"Select Comics"}
      values={results.map(({ title, id }: TComic) => ({
        key: title,
        value: id.toString(),
      }))}
      value={{ key: "", value: value || "" }}
      variant={variant}
      onChange={onChange}
    />
  );
};

SelectComics.defaultProps = {
  value: undefined,
};

export default SelectComics;
