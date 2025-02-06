"use client";

import { useEffect, useState } from "react";
import { SurveyDashboard } from "@/components/analytics/SurveyDashboard";

interface QuizData {
  language: string;
  section1: {
    age: string | { answer: string; question: string };
    gender: string | { answer: string; question: string };
  };
  section2: {
    mirrorBothers: string[] | { answers: string[]; question: string };
    everydayEffect: string[] | { answers: string[]; question: string };
  };
  section3: {
    whyBuy: string[] | { answers: string[]; question: string };
    triedSoFar: string[] | { answers: string[]; question: string };
    wishLessNoticeable: string[] | { answers: string[]; question: string };
  };
}

interface ResponseItem {
  id: number;
  uuid: string;
  quiz_data: QuizData;
  created_at: string;
  updated_at: string;
}

function extractQuizData(response: ResponseItem[]): QuizData[] {
  return response.map((item) => item.quiz_data);
}

export default function Home() {
  const [data, setData] = useState<QuizData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/fetch-quiz-response",
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log("Response received:", response.status);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result: ResponseItem[] = await response.json();
        console.log("Data fetched successfully:", result);

        setData(extractQuizData(result));
      } catch (error) {
        console.error("Fetch error:", error);
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return <SurveyDashboard data={data} />;
}
