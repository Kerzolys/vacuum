import React from "react"
import { ButtonUIProps } from "../button-ui/type"
import { InputUIProps } from "../input-ui/type"

export type FormUIProps = {
  inputs: InputUIProps[]
  buttons: ButtonUIProps[]
  onSubmit: (evt: React.FormEvent<HTMLFormElement>) => void
  onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void
  extraClass?: string
  formHeader?: string
  formName?: string
}