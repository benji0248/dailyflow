"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ChefHat, Plus, Clock, Users, Flame, Edit, Trash2, Save, X } from "lucide-react"
import type { Recipe } from "../utils"

interface RecipeManagerProps {
  recipes: Recipe[]
  onAddRecipe: (recipe: Omit<Recipe, "id">) => void
  onUpdateRecipe: (id: string, recipe: Omit<Recipe, "id">) => void
  onDeleteRecipe: (id: string) => void
}

export default function RecipeManager({ recipes, onAddRecipe, onUpdateRecipe, onDeleteRecipe }: RecipeManagerProps) {
  const [isCreating, setIsCreating] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    prepTime: 0,
    cookTime: 0,
    servings: 1,
    instructions: [""],
    ingredients: [{ name: "", amount: 0, unit: "", calories: 0, protein: 0, carbs: 0, fat: 0 }],
  })

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      prepTime: 0,
      cookTime: 0,
      servings: 1,
      instructions: [""],
      ingredients: [{ name: "", amount: 0, unit: "", calories: 0, protein: 0, carbs: 0, fat: 0 }],
    })
  }

  const calculateTotals = (ingredients: any[]) => {
    return ingredients.reduce(
      (totals, ingredient) => ({
        totalCalories: totals.totalCalories + (ingredient.calories || 0),
        totalProtein: totals.totalProtein + (ingredient.protein || 0),
        totalCarbs: totals.totalCarbs + (ingredient.carbs || 0),
        totalFat: totals.totalFat + (ingredient.fat || 0),
      }),
      { totalCalories: 0, totalProtein: 0, totalCarbs: 0, totalFat: 0 },
    )
  }

  const handleSave = () => {
    const totals = calculateTotals(formData.ingredients)
    const recipe = {
      ...formData,
      ...totals,
      ingredients: formData.ingredients.map((ing) => ({
        ...ing,
        id: Math.random().toString(36).substr(2, 9),
        priority: "normal" as const,
      })),
    }

    if (editingId) {
      onUpdateRecipe(editingId, recipe)
      setEditingId(null)
    } else {
      onAddRecipe(recipe)
      setIsCreating(false)
    }
    resetForm()
  }

  const handleEdit = (recipe: Recipe) => {
    setFormData({
      name: recipe.name,
      description: recipe.description,
      prepTime: recipe.prepTime,
      cookTime: recipe.cookTime,
      servings: recipe.servings,
      instructions: recipe.instructions,
      ingredients: recipe.ingredients.map((ing) => ({
        name: ing.name,
        amount: ing.amount,
        unit: ing.unit,
        calories: ing.calories,
        protein: ing.protein,
        carbs: ing.carbs,
        fat: ing.fat,
      })),
    })
    setEditingId(recipe.id)
    setIsCreating(true)
  }

  const addIngredient = () => {
    setFormData((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, { name: "", amount: 0, unit: "", calories: 0, protein: 0, carbs: 0, fat: 0 }],
    }))
  }

  const updateIngredient = (index: number, field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.map((ing, i) => (i === index ? { ...ing, [field]: value } : ing)),
    }))
  }

  const removeIngredient = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index),
    }))
  }

  const addInstruction = () => {
    setFormData((prev) => ({
      ...prev,
      instructions: [...prev.instructions, ""],
    }))
  }

  const updateInstruction = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      instructions: prev.instructions.map((inst, i) => (i === index ? value : inst)),
    }))
  }

  const removeInstruction = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      instructions: prev.instructions.filter((_, i) => i !== index),
    }))
  }

  if (isCreating || editingId) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ChefHat className="w-5 h-5 text-purple-500" />
            {editingId ? "Edit Recipe" : "Create New Recipe"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Recipe Name</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Enter recipe name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Servings</label>
              <Input
                type="number"
                value={formData.servings}
                onChange={(e) => setFormData((prev) => ({ ...prev, servings: Number.parseInt(e.target.value) || 1 }))}
                min="1"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Brief description of the recipe"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Prep Time (minutes)</label>
              <Input
                type="number"
                value={formData.prepTime}
                onChange={(e) => setFormData((prev) => ({ ...prev, prepTime: Number.parseInt(e.target.value) || 0 }))}
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Cook Time (minutes)</label>
              <Input
                type="number"
                value={formData.cookTime}
                onChange={(e) => setFormData((prev) => ({ ...prev, cookTime: Number.parseInt(e.target.value) || 0 }))}
                min="0"
              />
            </div>
          </div>

          {/* Ingredients */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Ingredients</h3>
              <Button onClick={addIngredient} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Ingredient
              </Button>
            </div>

            <div className="space-y-3">
              {formData.ingredients.map((ingredient, index) => (
                <Card key={index} className="p-4">
                  <div className="grid grid-cols-7 gap-2 items-end">
                    <div className="col-span-2">
                      <label className="block text-xs font-medium mb-1">Name</label>
                      <Input
                        value={ingredient.name}
                        onChange={(e) => updateIngredient(index, "name", e.target.value)}
                        placeholder="Ingredient name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">Amount</label>
                      <Input
                        type="number"
                        value={ingredient.amount}
                        onChange={(e) => updateIngredient(index, "amount", Number.parseFloat(e.target.value) || 0)}
                        step="0.1"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">Unit</label>
                      <Input
                        value={ingredient.unit}
                        onChange={(e) => updateIngredient(index, "unit", e.target.value)}
                        placeholder="cup, tsp, etc."
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">Cal</label>
                      <Input
                        type="number"
                        value={ingredient.calories}
                        onChange={(e) => updateIngredient(index, "calories", Number.parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">Protein</label>
                      <Input
                        type="number"
                        value={ingredient.protein}
                        onChange={(e) => updateIngredient(index, "protein", Number.parseFloat(e.target.value) || 0)}
                        step="0.1"
                      />
                    </div>
                    <div className="flex items-end">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeIngredient(index)}
                        className="text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Instructions</h3>
              <Button onClick={addInstruction} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Step
              </Button>
            </div>

            <div className="space-y-3">
              {formData.instructions.map((instruction, index) => (
                <div key={index} className="flex gap-2">
                  <div className="flex-1">
                    <Textarea
                      value={instruction}
                      onChange={(e) => updateInstruction(index, e.target.value)}
                      placeholder={`Step ${index + 1}...`}
                      rows={2}
                    />
                  </div>
                  <Button variant="outline" size="sm" onClick={() => removeInstruction(index)} className="text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-4">
            <Button onClick={handleSave} disabled={!formData.name.trim()}>
              <Save className="w-4 h-4 mr-2" />
              {editingId ? "Update Recipe" : "Save Recipe"}
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setIsCreating(false)
                setEditingId(null)
                resetForm()
              }}
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <ChefHat className="w-5 h-5 text-purple-500" />
            Recipe Manager
          </CardTitle>
          <Button onClick={() => setIsCreating(true)}>
            <Plus className="w-4 h-4 mr-2" />
            New Recipe
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {recipes.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <ChefHat className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No recipes yet</p>
            <p className="text-sm">Create your first recipe to get started</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {recipes.map((recipe) => (
              <Card key={recipe.id} className="border-l-4 border-l-purple-500">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold">{recipe.name}</h3>
                      <p className="text-sm text-gray-600">{recipe.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(recipe)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onDeleteRecipe(recipe.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span>{recipe.prepTime + recipe.cookTime} min</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span>{recipe.servings} servings</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Flame className="w-4 h-4 text-orange-500" />
                      <span>{recipe.totalCalories} cal</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    <div className="text-center p-2 bg-orange-50 rounded">
                      <div className="text-sm font-semibold">{recipe.totalCalories}</div>
                      <div className="text-xs text-gray-600">calories</div>
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
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
