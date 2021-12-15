import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../../../../../shared/models/User";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {

  loginForm!: FormGroup;
  user!: Observable<User>;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  createForm() : void {
    this.loginForm = this.formBuilder.group({
      login: ["", [Validators.required]],
      password: ["", [Validators.required]]
    });
  }

  onSubmit() : void {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.authService.postLogin(this.login?.value, this.password?.value).subscribe(
        (val) => {
          console.log("User logged in");
          this.user = this.authService.getLogin(this.login?.value);
        }
      )
    }
    else {
      Object.keys(this.loginForm.controls).forEach(field => {
        const control = this.loginForm.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
    }
  }

  get login() { return this.loginForm.get("login"); }
  get password() { return this.loginForm.get("password"); }

  ngOnInit(): void {
    this.createForm();
  }

}
