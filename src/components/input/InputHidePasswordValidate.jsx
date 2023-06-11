import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { useTheme } from "@mui/system";
import React, { useState } from "react";
import { Controller } from "react-hook-form";

const InputHidePasswordValidate = (props) => {
  const theme = useTheme();
  const {
    label,
    control,
    sx,
    variant,
    id,
    error,
    name,
    autoComplete,
    autoCompleteWhenStart,
  } = props;

  // State for password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Toggle password visibility
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  // Prevent default behavior on mouse down event of password input
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <FormControl fullWidth variant={variant} sx={sx}>
      <InputLabel htmlFor={id}>{label ? label : "Password"}</InputLabel>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value, onBlur } }) => (
          <>
            <OutlinedInput
              id={id}
              error={!!error}
              onChange={onChange}
              onBlur={onBlur}
              autoComplete={autoComplete || "current-password"}
              type={showPassword ? "text" : "password"}
              defaultValue={autoCompleteWhenStart ? value : undefined}
              value={!autoCompleteWhenStart ? value : undefined}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText
              id="password-helper-text"
              sx={{ color: theme.palette.error.main }}
            >
              {error?.message}
            </FormHelperText>
          </>
        )}
      />
    </FormControl>
  );
};

export default InputHidePasswordValidate;
