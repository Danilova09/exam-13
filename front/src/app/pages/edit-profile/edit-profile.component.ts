import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { Observable, Subscription } from 'rxjs';
import { User } from '../../models/user.model';
import { editUserRequest } from '../../store/users.actions';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.sass']
})
export class EditProfileComponent implements OnInit, OnDestroy {
  @ViewChild('f') form!: NgForm;
  userData!: User | null;
  userSub!: Subscription;
  user: Observable<User | null>;
  isAvatarExists = false;

  constructor(
    private store: Store<AppState>,
  ) {
    this.user = store.select((state) => state.users.user);
  }

  ngOnInit(): void {
    this.userSub = this.user.subscribe((user) => {
      if (user) {
        this.userData = user;
        this.isAvatarExists = !!user.avatar;
      }
    });
  }

  ngAfterViewInit(): void {
    this.updateFormData();
  }

  updateFormData(): void {
    this.setFormValue({
      displayName: this.userData?.displayName,
      email: this.userData?.email,
      avatar: this.userData?.avatar,
    });
  }

  setFormValue(value: { [key: string]: any }): void {
    setTimeout(() => {
      this.form.setValue(value);
    }, 0);
  }

  edit() {
    const updatedUserData = this.form.value;
    this.store.dispatch(editUserRequest({ userData: updatedUserData }));
  }

  onRemoveAvatar() {
   let avatar =  this.form.controls['avatar'];
   avatar.setValue(null);
   this.isAvatarExists = false;
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
