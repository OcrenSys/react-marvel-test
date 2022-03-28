import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import TOption from "../../types/TOption";

type TSelectComponentProp = {
  label: string;
  value: string;
  filters: TOption[];
  onChange: (event: SelectChangeEvent<string>) => void;
};

const SelectComponent = ({
  label,
  value,
  filters,
  onChange,
}: TSelectComponentProp) => {
  return (
    <FormControl  sx={{ minWidth: 250, maxWidth: 300 }}>
      <InputLabel id={`select-label-${label}`}>{label}</InputLabel>
      <Select
        size="small"
        labelId={`select-${label}`}
        id="demo-simple-select"
        value={value}
        label={label}
        onChange={onChange}
      >
        {filters?.length &&
          filters.map(({ id, label }: TOption) => (
            <MenuItem key={id} value={id}>{label}</MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};

export default SelectComponent;
