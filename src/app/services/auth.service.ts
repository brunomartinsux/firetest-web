import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  endpoint = "https://firetest-apis.herokuapp.com/";
  _urlUsersLogin = 'users/login';
  _urlUsersCreate = 'users/create';
  _urlUsersRecover = 'users/recover';
  _urlUsersLogout = 'users/logout';
  _urlUsersFeedback = 'users/feedback';
  _urlUsersUpdate = 'users/update';

  private readonly JWT_TOKEN = 'JWT_TOKEN';

  reqHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this.getJwtToken()}`,
  });

  constructor(private _http: HttpClient, private _route: Router) {}

  login(form: {email:string, password:string}){
    const url = this.endpoint + this._urlUsersLogin
    return this._http.post(url, form).pipe(
      tap(
        res => {
          this.doLoginUser(res)
        },
        error => console.log(error)
      )
    )
  }
  register(form: {email:string, complete_name:string, hashed_password:string}){
    const url = this.endpoint + this._urlUsersCreate
    return this._http.post(url, form)
  }
  
  logout(){
    const url = this.endpoint + this._urlUsersLogout
    return this._http.post(url, {headers: this.reqHeaders}).pipe(
      tap(
        res => this.doLogoutUser
      )
    )
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

  //Verifica se o usuário está logado
  isLoggedIn() {
    if (this.getJwtToken()) {
      return true;
    } else {
      return false;
    }
  }

  // handle logout
  private doLogoutUser() {
    this.removeToken();
    this._route.navigate(['/login']);
  }

  // Limpa os tokens
  private removeToken() {
    localStorage.removeItem(this.JWT_TOKEN);
  }
}
