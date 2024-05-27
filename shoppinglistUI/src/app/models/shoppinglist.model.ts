export interface Shoppinglist {
    id: string;
    item: string;
    quantity: number;
    isImportant?: boolean;
}

export interface AddShoppingList {
    item: string;
    quantity: number;
    isImportant?: boolean;
}