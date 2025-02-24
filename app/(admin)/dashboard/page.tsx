"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDate } from "@/utils/format-date";

interface QuizResponse {
  id: number;
  uuid: string;
  quiz_data: {
    language: string;
    section1: {
      age: { answer: string; question: string };
      gender: { answer: string; question: string };
    };
    section2: {
      mirrorBothers: { answers: string[]; question: string };
      everydayEffect: { answers: string[]; question: string };
    };
    section3: {
      whyBuy: { answers: string[]; question: string };
      triedSoFar: { answers: string[]; question: string };
      wishLessNoticeable: { answers: string[]; question: string };
    };
  };
  created_at: string;
  updated_at: string;
}

export default function Dashboard() {
  const [data, setData] = useState<QuizResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedResponse, setSelectedResponse] = useState<QuizResponse | null>(
    null
  );

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [searchId, setSearchId] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch(
          `/api/fetch-quiz-response?sort=${sortOrder}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log("Response received:", response.status);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Data fetched successfully:", result);
        console.log(sortOrder);

        setData(result);
      } catch (error) {
        console.error("Fetch error:", error);
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, [sortOrder]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Quiz Response Dashboard</h1>
  
      {/* Filter Controls: Button & Input Side by Side */}
      <div className="flex items-center gap-4 mb-4">
        <Button
          onClick={() => {
            const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
            console.log("Toggling sort order to:", newSortOrder);
            setSortOrder(newSortOrder);
          }}
        >
          Sort by Date ({sortOrder === "asc" ? "Oldest First" : "Newest First"})
        </Button>
  
        <input
          type="number"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          placeholder="Enter response ID"
          className="w-56 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

<select
  value={selectedLanguage}
  onChange={(e) => setSelectedLanguage(e.target.value)}
  className="w-56 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
>
  <option value="">All Languages</option>
  <option value="en">English</option>
  <option value="nl">Dutch</option>
  <option value="da">Danish</option>
  <option value="fr">French</option>
  <option value="es">Spanish</option>
</select>


      </div>
  
      {/* Response Cards Start Below */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data
          .filter((response) =>
            searchId ? response.id === Number(searchId) : true
          )
          .filter((response) =>
            selectedLanguage ? response.quiz_data.language.toLowerCase() === selectedLanguage : true
          )
          .map((response) => (
            <Card key={response.uuid}>
              <CardHeader>
                <CardTitle>Response {response.id}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Language: {response.quiz_data.language}</p>
                <p>Age: {response.quiz_data.section1.age.answer}</p>
                <p>Gender: {response.quiz_data.section1.gender.answer}</p>
                <p>Submitted: {formatDate(response.created_at)}</p>
              </CardContent>
              <CardFooter>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button onClick={() => setSelectedResponse(response)}>
                      View
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-[800px] w-[90vw]">
                    <DialogHeader>
                      <DialogTitle>Response Details</DialogTitle>
                    </DialogHeader>
                    <ScrollArea className="h-[60vh] mt-4">
                      {selectedResponse && (
                        <ResponseDetails response={selectedResponse} />
                      )}
                    </ScrollArea>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          ))}
      </div>
    </div>
  );
  
}

function ResponseDetails({ response }: { response: QuizResponse }) {
  return (
    <div className="space-y-4">
      <section>
        <h3 className="text-lg font-semibold">Demographics</h3>
        <p>Age: {response.quiz_data.section1.age.answer}</p>
        <p>Gender: {response.quiz_data.section1.gender.answer}</p>
      </section>
      <section>
        <h3 className="text-lg font-semibold">Concerns</h3>
        <div>
          <h4 className="font-medium">
            {response.quiz_data.section2.mirrorBothers.question}
          </h4>
          <ul className="list-disc pl-5">
            {response.quiz_data.section2.mirrorBothers.answers.map(
              (answer, index) => (
                <li key={index}>{answer}</li>
              )
            )}
          </ul>
        </div>
        <div className="mt-2">
          <h4 className="font-medium">
            {response.quiz_data.section2.everydayEffect.question}
          </h4>
          <ul className="list-disc pl-5">
            {response.quiz_data.section2.everydayEffect.answers.map(
              (answer, index) => (
                <li key={index}>{answer}</li>
              )
            )}
          </ul>
        </div>
      </section>
      <section>
        <h3 className="text-lg font-semibold">Product Interest</h3>
        <div>
          <h4 className="font-medium">
            {response.quiz_data.section3.whyBuy.question}
          </h4>
          <ul className="list-disc pl-5">
            {response.quiz_data.section3.whyBuy.answers.map((answer, index) => (
              <li key={index}>{answer}</li>
            ))}
          </ul>
        </div>
        <div className="mt-2">
          <h4 className="font-medium">
            {response.quiz_data.section3.triedSoFar.question}
          </h4>
          <ul className="list-disc pl-5">
            {response.quiz_data.section3.triedSoFar.answers.map(
              (answer, index) => (
                <li key={index}>{answer}</li>
              )
            )}
          </ul>
        </div>
        <div className="mt-2">
          <h4 className="font-medium">
            {response.quiz_data.section3.wishLessNoticeable.question}
          </h4>
          <ul className="list-disc pl-5">
            {response.quiz_data.section3.wishLessNoticeable.answers.map(
              (answer, index) => (
                <li key={index}>{answer}</li>
              )
            )}
          </ul>
        </div>
      </section>
    </div>
  );
}
