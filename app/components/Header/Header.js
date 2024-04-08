import React from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import logo from "../../icon.png";
import google_logo from "./google_logo.svg";

export default function Header() {
  function signUpWithGoogle() {
    window.location = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/google`;
  }
  return (
    <div className={styles.header}>
      <div className={styles.flex}>
        <Image src={logo} alt="logo" />{" "}
        <span className={styles.title}>Interviews By AI</span>
      </div>
      <div className={styles.header_items}>
        <div className={styles.header_item}>Login</div>
        <div className={styles.header_item} onClick={() => signUpWithGoogle()}>
          <Image width={25} height={25} src={google_logo} />
          Sign in with Google
        </div>
      </div>
    </div>
  );
}
