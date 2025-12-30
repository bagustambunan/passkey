import type { PropsWithChildren } from "react";
import styles from "./style.module.css";

export default function Button({
  key,
  onClick,
  children,
  className,
}: {
  key?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  className?: string;
} & PropsWithChildren) {
  return (
    <div key={key} onClick={onClick} className={`${styles.button} ${className}`}>
      {children}
    </div>
  );
}
