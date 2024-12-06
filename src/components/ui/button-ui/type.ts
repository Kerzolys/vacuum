import { ButtonProps } from "@mui/material";

export interface ButtonUIProps extends ButtonProps {
  icon?: React.ReactNode;
  buttonText: string;
  onClick?: () => void;
  onSubmit?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
}
