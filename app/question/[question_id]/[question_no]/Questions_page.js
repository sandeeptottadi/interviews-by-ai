"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import mic from "./svgs/mic.svg";
import Header from "@/app/components/Header/Header";
import Feedback from "@/app/components/Feedback/Feedback";
import Sample_response from "@/app/components/Sample_response/Sample_response";
import pause from "./svgs/pause.svg";
import robot from "./svgs/robot.svg";
import reRecord from "./svgs/re-record.svg";
import play from "./svgs/play.svg";
import { useSelector } from "react-redux";
import arrow from "./svgs/arrow.svg";
import { useRouter } from "next/navigation";
import pause_play from "./svgs/pause_play.svg";

export default function Questions_page() {
  const { question_id, question_no } = useParams();
  const [question, setQuestion] = useState("");
  const [feedback, setFeedback] = useState("");
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef(null);
  const audio_source = useRef(null);
  const router = useRouter();

  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const audioContextRef = useRef(null);
  const mediaRecorder = useRef();
  const [paused, setPaused] = useState(false);
  const auth = useSelector((state) => state.auth);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      audioContextRef.current = new (window.AudioContext ||
        window.webkitAudioContext)();
    }
  }, []);

  useEffect(() => {
    if (seconds >= 110) {
      const time = document.getElementById("time");
      time.classList.add(styles.blink);
    }
    if (seconds === 120) {
      stopRecording();
    }
  }, [seconds]);

  function startTimer() {
    timerRef.current = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 1000);
  }

  function stopRecording() {
    setRecording(false);
    setPaused(true);
    mediaRecorder.current.stop();
    clearInterval(timerRef.current);
    const time = document.getElementById("time");
    time.classList.remove(styles.blink);
  }

  function removeQuotes(text) {
    if (text.startsWith('"') && text.endsWith('"')) {
      return text.slice(1, -1);
    } else {
      return text;
    }
  }

  function generate_response() {
    const formData = new FormData();
    formData.append("question", question);
    formData.append("audio", audioBlob);
    fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/interviews/generate_response`,
      {
        method: "POST",
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setFeedback(data.feedback);
      });
  }

  useEffect(() => {
    const question_text = sessionStorage.getItem(
      `${question_id}-${question_no}`
    );
    if (!question_text) {
      window.location.href = "/generate_question";
    }
    setQuestion(removeQuotes(question_text));
  }, []);

  function endInterview() {
    stopRecording();
  }

  async function startRecording() {
    if (recording) {
      stopRecording();
      return;
    }
    setSeconds(0);
    startTimer();

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      const chunks = [];

      mediaRecorder.current.ondataavailable = (e) => {
        chunks.push(e.data);
      };

      mediaRecorder.current.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/wav" });
        setAudioBlob(blob);
      };

      mediaRecorder.current.start();
      setRecording(true);

      setTimeout(() => {
        mediaRecorder.current.stop();
        setRecording(false);
      }, 120 * 1000);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  }

  async function playAudio() {
    if (!audioBlob) {
      console.error("No audio recorded");
      return;
    }

    if (playing) {
      audio_source.current.stop();
      setPlaying(false);
      return;
    }

    setPlaying(true);

    if (audioContextRef.current) {
      const audioBuffer = await audioContextRef.current.decodeAudioData(
        await audioBlob.arrayBuffer()
      );
      audio_source.current = audioContextRef.current.createBufferSource();
      audio_source.current.buffer = audioBuffer;
      audio_source.current.connect(audioContextRef.current.destination);
      audio_source.current.start();
      setTimeout(() => {
        setPlaying(false);
      }, seconds * 1000);
    }
  }

  return (
    <div className={styles.question_page}>
      <Header />
      <div className={styles.question_container}>
        <div className={styles.question_card}>
          <div className={styles.spaced_row}>
            <div
              className={styles.back_btn}
              onClick={() => router.push("/generate_question")}
            >
              <Image src={arrow} alt="arrow" /> Generate Question
            </div>
            <div onClick={() => endInterview()} className={styles.end_btn}>
              End & Review
            </div>
          </div>
          <button className={styles.question_no}>Q : {question_no}</button>
          <div className={styles.question_set}>
            <div className={styles.question_text}>{question}</div>
            <div className={styles.timer}>
              <span className={styles.time} id="time">
                {Math.floor(seconds / 60)}:
                {seconds % 60 < 10 ? "0" + (seconds % 60) : seconds % 60}{" "}
              </span>
              / 2:00
            </div>
            {!paused && (
              <>
                <div id="record_btn" className={styles.record_btn}>
                  {recording ? (
                    <Image
                      title="Pause"
                      onClick={() => stopRecording()}
                      src={pause}
                      alt="pause button"
                      className={styles.mic}
                    />
                  ) : (
                    <Image
                      title="Record"
                      onClick={() => startRecording()}
                      src={mic}
                      alt="mic"
                      className={styles.mic}
                    />
                  )}
                </div>
              </>
            )}
            {paused ? (
              <div className={styles.buttons}>
                <div
                  className={styles.button}
                  onClick={() => generate_response()}
                >
                  <Image src={robot} alt="robot" />
                  Submit for Review
                </div>
                <div className={styles.button} onClick={() => playAudio()}>
                  {!playing ? (
                    <Image src={play} alt="play" />
                  ) : (
                    <Image
                      height={24}
                      width={24}
                      src={pause_play}
                      alt="pause"
                    />
                  )}
                  Play
                </div>
                <div
                  className={styles.button}
                  onClick={() => {
                    setSeconds(0);
                    setPaused(false);
                  }}
                >
                  <Image src={reRecord} alt="re-record" />
                  Re-record
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className={styles.feedback_content}>
          <Feedback feedback={feedback} />
          <Sample_response sample_response={feedback} />
        </div>
      </div>
    </div>
  );
}
