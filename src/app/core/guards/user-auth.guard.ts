import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { AuthenticationService } from "../services/auth.service";

@Injectable()
export class UserAuthGuard {

  constructor(private _router: Router, private _authService: AuthenticationService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this._authService.getLoggeedInUser();
    if (currentUser) {
      return false;
    }

    return true;
  }

}
