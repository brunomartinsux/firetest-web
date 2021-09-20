import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent implements OnInit {

  profileForm!: FormGroup;

  currentUser!: { complete_name: string, email: string, premium: true, schooling: string, institution: string }

  constructor(private _fb: FormBuilder, private _auth: AuthService) {
  }

  ngOnInit(): void {

    this.buildForm()

  }

  buildForm(){

    this._auth.getCurrentUser().subscribe(
      res => {
        let currentUser: { complete_name: string; email: string; premium: true, schooling: string, institution: string }
        currentUser = res as { complete_name: string; email: string; premium: true, schooling: string, institution: string }
        this.currentUser = currentUser
        this.profileForm = this._fb.group({
          complete_name: [this.currentUser?.complete_name || '', Validators.required],
          email: [this.currentUser?.email || '', Validators.email],
          schooling: [this.currentUser?.schooling || '', Validators.required],
          institution: [this.currentUser?.institution || '', Validators.required],
        });
      },
      error => console.log(error),
    )
  }

  handleSubmit() {

    const reqBody = {
      account: {
        email: this.profileForm.value.email, 
        complete_name: this.profileForm.value.complete_name,
      },
      infos: {
        schooling: this.profileForm.value.schooling,
        institution: this.profileForm.value.institution
      }
    }

    this._auth.updateUser(reqBody).subscribe(
      res => {
        this.buildForm
      },
      error => console.log(error)
    )
  }
  logout() {
    this._auth.logout()
  }
}
