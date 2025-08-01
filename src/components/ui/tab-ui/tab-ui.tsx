import { ButtonUI } from "../button-ui/button-ui";
import styles from "./tab-ui.module.scss";

type Props = {
  tabName: string;
  onClick: () => void;
};

export const TabUI = ({ tabName, onClick }: Props) => {
  return <ButtonUI buttonText={tabName} onClick={onClick} />;
};
