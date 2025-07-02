"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Utensils } from "lucide-react"
import type { MealPlan, DayMeal } from "../utils"

interface MealCalendarProps {
  mealPlan: MealPlan
  onSelectDay: (date: string) => void
  selectedDate: string | null
}

export default function MealCalendar({ mealPlan, onSelectDay, selectedDate }: MealCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }

    return days
  }

  const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0]
  }

  const getMealCount = (dayMeal: DayMeal) => {
    let count = 0
    if (dayMeal.breakfast) count++
    if (dayMeal.lunch) count++
    if (dayMeal.dinner) count++
    count += dayMeal.snacks.length
    return count
  }

  const getTotalCalories = (dayMeal: DayMeal) => {
    let total = 0
    if (dayMeal.breakfast) total += dayMeal.breakfast.totalCalories
    if (dayMeal.lunch) total += dayMeal.lunch.totalCalories
    if (dayMeal.dinner) total += dayMeal.dinner.totalCalories
    dayMeal.snacks.forEach((snack) => (total += snack.totalCalories))
    return total
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const days = getDaysInMonth(currentDate)
  const monthYear = currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Utensils className="w-5 h-5 text-orange-500" />
            Meal Calendar
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="font-semibold min-w-[140px] text-center">{monthYear}</span>
            <Button variant="outline" size="sm" onClick={() => navigateMonth("next")}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1 mb-4">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => {
            if (!day) {
              return <div key={index} className="p-2 h-20" />
            }

            const dateStr = formatDate(day)
            const dayMeal = mealPlan[dateStr]
            const isSelected = selectedDate === dateStr
            const isToday = dateStr === formatDate(new Date())

            return (
              <div
                key={dateStr}
                className={`
                  p-2 h-20 border rounded-lg cursor-pointer transition-all hover:bg-gray-50
                  ${isSelected ? "ring-2 ring-orange-500 bg-orange-50" : ""}
                  ${isToday ? "border-orange-300 bg-orange-25" : "border-gray-200"}
                `}
                onClick={() => onSelectDay(dateStr)}
              >
                <div className="text-sm font-medium mb-1">{day.getDate()}</div>
                {dayMeal && (
                  <div className="space-y-1">
                    <div className="flex items-center gap-1">
                      <Badge variant="secondary" className="text-xs px-1 py-0">
                        {getMealCount(dayMeal)} meals
                      </Badge>
                    </div>
                    <div className="text-xs text-gray-600">{getTotalCalories(dayMeal)} cal</div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
