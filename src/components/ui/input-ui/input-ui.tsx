import { TextField } from "@mui/material";
import { InputUIProps } from "./type";
import styles from "./input-ui.module.scss";
import classNames from "classnames";

export const InputUI: React.FC<InputUIProps> = ({
  label,
  onChange,
  value,
  disabled,
  type,
  extraClass,
  error,
  customLabel,
  ...props
}) => {
  return (
    <>
      {customLabel ? (
        <div className={styles.container}>
          <span
            className={classNames(styles.customLabel, {
              [styles.customLabel_error]: error,
            })}
          >
            {customLabel}
          </span>
          <TextField
            label={label}
            className={styles.input}
            onChange={onChange}
            // value={value}
            disabled={disabled}
            type={type}
            error={!!error}
            helperText={error}
            data-testid="input"
            {...props}
          />
        </div>
      ) : (
        <TextField
          label={label}
          className={styles.input}
          onChange={onChange}
          value={value}
          disabled={disabled}
          type={type}
          error={!!error}
          helperText={error}
          data-testid="input"
          {...props}
        />
      )}
    </>
  );
};
