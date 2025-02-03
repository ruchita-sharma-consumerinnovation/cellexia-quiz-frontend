"use client";

import { useState, useCallback } from "react";
import { Section1 } from "@/components/section-1";
import { Section2 } from "@/components/section-2";
import { Section3 } from "@/components/section-3";
import { ProgressBar } from "@/components/progress-bar";
import { LanguageSelector } from "@/components/language-selector";
import { translations } from "@/utils/translations";

export default function Quiz() {
  const [currentSection, setCurrentSection] = useState(1);
  const [language, setLanguage] = useState("en");
  const [answers, setAnswers] = useState({
    section1: {
      age: "",
      gender: "",
    },
    section2: {
      mirrorBothers: [],
      everydayEffect: [],
    },
    section3: {
      triedSoFar: [],
      wishLessNoticeable: [],
      whyBuy: [],
    },
  });

  const handleNext = useCallback(
    (sectionAnswers: any) => {
      setAnswers((prev) => ({
        ...prev,
        [`section${currentSection}`]: sectionAnswers,
      }));
      setCurrentSection((prev) => prev + 1);
    },
    [currentSection]
  );

  const handleSkip = useCallback(() => {
    window.location.href = "http://cellexialabs.com";
  }, []);

  const translateToEnglish = useCallback(
    (answer: string, section: string, question: string): string => {
      if (language === "en") return answer;

      const englishTranslations =
        translations.en[section as keyof typeof translations.en];
      const frenchTranslations =
        translations.fr[section as keyof typeof translations.fr];

      if (
        typeof englishTranslations === "object" &&
        typeof frenchTranslations === "object"
      ) {
        const questionKey = Object.keys(englishTranslations).find(
          (key) =>
            frenchTranslations[key as keyof typeof frenchTranslations] ===
            question
        ) as keyof typeof englishTranslations;

        if (
          questionKey &&
          Array.isArray(frenchTranslations[`${questionKey}Options`])
        ) {
          const frenchOptions = frenchTranslations[
            `${questionKey}Options` as keyof typeof frenchTranslations
          ] as string[];
          const englishOptions = englishTranslations[
            `${questionKey}Options` as keyof typeof englishTranslations
          ] as string[];
          const index = frenchOptions.indexOf(answer);
          if (index !== -1) {
            return englishOptions[index];
          }
        }
      }
      return answer;
    },
    [language]
  );

  const prepareDataForSubmission = useCallback(() => {
    console.log("Current answers state:", answers);
    const preparedData = {
      language: language,
      section1: {
        age: answers.section1?.age || "",
        gender: translateToEnglish(
          answers.section1?.gender || "",
          "section1",
          translations[language as keyof typeof translations].section1.gender
        ),
      },
      section2: {
        mirrorBothers: answers.section2?.mirrorBothers
          ? (answers.section2.mirrorBothers as string[]).map((answer) =>
              translateToEnglish(
                answer,
                "section2",
                translations[language as keyof typeof translations].section2
                  .mirrorBothers
              )
            )
          : [],
        everydayEffect: answers.section2?.everydayEffect
          ? (answers.section2.everydayEffect as string[]).map((answer) =>
              translateToEnglish(
                answer,
                "section2",
                translations[language as keyof typeof translations].section2
                  .everydayEffect
              )
            )
          : [],
      },
      section3: {
        triedSoFar: answers.section3?.triedSoFar
          ? (answers.section3.triedSoFar as string[]).map((answer) =>
              translateToEnglish(
                answer,
                "section3",
                translations[language as keyof typeof translations].section3
                  .triedSoFar
              )
            )
          : [],
        wishLessNoticeable: answers.section3?.wishLessNoticeable
          ? (answers.section3.wishLessNoticeable as string[]).map((answer) =>
              translateToEnglish(
                answer,
                "section3",
                translations[language as keyof typeof translations].section3
                  .wishLessNoticeable
              )
            )
          : [],
        whyBuy: answers.section3?.whyBuy
          ? (answers.section3.whyBuy as string[]).map((answer) =>
              translateToEnglish(
                answer,
                "section3",
                translations[language as keyof typeof translations].section3
                  .whyBuy
              )
            )
          : [],
      },
    };

    return preparedData;
  }, [answers, language, translateToEnglish]);

  const handleSubmit = useCallback(() => {
    const dataToSubmit = prepareDataForSubmission();
    console.log(
      "Data to be sent to the backend:",
      JSON.stringify(dataToSubmit, null, 2)
    );
    window.location.href = "http://cellexialabs.com";
  }, [prepareDataForSubmission]);

  const updateSection3 = useCallback((key: string, value: string[]) => {
    setAnswers((prev) => ({
      ...prev,
      section3: {
        ...prev.section3,
        [key]: value,
      },
    }));
  }, []);

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <div className="flex justify-end mb-4">
        <LanguageSelector language={language} setLanguage={setLanguage} />
      </div>
      <ProgressBar currentSection={currentSection} totalSections={3} />
      <div className="mt-8">
        {currentSection === 1 && (
          <Section1
            onNext={handleNext}
            onSkip={handleSkip}
            language={language}
          />
        )}
        {currentSection === 2 && (
          <Section2
            onNext={handleNext}
            onSkip={handleSkip}
            language={language}
          />
        )}
        {currentSection === 3 && (
          <Section3
            answers={answers.section3}
            updateSection3={updateSection3}
            onSubmit={handleSubmit}
            onSkip={handleSkip}
            language={language}
          />
        )}
      </div>
    </div>
  );
}
