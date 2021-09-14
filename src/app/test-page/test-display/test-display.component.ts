import { Component, Input, OnInit } from '@angular/core';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-test-display',
  templateUrl: './test-display.component.html',
  styleUrls: ['./test-display.component.css'],
})
export class TestDisplayComponent implements OnInit {
  report: boolean = false;
  feedbackUp: boolean = false;
  tentou: boolean = false;
  simulateId: string = ''
  indexOfQuestion: number = 0

  tests: Array<any> = [];
  displayTest: Array<any> = []

  @Input() reqBody:any

  constructor( private _test: TestService ) {}

  ngOnInit(): void {
    this.buildQuestion()
  }

  buildQuestion(){
    this._test.createTest(this.reqBody).subscribe(
      res => this.simulateId = res.simulate_id,
      error => console.log(error),
      () => this.setQuestion(),
    )
  }
  setQuestion(){
    this._test.getQuestion(this.simulateId).subscribe(
      res => {
        this.tests = res as Array<any>
        this.displayTest = [this.tests[this.indexOfQuestion]]
      }
    )
  }

  handleAnswer(isCorrect: boolean, target: any) {
    const element = target as Element;
    const incorrects = document.getElementsByClassName('option-btn');

    if (isCorrect) {
      element.setAttribute('correct', 'true');
      element.className += ' correct';
      for (let i = 0; i < 5; i++) {
        if (!incorrects[i].hasAttribute('correct')) {
          incorrects[i].className += ' disabled';
        }
      }
    } else {
      for (let i = 0; i < 5; i++) {
        var id = incorrects[i].id;
        if ((id != 'correct')) {
          incorrects[i].className += ' incorrect';
        } else {
          incorrects[i].className += ' correct'
        }
      }
    }
  }

  handleFeedback(){
    this.displayTest = [this.tests[this.indexOfQuestion += 1]]
    this.feedbackUp = false
  }
}
