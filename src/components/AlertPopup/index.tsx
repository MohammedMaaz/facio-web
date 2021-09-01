import React, { useCallback, useState } from "react";
import { useTheme } from "../../hooks/useTheme";
import { mixColors, opacity } from "../../utils";
import { globalErrorHandler } from "../../utils/errorHandler";
import Button, { ButtonProps } from "../Button";
import styles from "./index.module.scss";

let _setters: { setModalProps: Function; setModalVisible: Function };

interface Props {
  title: string;
  message: string;
  okText?: string;
  cancelText?: string;
  onOk?: () => any;
  onCancel?: () => any;
  type?: ButtonProps["type"];
}

function Popup({
  title,
  message,
  okText = "Ok",
  cancelText = "Cancel",
  onOk,
  onCancel,
  type = "primary",
  onClose,
}: Props & { onClose: () => any }) {
  const [okLoading, setOkLoading] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);
  const { theme, name } = useTheme();

  const onClick = (action: "ok" | "cancel") => () => {
    const cb = action === "ok" ? onOk : onCancel;
    if (typeof cb !== "function") return onClose();

    const res = cb();
    const setLoading = action === "ok" ? setOkLoading : setCancelLoading;
    if (res instanceof Promise) {
      setLoading(true);
      res.catch(globalErrorHandler).finally(() => {
        setLoading(false);
        onClose();
      });
    } else onClose();
  };

  const shadowColor =
    name === "dark"
      ? theme._black
      : mixColors(theme.font_color, theme.bg_color, 70);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={styles.popup_container}
      style={{
        boxShadow: `0 5px 10px ${shadowColor}, 0 0.9px 3px ${shadowColor}`,
      }}
    >
      <h1>{title}</h1>
      <p>{message}</p>
      <div>
        <Button
          type={type}
          size="small"
          title={cancelText}
          onClick={onClick("cancel")}
          loading={cancelLoading}
          disabled={okLoading || cancelLoading}
          filled={false}
          style={{ width: "90px", marginRight: "1rem" }}
        />
        <Button
          type={type}
          size="small"
          title={okText}
          onClick={onClick("ok")}
          loading={okLoading}
          disabled={okLoading || cancelLoading}
          style={{ width: "90px" }}
        />
      </div>
    </div>
  );
}

export function AlertPopupContainer() {
  const { theme, name } = useTheme();
  const [modalProps, setModalProps] = useState(null as null | Props);
  const [modalVisible, setModalVisible] = useState(false);
  _setters = { setModalVisible, setModalProps };

  const onClose = useCallback(() => {
    setModalVisible(false);
  }, []);

  return (
    <div
      onClick={onClose}
      style={{
        backgroundColor: opacity(
          theme[name === "dark" ? "_white" : "_black"],
          name === "dark" ? 0.2 : 0.4
        ),
        opacity: modalVisible ? 1 : 0,
        pointerEvents: modalVisible ? undefined : "none",
      }}
      className={styles.container}
    >
      {modalProps && <Popup onClose={onClose} {...modalProps} />}
    </div>
  );
}

export default function AlertPopup(props: Props) {
  _setters.setModalVisible?.(true);
  _setters.setModalProps?.(props);
}
