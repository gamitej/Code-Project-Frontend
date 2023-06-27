import PropTypes from "prop-types";
import React from "react";
// mui comp
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";

// mui icons
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function Password({
  width = "80%",
  onChange = () => {},
  value = "",
  name = "password",
  placeholder = "Enter your password",
  minLength = 4,
  maxLength = 8,
}) {
  // =========== USE_STATE HOOK ===============
  const [showPassword, setShowPassword] = React.useState(false);

  // =========== EVENT HANDLERS ===============
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  return (
    <FormControl sx={{ m: 1, width }} variant="outlined">
      <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
      <OutlinedInput
        id={name}
        label="Password"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        inputProps={{ minLength, maxLength }}
        type={showPassword ? "text" : "password"}
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
        required
      />
    </FormControl>
  );
}

Password.propTypes = {
  maxLength: PropTypes.number,
  minLength: PropTypes.number,
  name: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  width: PropTypes.string,
};

export default Password;
