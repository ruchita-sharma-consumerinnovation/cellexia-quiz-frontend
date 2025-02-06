import { Section1Graph } from "@/components/analytics/Section1Graph"
import { Section2Graph } from "@/components/analytics/Section2Graph";
import { Section3Graph } from "@/components/analytics/Section3Graph";
import { processData } from "@/utils/process-data"

interface SurveyDashboardProps {
  data: any[]
}

export function SurveyDashboard({ data }: SurveyDashboardProps) {
  const ageData = processData(data, "section1", "age")
  const genderData = processData(data, "section1", "gender")
  const mirrorBothersData = processData(data, "section2", "mirrorBothers")
  const everydayEffectData = processData(data, "section2", "everydayEffect")
  const triedSoFarData = processData(data, "section3", "triedSoFar")
  const wishLessNoticeableData = processData(data, "section3", "wishLessNoticeable")
  const whyBuyData = processData(data, "section3", "whyBuy")

  return (
    <div className="space-y-8 p-8">
      <h1 className="text-3xl font-bold">Analytics Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Section1Graph data={ageData} title="Age Distribution" />
        <Section1Graph data={genderData} title="Gender Distribution" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Section2Graph data={mirrorBothersData} title="What bothers you most about your wrinkles?" />
        <Section2Graph data={everydayEffectData} title="How do your wrinkles affect you in everyday situations?" />
      </div>

      <Section3Graph data={triedSoFarData} title="What have you tried so far for your wrinkles?" />
      <Section3Graph data={wishLessNoticeableData} title="When do you most wish your wrinkles were less noticeable?" />
      <Section3Graph data={whyBuyData} title="Why do you want to buy the Deep Wrinkle Filler Gel?" />
    </div>
  )
}

