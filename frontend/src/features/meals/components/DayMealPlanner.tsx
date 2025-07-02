"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Coffee, Sun, Sunset, Moon, Clock, Users, Flame } from "lucide-react"
import type { Recipe, DayMeal } from "../utils"
interface DayMealPlannerProps {
  date: string
  dayMeal: DayMeal
  recipes: Recipe[]
  onAddMeal: (mealType: "breakfast" | "lunch" | "dinner" | "snack", recipeId: string) => void
  onRemoveMeal: (mealType: "breakfast" | "lunch" | "dinner" | "snack", recipeId?: string) => void
  onCreateRecipe: () => void
}

export default function DayMealPlanner({
  date,
  dayMeal,
  recipes,
  onAddMeal,
  onRemoveMeal,
  onCreateRecipe,
}: DayMealPlannerProps) {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const MealSection = ({
    title,
    icon,
    mealType,
    recipe,
    color,
  }: {
    title: string
    icon: React.ReactNode
    mealType: "breakfast" | "lunch" | "dinner" | "snack"
    recipe?: Recipe
    color: string
  }) => (
    <Card className="border-l-4" style={{ borderLeftColor: color }}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {recipe ? (
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-semibold text-gray-900">{recipe.name}</h4>
                <p className="text-sm text-gray-600 mt-1">{recipe.description}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onRemoveMeal(mealType)}
                className="text-red-600 hover:text-red-700"
              >
                Remove
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-gray-500" />
                <span>{recipe.prepTime + recipe.cookTime} min</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Users className="w-4 h-4 text-gray-500" />
                <span>{recipe.servings} servings</span>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2">
              <div className="text-center p-2 bg-orange-50 rounded">
                <Flame className="w-4 h-4 text-orange-500 mx-auto mb-1" />
                <div className="text-sm font-semibold">{recipe.totalCalories}</div>
                <div className="text-xs text-gray-600">cal</div>
              </div>
              <div className="text-center p-2 bg-blue-50 rounded">
                <div className="text-sm font-semibold">{recipe.totalProtein}g</div>
                <div className="text-xs text-gray-600">protein</div>
              </div>
              <div className="text-center p-2 bg-green-50 rounded">
                <div className="text-sm font-semibold">{recipe.totalCarbs}g</div>
                <div className="text-xs text-gray-600">carbs</div>
              </div>
              <div className="text-center p-2 bg-yellow-50 rounded">
                <div className="text-sm font-semibold">{recipe.totalFat}g</div>
                <div className="text-xs text-gray-600">fat</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">No meal planned</p>
            <div className="space-y-2">
              <select
                className="w-full p-2 border rounded-md"
                onChange={(e) => e.target.value && onAddMeal(mealType, e.target.value)}
                defaultValue=""
              >
                <option value="">Select a recipe</option>
                {recipes.map((recipe) => (
                  <option key={recipe.id} value={recipe.id}>
                    {recipe.name} ({recipe.totalCalories} cal)
                  </option>
                ))}
              </select>
              <Button variant="outline" size="sm" onClick={onCreateRecipe} className="w-full bg-transparent">
                <Plus className="w-4 h-4 mr-2" />
                Create New Recipe
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )

  const getTotalNutrition = () => {
    let calories = 0,
      protein = 0,
      carbs = 0,
      fat = 0

    if (dayMeal.breakfast) {
      calories += dayMeal.breakfast.totalCalories
      protein += dayMeal.breakfast.totalProtein
      carbs += dayMeal.breakfast.totalCarbs
      fat += dayMeal.breakfast.totalFat
    }
    if (dayMeal.lunch) {
      calories += dayMeal.lunch.totalCalories
      protein += dayMeal.lunch.totalProtein
      carbs += dayMeal.lunch.totalCarbs
      fat += dayMeal.lunch.totalFat
    }
    if (dayMeal.dinner) {
      calories += dayMeal.dinner.totalCalories
      protein += dayMeal.dinner.totalProtein
      carbs += dayMeal.dinner.totalCarbs
      fat += dayMeal.dinner.totalFat
    }
    dayMeal.snacks.forEach((snack) => {
      calories += snack.totalCalories
      protein += snack.totalProtein
      carbs += snack.totalCarbs
      fat += snack.totalFat
    })

    return { calories, protein, carbs, fat }
  }

  const totalNutrition = getTotalNutrition()

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">{formatDate(date)}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <Flame className="w-5 h-5 text-orange-500 mx-auto mb-2" />
              <div className="text-lg font-bold text-orange-900">{totalNutrition.calories}</div>
              <div className="text-sm text-orange-700">Total Calories</div>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-lg font-bold text-blue-900">{totalNutrition.protein}g</div>
              <div className="text-sm text-blue-700">Protein</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-lg font-bold text-green-900">{totalNutrition.carbs}g</div>
              <div className="text-sm text-green-700">Carbs</div>
            </div>
            <div className="text-center p-3 bg-yellow-50 rounded-lg">
              <div className="text-lg font-bold text-yellow-900">{totalNutrition.fat}g</div>
              <div className="text-sm text-yellow-700">Fat</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <MealSection
          title="Breakfast"
          icon={<Coffee className="w-5 h-5" />}
          mealType="breakfast"
          recipe={dayMeal.breakfast}
          color="#f97316"
        />

        <MealSection
          title="Lunch"
          icon={<Sun className="w-5 h-5" />}
          mealType="lunch"
          recipe={dayMeal.lunch}
          color="#eab308"
        />

        <MealSection
          title="Dinner"
          icon={<Sunset className="w-5 h-5" />}
          mealType="dinner"
          recipe={dayMeal.dinner}
          color="#dc2626"
        />

        {/* Snacks Section */}
        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Moon className="w-5 h-5" />
              Snacks
            </CardTitle>
          </CardHeader>
          <CardContent>
            {dayMeal.snacks.length > 0 ? (
              <div className="space-y-3">
                {dayMeal.snacks.map((snack, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <div>
                      <h4 className="font-medium">{snack.name}</h4>
                      <div className="text-sm text-gray-600">{snack.totalCalories} cal</div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onRemoveMeal("snack", snack.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-500 mb-4">No snacks planned</p>
              </div>
            )}

            <div className="mt-4 space-y-2">
              <select
                className="w-full p-2 border rounded-md"
                onChange={(e) => e.target.value && onAddMeal("snack", e.target.value)}
                defaultValue=""
              >
                <option value="">Add a snack</option>
                {recipes.map((recipe) => (
                  <option key={recipe.id} value={recipe.id}>
                    {recipe.name} ({recipe.totalCalories} cal)
                  </option>
                ))}
              </select>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
