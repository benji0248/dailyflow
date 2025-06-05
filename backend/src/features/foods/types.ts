export interface Food {
    id: number;
    name: string;
    description?: string;
    category: 'desayuno' | 'almuerzo' | 'cena' | 'snack';
    created_at: Date;
    updated_at: Date;
}

export interface newFood {
    name: string;
    description?: string;
    category: 'desayuno' | 'almuerzo' | 'cena' | 'snack';
}