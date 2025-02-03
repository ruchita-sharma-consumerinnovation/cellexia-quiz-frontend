import { useState } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { translations } from "@/utils/translations"

interface Section1Props {
  onNext: (answers: { age: string; gender: string }) => void
  onSkip: () => void
  language: string
}

export function Section1({ onNext, onSkip, language }: Section1Props) {
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext({ age, gender })
  }

  const t = translations[language as keyof typeof translations].section1
  const buttonText = translations[language as keyof typeof translations].buttons

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">{t.title}</h2>
        <div className="space-y-2">
          <Label>{t.age}</Label>
          <RadioGroup value={age} onValueChange={setAge}>
            {t.ageOptions.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`age-${option}`} />
                <Label htmlFor={`age-${option}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <div className="space-y-2">
          <Label>{t.gender}</Label>
          <RadioGroup value={gender} onValueChange={setGender}>
            {t.genderOptions.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`gender-${option}`} />
                <Label htmlFor={`gender-${option}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>
      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onSkip}>
          {buttonText.skip}
        </Button>
        <Button type="submit" disabled={!age || !gender}>
          {buttonText.next}
        </Button>
      </div>
    </form>
  )
}

