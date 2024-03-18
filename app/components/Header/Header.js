import React from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import logo from "../../icon.png";

export default function Header() {
  return (
    <div className={styles.header}>
      <Image src={logo} alt="logo" />{" "}
      <span className={styles.title}>Interviews By AI</span>
    </div>
  );
}
