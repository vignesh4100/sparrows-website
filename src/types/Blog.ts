export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  author: string;
  category: string;
  tags: string[];
  status: 'Draft' | 'Published';
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}