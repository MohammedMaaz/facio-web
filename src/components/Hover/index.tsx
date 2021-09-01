import React, { useCallback, useState } from "react";

interface Props {
  element?: JSX.Element;
  style?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >["style"];
  hoverStyle?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >["style"];
  children?: JSX.Element;
  onHover?: (hoverState: boolean) => void;
}

export default function Hover({
  element,
  style,
  hoverStyle,
  children,
  onHover,
}: Props) {
  const [appliedStyle, setAppliedStyle] = useState(style);

  const onMouseOver = useCallback(() => {
    setAppliedStyle({ ...(style || {}), ...(hoverStyle || {}) });
    typeof onHover === "function" && onHover(true);
  }, [hoverStyle, style, onHover]);

  const onMouseOut = useCallback(() => {
    setAppliedStyle(style);
    typeof onHover === "function" && onHover(false);
  }, [onHover, style]);

  const args = [
    element || children,
    {
      style: {
        ...(element?.props?.style || children?.props?.style || {}),
        ...appliedStyle,
      },
      onMouseOver,
      onMouseOut,
    },
    element ? children : children?.props?.children,
  ];

  return typeof element === "string"
    ? //@ts-ignore
      React.createElement(...args)
    : //@ts-ignore
      React.cloneElement(...args);
}
