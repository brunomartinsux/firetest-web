import { environment } from './../../environments/environment';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  endpoint = environment.endpoint();
  _urlQuestions = 'questions'
  _urlSubjects = '/subjects'

   reqHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this._auth.getJwtToken()}`,
  });

  constructor(private _route: Router, private _http: HttpClient, private _auth: AuthService) { }

  listSubjects(){
    const url = this.endpoint + this._urlQuestions + this._urlSubjects
    return this._http.get(url, {headers: this.reqHeaders})
  }

}
