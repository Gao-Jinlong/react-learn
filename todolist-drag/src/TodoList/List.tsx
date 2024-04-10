import classNames from "classnames";
import { FC } from "react";
import Gap from "./Gap";
import Item from "./Item";

interface ListProps {
  className?: string | string[];
}

export const List: FC<ListProps> = (props) => {
  const cs = classNames("h-full p-2 border-2 border-black", props.className);

  return (
    <div className={cs}>
      <Gap />
      <Item />
      <Gap />
      <Item />
      <Gap />
      <Item />
      <Gap />
      <Item />
      <Gap />
      <Item />
      <Gap />
      <Item />
      <Gap />
      <Item />
      <Gap />
      <Item />
      <Gap />
      <Item />
      <Gap />
      <Item />
      <Gap />
      <Item />
      <Gap />
      <Item />
      <Gap />
      <Item />
      <Gap />
      <Item />
      <Gap />
      <Item />
      <Gap />
      <Item />
      <Gap />

      <Item />
      <Gap />
      <Item />
      <Gap />
    </div>
  );
};
