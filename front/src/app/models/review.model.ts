import { User } from './user.model';

export interface Review {
  _id: string,
  author: User,
  place: string,
  description: string,
  createdAt: string,
  ratings: {
    overAll: number,
    food: number,
    service: number,
    interior: number,
  },
}

export interface ReviewData {
  author: string | undefined,
  place: string | undefined,
  description: string,
  ratings: {
    food: number,
    service: number,
    interior: number,
  },
}
