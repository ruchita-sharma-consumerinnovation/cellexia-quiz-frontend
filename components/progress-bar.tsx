import { Progress } from "@/components/ui/progress"

interface ProgressBarProps {
  currentSection: number
  totalSections: number
}

export function ProgressBar({ currentSection, totalSections }: ProgressBarProps) {
  const progress = (currentSection / totalSections) * 100

  return <Progress value={progress} className="w-full" />
}

