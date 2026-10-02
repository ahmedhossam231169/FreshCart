export type CartProductI = {
  _id: string;
  count: number;
  price: number;
  product: {
    _id: string;
    id: string;
    title: string;
    imageCover: string;
    quantity?: number;
    category?: { name: string };
    brand?: { name: string };
  };
};

export type CartI = {
  _id: string;
  products: CartProductI[];
  totalCartPrice: number;
};

export type CartResponseI = {
  status: string;
  numOfCartItems: number;
  cartId?: string;
  data: CartI;
};
