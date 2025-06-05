export interface ShopList {
    id: number;
    name: string;
    description?: string;
    priority?: 0 | 1 | null;
    user_id: number;
    created_at: Date;
    updated_at: Date;
    food_id?: number;
    asociate_to?: string;
    date?: Date;
}

export interface newShopList {
    name: string;
    description?: string;
    priority?: 0 | 1 | null;
    user_id: number;
    food_id?: number;
    asociate_to?: string;
    date?: Date;
}