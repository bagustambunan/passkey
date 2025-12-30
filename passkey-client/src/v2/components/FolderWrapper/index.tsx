import { useState } from "react";
import Folder from "../Folder";
import styles from "./style.module.css";

export default function FolderWrapper({
  folders,
}: {
  folders: {
    href?: string;
    onOpen?: (e: React.MouseEvent) => void;
    children: React.ReactNode;
  }[];
}) {
  const [activeFolderIndex, setActiveFolderIndex] = useState<number>();
  return (
    <div
      className={styles.folderWrapper}
      onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "ArrowRight" || e.key === "ArrowDown") {
          setActiveFolderIndex((prev) =>
            prev !== undefined ? Math.min(prev + 1, folders.length - 1) : 0
          );
        }
        if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
          setActiveFolderIndex((prev) =>
            prev !== undefined ? Math.max(prev - 1, 0) : folders.length - 1
          );
        }
      }}
    >
      {folders.map((folder, index) => (
        <Folder
          key={`folder-${index}`}
          isActive={activeFolderIndex === index}
          href={folder.href}
          onClick={(e) => {
            e.preventDefault();
            setActiveFolderIndex(index);
          }}
          onOpen={folder.onOpen}
        >
          {folder.children}
        </Folder>
      ))}
    </div>
  );
}
