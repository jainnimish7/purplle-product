import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

declare const $: any;
@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss'],
})

export class NewProductComponent implements OnInit {

  constructor(private router: Router, private toastr: ToastrService,
              private firestore: AngularFirestore, private formBuilder: FormBuilder) { }

  productForm: FormGroup;

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      description: [null, Validators.required],
      price: [null, [Validators.required, Validators.maxLength(4), Validators.pattern(new RegExp('^[0-9]*$'))]],
      quantity: [null, [Validators.required]],
      brand: [null, Validators.required]
    });
  }

  // getting form control values
  get f() {
    return this.productForm.controls;
  }

  createProduct() {
    if (this.productForm.invalid) {
      return false;
    }
    const userId = localStorage.getItem('AuthToken');
    if (userId) {
      const data = {
        name: this.f.name.value,
        description: this.f.description.value,
        price: this.f.price.value,
        quantity: this.f.quantity.value,
        brand: this.f.brand.value,
        user_id: userId
      };

      return new Promise<any>((resolve, reject) => {
        this.firestore
          .collection('product')
          .add(data)
          .then(
            res => {
              this.toastr.success('Product created successfully');
              this.router.navigate(['product']);
            },
            err => reject(err)
          );
      });
    } else {
      this.toastr.warning('Please login to create product');
    }
  }
}
