import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from "src/app/core/services/auth.service";

@Component({
  template: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  error!: string;
  loginForm!: FormGroup;

  constructor(private _router: Router,
    private _formBuilder: FormBuilder,
    private _authService: AuthenticationService) { }


  get f() {
    return this.loginForm.controls;
  }

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  formSubmit() {
    if (this.loginForm.invalid)
      return;

    let model = {
      email: this.f['email'].value,
      password: this.f['password'].value,
    }

    this._authService.login(model.email, model.password).then((user: any) => {
      var user: any = firebase.auth().currentUser;
      this._authService.setLoggeedInUser(user);
      this._router.navigate(['user-profile']);
    }, (error: any) => {
      this.error = "User account does not exist.";
    });
  }

}
