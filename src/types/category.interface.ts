export interface Category {
    id: string,
    name: string,
}

export type CategoryInsert = Omit<Category, 'id'>;
export type CategoryUpdate = Partial<CategoryInsert>;
