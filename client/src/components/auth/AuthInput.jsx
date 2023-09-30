import { InputAdornment, TextField } from "@mui/material";

const AuthInput = ({
  children,
  touched,
  errorMsg,
  handleChange,
  value,
  name,
  type,
  label,
}) => {
  return (
    <TextField
      size="small"
      label={label}
      name={name}
      type={type || "text"}
      fullWidth
      error={touched && Boolean(errorMsg)}
      helperText={touched && errorMsg}
      variant="standard"
      margin="dense"
      onChange={handleChange}
      value={value}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">{children}</InputAdornment>
        ),
      }}
    />
  );
};

export default AuthInput;
