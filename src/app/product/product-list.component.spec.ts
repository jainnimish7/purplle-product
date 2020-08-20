import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductListComponent } from './product-list.component';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ToastrModule } from 'ngx-toastr';
import { AngularFirestore } from '@angular/fire/firestore';

import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

describe('ProductListComponent', () => {
  let fixture: ComponentFixture<ProductListComponent>;
  let component: ProductListComponent;
  beforeEach(async(() => {
    const FirestoreStub = {
      collection: (name: string) => ({
        doc: (id: string) => ({
          valueChanges: () => new BehaviorSubject({ foo: 'bar' }),
          set: (_id: any) => new Promise((resolve, reject) => resolve()),
        }),
      }),
    };
    const matDialogStub = {
      open: () => ({
        componentInstance: {
        },
        afterClosed: () => ({
          subscribe: () => ({})
        })
      })
    };
    TestBed.configureTestingModule({
      imports: [
        FormsModule, ReactiveFormsModule,
        RouterTestingModule,
        ToastrModule.forRoot()
      ],
      declarations: [
        ProductListComponent
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
      ],
      providers: [
        { provide: ToastrService, useClass: ToastrService },
        { provide: AngularFirestore, useValue: FirestoreStub },
        { provide: MatDialog, useValue: matDialogStub }

      ]
    }).compileComponents();
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('makes expected calls to deleteProduct', () => {
    spyOn(component, 'deleteProduct');
    expect(component.deleteProduct).toHaveBeenCalled();
  });
});
