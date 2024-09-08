import { ComponentEnum } from "../../../interface";
import { createPortal } from "react-dom";
import {
  theme,
  Divider,
  message,
  Button,
  Dropdown,
  type MenuProps,
  Tooltip,
} from "antd";
import {
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
  type RefObject,
} from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { useComponentsStore } from "../../../stores/components";
import { EditContext } from "../EditContext";
import EditComponentToolboxMenu from "./EditComponentToolboxMenu";
import useListenerResize from "../../../../hooks/useListenerResize";
import classNames from "classnames";

export interface HoverComponentPanel {
  container: RefObject<HTMLElement>;
}
export default function HoverComponentPanel({
  container,
}: HoverComponentPanel) {
  const { token } = theme.useToken();

  const { size } = useListenerResize({
    dom: container,
  });

  const { editComponent, components, removeComponent, setEditComponent } =
    useComponentsStore();
  const { undo } = useComponentsStore.temporal.getState();

  const { dropdownMenu } = useContext(EditContext)!;

  const isShow = useMemo(() => !!editComponent, [editComponent]);
  const [position, setPosition] = useState<{
    left: number;
    top: number;
    width: number;
    height: number;
  }>({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  });

  useLayoutEffect(() => {
    if (!editComponent || !container.current || !size) {
      setPosition({
        left: 0,
        top: 0,
        width: 0,
        height: 0,
      });
      return;
    }

    const node = document.querySelector(
      `[data-component-id="${editComponent.id}"]`,
    );
    if (!node) {
      setPosition({
        left: 0,
        top: 0,
        width: 0,
        height: 0,
      });
      return;
    }

    const { left, top, width, height } = node.getBoundingClientRect();
    const { left: containerLeft, top: containerTop } = size;

    const position = {
      left: left - containerLeft,
      top: top - containerTop,
      width,
      height,
    };

    setPosition(position);
  }, [container, size, editComponent, components]);

  function handleDelete() {
    if (!editComponent) return;
    removeComponent(editComponent.id);
    successDelete();
  }

  function successDelete() {
    message.success({
      key: "delete-success",

      content: (
        <div className="flex items-center">
          删除成功
          <Button onClick={handleUndo} type="link" size="small">
            撤销
          </Button>
        </div>
      ),
    });
  }

  function handleUndo() {
    message.destroy("delete-success");
    undo();
  }

  const handleChangeEditComponent: MenuProps["onClick"] = (selectInfo) => {
    const { key } = selectInfo;
    setEditComponent(key);
  };

  return container.current
    ? createPortal(
        isShow ? (
          <div
            style={{
              position: "absolute",
              zIndex: 1000,
              left: position.left,
              top: position.top,
              width: position.width,
              height: position.height,
            }}
            className={classNames(
              "css-var-r1 zIndex-1000 pointer-events-none relative flex justify-start transition-all duration-150",
              {
                "border border-solid border-[--ant-color-primary]":
                  editComponent && editComponent?.name !== ComponentEnum.Button,
              },
            )}
          >
            <div
              className={classNames(
                "pointer-events-auto absolute left-0 top-0 flex h-5 items-center justify-center px-2 text-[12px] text-white transition-all duration-150",
                {
                  "-translate-y-full": position.top > 10,
                },
              )}
              style={{
                background: token.colorPrimary,
              }}
            >
              <Dropdown
                menu={{
                  items: dropdownMenu,
                  onClick: handleChangeEditComponent,
                }}
                trigger={["click"]}
              >
                <Tooltip title={"层级选择"} arrow={false}>
                  <div className="cursor-pointer text-nowrap">
                    {editComponent?.label}
                  </div>
                </Tooltip>
              </Dropdown>

              {editComponent?.name !== ComponentEnum.Page && (
                <>
                  <Divider
                    type="vertical"
                    style={{
                      borderColor: "#fff",
                    }}
                  />
                  <div className="flex items-center gap-1">
                    <Tooltip title={"删除"} arrow={false}>
                      <DeleteOutlined
                        className="cursor-pointer"
                        onClick={handleDelete}
                      />
                    </Tooltip>

                    <EditComponentToolboxMenu />
                  </div>
                </>
              )}
            </div>
          </div>
        ) : null,
        container.current,
      )
    : null;
}
