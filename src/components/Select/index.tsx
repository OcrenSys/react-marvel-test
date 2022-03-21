import React from "react";
import { FormControl, InputLabel, MenuItem } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
type TItem = { key: string; value: string };

type TSelectProps = {
  label: string;
  variant: "filled" | "standard" | "outlined" | undefined;
  value?: TItem;
  values: TItem[];
  onChange: (event: SelectChangeEvent) => void;
};

const SelectComponent = (props: TSelectProps) => {
  const { label, value, values, variant, onChange } = props;
  console.log("SelectComponent...", value);

  return (
    <FormControl variant={variant} sx={{ minWidth: 150 }}>
      <InputLabel style={{ top: "0" }} margin="dense" id="select-label-id">
        {label}
      </InputLabel>

      <Select
        labelId="select-label-id"
        id="select-id"
        size="small"
        value={value?.value}
        label={label}
        onChange={onChange}
      >
        <MenuItem value={0}>
          <em>ninguno</em>
        </MenuItem>
        {values.map(({ key, value }) => (
          <MenuItem key={value} value={value}>
            {value} - {key}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

SelectComponent.defaultProps = {
  variant: "standard",
  value: undefined,
};

export default SelectComponent;
