import { Component } from '@angular/core';
import firebase from 'firebase/compat/app';
import { AuthenticationService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private _authService: AuthenticationService) {
  }

  signin() {
    this._authService.login('developerdinesh121@gmail.com', 'dinesh@1234').then((user: any) => {
      var user: any = firebase.auth().currentUser;
      console.log(JSON.stringify(user));
    }, (error: any) => {
      console.log('error' + JSON.stringify(error));
    });
  }
}
