export interface Book {
  id: string;
  isbn: string;
  title: string;
  author: string;
  publishedYear?: number;
  coverImage?: string;
  description?: string;
  condition?: 'New' | 'Like New' | 'Very Good' | 'Good' | 'Fair' | 'Poor';
  genre?: string[];
  language?: string;
  ownerId: string;
  available: boolean;
  createdAt: Date;
  updatedAt: Date;
} 