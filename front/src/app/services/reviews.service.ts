import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Review, ReviewData } from '../models/review.model';
import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor(
    private http: HttpClient,
  ) { }

  createReview(reviewData: ReviewData) {
    return this.http.post<Review>(env.apiUrl + '/reviews', reviewData);
  }
}
