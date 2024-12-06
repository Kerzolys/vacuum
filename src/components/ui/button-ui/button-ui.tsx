import { Button } from "@mui/material";
import { ButtonUIProps } from "./type";
import classNames from "classnames";

import styles from './button-ui.module.scss';

export const ButtonUI: React.FC<ButtonUIProps> = ({
  buttonText,
  onClick,
  onSubmit,
  className,
  disabled,
  type,
  ...props }) => {
  return <Button
    type={type}
    onClick={onClick}
    onSubmit={onSubmit}
    className={classNames(styles.button, className)}
    disabled={disabled}
    {...props}
    >
    {buttonText}
  </Button>;
};