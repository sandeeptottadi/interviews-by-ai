"use server";

import Footer from "@/app/components/Footer/Footer";
import Questions_page from "./Questions_page";

export async function generateMetadata({ params, searchParams }, parent) {
  return {
    title: "Interviews by AI",
    description:
      "Prepare confidently for your next job interview with Interviews-by-ai. Simply input your job description, receive tailored interview questions, and record your responses. Elevate your interview skills and secure your dream job effortlessly.",
  };
}

export default async function page() {
  return (
    <div>
      <Questions_page />
      <Footer />
    </div>
  );
}
