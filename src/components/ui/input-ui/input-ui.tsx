import { TextField } from "@mui/material";
import { InputUIProps } from "./type";
import styles from './input-ui.module.scss'

export const InputUI: React.FC<InputUIProps> = ({
  label,
  onChange,
  value,
  disabled,
  type,
  extraClass,
  error,
  ...props
}) => {
  return (
    <TextField
      label={label}
      className={styles.input}
      onChange={onChange}
      value={value}
      disabled={disabled}
      type={type}
      error={!value}
      helperText={error}
      data-testid="input"
      {...props}
    />
  )
}