'use client'

import { useState, useEffect } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Dashboard() {
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Quiz Submissions Dashboard</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Submissions Overview</CardTitle>
        </CardHeader>
      </Card>
    </div>
  )
}

