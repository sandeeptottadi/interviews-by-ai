import React from "react";
import styles from "./styles.module.css";
import { useState } from "react";

export default function Generate_question_from() {
  const [interview_type, setInterview_type] = useState("technical");
  function changeInterviewType(type) {
    const jobTitles = document.querySelectorAll(
      `.${styles.generate_question_from_item}`
    );
    jobTitles.forEach((jobTitle) => {
      jobTitle.classList.remove(styles.active);
    });
    setInterview_type(type);
  }
  return (
    <div className={styles.generate_question_from_container}>
      <div className={styles.generate_question_from_items}>
        <div
          onClick={() => changeInterviewType("technical")}
          className={`${styles.generate_question_from_item} ${
            interview_type === "technical" && styles.active
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#c6c9cf"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
          >
            <path d="M320-240h320v-80H320v80Zm0-160h320v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z" />
          </svg>
          Technical
        </div>
        <div
          onClick={() => changeInterviewType("behavioural")}
          className={`${styles.generate_question_from_item} ${
            interview_type === "behavioural" && styles.active
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#c6c9cf"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
          >
            <path d="M240-80v-172q-57-52-88.5-121.5T120-520q0-150 105-255t255-105q125 0 221.5 73.5T827-615l52 205q5 19-7 34.5T840-360h-80v120q0 33-23.5 56.5T680-160h-80v80h-80v-160h160v-200h108l-38-155q-23-91-98-148t-172-57q-116 0-198 81t-82 197q0 60 24.5 114t69.5 96l26 24v208h-80Zm254-360Zm-54 80h80l6-50q8-3 14.5-7t11.5-9l46 20 40-68-40-30q2-8 2-16t-2-16l40-30-40-68-46 20q-5-5-11.5-9t-14.5-7l-6-50h-80l-6 50q-8 3-14.5 7t-11.5 9l-46-20-40 68 40 30q-2 8-2 16t2 16l-40 30 40 68 46-20q5 5 11.5 9t14.5 7l6 50Zm40-100q-25 0-42.5-17.5T420-520q0-25 17.5-42.5T480-580q25 0 42.5 17.5T540-520q0 25-17.5 42.5T480-460Z" />
          </svg>
          Behavioural
        </div>
      </div>
    </div>
  );
}
