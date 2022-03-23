import {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  AutocompleteInputChangeReason,
} from "@mui/material";
import { AnyAction } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AutoComplete from ".";
import useDebounce from "../../hooks/useDebounce";
import { GET_COMICS_SELECTOR } from "../../store/selectors/comics.selector";
import { TParameters } from "../../types/parameters";
import { TOption } from "../../types/TOption";

type TAutoCompleteFilterProps = {
  selector?: "CHARACTER" | "COMIC" | "STORIES";
  variant: "filled" | "standard" | "outlined" | undefined;
  value?: TOption;
  onDispatch: (titleStartsWith: string) => AnyAction;
  onChange: (
    event: React.SyntheticEvent,
    value: any,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<any>
  ) => void;
};

const AutoCompleteFilter = (props: TAutoCompleteFilterProps) => {
  /* redux inicialization  */
  const dispatch = useDispatch();
  const { loading, results } = useSelector(GET_COMICS_SELECTOR);

  /* variables initialization */
  const { variant, value, onChange, onDispatch } = props;
  const [search, setSearch] = useState<string>();
  const searchDebounced = useDebounce(search, 600);
  const [parameters, setParameters] = useState<TParameters>({
    titleStartsWith: "",
  } as TParameters);

  useEffect(() => {
    dispatch(onDispatch(parameters?.titleStartsWith || ""));
  }, [dispatch, onDispatch, parameters.titleStartsWith]);

  useEffect(() => {
    setParameters((prev) => ({
      ...prev,
      titleStartsWith: searchDebounced,
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
      label={"Select Comic"}
      loading={loading}
      value={value}
      values={results.map(({ title, id }) => ({
        label: `${id} | ${title}`,
        id: id.toString(),
      }))}
      variant={variant}
      onChange={onChange}
      onInputChange={handleChangeInput}
    />
  );
};

AutoCompleteFilter.defaultProps = {
  value: undefined,
};

export default React.memo(AutoCompleteFilter);
