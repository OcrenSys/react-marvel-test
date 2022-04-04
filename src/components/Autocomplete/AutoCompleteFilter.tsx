import React, { useEffect, useState } from "react";
import {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  AutocompleteInputChangeReason,
} from "@mui/material";
import { AnyAction } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { REQUEST } from "../../utils/constant";
import { getSelector } from "../../utils/helpers";
import AutoComplete from ".";
import useDebounce from "../../hooks/useDebounce";
import TParameters from "../../types/parameters";
import TOption from "../../types/TOption";

type TAutoCompleteFilterProps = {
  type: REQUEST;
  label: string;
  variant?: "filled" | "standard" | "outlined";
  value?: TOption;
  onDispatch: (paremeters: TParameters) => AnyAction;
  onChange: (
    event: React.SyntheticEvent,
    value: any,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<any>
  ) => void;
};

const AutoCompleteFilter = (props: TAutoCompleteFilterProps) => {
  /* variables initialization */
  const { label, type, variant, value, onChange, onDispatch } = props;
  const [search, setSearch] = useState<string>("");
  const searchDebounced = useDebounce(search, 600);
  const [parameters, setParameters] = useState<TParameters>({
    titleStartsWith: search,
    // nameStartsWith: search, 
  } as TParameters);

  /* redux inicialization  */
  const dispatch = useDispatch();

  const selector: any = useSelector(getSelector(type));
  const { loading, results, total } = selector;

  useEffect(() => {
    dispatch(onDispatch(parameters));
  }, [dispatch, onDispatch, parameters]);

  useEffect(() => {
    setParameters((prev) => ({
      ...prev,
      titleStartsWith: searchDebounced,
      nameStartsWith: searchDebounced,
    }));
  }, [searchDebounced]);

  const handleChangeInput = (
    event: React.SyntheticEvent,
    value: string,
    reason: AutocompleteInputChangeReason
  ) => {
    setSearch(value);
  };

  return (
    <AutoComplete
      label={label}
      loading={loading}
      value={value}
      values={results.map((item: any) => ({
        label: `${item.id} | ${item?.title || item?.name}`,
        id: item.id.toString(),
      }))}
      variant={variant}
      onChange={onChange}
      onInputChange={handleChangeInput}
    />
  );
};

AutoCompleteFilter.defaultProps = {
  value: undefined,
  selector: "CHARACTER",
  variant: "outlined",
  label: "select option...",
};

export default React.memo(AutoCompleteFilter);
