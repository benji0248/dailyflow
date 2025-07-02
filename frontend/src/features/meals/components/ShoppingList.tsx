"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { ShoppingCart, Plus, AlertTriangle, Clock, ArrowDown, Trash2, Package } from "lucide-react"
import type { ShoppingItem } from "../utils"

interface ShoppingListProps {
  items: ShoppingItem[]
  onAddItem: (item: Omit<ShoppingItem, "id">) => void
  onUpdateItem: (id: string, updates: Partial<ShoppingItem>) => void
  onDeleteItem: (id: string) => void
  onToggleComplete: (id: string) => void
}

export default function ShoppingList({
  items,
  onAddItem,
  onUpdateItem,
  onDeleteItem,
  onToggleComplete,
}: ShoppingListProps) {
  const [newItemName, setNewItemName] = useState("")
  const [newItemAmount, setNewItemAmount] = useState("")
  const [newItemUnit, setNewItemUnit] = useState("")
  const [newItemPriority, setNewItemPriority] = useState<"urgent" | "normal" | "low">("normal")

  const getPriorityColor = (priority: "urgent" | "normal" | "low") => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800 border-red-200"
      case "normal":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "low":
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPriorityIcon = (priority: "urgent" | "normal" | "low") => {
    switch (priority) {
      case "urgent":
        return <AlertTriangle className="w-4 h-4" />
      case "normal":
        return <Clock className="w-4 h-4" />
      case "low":
        return <ArrowDown className="w-4 h-4" />
    }
  }

  const sortedItems = [...items].sort((a, b) => {
    // First sort by completion status (incomplete first)
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1
    }

    // Then sort by priority
    const priorityOrder = { urgent: 0, normal: 1, low: 2 }
    return priorityOrder[a.priority] - priorityOrder[b.priority]
  })

  const handleAddItem = () => {
    if (!newItemName.trim()) return

    onAddItem({
      name: newItemName.trim(),
      amount: Number.parseFloat(newItemAmount) || 1,
      unit: newItemUnit || "unit",
      priority: newItemPriority,
      isFromRecipe: false,
      completed: false,
    })

    setNewItemName("")
    setNewItemAmount("")
    setNewItemUnit("")
    setNewItemPriority("normal")
  }

  const getStats = () => {
    const total = items.length
    const completed = items.filter((item) => item.completed).length
    const urgent = items.filter((item) => item.priority === "urgent" && !item.completed).length
    const fromRecipes = items.filter((item) => item.isFromRecipe).length

    return { total, completed, urgent, fromRecipes }
  }

  const stats = getStats()

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-green-500" />
            Shopping List
          </CardTitle>
          <div className="flex gap-2">
            <Badge variant="secondary">
              {stats.completed}/{stats.total} done
            </Badge>
            {stats.urgent > 0 && <Badge className="bg-red-100 text-red-800">{stats.urgent} urgent</Badge>}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-lg font-bold text-green-900">{stats.total}</div>
            <div className="text-sm text-green-700">Total Items</div>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-lg font-bold text-blue-900">{stats.fromRecipes}</div>
            <div className="text-sm text-blue-700">From Recipes</div>
          </div>
          <div className="text-center p-3 bg-orange-50 rounded-lg">
            <div className="text-lg font-bold text-orange-900">{stats.urgent}</div>
            <div className="text-sm text-orange-700">Urgent</div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Add New Item */}
        <Card className="border-dashed border-2 border-gray-300">
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <Input placeholder="Item name" value={newItemName} onChange={(e) => setNewItemName(e.target.value)} />
                <div className="flex gap-1">
                  <Input
                    placeholder="Amount"
                    type="number"
                    value={newItemAmount}
                    onChange={(e) => setNewItemAmount(e.target.value)}
                    className="w-20"
                  />
                  <Input
                    placeholder="Unit"
                    value={newItemUnit}
                    onChange={(e) => setNewItemUnit(e.target.value)}
                    className="w-16"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={newItemPriority}
                  onChange={(e) => setNewItemPriority(e.target.value as "urgent" | "normal" | "low")}
                  className="p-2 border rounded-md flex-1"
                >
                  <option value="urgent">🔴 Urgent</option>
                  <option value="normal">🔵 Normal</option>
                  <option value="low">⚪ Low</option>
                </select>

                <Button onClick={handleAddItem} disabled={!newItemName.trim()}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Item
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Shopping Items */}
        <div className="space-y-2">
          {sortedItems.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Package className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Your shopping list is empty</p>
              <p className="text-sm">Add items manually or plan meals to populate your list</p>
            </div>
          ) : (
            sortedItems.map((item) => (
              <Card
                key={item.id}
                className={`
                  transition-all duration-200
                  ${item.completed ? "opacity-60 bg-gray-50" : ""}
                  ${item.priority === "urgent" && !item.completed ? "border-l-4 border-l-red-500" : ""}
                  ${item.priority === "normal" && !item.completed ? "border-l-4 border-l-blue-500" : ""}
                  ${item.priority === "low" && !item.completed ? "border-l-4 border-l-gray-400" : ""}
                `}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Checkbox checked={item.completed} onCheckedChange={() => onToggleComplete(item.id)} />

                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className={`font-medium ${item.completed ? "line-through text-gray-500" : ""}`}>
                          {item.name}
                        </span>
                        {item.isFromRecipe && (
                          <Badge variant="outline" className="text-xs">
                            Recipe
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-gray-600">
                        {item.amount} {item.unit}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge className={getPriorityColor(item.priority)}>
                        {getPriorityIcon(item.priority)}
                        <span className="ml-1 capitalize">{item.priority}</span>
                      </Badge>

                      <select
                        value={item.priority}
                        onChange={(e) =>
                          onUpdateItem(item.id, {
                            priority: e.target.value as "urgent" | "normal" | "low",
                          })
                        }
                        className="text-xs p-1 border rounded"
                        disabled={item.completed}
                      >
                        <option value="urgent">Urgent</option>
                        <option value="normal">Normal</option>
                        <option value="low">Low</option>
                      </select>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onDeleteItem(item.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
