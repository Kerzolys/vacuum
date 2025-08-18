import { ButtonUI } from "../button-ui/button-ui";

type Props = {
  tabName: string;
  onClick: () => void;
};

export const TabUI = ({ tabName, onClick }: Props) => {
  return <ButtonUI buttonText={tabName} onClick={onClick} />;
};
