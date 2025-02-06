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

  const translateToEnglish = useCallback(
    (text: string, section: string, originalQuestion: string): string => {
      if (language === "en") return text;

      const englishTranslations =
        translations.en[section as keyof typeof translations.en];
      const frenchTranslations =
        translations.fr[section as keyof typeof translations.fr];
      const dutchTranslations =
        translations.nl[section as keyof typeof translations.nl];
      const danishTranslations =
        translations.da[section as keyof typeof translations.da];
      const spanishTranslations =
        translations.es[section as keyof typeof translations.es];

      if (
        typeof englishTranslations === "object" &&
        typeof frenchTranslations === "object" &&
        typeof dutchTranslations === "object" &&
        typeof danishTranslations === "object" &&
        typeof spanishTranslations === "object"
      ) {
        // Check for answer translation first
        const questionKeys = Object.keys(englishTranslations).filter((key) =>
          key.endsWith("Options")
        );

        for (const optionKey of questionKeys) {
          const baseKey = optionKey.replace("Options", "");
          const currentQuestion =
            frenchTranslations[baseKey as keyof typeof frenchTranslations] ||
            dutchTranslations[baseKey as keyof typeof dutchTranslations] ||
            danishTranslations[baseKey as keyof typeof danishTranslations] ||
            spanishTranslations[baseKey as keyof typeof spanishTranslations];

          if (currentQuestion === originalQuestion) {
            const frenchOptions = frenchTranslations[
              optionKey as keyof typeof frenchTranslations
            ] as string[];
            const dutchOptions = dutchTranslations[
              optionKey as keyof typeof dutchTranslations
            ] as string[];
            const danishOptions = danishTranslations[
              optionKey as keyof typeof danishTranslations
            ] as string[];
            const spanishOptions = spanishTranslations[
              optionKey as keyof typeof spanishTranslations
            ] as string[];
            const englishOptions = englishTranslations[
              optionKey as keyof typeof englishTranslations
            ] as string[];

            const index =
              frenchOptions.indexOf(text) !== -1
                ? frenchOptions.indexOf(text)
                : dutchOptions.indexOf(text) !== -1
                ? dutchOptions.indexOf(text)
                : danishOptions.indexOf(text) !== -1
                ? danishOptions.indexOf(text)
                : spanishOptions.indexOf(text) !== -1
                ? spanishOptions.indexOf(text)
                : -1;

            return index !== -1 ? englishOptions[index] : text;
          }
        }

        // Check for question translation
        const questionKey = Object.keys(englishTranslations).find(
          (key) =>
            frenchTranslations[key as keyof typeof frenchTranslations] ===
              text ||
            dutchTranslations[key as keyof typeof dutchTranslations] === text ||
            danishTranslations[key as keyof typeof danishTranslations] ===
              text ||
            spanishTranslations[key as keyof typeof spanishTranslations] ===
              text
        ) as keyof typeof englishTranslations;

        if (questionKey) {
          return englishTranslations[questionKey] as string;
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
          question: translateToEnglish(
            translations[language as keyof typeof translations].section1.age,
            "section1",
            "age"
          ),
          answer: answers.section1?.age || "",
        },
        gender: {
          question: translateToEnglish(
            translations[language as keyof typeof translations].section1.gender,
            "section1",
            "gender"
          ),
          answer: translateToEnglish(
            answers.section1?.gender || "",
            "section1",
            translations[language as keyof typeof translations].section1.gender
          ),
        },
      },
      section2: {
        mirrorBothers: {
          question: translateToEnglish(
            translations[language as keyof typeof translations].section2
              .mirrorBothers,
            "section2",
            "mirrorBothers"
          ),
          answers: answers.section2?.mirrorBothers
            ? (answers.section2.mirrorBothers as string[]).map((answer) =>
                translateToEnglish(
                  answer,
                  "section2",
                  translations[language as keyof typeof translations].section2
                    .mirrorBothers
                )
              )
            : [],
        },
        everydayEffect: {
          question: translateToEnglish(
            translations[language as keyof typeof translations].section2
              .everydayEffect,
            "section2",
            "everydayEffect"
          ),
          answers: answers.section2?.everydayEffect
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
      },
      section3: {
        triedSoFar: {
          question: translateToEnglish(
            translations[language as keyof typeof translations].section3
              .triedSoFar,
            "section3",
            "triedSoFar"
          ),
          answers: answers.section3?.triedSoFar
            ? (answers.section3.triedSoFar as string[]).map((answer) =>
                translateToEnglish(
                  answer,
                  "section3",
                  translations[language as keyof typeof translations].section3
                    .triedSoFar
                )
              )
            : [],
        },
        wishLessNoticeable: {
          question: translateToEnglish(
            translations[language as keyof typeof translations].section3
              .wishLessNoticeable,
            "section3",
            "wishLessNoticeable"
          ),
          answers: answers.section3?.wishLessNoticeable
            ? (answers.section3.wishLessNoticeable as string[]).map((answer) =>
                translateToEnglish(
                  answer,
                  "section3",
                  translations[language as keyof typeof translations].section3
                    .wishLessNoticeable
                )
              )
            : [],
        },
        whyBuy: {
          question: translateToEnglish(
            translations[language as keyof typeof translations].section3.whyBuy,
            "section3",
            "whyBuy"
          ),
          answers: answers.section3?.whyBuy
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
      },
    };

    return preparedData;
  }, [answers, language, translateToEnglish]);

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
