import { TextField } from "@mui/material";

const PostInput = ({
  touched,
  errorMsg,
  handleChange,
  value,
  name,
  type,
  label,
  multiline,
  rows,
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
      rows={multiline && rows}
      multiline={multiline}
    />
  );
};

export default PostInput

