import { useState } from "react";
import styles from "./style.module.css";
import Radio from "../Radio";

export default function Tabs({
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
        {tabItems.map((tab) => (
          <Radio 
            key={tab.key} 
            label={tab.label} 
            value={tab.key} 
            checked={activeTab === tab.key}
            onChange={handleTabChange} 
          />
        ))}
      </div>
      <div>{tabItems.find((tab) => tab.key === activeTab)?.content}</div>
    </div>
  );
}
