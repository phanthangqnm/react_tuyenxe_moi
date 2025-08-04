export interface UserInfo {
  id: string;
  name: string;
  avatar: string;
  phone: string;
  email: string;
  address: string;
}

export interface Product {
  id: number;
  code: string;
  name: string;
  price: number;
  priceRoot?: number;
  originalPrice?: number;
  image: string;
  category: Category;
  detail?: string;
  sizes?: Size[];
  colors?: Color[];
  image_list?: [];
  store: {
    id: number,
    store_name?: string, 
    txt_latlng?: string,
    image: string,
    address: string
  }
}

export interface Category {
  id: number;
  name: string;
  image: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type Cart = CartItem[];

export interface Location {
  lat: number;
  lng: number;
}

export interface ShippingAddress {
  alias: string;
  address: string;
  name: string;
  phone: string;
}

export interface Station {
  id: number;
  name: string;
  image: string;
  address: string;
  location: Location;
}

export type Delivery =
  | ({
      type: "shipping";
    } & ShippingAddress)
  | {
      type: "pickup";
      stationId: number;
    };

export type OrderStatus = "pending" | "shipping" | "completed";
export type PaymentStatus = "pending" | "success" | "failed";

export interface Order {
  id: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  createdAt: Date;
  receivedAt: Date;
  items: CartItem[];
  delivery: Delivery;
  total: number;
  note: string;
}

export interface Store {
  id: number;
  code: string;
  store_code: strting;
  address: string;
  store_name: string;
  address: string;
  image: string;
  phone?: string;
  txt_latlng?: string;
  description: string;
  website: string;
  address_sx: string;
  email: string;
}

export interface ParaList {
  cate_id?: number;
  store_id?: number;
  page?: number;
  limit?: number;
  search?: string;
  itemstart?: number;
}

//moi
export interface TuyenXe {
  id: number;
  code?: string;
  title?: string;
}

export interface GioChay {
  id: number;
  title: string;
  code?: string;
}

export interface tuyenXeInfo {
  id: number;
  title?: string;
  code?: string;
  date: string;
  tuyenxe_id: number;
  giochay_id: number;
  customers: [];
}

export interface Customers {
  id: number;
  name?: string;
  code?: string;
  phone?: string;
  diemdon?: string;
  diemtra?: string;
  tuyenxeinfo_id?: number;
  tuyenxeinfo_code?: string;
}


export interface Staff {
  id: number;
  name?: string;
  code?: string;
  phone?: string;
  biensoxe?: string;
  diachi?: string;
  socccd?: string;
}

export interface Benthuexe {
  id: number;
  name?: string;
  code?: string;
  phone?: string;
  biensoxe?: string;
  diachi?: string;
  socccd?: string;
}