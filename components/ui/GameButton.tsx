import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./GameButton.module.css";

type Variant = "primary" | "secondary" | "danger" | "quiet";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: Variant;
  fullWidth?: boolean;
};

export default function GameButton({
  children,
  variant = "primary",
  fullWidth = false,
  className = "",
  ...props
}: Props) {
  return (
    <button
      {...props}
      className={`${styles.button} ${styles[variant]} ${fullWidth ? styles.fullWidth : ""} ${className}`.trim()}
    >
      <span>{children}</span>
    </button>
  );
}
