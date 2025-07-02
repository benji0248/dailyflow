interface User {
    id: string;
    email: string;
    passwordHash: string;
    name: string;
    age?: number;
    weight?: number;
    height?: number;
    goal?: 'lose' | 'maintain' | 'gain';
    dietaryPreferences?: string;
    cleaningPreferences?: string;
    weeklyProgress?: number;
    rewards?: string;
    createdAt: Date;
    updatedAt: Date;
  }
  