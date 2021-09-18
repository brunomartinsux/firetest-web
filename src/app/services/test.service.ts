import { environment } from './../../environments/environment';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  endpoint = environment.endpoint();
  _urlQuestions = 'questions';
  _urlSubjects = '/subjects';
  _urlStart ='/start'
  _urlGetQuestion = 'questions/:id'
  _urlReport = '/reporter'

  reqHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this._auth.getJwtToken()}`,
  });

  constructor(private _route: Router, private _http: HttpClient, private _auth: AuthService) {}

  listSubjects() {
    const url = this.endpoint + this._urlQuestions + this._urlSubjects;
    return this._http.get(url, { headers: this.reqHeaders });
  }

  getQuestion(simulateId: string){
    const url = this.endpoint + this._urlGetQuestion.replace(':id', simulateId) 
     return this._http.get(url, { headers: this.reqHeaders })
  }

  createTest(body: { train_mode: boolean; object_infos: { years: [number]; subjects: [string] }}) {
    const url = this.endpoint + this._urlQuestions + this._urlStart
    return this._http.post<{simulate_id:string}>(url, body, { headers: this.reqHeaders })
  }

  reportQuestion(body: {question_id: string, text_report: string}){
    const url = this.endpoint + this._urlQuestions + this._urlReport
    return this._http.post(url, body, { headers: this.reqHeaders })
  }



}
