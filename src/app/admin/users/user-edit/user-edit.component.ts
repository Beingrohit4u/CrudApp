import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Route, Router } from "@angular/router";
import { User } from "src/app/core/models/user.models";
import { UserService } from "src/app/core/services/user-service";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html'
})
export class UserEditComponent implements OnInit {

  error!: string;
  userForm!: FormGroup;

  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _userService: UserService) {
  }

  get f() {
    return this.userForm.controls;
  }

  ngOnInit(): void {
    this.userForm = this._formBuilder.group({
      uid: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
    });

    //find user is exist or not
    this._route.paramMap.subscribe(response => {
      let userId = response.get('id');
      if (!userId) {
        this._router.navigate(['user-list']);
        return;
      }

      let user = this._userService.getUser(userId);
      if (!user) {
        this._router.navigate(['user-list']);
        return;
      }

      this.f['uid'].setValue(user.uid);
      this.f['email'].setValue(user.email);
      this.f['lastName'].setValue(user.lastName);
      this.f['firstName'].setValue(user.firstName);
    });
  }

  submitForm() {
    if (this.userForm.invalid)
      return;

    let model = new User();
    model.uid = this.f['uid'].value
    model.email = this.f['email'].value;
    model.lastName = this.f['lastName'].value;
    model.firstName = this.f['firstName'].value;

    this._userService.updateUser(model);
    this._router.navigate(['user-list']);
  }

}
