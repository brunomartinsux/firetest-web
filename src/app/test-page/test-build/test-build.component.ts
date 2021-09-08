import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-build',
  templateUrl: './test-build.component.html',
  styleUrls: ['./test-build.component.css'],
})
export class TestBuildComponent implements OnInit {
  items: Array<any> = [
    'Artes',
    'Biologia',
    'Ciências gerais',
    'Física',
    'Inglês',
    'Português',
    'História',
    'Geografia',
  ];
  years: Array<number> = [];
  menuStep = 1;
  selectedItems = {
    subjects: [''],
    years: [''],
  };

  constructor() {}

  ngOnInit(): void {
    for (let i = 2020; i >= 1994; i--) {
      this.years.push(i);
    }
  }

  handleSelect(item: any, type: string) {
    console.log('item: ', item, 'type: ', type);
    console.log(this.selectedItems);
    
    if (type == 'subject') {
      let hasEqual = {equal:false, index: 0}
      for(let i=0; i< this.selectedItems.subjects.length; i++){
        if(this.selectedItems.subjects[i] == item){
          hasEqual = {equal:true, index: i}
        }
      }
      if(hasEqual.equal){
        this.selectedItems.subjects[hasEqual.index].slice(hasEqual.index, hasEqual.index)
      } else {
        this.selectedItems.subjects.push(item)
      }
    } else {
      let hasEqual = {equal:false, index: 0}
      for(let i=0; i< this.selectedItems.years.length; i++){
        if(this.selectedItems.years[i] == item){
          hasEqual = {equal:true, index: i}
        }
      }
      if(hasEqual.equal){
        this.selectedItems.years[hasEqual.index].slice(hasEqual.index, hasEqual.index)
      } else {
        this.selectedItems.years.push(item)
      }
    }

    console.log('Novo selecionados:',this.selectedItems);
  }

  selectAll(item: any) {}
}
