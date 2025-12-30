import { useState } from "react";
import styles from "./style.module.css";
import Button from "../Button";

export default function Tabs({
  key,
  tabItems,
  activeTab: activeTabProp,
  onChange,
}: {
  key: string;
  tabItems: {
    key: string;
    label: string;
    content: React.ReactNode;
  }[];
  activeTab?: string;
  onChange?: (tab: string) => void;
}) {
  const [activeTab, setActiveTab] = useState(activeTabProp || tabItems[0].key);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    onChange?.(tab);
  };

  return (
    <div>
      <div className={styles.tabContainer}>
        {tabItems.map((tab, tabIndex) => (
          <Button
            key={`${key}-tab-${tabIndex}`}
            onClick={() => handleTabChange(tab.key)}
            className={activeTab === tab.key ? styles.activeTab : ""}
          >
            {tab.label}
          </Button>
        ))}
      </div>
      <div>{tabItems.find((tab) => tab.key === activeTab)?.content}</div>
    </div>
  );
}
