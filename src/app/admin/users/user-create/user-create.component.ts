import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import firebase from 'firebase/compat/app';
import { User } from "src/app/core/models/user.models";
import { AuthenticationService } from "src/app/core/services/auth.service";
import { UserService } from "src/app/core/services/user-service";
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html'
})
export class UserCreateComponent implements OnInit {

  error!: string;
  userForm!: FormGroup;

  constructor(private _router: Router,
    private _formBuilder: FormBuilder,
    private _authService: AuthenticationService,
    private _userService: UserService) {
  }

  get f() {
    return this.userForm.controls;
  }

  ngOnInit(): void {
    this.userForm = this._formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
    });
  }

  submitForm() {
    if (this.userForm.invalid)
      return;

    let model = new User();
    model.email = this.f['email'].value;
    model.password = this.f['password'].value;
    model.lastName = this.f['lastName'].value;
    model.firstName = this.f['firstName'].value;

    this._authService.register(model).then((user: firebase.User) => {
      model.uid = user.uid;
      this._userService.addUser(model);
      this._router.navigate(['user-list']);
    }, (error: any) => {
      this.error = error;
    });
  }

}
