"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
import {
  business_analyst,
  customer_service_representative,
  data_analyst,
  human_resources,
  marketing_specialist,
  product_manager,
  qa_engineer,
  sales_representative,
  software_engineer,
  ui_ux_designer,
} from "./job_descriptions";
import right_arrow from "./right_arrow.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Header from "../components/Header/Header";

export default function Generate_question() {
  const [jobTitle, setJobTitle] = useState("Custom Job Description");
  const [jobDescription, setJobDescription] = useState("");
  const [questions, setQueestions] = useState([]);
  const jobDescriptionRef = useRef(null);
  const router = useRouter();

  const handleJobDescriptionChange = () => {
    setJobDescription(jobDescriptionRef.current.value);
  };

  function changeActiveJobTitle(event) {
    const jobTitles = document.querySelectorAll(`.${styles.job_title}`);
    jobTitles.forEach((jobTitle) => {
      jobTitle.classList.remove(styles.active_job_title);
    });
    setJobTitle(event.target.textContent);
    event.target.classList.add(styles.active_job_title);
  }

  useEffect(() => {
    if (jobTitle === "Custom Job Description") {
      setJobDescription(jobTitle);
    } else if (jobTitle === "Software Engineer") {
      setJobDescription(software_engineer);
    } else if (jobTitle === "Product Manager") {
      setJobDescription(product_manager);
    } else if (jobTitle === "Business Analyst") {
      setJobDescription(business_analyst);
    } else if (jobTitle === "Marketing Specialist") {
      setJobDescription(marketing_specialist);
    } else if (jobTitle === "UI/UX Designer") {
      setJobDescription(ui_ux_designer);
    } else if (jobTitle === "Data Analyst") {
      setJobDescription(data_analyst);
    } else if (jobTitle === "Sales Representative") {
      setJobDescription(sales_representative);
    } else if (jobTitle === "Human Resources Specialist") {
      setJobDescription(human_resources);
    } else if (jobTitle === "QA Engineer") {
      setJobDescription(qa_engineer);
    } else if (jobTitle === "Customer Service Representative") {
      setJobDescription(customer_service_representative);
    }
  }, [jobTitle]);

  async function generate_questions() {
    if (!jobDescription) alert("Please enter a job description");
    fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/generate_questions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ jobDescription }),
    })
      .then((response) => response.json())
      .then((data) => {
        const question_id = data.question_id;
        sessionStorage.setItem(
          `${question_id}-${1}`,
          JSON.stringify(data.question)
        );
        router.push(`/question/${question_id}/${1}`);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <div className={styles.generate_questions_page}>
      <Header />
      <div className={styles.generate_questions_container}>
        <h1>Select a job Description</h1>
        <div className={styles.job_titles}>
          <div
            onClick={(e) => changeActiveJobTitle(e)}
            className={`${styles.job_title} ${styles.active_job_title}`}
          >
            Custom Job Description
          </div>
          <div
            onClick={(e) => changeActiveJobTitle(e)}
            className={styles.job_title}
          >
            Business Analyst
          </div>
          <div
            onClick={(e) => changeActiveJobTitle(e)}
            className={styles.job_title}
          >
            Software Engineer
          </div>
          <div
            onClick={(e) => changeActiveJobTitle(e)}
            className={styles.job_title}
          >
            Product Manager
          </div>
          <div
            onClick={(e) => changeActiveJobTitle(e)}
            className={styles.job_title}
          >
            Data Analyst
          </div>
          <div
            onClick={(e) => changeActiveJobTitle(e)}
            className={styles.job_title}
          >
            Marketing Specialist
          </div>
          <div
            onClick={(e) => changeActiveJobTitle(e)}
            className={styles.job_title}
          >
            Customer Service Representative
          </div>
          <div
            onClick={(e) => changeActiveJobTitle(e)}
            className={styles.job_title}
          >
            Sales Representative
          </div>
          <div
            onClick={(e) => changeActiveJobTitle(e)}
            className={styles.job_title}
          >
            UI/UX Designer
          </div>
          <div
            onClick={(e) => changeActiveJobTitle(e)}
            className={styles.job_title}
          >
            Human Resources Specialist
          </div>
          <div
            onClick={(e) => changeActiveJobTitle(e)}
            className={styles.job_title}
          >
            QA Engineer
          </div>
        </div>
        <textarea
          ref={jobDescriptionRef}
          onChange={() => handleJobDescriptionChange()}
          className={styles.description_input}
          type="text"
          value={jobDescription}
          placeholder="Enter a job title"
        />
        <button
          onClick={() => generate_questions()}
          className={styles.generate_btn}
        >
          Generate Question <Image alt="right_arrow" src={right_arrow} />
        </button>
        <hr />
        {questions.map((question, index) => {
          return (
            <div key={index} className={styles.question}>
              {question}
            </div>
          );
        })}
      </div>
    </div>
  );
}
