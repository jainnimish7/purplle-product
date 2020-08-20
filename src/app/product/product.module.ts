import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from '../auth-guard/auth.guard';
// Component
import { ProductListComponent } from './product-list.component';
import { NewProductComponent } from './create-product/new-product.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ListingComponent } from './listing.component.ts/listing.component';
import { environment } from 'src/environments/environment';

import { AngularFirestoreModule } from '@angular/fire/firestore';
// Material Modules
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { AngularFireModule } from '@angular/fire';

const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'new', component: NewProductComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFirestoreModule,
    MatButtonModule,
    MatCardModule,
    MatSliderModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
    AngularFireModule.initializeApp(environment.firebase),
    [RouterModule.forChild(routes)],
  ],
  declarations: [
    ProductListComponent,
    NewProductComponent,
    ConfirmDialogComponent,
    ListingComponent,
  ]
})
export class ProductModule { }
