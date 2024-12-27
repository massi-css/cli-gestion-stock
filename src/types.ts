export type choiceEnum =
  | "get_product"
  | "get_products"
  | "add_product"
  | "update_product"
  | "delete_product"
  | "search_product";

export interface ChoiceType {
  title: choiceEnum;
  desc: string;
}
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  created_at: string;
  updated_at: string | null;
}

export interface ColumnWidths {
  id: number;
  name: number;
  description: number;
  price: number;
  quantity: number;
  created: number;
  updated: number;
}
