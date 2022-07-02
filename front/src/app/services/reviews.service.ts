import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DeleteReviewData, Review, ReviewData } from '../models/review.model';
import { environment as env } from '../../environments/environment';
import { DeleteImageData } from '../models/image.model';
import { Place } from '../models/place.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor(
    private http: HttpClient,
  ) {
  }

  createReview(reviewData: ReviewData) {
    return this.http.post<Review>(env.apiUrl + '/reviews', reviewData);
  }

  removeReview(deleteReviewData: DeleteReviewData) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        reviewId: deleteReviewData.reviewId,
        placeId: deleteReviewData.placeId,
      },
    };

    return this.http.delete<Place>(env.apiUrl + '/reviews/' + deleteReviewData.reviewId, options);
  }
}
