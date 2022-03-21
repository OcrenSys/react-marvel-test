import { FormControl, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

type TSearchProps = {
  label?: string;
  value?: string;
  variant?: "filled" | "standard" | "outlined" | undefined;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchComponent = (props: TSearchProps) => {
  const { label, value, variant, onChange } = props;

  return (
    <FormControl sx={{ m: 1, width: 500, maxWidth: "100%" }}>
      <TextField
        variant={variant}
        id="outlined-adornment-search"
        type={"text"}
        value={value}
        onChange={onChange}
        InputProps={{
          endAdornment: <SearchIcon />,
        }}
        size="small"
        label={label}
      />
    </FormControl>
  );
};

SearchComponent.defaultProps = {
  label: "Buscar",
  value: "",
  variant: "standard",
};

export default SearchComponent;
