import type { PropsWithChildren } from "react";
import styles from "./style.module.css";

export default function Button({
  key,
  onClick,
  children,
  className,
  loading = false,
}: {
  key?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  className?: string;
  loading?: boolean;
} & PropsWithChildren) {
  return (
    <div key={key} onClick={onClick} className={`${styles.button} ${className}`}>
      {children}
      {loading && <span>⏳</span>}
    </div>
  );
}
