import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Paper} from "../models/paper";
import {AuthenticationData} from "../models/authentication-data";
import {TokenService} from "./token-service";
import {catchError, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

//Mirror of the backend functions to make them accessible in the frontend
export class AuthenticationService {

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  public isLoggedIn() :boolean {
    return this.tokenService.getToken() != null;
  }

  public login(): Observable<any> {

/*    const body = new HttpParams()
      .set('username', authData.username)
      .set('password', authData.password)
      .set('client_id', authData.client_id)
      .set('client_secret', authData.client_secret)
      .set('grant_type', authData.grant_type);*/

    const HTTP_OPTIONS = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };

    const body = new HttpParams()
      .set('username', 'f.sitter')
      .set('password',  'winse2021')
      .set('client_id', 'theses')
      .set('client_secret', '8e9051b1-2879-41fb-963d-73f5430028be')
      .set('grant_type', 'password');

    return this.http.post<any>(
      `https://self.se.jku.at/auth/realms/se-mitarbeiter/protocol/openid-connect/token`,
      body,
      HTTP_OPTIONS).pipe(
        tap(res => {
          this.tokenService.saveToken(res.access_token);
          this.tokenService.saveRefreshToken(res.refresh_token);
        }),
    );
  }

  public logout(): void {
    this.tokenService.removeToken();
  }
}
