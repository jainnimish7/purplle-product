import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../services/shared.service';
import { LoaderService } from '../shared/loader/loader.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../model/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private authService: AuthenticationService,
              private toastr: ToastrService, private loaderService: LoaderService,
              private router: Router, private firestore: AngularFirestore,
              private sharedService: SharedService) {
  }

  ngOnInit() {
    this.alreadyLoggedIn();
    if (this.authService.isUserAuthenticated) {
      this.router.navigate(['/']);
    } else {
      this.router.navigate(['/signup']);
    }
  }

  // Sign in using facebook
  signInWithFB(): void {
    if (this.alreadyLoggedIn()) {
      return;
    }
    this.loaderService.display(true);
    this.sharedService.socialLogin('facebook')
      .then((data: User) => {
        this.insertUser(data);

      });
  }

  // Insert user details if user is not already registered
  private insertUser(user: User) {
    const userDoc = this.firestore.collection('users', ref => ref.where('social_id', '==', user.social_id)).valueChanges();
    userDoc.subscribe(usr => {
      if (usr.length) {
        this.authService.setAuthToken(user);
        this.loaderService.display(false);
        this.navigateUrl(user);
      } else {
        return new Promise<any>((resolve, reject) => {
          this.firestore
            .collection('users')
            .add(user)
            .then(res => {
              this.authService.setAuthToken(user);
              this.loaderService.display(false);
              this.navigateUrl(user);
            },
              err => reject(err)
            );
        });
      }
    });
  }

  alreadyLoggedIn() {
    const token = localStorage.getItem('AuthToken') || '';
    if (token.length > 0) {
      this.router.navigate(['/product']);
      this.toastr.success('You are already logged in.');
      return true;
    }
    return false;
  }

  // Navigating user to product listing page
  navigateUrl(user: User) {
    if (!(user.email && user.first_name)) {
      this.router.navigate(['/product']);
    } else {
      this.router.navigate(['/']);
    }
  }
}
