import { ButtonUI } from '../button-ui/button-ui'
import { InputUI } from '../input-ui/input-ui'
import { FormUIProps } from './type'

import styles from './form-ui.module.scss'

export const FormUI: React.FC<FormUIProps> = ({ inputs, buttons, onSubmit, onChange, extraClass, formName, formHeader }) => {
  return (
    <form name={formName} className={`${styles.form} ${extraClass}`} onSubmit={onSubmit} method="POST">
      <h2>{formHeader}</h2>
      {inputs.map((input) => {
        return <InputUI key={input.name} label={input.label} onChange={onChange} {...input} />
      })}
      {buttons.map((button) => {
        return <ButtonUI key={button.buttonText} type={button.type} {...button} />
      })}
    </form>
  )
}