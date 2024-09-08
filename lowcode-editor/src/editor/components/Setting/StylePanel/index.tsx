import { useContext } from "react";
import { SettingContext } from "../SettingContext";

export default function StylePanel() {
  const { editComponent, updateComponentProps } = useContext(SettingContext)!;

  return <div>{JSON.stringify(editComponent?.props.style, null, 2)}</div>;
}
