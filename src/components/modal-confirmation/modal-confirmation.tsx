import { createPortal } from "react-dom"
import { ModalUI } from "../ui/modal-ui/modal-ui"
import { ModalConfirmationProps } from "./type"
import { ButtonUI } from "../ui/button-ui/button-ui"

import styles from './modal-confirmation.module.scss'
import { Cancel, Delete } from "@mui/icons-material"


export const ModalConfirmation: React.FC<ModalConfirmationProps> = ({ onCancel, onConfirm }) => {
  return (
    <div className={styles.container}>
      <ModalUI onClose={onCancel}>
        <h2 className={styles.container__title}>Are you sure you want to delete this event?</h2>
        <div className={styles.container__buttons}>
          <ButtonUI variant="outlined" onClick={onConfirm} buttonText="Yes" startIcon={<Delete />}/>
          <ButtonUI variant="outlined" onClick={onCancel} buttonText="No" startIcon={<Cancel />} />
        </div>
      </ModalUI>
    </div>
  )
}