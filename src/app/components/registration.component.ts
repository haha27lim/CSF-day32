import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RSVP } from '../models';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  // Initializing registration form
  regForm!: FormGroup

  // Injecting FormBuilder library in constructor
  constructor(private fb: FormBuilder) { }

  // Called after constructor
  // Lifecycle hook: OnInit
  ngOnInit(): void {
    this.regForm = this.createForm() // Creating registration form on component initialization
  }
  
  // Method to process form submission
  processForm() {
    //const rsvp = this.regForm.value as RSVP
    const rsvp: RSVP = {
      name: this.regForm.get('name')?.value,
      email: this.regForm.get('email')?.value,
      age: this.regForm.get('age')?.value,
      attendance: this.regForm.get('attendance')?.value == 'yes',
    }
    // Logging form data in console
    console.info('>>> processing form: ', rsvp) 
    // Resetting registration form after submission
    this.regForm.reset()
  }

  // Method to check if a form control is invalid
  isControlInvalid(ctrlName: string): boolean {
    // Get the form control with the given name from the registration form
    const ctrl = this.regForm.get(ctrlName) as FormControl
    // Return whether the control is invalid and has been interacted with (not pristine).
    return ctrl.invalid && (!ctrl.pristine)
  }

  // Method to create registration form using FormBuilder
  private createForm(): FormGroup {
    return this.fb.group({
      name: this.fb.control<string>('', [ Validators.required, Validators.minLength(3) ]),
      email: this.fb.control<string>('', [ Validators.required, Validators.email ]),
      age: this.fb.control<number>(18, [ Validators.required, Validators.min(18) ]),
      attendance: this.fb.control<string>('' ,[ Validators.required ])
    })
  }

}
