import { Injectable } from '@angular/core';
import { User } from '../../core/models/user.models';
import { getFirebaseBackend } from './authUtils';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  login(email: string, password: string) {
    return getFirebaseBackend()
      .loginUser(email, password)
      .then((response: any) => {
        const user = response;
        return user;
      });
  }

  register(model: User) {
    return getFirebaseBackend()
      .registerUser(model)
      .then((response: any) => {
        const user = response;
        return user;
      });
  }

  setLoggeedInUser = (user: any) => {
    sessionStorage.setItem('authUser', JSON.stringify(user));
  };

  getLoggeedInUser = () => {
    let user = sessionStorage.getItem('authUser');
    return user;
  };

  logout() {
    sessionStorage.removeItem('authUser');
  }
}
