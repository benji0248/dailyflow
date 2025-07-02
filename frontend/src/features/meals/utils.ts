export interface Ingredient {
    id: string
    name: string
    amount: number
    unit: string
    calories: number
    protein: number
    carbs: number
    fat: number
    priority: "urgent" | "normal" | "low"
  }
  
  export interface Recipe {
    id: string
    name: string
    description: string
    prepTime: number
    cookTime: number
    servings: number
    ingredients: Ingredient[]
    instructions: string[]
    totalCalories: number
    totalProtein: number
    totalCarbs: number
    totalFat: number
    image?: string
  }
  
  export interface DayMeal {
    breakfast?: Recipe
    lunch?: Recipe
    dinner?: Recipe
    snacks: Recipe[]
  }
  
  export interface MealPlan {
    [date: string]: DayMeal
  }
  
  export interface ShoppingItem {
    id: string
    name: string
    amount: number
    unit: string
    priority: "urgent" | "normal" | "low"
    isFromRecipe: boolean
    recipeId?: string
    completed: boolean
  }
  