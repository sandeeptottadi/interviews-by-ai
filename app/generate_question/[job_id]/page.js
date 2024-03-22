"use server";

import Generate_question from "./Generate_question";

export async function generateMetadata({ params, searchParams }, parent) {
  return {
    title: "Interviews by AI",
    description:
      "Prepare confidently for your next job interview with Interviews-by-ai. Simply input your job description, receive tailored interview questions, and record your responses. Elevate your interview skills and secure your dream job effortlessly.",
  };
}

export default async function page({ params }) {
  return (
    <div>
      <Generate_question params={params} />
    </div>
  );
}
