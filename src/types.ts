export interface ChoiceType {
  title: string;
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
