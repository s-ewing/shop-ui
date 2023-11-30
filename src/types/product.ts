export enum ProductDepartment {
  Mens = "MENS",
  Womens = "WOMENS",
}

export enum ProductCategory {
  Hats = "HATS",
  Jackets = "JACKETS",
  Shoes = "SHOES",
  Accessories = "ACCESSORIES",
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imgSrc: string;
  categories: ProductCategory[];
  departments: ProductDepartment[];
}
