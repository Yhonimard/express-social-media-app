import { FormControl, FormHelperText, IconButton, Input, InputAdornment, InputLabel } from "@mui/material"
import { useState } from "react"
import Icon from "@/assets/Icon"

const PasswordInput = ({ id, name, handleChange, touched, error, label, fullWidth, StartIcon, margin, value }) => {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <FormControl variant="standard" fullWidth={fullWidth} margin={margin || "none"} error={touched && Boolean(error)} >
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <Input
        name={name}
        onChange={handleChange}
        id={id}
        type={showPassword ? "text" : "password"}
        value={value}
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={() => setShowPassword(s => !s)}>
              {showPassword ? <Icon.VisibilityOff /> : <Icon.Visibility />}
            </IconButton>
          </InputAdornment>
        }
        startAdornment={
          <InputAdornment position="start">
            <StartIcon />
          </InputAdornment>
        }
      />
      <FormHelperText>{touched && Boolean(error) && error}</FormHelperText>
    </FormControl>
  )
}

export default PasswordInput
