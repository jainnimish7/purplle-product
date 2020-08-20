import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './signup.component';
import { LoaderService } from '../shared/loader/loader.service';
import { SharedService } from '../services/shared.service';
import { ToastrService } from 'ngx-toastr';
import { ToastrModule } from 'ngx-toastr';
import { AngularFirestore } from '@angular/fire/firestore';

import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

describe('SignupComponent', () => {
  let fixture: ComponentFixture<SignupComponent>;
  let component: SignupComponent;
  beforeEach(async(() => {
    const FirestoreStub = {
      collection: (name: string) => ({
        doc: (id: string) => ({
          valueChanges: () => new BehaviorSubject({}),
          set: (_id: any) => new Promise((resolve, reject) => resolve()),
        }),
      }),
    };
    const sharedServiceStub = {
      socialLogin: () => ({})
    };
    TestBed.configureTestingModule({
      imports: [
        FormsModule, ReactiveFormsModule,
        RouterTestingModule,
        ToastrModule.forRoot()
      ],
      declarations: [
        SignupComponent
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
      ],
      providers: [
        LoaderService,
        { provide: ToastrService, useClass: ToastrService },
        { provide: AngularFirestore, useValue: FirestoreStub },
        { provide: SharedService, useValue: sharedServiceStub }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
