import { Injectable } from '@angular/core';
import { User } from '../models/user.models';
import { AuthenticationService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _list: Array<User>;

  constructor() {
    this._list = new Array<User>();
  }

  getAllUserList() {
    return this._list;
  }

  addUser(model: User) {
    if (!model) throw 'user is null';

    this._list.push(model);
  }

  addAdminUser() {
    let user = new User();
    user.uid = 'wTqCRLSL9CZIpqX0WxTpbejArxJ2';
    user.email = 'rohitraigol@gmail.com';
    user.firstName = 'Rohit';
    user.lastName = 'Raygol';
    user.isAdmin = true;

    this.addUser(user);
  }

  getUser(id: string) {
    let user = this._list.find((x) => x.uid === id);
    return user;
  }

  updateUser(model: User) {
    if (!model) throw 'user is null';

    let index = this._list.findIndex((x) => x.uid === model.uid);
    if (index >= 0) {
      this._list.splice(index, 1, model);
    }
  }

  isAdminUser(uid: string): boolean {
    let adminUser = this._list.filter((x) => x.uid == uid && x.isAdmin);
    return adminUser != null;
  }
}
