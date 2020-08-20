import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { NewProductComponent } from './new-product.component';
import { ToastrService } from 'ngx-toastr';
import { ToastrModule } from 'ngx-toastr';
import { AngularFirestore } from '@angular/fire/firestore';

import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

describe('NewProductComponent', () => {
  let fixture: ComponentFixture<NewProductComponent>;
  let component: NewProductComponent;
  beforeEach(async(() => {
    const FirestoreStub = {
      collection: (name: string) => ({
        doc: (id: string) => ({
          valueChanges: () => new BehaviorSubject({ foo: 'bar' }),
          set: (_id: any) => new Promise((resolve, reject) => resolve()),
        }),
      }),
    };
    TestBed.configureTestingModule({
      imports: [
        FormsModule, ReactiveFormsModule,
        RouterTestingModule,
        ToastrModule.forRoot()
      ],
      declarations: [
        NewProductComponent
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
      ],
      providers: [
        { provide: ToastrService, useClass: ToastrService },
        { provide: AngularFirestore, useValue: FirestoreStub }

      ]
    }).compileComponents();
    fixture = TestBed.createComponent(NewProductComponent);
    component = fixture.componentInstance;
  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('new product form initially be undefined', () => {
    expect(component.productForm).toBeUndefined();
  });

  it('After initialization value of productForm should be null', () => {
    component.ngOnInit();
    expect(component.productForm.controls.name.value).toBeNull();
    expect(component.productForm.controls.description.value).toBeNull();
    expect(component.productForm.controls.price.value).toBeNull();
    expect(component.productForm.controls.quantity.value).toBeNull();
    expect(component.productForm.controls.brand.value).toBeNull();
  });

  it('Without filling value productForm should be invalid', () => {
    component.ngOnInit();
    const val = component.createProduct();
    expect(val).toBeFalsy();
  });
});
