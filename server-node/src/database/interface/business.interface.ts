import { Document } from 'mongoose';

export interface IBusiness extends Document {
  name: string,
  stars: number,
  is_open: 0 | 1, // integer, 0 or 1 for closed or open, respectively
}