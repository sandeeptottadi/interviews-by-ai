import React, { useEffect } from "react";
import styles from "./styles.module.css";
import right_arrow from "./right_arrow.svg";
import Image from "next/image";

export default function Feedback({ feedback }) {
  useEffect(() => {
    if (feedback) toogleFeedbackModal();
  }, [feedback]);

  function toogleFeedbackModal() {
    const modal = document.getElementById("feedback-modal");
    modal.classList.toggle(styles.open);
    const arrow = document.getElementById("feedback-arrow");
    arrow.classList.toggle(styles.rotate);
  }

  return (
    <div className={styles.feedback_container}>
      <div onClick={() => toogleFeedbackModal()} className={styles.title}>
        <div>Feedback</div>
        <Image id="feedback-arrow" src={right_arrow} alt="arrow" />
      </div>
      <div id="feedback-modal" className={styles.feedback_modal}>
        <div className={styles.feedback}>{feedback}</div>
      </div>
    </div>
  );
}
