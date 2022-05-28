import { TokenStorageService } from './../_services/token-storage.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VigilantGuard implements CanActivate {
  isLoggedIn!: boolean;

  constructor(
    private router: Router,
    private tokenStorageService: TokenStorageService,
  ){ }

  canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if(!this.isLoggedIn)
      this.redirect(this.isLoggedIn);

    return this.isLoggedIn;
  }

  redirect(flag: boolean): any{
    if(!flag){
      this.router.navigate(['/','home']);
    }
  }

}
