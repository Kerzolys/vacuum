import { Footer } from "../../components/footer/footer";
import { LaboratoryInfo } from "../../components/laboratory-info/laboratory-info";
import logo from "../../assets/images/coverimage-5.png";
import { ButtonUI } from "../../components/ui/button-ui/button-ui";
import { useNavigate } from "react-router-dom";
import { TabUI } from "../../components/ui/tab-ui/tab-ui";
import { useState } from "react";
import { LaboratoryTermsAndConditions } from "../../components/laboratory-terms-and-conditions/laboratory-terms-and-conditions";
import { LaboratoryRegistration } from "../../components/laboratory-registration/laboratory-registration";
import { LaboratorySearch } from "../../components/laboratory-search/laboratory-search";

import styles from "./laboratory.module.scss";

type TabType = "lab" | "terms and conditions" | "registration" | "feedback";
const tabs: { id: number; tabName: string; type: TabType }[] = [
  {
    id: 1,
    tabName: "Лаборатория",
    type: "lab",
  },
  {
    id: 2,
    tabName: "Условия участия",
    type: "terms and conditions",
  },
  {
    id: 3,
    tabName: "Регистрация",
    type: "registration",
  },
  // {
  //   id: 4,
  //   tabName: "Обратная связь",
  //   type: "feedback",
  // },
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
          {tabType === "terms and conditions" && (
            <LaboratoryTermsAndConditions />
          )}
          {tabType === "registration" && <LaboratoryRegistration />}
          {/* {tabType === "feedback" && <LaboratorySearch />} */}
        </div>
      </div>
      <Footer />
    </div>
  );
};
