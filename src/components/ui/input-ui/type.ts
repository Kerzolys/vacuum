import { TextFieldProps } from "@mui/material";

export type InputUIProps = Omit<TextFieldProps, "error"> & {
  extraClass?: string;
  error: string;
  customLabel?: string;
};
