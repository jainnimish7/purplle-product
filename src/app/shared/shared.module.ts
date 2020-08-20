import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoaderComponent } from './loader/loader.component';
import { LoaderService } from './loader/loader.service';
const routes: Routes = [];

@NgModule({
  imports: [
    CommonModule,
    [RouterModule.forChild(routes)],
  ],
  declarations: [
    FooterComponent,
    HeaderComponent,
    LoaderComponent,
  ],
  providers: [
    LoaderService
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    LoaderComponent,
  ]
})
export class SharedModule { }
