import { Injectable } from '@angular/core';
import {CanActivate} from "@angular/router";

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class AuthGuardService implements CanActivate {

  canActivate(): boolean {
    return false;
  }
}
