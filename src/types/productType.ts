type ProductI = {
  name: string;
  image: string;
  id: string;
  title: string;
  imageCover: string;
  category: { name: string };
  brand?: { name: string };
  price: number;
  priceAfterDiscount?: number;
  ratingsAverage: number;
  ratingsQuantity: number;
  count:number
}