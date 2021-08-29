import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  profileForm!: FormGroup;

  constructor(private _fb: FormBuilder ) { }

  ngOnInit(): void {

    this.profileForm = this._fb.group({
      name: ['Jair Messias Bolsonaro', Validators.required],
      email: ['deiproveiodahavan@yahoo.com', Validators.email],
      password: ['°°°°°°°°°°°°°°']
    })

  }
  handleSubmit(){
    console.log(this.profileForm.value);
    
  }

}
