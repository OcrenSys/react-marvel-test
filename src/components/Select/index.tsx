import React from "react";
import {
  Autocomplete,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  AutocompleteInputChangeReason,
  FormControl,
  TextField,
} from "@mui/material";
import { TOption } from "../../types/TOption";

type TAutoCompleteProps = {
  label: string;
  variant: "filled" | "standard" | "outlined" | undefined;
  value?: TOption;
  values: TOption[];
  onChange: (
    event: React.SyntheticEvent,
    value: any,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<any>
  ) => void;
  onInputChange: (
    event: React.SyntheticEvent,
    value: string,
    reason: AutocompleteInputChangeReason
  ) => void;
};

const AutoComplete = (props: TAutoCompleteProps) => {
  const { label, value, values, variant, onChange, onInputChange } = props;
  
  return (
    <FormControl variant={variant} sx={{ minWidth: 200, maxWidth: 250 }}>
      <Autocomplete
        disablePortal
        size="small"
        id={`Autocomplete-${label}`}
        value={value}
        options={values}
        noOptionsText={`No results...`}
        onChange={onChange}
        onInputChange={onInputChange}
        sx={{ minWidth: 200, maxWidth: 250 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            
          />
        )}
      />
    </FormControl>
  );
};

AutoComplete.defaultProps = {
  variant: "standard",
  value: undefined,
};

export default AutoComplete;
