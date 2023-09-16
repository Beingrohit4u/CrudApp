import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user.models';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import firebase from 'firebase/compat/app';
import { UserService } from 'src/app/core/services/user-service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
})
export class UserProfileComponent implements OnInit {
  email!: string;
  isAdmin: boolean = false;

  constructor(
    private _router: Router,
    private _userService: UserService,
    private _userAuthService: AuthenticationService
  ) {}

  ngOnInit(): void {
    let user = this._userAuthService.getLoggeedInUser();
    if (!user) {
      this._router.navigate(['login']);
      return;
    }

    let userObject = JSON.parse(user) as firebase.User;
    this.email = userObject.email ?? '';
    this._userService.addAdminUser();
    this.isAdmin = this._userService.isAdminUser(userObject.uid);
  }

  logout() {
    this._userAuthService.logout();
    this._router.navigate(['login']);
  }
}
