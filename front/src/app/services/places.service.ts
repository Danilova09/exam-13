import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment, environment as env } from '../../environments/environment';
import { Place, PlaceData } from '../models/place.model';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  env = environment;

  constructor(private http: HttpClient) {
  }

  getPlaces() {
    return this.http.get<Place[]>(env.apiUrl + '/places');
  }


  createPlace(placeData: PlaceData) {
    const formData = new FormData();

    Object.keys(placeData).forEach(key => {
      if (placeData[key] !== null) {
        if (key !== 'time') {
          formData.append(key, placeData[key]);
        } else {
          formData.append(key, JSON.stringify(placeData[key]));
        }
      }
    });

    return this.http.post(env.apiUrl + '/places', formData);
  }

  getPlaceById(placeId: string | null) {
    return this.http.get<Place>(env.apiUrl + '/places/' + placeId);
  }

  removePlace(placeId: string) {
    return this.http.delete<Place[]>(env.apiUrl + '/places/' + placeId);
  }
}
