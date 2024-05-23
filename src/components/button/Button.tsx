import { ReactNode } from "react";
import "./Button.css"

export const Button = (props: Props) => {
  return (
    <button
      onClick={ () => props.onClick() }
      className="button"
      style={props.width ? { width: props.width + "px" } : {}}
    >
      { props.children }
    </button>
  );
}

type Props = {
  onClick: Function,
  children: ReactNode,
  width?: number | undefined,
}