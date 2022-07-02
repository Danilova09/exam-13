export interface Place {
  owner: string,
  title: string,
  description: string,
  mainPhoto: string,
  isAgree: string,
  images: [],
  reviews: [],
}

export interface PlaceData {
  [key: string]: any;
  owner: string,
  title: string,
  description: string,
  mainPhoto: File,
  isAgree: Boolean,
}
