export interface FoodSchedule {
    id: number;
    food_id: number;
    category: 'desayuno' | 'almuerzo' | 'cena' | 'snack';
    date: Date;
    created_at: Date;
    updated_at: Date;
}

export interface newFoodSchedule {
    food_id: number;
    category: 'desayuno' | 'almuerzo' | 'cena' | 'snack';
    date: Date;
}