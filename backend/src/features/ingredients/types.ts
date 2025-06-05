export interface Ingredient {
    id: number;
    name: string;
    description?: string;
    calories?: number;
    created_at: Date;
    updated_at: Date;
}