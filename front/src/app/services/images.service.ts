import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DeleteImageData, Image, ImageData } from '../models/image.model';
import { environment as env } from '../../environments/environment';
import { tap } from 'rxjs';
import { Place } from '../models/place.model';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor(private http: HttpClient) {
  }

  createImage(imageData: ImageData) {
    const formData = new FormData();

    Object.keys(imageData).forEach(key => {
      if (imageData[key] !== null) {
        if (key !== 'time') {
          formData.append(key, imageData[key]);
        } else {
          formData.append(key, JSON.stringify(imageData[key]));
        }
      }
    });

    return this.http.post<Image>(env.apiUrl + '/images', formData);
  }


  removeImage(deleteImageData: DeleteImageData) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        imageId: deleteImageData.imageId,
        placeId: deleteImageData.placeId,
      },
    };

    return this.http.delete<Place>(env.apiUrl + '/images/' + deleteImageData.imageId, options);
  }
}
