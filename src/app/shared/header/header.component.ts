import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
// Model
import { User } from 'src/app/model/user';

declare const $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: User;

  constructor(public authService: AuthenticationService, private router: Router,
              public sharedService: SharedService) {
    this.sharedService.currentUser.subscribe((obj: User) => {
      if (this.sharedService.sizeOfObject(obj)) {
        this.user = obj;
      }
    });
  }

  ngOnInit() {
    this.authService.isAuthenticated.subscribe(res => {
      if (res) {
        this.user = JSON.parse(localStorage.getItem('UserDetails'));
      }
    });
  }

  logout() {
    this.authService.logout();
  }
}
