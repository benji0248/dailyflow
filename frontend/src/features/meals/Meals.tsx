"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MealCalendar from "./components/MealCalendar"
import DayMealPlanner from "./components/DayMealPlanner"
import RecipeManager from "./components/RecipeManager"
import ShoppingList from "./components/ShoppingList"
import type { Recipe, MealPlan, ShoppingItem } from "./utils"

export default function MealPlanningApp() {
  // Mock data - replace with actual data management
  const [recipes, setRecipes] = useState<Recipe[]>([
    {
      id: "1",
      name: "Grilled Chicken Salad",
      description: "Healthy protein-packed salad with mixed greens",
      prepTime: 15,
      cookTime: 20,
      servings: 2,
      totalCalories: 350,
      totalProtein: 35,
      totalCarbs: 12,
      totalFat: 18,
      ingredients: [
        {
          id: "1",
          name: "Chicken Breast",
          amount: 200,
          unit: "g",
          calories: 200,
          protein: 30,
          carbs: 0,
          fat: 8,
          priority: "normal",
        },
        {
          id: "2",
          name: "Mixed Greens",
          amount: 100,
          unit: "g",
          calories: 20,
          protein: 2,
          carbs: 4,
          fat: 0,
          priority: "normal",
        },
        {
          id: "3",
          name: "Olive Oil",
          amount: 15,
          unit: "ml",
          calories: 130,
          protein: 0,
          carbs: 0,
          fat: 15,
          priority: "normal",
        },
      ],
      instructions: [
        "Season chicken breast with salt and pepper",
        "Grill chicken for 8-10 minutes per side",
        "Let chicken rest for 5 minutes, then slice",
        "Toss mixed greens with olive oil",
        "Top salad with sliced chicken",
      ],
    },
    {
      id: "2",
      name: "Overnight Oats",
      description: "Easy breakfast prep with oats and berries",
      prepTime: 5,
      cookTime: 0,
      servings: 1,
      totalCalories: 280,
      totalProtein: 12,
      totalCarbs: 45,
      totalFat: 8,
      ingredients: [
        {
          id: "4",
          name: "Rolled Oats",
          amount: 50,
          unit: "g",
          calories: 190,
          protein: 7,
          carbs: 35,
          fat: 3,
          priority: "normal",
        },
        {
          id: "5",
          name: "Greek Yogurt",
          amount: 100,
          unit: "g",
          calories: 60,
          protein: 10,
          carbs: 4,
          fat: 0,
          priority: "normal",
        },
        {
          id: "6",
          name: "Blueberries",
          amount: 50,
          unit: "g",
          calories: 30,
          protein: 0,
          carbs: 8,
          fat: 0,
          priority: "normal",
        },
      ],
      instructions: [
        "Mix oats with yogurt in a jar",
        "Add blueberries on top",
        "Refrigerate overnight",
        "Enjoy cold in the morning",
      ],
    },
  ])

  const [mealPlan, setMealPlan] = useState<MealPlan>({
    "2025-01-02": {
      breakfast: recipes[1],
      lunch: recipes[0],
      snacks: [],
    },
  })

  const [shoppingItems, setShoppingItems] = useState<ShoppingItem[]>([
    {
      id: "1",
      name: "Chicken Breast",
      amount: 200,
      unit: "g",
      priority: "normal",
      isFromRecipe: true,
      recipeId: "1",
      completed: false,
    },
    {
      id: "2",
      name: "Mixed Greens",
      amount: 100,
      unit: "g",
      priority: "normal",
      isFromRecipe: true,
      recipeId: "1",
      completed: false,
    },
    {
      id: "3",
      name: "Milk",
      amount: 1,
      unit: "liter",
      priority: "urgent",
      isFromRecipe: false,
      completed: false,
    },
  ])

  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  const handleAddMeal = (date: string, mealType: "breakfast" | "lunch" | "dinner" | "snack", recipeId: string) => {
    const recipe = recipes.find((r) => r.id === recipeId)
    if (!recipe) return

    setMealPlan((prev) => {
      const dayMeal = prev[date] || { snacks: [] }

      if (mealType === "snack") {
        return {
          ...prev,
          [date]: {
            ...dayMeal,
            snacks: [...dayMeal.snacks, recipe],
          },
        }
      } else {
        return {
          ...prev,
          [date]: {
            ...dayMeal,
            [mealType]: recipe,
          },
        }
      }
    })

    // Add ingredients to shopping list
    recipe.ingredients.forEach((ingredient) => {
      const existingItem = shoppingItems.find((item) => item.name === ingredient.name && item.isFromRecipe)

      if (existingItem) {
        setShoppingItems((prev) =>
          prev.map((item) =>
            item.id === existingItem.id ? { ...item, amount: item.amount + ingredient.amount } : item,
          ),
        )
      } else {
        const newItem: ShoppingItem = {
          id: Math.random().toString(36).substr(2, 9),
          name: ingredient.name,
          amount: ingredient.amount,
          unit: ingredient.unit,
          priority: ingredient.priority,
          isFromRecipe: true,
          recipeId: recipe.id,
          completed: false,
        }
        setShoppingItems((prev) => [...prev, newItem])
      }
    })
  }

  const handleRemoveMeal = (date: string, mealType: "breakfast" | "lunch" | "dinner" | "snack", recipeId?: string) => {
    setMealPlan((prev) => {
      const dayMeal = prev[date]
      if (!dayMeal) return prev

      if (mealType === "snack" && recipeId) {
        return {
          ...prev,
          [date]: {
            ...dayMeal,
            snacks: dayMeal.snacks.filter((snack) => snack.id !== recipeId),
          },
        }
      } else if( mealType !== "snack") {
        const newDayMeal = { ...dayMeal }
        delete newDayMeal[mealType]
        return {
          ...prev,
          [date]: newDayMeal,
        }
      }
        return prev
    })
  }

  const handleAddRecipe = (recipe: Omit<Recipe, "id">) => {
    const newRecipe = {
      ...recipe,
      id: Math.random().toString(36).substr(2, 9),
    }
    setRecipes((prev) => [...prev, newRecipe])
  }

  const handleUpdateRecipe = (id: string, recipe: Omit<Recipe, "id">) => {
    setRecipes((prev) => prev.map((r) => (r.id === id ? { ...recipe, id } : r)))
  }

  const handleDeleteRecipe = (id: string) => {
    setRecipes((prev) => prev.filter((r) => r.id !== id))
  }

  const handleAddShoppingItem = (item: Omit<ShoppingItem, "id">) => {
    const newItem = {
      ...item,
      id: Math.random().toString(36).substr(2, 9),
    }
    setShoppingItems((prev) => [...prev, newItem])
  }

  const handleUpdateShoppingItem = (id: string, updates: Partial<ShoppingItem>) => {
    setShoppingItems((prev) => prev.map((item) => (item.id === id ? { ...item, ...updates } : item)))
  }

  const handleDeleteShoppingItem = (id: string) => {
    setShoppingItems((prev) => prev.filter((item) => item.id !== id))
  }

  const handleToggleShoppingComplete = (id: string) => {
    setShoppingItems((prev) => prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item)))
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <Tabs defaultValue="calendar" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="calendar">Meal Planning</TabsTrigger>
          <TabsTrigger value="recipes">Recipes</TabsTrigger>
          <TabsTrigger value="shopping">Shopping List</TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="space-y-6">
          <MealCalendar mealPlan={mealPlan} onSelectDay={setSelectedDate} selectedDate={selectedDate} />

          {selectedDate && (
            <DayMealPlanner
              date={selectedDate}
              dayMeal={mealPlan[selectedDate] || { snacks: [] }}
              recipes={recipes}
              onAddMeal={(mealType, recipeId) => handleAddMeal(selectedDate, mealType, recipeId)}
              onRemoveMeal={(mealType, recipeId) => handleRemoveMeal(selectedDate, mealType, recipeId)}
              onCreateRecipe={() => {}} // This would switch to recipes tab
            />
          )}
        </TabsContent>

        <TabsContent value="recipes">
          <RecipeManager
            recipes={recipes}
            onAddRecipe={handleAddRecipe}
            onUpdateRecipe={handleUpdateRecipe}
            onDeleteRecipe={handleDeleteRecipe}
          />
        </TabsContent>

        <TabsContent value="shopping">
          <ShoppingList
            items={shoppingItems}
            onAddItem={handleAddShoppingItem}
            onUpdateItem={handleUpdateShoppingItem}
            onDeleteItem={handleDeleteShoppingItem}
            onToggleComplete={handleToggleShoppingComplete}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
