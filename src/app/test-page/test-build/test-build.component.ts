import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-build',
  templateUrl: './test-build.component.html',
  styleUrls: ['./test-build.component.css']
})
export class TestBuildComponent implements OnInit {

  items:Array<any> = [1,2,3,4,5,6,7,8,9,10]
  years: Array<number> = [];
  menuStep = 1

  constructor() { }

  ngOnInit(): void {
    for(let i = 2020; i >= 1994; i--){
      this.years.push(i)
    }
  }

  handleSelect(e: any){
  var  baseClass = "flex grid-rows-1 items-center justify-between px-4 mx-4 menu-item"

  if(e.target.className == "flex grid-rows-1 items-center justify-between px-4 mx-4 menu-item selected" ){
    e.target.className = baseClass
  }else{
    if(e.target.className == baseClass){
      e.target.className =  "flex grid-rows-1 items-center justify-between px-4 mx-4 menu-item selected"
    }
  }
  }

  selectAll(e: any){
    const elements = document.getElementsByClassName("flex grid-rows-1 items-center justify-between px-4 mx-4 menu-item")
    for(let i=0 ; i<=elements.length; i++){
      elements[i].className = "flex grid-rows-1 items-center justify-between px-4 mx-4 menu-item selected"
    }

  }

}
