import React from "react";
import type { ButtonUIProps } from "../button-ui/type";
import type { InputUIProps } from "../input-ui/type";

export type FormUIProps = {
  inputs: InputUIProps[];
  buttons: ButtonUIProps[];
  onSubmit: (evt: React.FormEvent<HTMLFormElement>) => void;
  onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  extraClass?: string;
  formHeader?: string;
  formName?: string;
};
