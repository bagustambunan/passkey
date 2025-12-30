import styles from "./style.module.css";
import { profile } from "../../../shared/constants/profile";
import Image from "../Image";

export default function Avatar() {
  return (
    <Image
      src={profile.photo}
      alt={profile.name}
      title={profile.name}
      className={styles.avatar}
    />
  );
}
