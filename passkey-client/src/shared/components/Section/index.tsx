import styles from "./style.module.css";

export default function Section({
  title,
  children,
  level = 2 | 3,
}: { title?: string; level?: number } & React.PropsWithChildren) {
  return (
    <div className={styles.sectionContainer}>
      {title && level === 2 ? <h2>{title}</h2> : level === 3 ? <h3>{title}</h3> : null}
      {children}
    </div>
  );
}