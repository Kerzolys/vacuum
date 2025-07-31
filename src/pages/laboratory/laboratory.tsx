import { Footer } from "../../components/footer/footer";
import { LaboratoryInfo } from "../../components/laboratory-info/laboratory-info";
import { Layout } from "../../components/layout/layout";
import logo from "../../assets/images/coverimage-5.png";

import styles from "./laboratory.module.scss";
import { ButtonUI } from "../../components/ui/button-ui/button-ui";
import { useLocation, useNavigate } from "react-router-dom";
import { TabUI } from "../../components/ui/tab-ui/tab-ui";
import { useState } from "react";
import { LaboratoryShedule } from "../../components/laboratory-shedule/laboratory-shedule";
import { LaboratoryRegistration } from "../../components/laboratory-registration/laboratory-registration";
import { LaboratorySearch } from "../../components/laboratory-search/laboratory-search";

type TabType = "lab" | "shedule" | "registration" | "feedback";
const tabs: { id: number; tabName: string; type: TabType }[] = [
  {
    id: 1,
    tabName: "Лаборатория",
    type: "lab",
  },
  {
    id: 2,
    tabName: "Расписание",
    type: "shedule",
  },
  {
    id: 3,
    tabName: "Регистрация",
    type: "registration",
  },
  {
    id: 4,
    tabName: "Обратная связь",
    type: "feedback",
  },
];

export const Laboratory = () => {
  const [tabType, setTabType] = useState<TabType>("lab");
  const navigate = useNavigate();

  const navigateToHome = () => navigate("/");
  const handleChangeTabType = (type: TabType) => setTabType(type);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.header__content}>
          <div className={styles.header__logo}>
            <img src={logo} alt="logo" onClick={navigateToHome} />
          </div>
          <nav>
            <ButtonUI onClick={navigateToHome} buttonText="Back Home" />
          </nav>
        </div>
      </header>
      <div className={styles.main}>
        <div className={styles.main__content}>
          <h2>Vacuum Quartet Lab</h2>
          <div className={styles.main__tabsBlock}>
            {tabs.map((t) => (
              <TabUI
                tabName={t.tabName}
                key={t.id}
                onClick={() => handleChangeTabType(t.type)}
              />
            ))}
          </div>
          {tabType === "lab" && <LaboratoryInfo />}
          {tabType === "shedule" && <LaboratoryShedule />}
          {tabType === "registration" && <LaboratoryRegistration />}
          {tabType === "feedback" && <LaboratorySearch />}
        </div>
      </div>
      <Footer />
    </div>
  );
};
