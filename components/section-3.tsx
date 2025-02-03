import { useEffect } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { translations } from "@/utils/translations"

interface Section3Props {
  answers: {
    triedSoFar: string[]
    wishLessNoticeable: string[]
    whyBuy: string[]
  }
  updateSection3: (key: string, value: string[]) => void
  onSubmit: () => void
  onSkip: () => void
  language: string
}

export function Section3({ answers, updateSection3, onSubmit, onSkip, language }: Section3Props) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit()
  }

  const toggleAnswer = (key: string, value: string) => {
    updateSection3(
      key,
      answers[key as keyof typeof answers].includes(value)
        ? answers[key as keyof typeof answers].filter((item) => item !== value)
        : [...answers[key as keyof typeof answers], value],
    )
  }

  const t = translations[language as keyof typeof translations].section3
  const buttonText = translations[language as keyof typeof translations].buttons

  useEffect(() => {
    console.log("Section 3 answers:", answers)
  }, [answers])

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">{t.title}</h2>
        <div className="space-y-2">
          <Label>{t.triedSoFar}</Label>
          {t.triedSoFarOptions.map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <Checkbox
                id={`tried-${option}`}
                checked={answers.triedSoFar.includes(option)}
                onCheckedChange={() => toggleAnswer("triedSoFar", option)}
              />
              <Label htmlFor={`tried-${option}`}>{option}</Label>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <Label>{t.wishLessNoticeable}</Label>
          {t.wishLessNoticeableOptions.map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <Checkbox
                id={`wish-${option}`}
                checked={answers.wishLessNoticeable.includes(option)}
                onCheckedChange={() => toggleAnswer("wishLessNoticeable", option)}
              />
              <Label htmlFor={`wish-${option}`}>{option}</Label>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <Label>{t.whyBuy}</Label>
          {t.whyBuyOptions.map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <Checkbox
                id={`why-${option}`}
                checked={answers.whyBuy.includes(option)}
                onCheckedChange={() => toggleAnswer("whyBuy", option)}
              />
              <Label htmlFor={`why-${option}`}>{option}</Label>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onSkip}>
          {buttonText.skip}
        </Button>
        <Button
          type="submit"
          disabled={
            answers.triedSoFar.length === 0 || answers.wishLessNoticeable.length === 0 || answers.whyBuy.length === 0
          }
        >
          {buttonText.submit}
        </Button>
      </div>
    </form>
  )
}

