import { Component, OnInit } from '@angular/core';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-test-build',
  templateUrl: './test-build.component.html',
  styleUrls: ['./test-build.component.css'],
})
export class TestBuildComponent implements OnInit {
  // Filter variables
  years: Array<number> = [];
  menuStep = 1;
  subjects: any | Array<any>;
  selectedSubjects: Array<''> = [];
  selectedYears: Array<number> = [];
  pageController: string = 'filter';
  
  reqBody = {
    train_mode: false,
    object_infos: {
      years: this.selectedYears,
      subjects: this.selectedSubjects
    }
  }
  // display variables
  report: boolean = false;
  feedbackUp: boolean = false;
  tentou: boolean = false;
  simulateId: string = ''

  tests: Array<any> = [];

  constructor(private _test: TestService) {}

  ngOnInit(): void {
    for (let i = 2020; i >= 1994; i--) {
      this.years.push(i);
    }

    this._test.listSubjects().subscribe((res) => {
      let arrSubjects = res as any;
      this.subjects = arrSubjects.subjects as Array<any>;
    });
  }

  handleSubjectSelection(itemId: any, type: string) {
    if (type == 'subjects') {
      if (!this.findInArray(itemId, type)) {
        this.selectedSubjects.push(itemId);
      } else {
        const index = this.selectedSubjects.findIndex((item) => item == itemId);
        this.selectedSubjects.splice(index, 1);
      }
    }
    if (type == 'years') {
      if (!this.findInArray(itemId, type)) {
        this.selectedYears.push(itemId);
      } else {
        const index = this.selectedYears.findIndex((item) => item == itemId);
        this.selectedYears.splice(index, 1);
      }
    }
  }

  findInArray(itemId: any, type: string): boolean {
    if (type == 'subjects') {
      for (let i = 0; i < this.selectedSubjects?.length; i++) {
        if (this.selectedSubjects[i] == itemId) {
          return true;
        }
      }
    }
    if (type == 'years') {
      for (let i = 0; i < this.selectedYears?.length; i++) {
        if (this.selectedYears[i] == itemId) {
          return true;
        }
      }
    }
    return false;
  }

  selectAll(type: string) {
    if (type == 'subjects') {
      for (let i = 0; i < this.subjects?.length; i++) {
        this.handleSubjectSelection(this.subjects[i]?.id, type);
      }
    } else {
      for (let i = 0; i < this.years?.length; i++) {
        this.handleSubjectSelection(this.years[i], type);
      }
    }
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
        if (id != 'correct') {
          incorrects[i].className += ' incorrect';
        } else {
          incorrects[i].className += ' correct';
        }
      }
    }
  }

  handleFeedback() {
    window.scrollTo(0, 0);
    window.location.reload();
  }

}
