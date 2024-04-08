import React from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import logo from "../../icon.png";

export default function Footer() {
  return (
    <div className={styles.footer_container}>
      <div className={styles.flex}>
        <Image src={logo} alt="logo" />{" "}
        <span className={styles.title}>Interviews By AI</span>
      </div>
    </div>
  );
}
