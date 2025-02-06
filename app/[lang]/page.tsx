"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Section1 } from "@/components/section-1";
import { Section2 } from "@/components/section-2";
import { Section3 } from "@/components/section-3";
import { ProgressBar } from "@/components/progress-bar";
import { LanguageSelector } from "@/components/language-selector";
import { translations } from "@/utils/translations";

export default function Quiz() {
  const router = useRouter();
  const params = useParams();
  const [currentSection, setCurrentSection] = useState(1);
  const [language, setLanguage] = useState((params.lang as string) || "en");
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

  let quizData = {
    step1: {},
    step2: {},
  };

  useEffect(() => {
    if (params.lang && params.lang !== language) {
      setLanguage(params.lang as string);
    }
  }, [params.lang, language]);

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

  const getSelectedLanguage = useCallback(() => {
    return language;
  }, [language]);

  const handleSkip = useCallback(() => {
    // Determine the selected language
    const selectedLanguage = getSelectedLanguage(); // Get the currently selected language

    // Set the URL based on the selected language
    let redirectUrl =
      "https://cellexialabs.com/products/deep-wrinkle-filler-gel"; // Default URL (English)

    switch (selectedLanguage) {
      case "en":
        redirectUrl =
          "https://cellexialabs.com/products/deep-wrinkle-filler-gel";
        break;
      case "fr":
        redirectUrl =
          "https://cellexialabs.com/fr/products/deep-wrinkle-filler-gel";
        break;
      case "nl":
        redirectUrl =
          "https://cellexialabs.com/nl/products/diepe-rimpelvuller-gel";
        break;
      case "da":
        redirectUrl =
          "https://cellexialabs.com/da/products/rynkeudfyldende-gel";
        break;
      case "es":
        redirectUrl =
          "https://cellexialabs.com/es/products/gel-rellenador-de-arrugas-profundas";
        break;
      default:
        redirectUrl =
          "https://cellexialabs.com/products/deep-wrinkle-filler-gel";
    }

    // Redirect to the determined URL
    window.location.href = redirectUrl;
  }, [getSelectedLanguage]);

  const translateTextToEnglish = useCallback(
    (text: string, section: keyof typeof translations.en, originalText: string, isQuestion: boolean): string => {
      if (language === "en") return text;

      const englishTranslations = translations.en[section];
      const currentTranslations = translations[language as keyof typeof translations][section];

      if (typeof englishTranslations === "object" && typeof currentTranslations === "object") {
        if (isQuestion) {
          const questionKey = Object.keys(englishTranslations).find(
            (key) => currentTranslations[key as keyof typeof currentTranslations] === text
          ) as keyof typeof englishTranslations;

          if (questionKey) {
            return englishTranslations[questionKey] as string;
          }
        } else {
          const questionKeys = Object.keys(englishTranslations).filter((key) =>
            key.endsWith("Options")
          );

          for (const optionKey of questionKeys) {
            const baseKey = optionKey.replace("Options", "");
            const currentQuestion = currentTranslations[baseKey as keyof typeof currentTranslations];

            if (currentQuestion === originalText) {
              const currentOptions = currentTranslations[optionKey as keyof typeof currentTranslations] as string[];
              const englishOptions = englishTranslations[optionKey as keyof typeof englishTranslations] as string[];

              const index = currentOptions.indexOf(text);
              return index !== -1 ? englishOptions[index] : text;
            }
          }
        }
      }
      return text;
    },
    [language]
  );

  const prepareDataForSubmission = useCallback(() => {
    console.log("Current answers state:", answers);
    const preparedData = {
      language: language,
      section1: {
        age: {
          question: translateTextToEnglish(
            translations[language as keyof typeof translations].section1.age,
            "section1",
            "age",
            true
          ),
          answer: answers.section1?.age || "",
        },
        gender: {
          question: translateTextToEnglish(
            translations[language as keyof typeof translations].section1.gender,
            "section1",
            "gender",
            true
          ),
          answer: translateTextToEnglish(
            answers.section1?.gender || "",
            "section1",
            translations[language as keyof typeof translations].section1.gender,
            false
          ),
        },
      },
      section2: {
        mirrorBothers: {
          question: translateTextToEnglish(
            translations[language as keyof typeof translations].section2.mirrorBothers,
            "section2",
            "mirrorBothers",
            true
          ),
          answers: answers.section2?.mirrorBothers
            ? (answers.section2.mirrorBothers as string[]).map((answer) =>
                translateTextToEnglish(
                  answer,
                  "section2",
                  translations[language as keyof typeof translations].section2.mirrorBothers,
                  false
                )
              )
            : [],
        },
        everydayEffect: {
          question: translateTextToEnglish(
            translations[language as keyof typeof translations].section2.everydayEffect,
            "section2",
            "everydayEffect",
            true
          ),
          answers: answers.section2?.everydayEffect
            ? (answers.section2.everydayEffect as string[]).map((answer) =>
                translateTextToEnglish(
                  answer,
                  "section2",
                  translations[language as keyof typeof translations].section2.everydayEffect,
                  false
                )
              )
            : [],
        },
      },
      section3: {
        triedSoFar: {
          question: translateTextToEnglish(
            translations[language as keyof typeof translations].section3.triedSoFar,
            "section3",
            "triedSoFar",
            true
          ),
          answers: answers.section3?.triedSoFar
            ? (answers.section3.triedSoFar as string[]).map((answer) =>
                translateTextToEnglish(
                  answer,
                  "section3",
                  translations[language as keyof typeof translations].section3.triedSoFar,
                  false
                )
              )
            : [],
        },
        wishLessNoticeable: {
          question: translateTextToEnglish(
            translations[language as keyof typeof translations].section3.wishLessNoticeable,
            "section3",
            "wishLessNoticeable",
            true
          ),
          answers: answers.section3?.wishLessNoticeable
            ? (answers.section3.wishLessNoticeable as string[]).map((answer) =>
                translateTextToEnglish(
                  answer,
                  "section3",
                  translations[language as keyof typeof translations].section3.wishLessNoticeable,
                  false
                )
              )
            : [],
        },
        whyBuy: {
          question: translateTextToEnglish(
            translations[language as keyof typeof translations].section3.whyBuy,
            "section3",
            "whyBuy",
            true
          ),
          answers: answers.section3?.whyBuy
            ? (answers.section3.whyBuy as string[]).map((answer) =>
                translateTextToEnglish(
                  answer,
                  "section3",
                  translations[language as keyof typeof translations].section3.whyBuy,
                  false
                )
              )
            : [],
        },
      },
    };

    return preparedData;
  }, [
    answers,
    language,
    translateTextToEnglish,
  ]);

  const handleSubmit = useCallback(async () => {
    const dataToSubmit = prepareDataForSubmission();

    try {
      // Send the responses to your backend
      const response = await fetch(
        "http://localhost:3000/api/save-quiz-response",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSubmit),
        }
      );

      if (!response.ok) {
        console.error("Failed to save quiz responses");
      }

      const responseData = await response.json();
    } catch (error) {
      console.error("Error saving quiz responses:", error);
    }
    console.log(
      "Data to be sent to the backend:",
      JSON.stringify(dataToSubmit, null, 2)
    );

    // Determine the selected language
    const selectedLanguage = getSelectedLanguage(); // Get the currently selected language

    // Set the URL based on the selected language
    let redirectUrl =
      "https://cellexialabs.com/products/deep-wrinkle-filler-gel"; // Default URL (English)

    switch (selectedLanguage) {
      case "en":
        redirectUrl =
          "https://cellexialabs.com/products/deep-wrinkle-filler-gel";
        break;
      case "fr":
        redirectUrl =
          "https://cellexialabs.com/fr/products/deep-wrinkle-filler-gel";
        break;
      case "nl":
        redirectUrl =
          "https://cellexialabs.com/nl/products/diepe-rimpelvuller-gel";
        break;
      case "da":
        redirectUrl =
          "https://cellexialabs.com/da/products/rynkeudfyldende-gel";
        break;
      case "es":
        redirectUrl =
          "https://cellexialabs.com/es/products/gel-rellenador-de-arrugas-profundas";
        break;
      default:
        redirectUrl =
          "https://cellexialabs.com/products/deep-wrinkle-filler-gel";
    }

    // Redirect to the determined URL
    window.location.href = redirectUrl;
  }, [prepareDataForSubmission, getSelectedLanguage]);

  const updateSection3 = useCallback((key: string, value: string[]) => {
    setAnswers((prev) => ({
      ...prev,
      section3: {
        ...prev.section3,
        [key]: value,
      },
    }));
  }, []);

  const handleLanguageChange = useCallback(
    (newLanguage: string) => {
      router.push(`/${newLanguage}`);
    },
    [router]
  );

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <div className="flex justify-end mb-4">
        <LanguageSelector
          language={language}
          setLanguage={handleLanguageChange}
        />
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