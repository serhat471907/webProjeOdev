export interface Product {
    id: number;
    name: string;
    price: number;
    rating: number;
    ratingCount: number;
    image: string;
    hoverImage: string;
    quantity: number; // Minimum of 1 for quantity
    selected?: boolean; // Optional for selection logic
  }
  