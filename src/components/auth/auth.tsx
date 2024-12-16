import { useState } from 'react';
import { FormUI } from '../ui/form-ui/form-ui';
import { InputUIProps } from '../ui/input-ui/type';
import { ButtonUIProps } from '../ui/button-ui/type';
import { useDispatch } from '../../services/store/store';
import { loginUser, signUpUser } from '../../features/userSlice.ts/userSlice';

import styles from './auth.module.scss'

export const Auth = ({ action }: { action: typeof signUpUser | typeof loginUser }) => {

  const [value, setValue] = useState<{ email: string, password: string }>({ email: '', password: '' })
  const dispatch = useDispatch()

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setValue({ ...value, [evt.target.name]: evt.target.value })
  }
  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(action({ email: value.email, password: value.password }))
  }

  const inputs: InputUIProps[] = [
    {
      label: 'Email',
      name: 'email',
      type: 'email',
      value: value.email,
      variant: 'outlined',
      error: value ? '' : 'Email is required',
      color: 'primary',
      helperText: 'Email is required',
      sx: {
        "& .MuiInputBase-input": {
          color: "#fff", // Цвет текста внутри поля
        },
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "green", // Цвет обводки
        },
        "& .MuiInputLabel-root": {
          color: "purple", // Цвет лейбла
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: "red", // Цвет активного (сфокусированного) лейбла
        },
        "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: "orange", // Цвет обводки при наведении
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "blue", // Цвет обводки при фокусе
        },
      }
    },
    {
      label: 'Password',
      name: 'password',
      type: 'password',
      value: value.password,
      variant: 'outlined',
      error: value ? '' : 'Password is required',
      helperText: 'Password is required',
      sx: {
        "& .MuiInputBase-input": {
          color: "#fff", // Цвет текста внутри поля
        },
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "green", // Цвет обводки
        },
        "& .MuiInputLabel-root": {
          color: "purple", // Цвет лейбла
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: "red", // Цвет активного (сфокусированного) лейбла
        },
        "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: "orange", // Цвет обводки при наведении
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "blue", // Цвет обводки при фокусе
        },
      }
    }
  ]
  const buttons: ButtonUIProps[] = [
    {
      buttonText: action === signUpUser ? "Sign Up" : "Login",
      type: 'submit',
      variant: 'contained',
      color: 'primary',
      disabled: !value.email || !value.password,
      sx: {
        '&.Mui-disabled': {
          backgroundColor: '#555', // Серый фон для неактивной кнопки
          color: '#fff', // Белый текст для контраста
        },
      },
    }
  ]
  return (
    <div>
      <h1>Sign Up</h1>
      <FormUI 
      formHeader={action === signUpUser ? "Sign Up" : "Login"}
      formName={action === signUpUser? "signUpForm" : "loginForm"}
      inputs={inputs} 
      buttons={buttons} 
      onSubmit={handleSubmit} 
      onChange={handleChange} 
      />
    </div>
  );
}