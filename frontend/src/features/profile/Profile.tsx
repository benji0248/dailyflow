import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  User,
  Scale,
  Ruler,
  Flame,
  Target,
  Utensils,
  CheckCircle,
  Home,
  Calendar,
  Droplets,
  Moon,
  Activity,
  Trophy,
  Gift,
  Zap,
} from "lucide-react"

export default function ProfileComponent() {
  // Mock user data - replace with actual data
  const userData = {
    name: "Alex Johnson",
    age: 28,
    height: "5'9\"",
    weight: "165 lbs",
    caloriesLeft: 847,
    dailyCalorieLimit: 2200,
    weeklyGoals: {
      mealsCompleted: 18,
      totalMeals: 21,
      daysCompleted: 5,
      totalDays: 7,
      cleaningTasks: 12,
      totalCleaningTasks: 15,
    },
    cheatMealProgress: 78, // Progress towards unlocking cheat meal
    waterIntake: 6,
    waterGoal: 8,
    sleepHours: 7.5,
    sleepGoal: 8,
    currentStreak: 12,
    weeklyStats: {
      avgCalories: 1950,
      workoutsCompleted: 4,
      totalWorkouts: 5,
    },
  }

  const caloriesConsumed = userData.dailyCalorieLimit - userData.caloriesLeft
  const calorieProgress = (caloriesConsumed / userData.dailyCalorieLimit) * 100

  return (
    <div className="max-w-md mx-auto">
      {/* Profile Header with Banner and Avatar */}
      <Card className="overflow-hidden border-0 shadow-lg">
        {/* Banner Background */}
        <div className="h-32 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 relative">
          <div className="absolute inset-0 bg-black/20" />

          {/* Avatar positioned to overlap banner and content */}
          <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-12">
            <div className="relative">
              <div className="w-24 h-24 rounded-full border-4 border-white bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center shadow-lg">
                <User className="w-10 h-10 text-white" />
              </div>
              {/* Level badge */}
              <div className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs font-bold rounded-full w-8 h-8 flex items-center justify-center border-2 border-white">
                {userData.currentStreak}
              </div>
            </div>
          </div>
        </div>

        {/* Cheat Meal Progress Bar - Divider */}
        <div className="px-6 pt-16 pb-4 bg-white">
          <div className="text-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">{userData.name}</h2>
            <p className="text-sm text-gray-500">{userData.age} years old</p>
          </div>

          {/* Cheat Meal Reward Progress */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Gift className="w-4 h-4 text-purple-500" />
                <span className="text-sm font-medium text-gray-700">Cheat Meal Reward</span>
              </div>
              <div className="flex items-center gap-1">
                {userData.cheatMealProgress >= 100 ? (
                  <Trophy className="w-4 h-4 text-yellow-500" />
                ) : (
                  <Zap className="w-4 h-4 text-purple-500" />
                )}
                <span className="text-sm font-bold text-purple-600">{Math.min(userData.cheatMealProgress, 100)}%</span>
              </div>
            </div>
            <Progress value={userData.cheatMealProgress} className="h-3 bg-gray-200" />
            <div className="flex justify-between mt-1">
              <span className="text-xs text-gray-500">Weekly Progress</span>
              <span className="text-xs text-purple-600 font-medium">
                {userData.cheatMealProgress >= 100 ? "🎉 Unlocked!" : "Keep going!"}
              </span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Main Content */}
        <CardContent className="p-6 space-y-6">
          {/* Physical Stats */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-500" />
              Physical Stats
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                <Ruler className="w-4 h-4 text-blue-600" />
                <div>
                  <p className="text-xs text-gray-600">Height</p>
                  <p className="font-semibold text-blue-900">{userData.height}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                <Scale className="w-4 h-4 text-green-600" />
                <div>
                  <p className="text-xs text-gray-600">Weight</p>
                  <p className="font-semibold text-green-900">{userData.weight}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Daily Nutrition */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-500" />
              Today's Nutrition
            </h3>
            <div className="space-y-3">
              <div className="p-4 bg-orange-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Calories</span>
                  <span className="text-sm font-bold text-orange-600">{userData.caloriesLeft} left</span>
                </div>
                <Progress value={calorieProgress} className="h-2 bg-orange-200" />
                <div className="flex justify-between mt-1 text-xs text-gray-600">
                  <span>{caloriesConsumed} consumed</span>
                  <span>{userData.dailyCalorieLimit} limit</span>
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <Droplets className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-medium text-gray-700">Water</span>
                  </div>
                  <span className="text-sm font-bold text-blue-600">
                    {userData.waterIntake}/{userData.waterGoal} glasses
                  </span>
                </div>
                <Progress value={(userData.waterIntake / userData.waterGoal) * 100} className="h-2 bg-blue-200" />
              </div>
            </div>
          </div>

          {/* Weekly Goals */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Target className="w-5 h-5 text-purple-500" />
              Weekly Goals
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium">Healthy Meals</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    {userData.weeklyGoals.mealsCompleted}/{userData.weeklyGoals.totalMeals}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium">Days Completed</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    {userData.weeklyGoals.daysCompleted}/{userData.weeklyGoals.totalDays}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Home className="w-4 h-4 text-yellow-600" />
                  <span className="text-sm font-medium">Cleaning Tasks</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                    {userData.weeklyGoals.cleaningTasks}/{userData.weeklyGoals.totalCleaningTasks}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Stats */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-indigo-500" />
              This Week
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-purple-50 rounded-lg text-center">
                <Moon className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                <p className="text-xs text-gray-600">Avg Sleep</p>
                <p className="font-semibold text-purple-900">{userData.sleepHours}h</p>
              </div>
              <div className="p-3 bg-red-50 rounded-lg text-center">
                <Activity className="w-5 h-5 text-red-600 mx-auto mb-1" />
                <p className="text-xs text-gray-600">Workouts</p>
                <p className="font-semibold text-red-900">
                  {userData.weeklyStats.workoutsCompleted}/{userData.weeklyStats.totalWorkouts}
                </p>
              </div>
            </div>
          </div>

          {/* Current Streak */}
          <div className="text-center p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Trophy className="w-5 h-5 text-yellow-600" />
              <span className="text-lg font-bold text-yellow-800">{userData.currentStreak} Day Streak!</span>
            </div>
            <p className="text-sm text-yellow-700">Keep up the amazing work! 🔥</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
