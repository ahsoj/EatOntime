export interface Product {
  id?: string;
  active?: boolean;
  category?: string;
  current_price?: string;
  ingredients?: string;
  item_name?: string;
  item_description?: string;
  item_picture?: string;
  restaurant?: string;
  quantity?: number;
}

export interface Order {
  id?: string;
  customer?: string;
  restaurant?: string;
  total_cost?: number;
  delivery_charge?: number;
  status?: string;
  payment_status?: boolean;
}

export interface Address {
  street_l1?: string;
  street_l2?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  country?: string;
  longitude?: number;
  latiitude?: number;
  fillAddress?: boolean;
}
