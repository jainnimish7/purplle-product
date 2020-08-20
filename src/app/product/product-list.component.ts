import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})

export class ProductListComponent implements OnInit {
  userId: any;
  productsList = [];

  searchTextChanged: Subject<string> = new Subject<string>();

  public searchKeyword = '';
  constructor(private firestore: AngularFirestore, private dialog: MatDialog,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.listAllProduct();
    this.searchTextChanged.pipe(debounceTime(1000))
      .subscribe(model => this.searchByName());
  }

  search() {
    this.searchTextChanged.next();
  }

  // searching on product's name
  searchByName() {
    if (this.searchKeyword) {
      this.productsList = this.productsList.filter(product => product.name.toLowerCase().includes(this.searchKeyword));
    } else {
      this.listAllProduct();
    }
  }

  // get list of all product
  listAllProduct() {
    this.productsList = [];
    this.firestore.collection('product', ref => ref.limit(4).orderBy('name')
      .startAt(this.searchKeyword)
      .endAt(this.searchKeyword + '\uf8ff'))
      .valueChanges()
      .subscribe(res => {
        this.productsList = res;
      });
  }
}
