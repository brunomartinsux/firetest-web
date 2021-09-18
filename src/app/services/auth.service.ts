import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  endpoint = environment.endpoint();
  _urlUsersLogin = 'users/login';
  _urlUsersCreate = 'users/create';
  _urlUsersRecover = 'users/recover';
  _urlUsersLogout = 'users/logout';
  _urlUsersFeedback = 'users/feedback';
  _urlUsersUpdate = 'users/update';
  _urlUsersCurrent = 'users/current_user';

  reqHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this.getJwtToken()}`,
  });

  private readonly JWT_TOKEN = 'JWT_TOKEN';

  constructor(private _http: HttpClient, private _route: Router) {}

  login(form: { email: string; password: string }) {
    const url = this.endpoint + this._urlUsersLogin;
    return this._http.post(url, form).pipe(
      tap(
        (res) => {
          this.doLoginUser(res);
        },
        (error) => console.error(error),
      ),
    );
  }

  register(form: {
    account: {
      email: string;
      complete_name: string;
      hashed_password: string;
    };
    infos: { schooling: string; institution: string };
  }) {
    const url = this.endpoint + this._urlUsersCreate;
    return this._http.post(url, form);
  }

  logout() {
    const reqHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.getJwtToken()}`,
    });

    const url = this.endpoint + this._urlUsersLogout;

    // Verifica se o usuário está logado antes de deslogar
    if (this.isLoggedIn()) {
      this._http.post(url, { token: this.getJwtToken() }, { headers: reqHeaders }).subscribe(
        () => {
          this.removeToken();
        },
        (error) => {
          alert(error.error);
        },
      );
    }
  }

  // Handle login
  doLoginUser(data: any) {
    this.storeToken(data.token);
  }

  // Salvar tokens no localstorage
  storeToken(token: string) {
    localStorage.setItem(this.JWT_TOKEN, token);
  }

  // Retorna o JWT token do localstorage
  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  getCurrentUser() {
    const url = this.endpoint + this._urlUsersCurrent;
    return this._http.get(url, { headers: this.reqHeaders });
  }

  //Verifica se o usuário está logado
  isLoggedIn() {
    if (this.getJwtToken()) {
      return true;
    } else {
      return false;
    }
  }

  // Limpa os tokens
  private removeToken() {
    localStorage.removeItem(this.JWT_TOKEN);
    this._route.navigate(['/login']);
  }

  public sendRecoverEmail(email: string) {
    const url = this.endpoint + this._urlUsersRecover;
    return this._http.post(url, email);
  }

  public updateUser(body:any){
    const url = this.endpoint + this._urlUsersUpdate
    return this._http.patch(url, body, { headers: this.reqHeaders })
  }

  public getFeedback(){
    const url = this.endpoint + this._urlUsersFeedback
    return this._http.get<any>(url, {headers: this.reqHeaders})
  }
}

