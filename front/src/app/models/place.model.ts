import { Image } from './image.model';
import { Review } from './review.model';

export interface Place {
  _id: string,
  owner: string,
  title: string,
  description: string,
  mainPhoto: string,
  isAgree: string,
  images: Image[],
  reviews: Review[],
  ratings: {
    overAll: number,
    food: number,
    service: number,
    interior: number,
  },
}

export interface PlaceData {
  [key: string]: any;
  owner: string,
  title: string,
  description: string,
  mainPhoto: File,
  isAgree: Boolean,
}
