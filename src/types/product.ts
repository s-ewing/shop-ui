export enum ProductCategory {
  Hats = "HATS",
  Jackets = "JACKETS",
  Shoes = "SHOES",
  Accessories = "ACCESSORIES",
  Mens = "MENS",
  Womens = "WOMENS",
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imgSrc: string;
  categories: ProductCategory[];
}
