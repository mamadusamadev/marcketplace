export interface ProductData {
    title: string;
    description: string;
    price: number;
    condition: 'NEW' | 'LIKE_NEW' | 'GOOD' | 'ACCEPTABLE';
    location: string;
    categoryId: number;
  }
  