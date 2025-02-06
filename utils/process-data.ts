interface SurveyResponse {
  language: string
  section1: {
    age: { question: string; answer: string }
    gender: { question: string; answer: string }
  }
  section2: {
    mirrorBothers: { question: string; answers: string[] }
    everydayEffect: { question: string; answers: string[] }
  }
  section3: {
    triedSoFar: { question: string; answers: string[] }
    wishLessNoticeable: { question: string; answers: string[] }
    whyBuy: { question: string; answers: string[] }
  }
}

export function processData(data: SurveyResponse[], section: keyof SurveyResponse, question: string) {
  const counts: { [key: string]: number } = {}

  data.forEach((response) => {
    
    const sectionData = response[section] as Record<string, { question: string; answer?: string; answers?: string[] }>

    if (sectionData && sectionData[question]) {
      const answers = sectionData[question].answers || [sectionData[question].answer]
      answers.forEach((answer) => {
        if (answer) counts[answer] = (counts[answer] || 0) + 1
      })
    }
  })

  return Object.entries(counts).map(([answer, count]) => ({ answer, count }))
}


