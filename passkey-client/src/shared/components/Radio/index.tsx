import styles from "./style.module.css";

export default function Radio({ 
  label, 
  value, 
  checked = false,
  onChange 
}: { 
  label: string; 
  value: string; 
  checked?: boolean;
  onChange: (value: string) => void;
}) {
  return (
    <label className={`${styles.radio} ${checked ? styles.checked : ""}`}>
      <input 
        type="radio" 
        value={value} 
        checked={checked}
        onChange={e => onChange(e.target.value)} 
        className={styles.radioInput}
      />
      <span className={styles.radioCircle}>
        <span className={styles.radioInner}></span>
      </span>
      <span className={styles.radioLabel}>{label}</span>
    </label>
  );
}