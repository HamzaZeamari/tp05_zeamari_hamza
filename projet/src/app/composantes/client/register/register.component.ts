import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ConfirmService} from "../../../confirm.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  signupForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() : void {
    this.signupForm = this.formBuilder.group({
        login: ["", [Validators.required]],
        password: ["", [Validators.required]],
        confirm_password: ["", [Validators.required]]
      },
      { validators: ConfirmService.passwordsConfirm });
  }

  onSubmit() : void {
    if (this.signupForm.valid) {
      console.log(this.signupForm.value);
    }
    else {
      Object.keys(this.signupForm.controls).forEach(field => {
        const control = this.signupForm.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
    }
  }

  get login() { return this.signupForm.get("login"); }
  get password() { return this.signupForm.get("password"); }
  get confirm_password() { return this.signupForm.get("confirm_password"); }

}
