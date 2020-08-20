import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FacebookLoginProvider, SocialAuthService } from 'angularx-social-login';

@Injectable()
export class SharedService {
  private userObject = new BehaviorSubject({});
  currentUser = this.userObject.asObservable();

  constructor(private socialAuthService: SocialAuthService) { }

  // Update user object to all places
  updateUser(user: any) {
    this.userObject.next(user);
  }

  // common function to organise social user data
  socialLogin(type: string) {
    if (type === 'facebook') {
      return this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID)
        .then((userDetail) => {
          const data = {
            email: userDetail.email,
            first_name: userDetail.firstName,
            last_name: userDetail.lastName,
            social_id: userDetail.id,
            image: userDetail.photoUrl.replace('normal', 'large'),
          };
          return data;
        });
    }
  }

  // finding size of object
  sizeOfObject(obj: object) {
    let size = 0;
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        size++;
      }
    }
    return size;
  }
}
