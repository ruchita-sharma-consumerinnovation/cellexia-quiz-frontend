import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { translations } from "@/utils/translations"

interface Section2Props {
  onNext: (answers: { mirrorBothers: string[]; everydayEffect: string[] }) => void
  onSkip: () => void
  language: string
}

export function Section2({ onNext, onSkip, language }: Section2Props) {
  const [mirrorBothers, setMirrorBothers] = useState<string[]>([])
  const [everydayEffect, setEverydayEffect] = useState<string[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext({ mirrorBothers, everydayEffect })
  }

  const toggleMirrorBother = (value: string) => {
    setMirrorBothers((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]))
  }

  const toggleEverydayEffect = (value: string) => {
    setEverydayEffect((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]))
  }

  const t = translations[language as keyof typeof translations].section2
  const buttonText = translations[language as keyof typeof translations].buttons

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">{t.title}</h2>
        <div className="space-y-2">
          <Label>{t.mirrorBothers}</Label>
          {t.mirrorBothersOptions.map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <Checkbox
                id={`mirror-${option}`}
                checked={mirrorBothers.includes(option)}
                onCheckedChange={() => toggleMirrorBother(option)}
              />
              <Label htmlFor={`mirror-${option}`}>{option}</Label>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <Label>{t.everydayEffect}</Label>
          {t.everydayEffectOptions.map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <Checkbox
                id={`everyday-${option}`}
                checked={everydayEffect.includes(option)}
                onCheckedChange={() => toggleEverydayEffect(option)}
              />
              <Label htmlFor={`everyday-${option}`}>{option}</Label>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onSkip}>
          {buttonText.skip}
        </Button>
        <Button type="submit" disabled={mirrorBothers.length === 0 || everydayEffect.length === 0}>
          {buttonText.next}
        </Button>
      </div>
    </form>
  )
}

