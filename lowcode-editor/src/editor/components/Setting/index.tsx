import BasePropsEditor from "./BasePropsEditor";
import { Tabs, type TabsProps } from "antd";
import styles from "./index.module.css";
import StylePanel from "./StylePanel";
import SettingContextProvider from "./SettingContext";

export default function Setting() {
  const tabs: TabsProps["items"] = [
    {
      key: "property",
      label: "属性",
      children: <BasePropsEditor />,
    },
    {
      key: "style",
      label: "样式",
      children: <StylePanel />,
    },
    {
      key: "event",
      label: "事件",
      children: <div>事件</div>,
    },
  ];

  return (
    <SettingContextProvider>
      <Tabs
        className={styles["setting-view"]}
        centered={true}
        tabBarStyle={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
        items={tabs}
      />
    </SettingContextProvider>
  );
}
