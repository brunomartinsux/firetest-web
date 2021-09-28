import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  feedbackData!: {
    correct_answer: number,
    wrong_answer: number,
    answered_questions: number
 }

  constructor( private _auth: AuthService ) { }

  ngOnInit(): void {
    this._auth.getFeedback().subscribe(
      res => {
        let resData: {}
        resData = res
        this.feedbackData = resData as any
      }
    )
  }

}
