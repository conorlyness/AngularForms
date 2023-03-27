import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Form,
  FormArray,
} from '@angular/forms';
import { Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent {
  createUserForm: FormGroup;
  genders: any[] = ['Male', 'Female'];
  noGender: boolean = false;
  brands: any[] = ['Nike', 'Asics', 'Adidas', 'Hoka', 'Puma', 'Reebok'];

  // selectedBrand: string = '';

  constructor() {
    this.createUserForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      additionalNames: new FormArray([]),
      creationDate: new FormControl(new Date()),
      description: new FormControl(''),
      gender: new FormControl(''),
      favouriteBrands: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.createUserForm.valueChanges.subscribe((changes) => {
      console.log('form after changes: ', changes);
      if (this.gender?.value != '') {
        this.noGender = false;
      }
    });
  }

  onSubmit(value: any) {
    if (this.gender?.value === '') {
      this.noGender = true;
      return;
    }
    const formToSubmit = { ...value };
    console.log('the form submitted was: ', formToSubmit);
  }

  reset(event: any) {
    console.log(event);
    console.log('need to reset form');
  }

  // Getters for form controls

  get firstName() {
    return this.createUserForm.get('firstName');
  }

  get lastName() {
    return this.createUserForm.get('lastName');
  }

  get gender() {
    return this.createUserForm.get('gender');
  }

  get favouriteBrands() {
    return this.createUserForm.get('favouriteBrands');
  }

  // End of Getters

  additionalNames(): FormArray {
    return this.createUserForm.get('additionalNames') as FormArray;
  }

  createAdditionalName() {
    return new FormGroup({
      name: new FormControl(''),
    });
  }

  addAdditionalName() {
    this.additionalNames().push(this.createAdditionalName());
  }

  removeAdditionalName(i: number) {
    this.additionalNames().removeAt(i);
  }

  nextStep(stepper: MatStepper) {
    console.log('stepper: ', stepper);
    stepper.next();
  }

  // setBrand(brand: string) {
  //   this.selectedBrand = brand;
  // }
}
