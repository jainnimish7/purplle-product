import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isBlueBackground = true;
  isDashboardRoute = true;

  constructor(private router: Router) {
    router.events.subscribe((route: any) => {
      if (route.url) {
        this.isDashboardRoute = route.url === '/';
        this.isBlueBackground = (route.url === '/signup');
      }
    });
  }
}
