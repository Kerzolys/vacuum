import { useState } from "react";
import { AdminLayoutUI } from "../../components/ui/admin-layout-ui/admin-layout-ui";
import { TabUI } from "../../components/ui/tab-ui/tab-ui";
import styles from "./admin-laboratory.module.scss";
import { AdminLabComposers } from "../../components/admin-lab-composers/admin-lab-composers";
import { AdminLabStringQuartets } from "../../components/admin-lab-string-quartets/admin-lab-string-quartets";

type TabType = "composers" | "string quartets" | null;
const tabs: { id: number; tabName: string; type: TabType }[] = [
  {
    id: 1,
    tabName: "Композиторы",
    type: "composers",
  },
  {
    id: 2,
    tabName: "Струнные квартеты",
    type: "string quartets",
  },
];

export const AdminLaboratory = () => {
  const [tabType, setTabType] = useState<TabType>(null);

  const handleChangeTabType = (type: TabType) => setTabType(type);
  return (
    <>
      <AdminLayoutUI>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.container__tabsBlock}>
              {tabs.map((t) => (
                <TabUI
                  tabName={t.tabName}
                  key={t.id}
                  onClick={() => handleChangeTabType(t.type)}
                />
              ))}
            </div>
            {tabType === "composers" && <AdminLabComposers />}
            {tabType === "string quartets" && <AdminLabStringQuartets />}
          </div>
        </div>
      </AdminLayoutUI>
    </>
  );
};
