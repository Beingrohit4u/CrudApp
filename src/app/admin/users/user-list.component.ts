import { Component, OnInit } from "@angular/core";
import { User } from "src/app/core/models/user.models";
import { UserService } from "src/app/core/services/user-service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {

  constructor(private _userService: UserService) {
  }

  get userList(): Array<User> {
    return this._userService.getAllUserList();
  }

  ngOnInit(): void {

  }

}
