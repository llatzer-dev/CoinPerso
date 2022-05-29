import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../_services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AdministratorGuard implements CanActivate {

  private roles: string[] = [];

  isLoggedIn = false;
  isAdministrator = false;

  constructor(
    private router: Router,
    private tokenStorageService: TokenStorageService,
  ){ }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      if(this.roles.includes('ROLE_ADMIN') || this.roles.includes('ROLE_MODERATOR')){
        this.isAdministrator = true;
      }
    }

    if(!this.isAdministrator)
      this.redirect(this.isAdministrator);

    return this.isAdministrator;
  }

  redirect(flag: boolean): any{
    if(!flag){
      this.router.navigate(['/','home']);
    }
  }

}
