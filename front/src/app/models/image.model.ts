export interface Image {
  _id: string,
  author: string,
  place: string,
  image: string,
}

export interface ImageData {
  [key: string]: any;
  author: string | undefined,
  place: string | undefined,
  image: File,
}

export interface DeleteImageData {
  placeId: string,
  imageId: string,
}
