import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PlacesService } from '../../services/places.service';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { Place } from '../../models/place.model';
import { fetchPlaceById } from '../../store/places.actions';
import { Subscription } from 'rxjs';
import { environment } from '../../../environments/environment';
import { NgForm } from '@angular/forms';
import { ImagesService } from '../../services/images.service';
import { createImageRequest, removeImageRequest } from '../../store/images.actions';
import { Image } from '../../models/image.model';
import { Review } from '../../models/review.model';
import { ReviewsService } from '../../services/reviews.service';
import { createReviewRequest, removeReviewFailure, removeReviewRequest } from '../../store/reviews.actions';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.sass']
})
export class PlaceComponent implements OnInit, OnDestroy {
  @ViewChild('imageForm') imageForm!: NgForm;
  @ViewChild('reviewForm') reviewFrom!: NgForm;
  placeSub!: Subscription;
  placeId!: string | undefined;
  myId!: string | undefined;
  place!: Place | null;
  env = environment;

  constructor(
    private placeService: PlacesService,
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private reviewsService: ReviewsService,
  ) {
     this.placeSub = store.select(state => state.places.place).subscribe(place => {
      this.place = place;
      this.placeId = place?._id;
    });
     store.select(state => state.users.user).subscribe(user => {
       this.myId = user?._id;
     })
  }

  ngOnInit(): void {
    const placeId = this.route.snapshot.paramMap.get('id');
    if (placeId !== null) {
      this.store.dispatch(fetchPlaceById({id: placeId}));
    }
  }

  ngOnDestroy(): void {
    this.placeSub.unsubscribe();
  }

  delete(image: Image) {
    const deleteImageData = {
      imageId: image._id,
      placeId: image.place,
    }
    this.store.dispatch(removeImageRequest({deleteImageData}));
  }

  onAddPhoto() {
    const imageData = {
      author: this.myId,
      place: this.placeId,
      image: this.imageForm.controls['image'].value,
    }
    if (this.imageForm.valid) {
      this.store.dispatch(createImageRequest({imageData}));
    }
  }

  deleteReview(review: Review) {
    const deleteReviewData = {
      reviewId: review._id,
      placeId: review.place,
    }
    this.store.dispatch(removeReviewRequest({deleteReviewData}));
  }

  postReview(place: Place | null) {
    const reviewData = {
      author: this.myId,
      place: place?._id,
      description: this.reviewFrom.controls['description'].value,
      ratings: {
        food: parseInt(this.reviewFrom.controls['food'].value),
        service: parseInt(this.reviewFrom.controls['service'].value),
        interior: parseInt(this.reviewFrom.controls['interior'].value),
      }
    }
    this.store.dispatch(createReviewRequest({reviewData}));
  }
}

