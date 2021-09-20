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
  tried: boolean = false;
  simulateId: string = '';
  indexOfQuestion: number = 0;
  showText: boolean = false;
  closeWarning: boolean = false;
  returnWarning: boolean = false;
  correct!: boolean;

  randomBuilder: {} = {
    train_mode: true,
    object_infos: {
      years: [],
      subjects: []
    }
  }

  tests: Array<any> = [];
  displayTest: Array<any> = [];

  @Input() reqBody: any;

  constructor(private _test: TestService) {}

  ngOnInit(): void {
    this.buildQuestion();
  }

  handleReport(reportText: string, id: string) {
    this.report = false;
    this.displayTest = [this.tests[(this.indexOfQuestion += 1)]];
    this._test.reportQuestion({ question_id: id, text_report: reportText }).subscribe(
      () => {},
      (error) => console.log(error),
    );
  }

  buildQuestion() {
    this._test.createTest(this.reqBody ?? this.randomBuilder).subscribe(
      (res) => (this.simulateId = res.simulate_id),
      (error) => console.log(error),
      () => this.setQuestion(),
    );
  }

  setQuestion() {
    this._test.getQuestion(this.simulateId).subscribe((res) => {
      this.tests = res as Array<any>;
      this.displayTest = [this.tests[this.indexOfQuestion]];
      console.log(this.tests[this.indexOfQuestion]);
    });
  }

  handleAnswer(isCorrect: boolean, target: any) {
    this.tried = true
    const element = target as Element;
    const incorrects = document.getElementsByClassName('option-btn');
    if (isCorrect) {
      this.correct = true;
      element.setAttribute('correct', 'true');
      element.className += ' correct';
      for (let i = 0; i < 5; i++) {
        if (!incorrects[i].hasAttribute('correct')) {
          incorrects[i].className += ' disabled';
        }
      }
    } else {
      this.correct = false;
      for (let i = 0; i < 5; i++) {
        var id = incorrects[i].id;
        if (id != 'correct') {
          incorrects[i].className += ' incorrect';
        } else {
          incorrects[i].className += ' correct';
        }
      }
    }
  }

  handleFeedback(questionId: string, feedback: string) {
    console.log({ question_id: questionId, correct: this.correct, feedback: feedback });
    
    this._test.handleQuestionAnswer({ question_id: questionId, correct: this.correct, feedback: feedback }).subscribe(
      res => {
        if(this.tried){
          this.displayTest = [this.tests[(this.indexOfQuestion += 1)]];
        }
        this.feedbackUp = false;
        this.tried = false;
        console.log('deu boa');
      },
      error => console.log(error)
    )

   
  }

  reload() {
    document.location.reload();
  }
}
