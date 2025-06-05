export interface CleanSchedule {
    id: number;
    task_id: number;
    user_id: number;
    date: Date;
    created_at: Date;
    updated_at: Date;
}

export interface newCleanSchedule {
    task_id: number;
    user_id: number;
    date: Date;
}