import React from "react";
import {
  Autocomplete,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  AutocompleteInputChangeReason,
  CircularProgress,
  FormControl,
  TextField,
} from "@mui/material";
import { TOption } from "../../types/TOption";

type TAutoCompleteProps = {
  label: string;
  variant: "filled" | "standard" | "outlined" | undefined;
  loading?: boolean;
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
  const { label, loading, value, values, variant, onChange, onInputChange } =
    props;

  return (
    <FormControl variant={variant} sx={{ minWidth: 250, maxWidth: 300 }}>
      <Autocomplete
        loading={loading}
        disablePortal
        size="small"
        id={`Autocomplete-${label}`}
        value={value}
        options={values}
        noOptionsText={`No results...`}
        onChange={onChange}
        onInputChange={onInputChange}
        sx={{ minWidth: 250, maxWidth: 300 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? (
                    <CircularProgress color="primary" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
    </FormControl>
  );
};

AutoComplete.defaultProps = {
  variant: "standard",
  value: undefined,
  loading: false,
};

export default AutoComplete;

{
  /* <TextField
            {...params}
            label={label}
            
          /> */
}
