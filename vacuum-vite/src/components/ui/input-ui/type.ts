import type { TextFieldProps } from "@mui/material";

export type InputUIProps = Omit<TextFieldProps, "error"> & {
  error: string;
  customLabel?: string;
};
