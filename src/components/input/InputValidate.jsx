import { TextField } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

const InputValidate = (props) => {
  const {
    control,
    name,
    label,
    autoComplete,
    type,
    variant,
    error,
    helperText,
    autoCompleteWhenStart,
    sx
  } = props;
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, onBlur } }) => (
        <TextField
          fullWidth
          label={label}
          autoComplete={autoComplete || "off"}
          name={name}
          type={type}
          variant={variant}
          error={error}
          helperText={helperText}
          onChange={onChange}
          onBlur={onBlur}
          value={!autoCompleteWhenStart ? value : undefined}
          defaultValue={autoCompleteWhenStart ? value : undefined}
          sx={sx}
        />
      )}
    />
  );
};

export default InputValidate;
