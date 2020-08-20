import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ListingComponent implements OnInit {
  userId: any;
  @Input() productsList = [];

  constructor(private firestore: AngularFirestore, private dialog: MatDialog,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.userId = localStorage.getItem('AuthToken');
  }

  // Open confirmation popup to delete the product
  deleteProduct(productId) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: 'Are you sure you want to delete this product? This action can not be rollback.'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.firestore
          .collection('product')
          .doc(productId)
          .delete()
          .then(res => {
            this.toastr.success('Product deleted Successfully');
            this.productsList = this.productsList.filter(product => product.product_id !== productId);
          })
          .catch((error) => {
            console.error('Error removing document: ', error);
          });
      }
    });
  }
}
