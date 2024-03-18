import React from "react";
import styles from "./styles.module.css";
import right_arrow from "../Feedback/right_arrow.svg";
import Image from "next/image";

export default function Sample_response({ sample_response }) {
  function toogleFeedbackModal() {
    const modal = document.getElementById("response-modal");
    modal.classList.toggle(styles.open);
    const arrow = document.getElementById("response_arrow");
    arrow.classList.toggle(styles.rotate);
  }

  return (
    <div className={styles.feedback_container}>
      <div onClick={() => toogleFeedbackModal()} className={styles.title}>
        <div>Sample Response</div>
        <Image id="response_arrow" src={right_arrow} alt="arrow" />
      </div>
      <div id="response-modal" className={styles.feedback_modal}>
        <div className={styles.feedback}>{sample_response}</div>
      </div>
    </div>
  );
}
