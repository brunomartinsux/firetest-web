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

  constructor(private _fb: FormBuilder, private _auth: AuthService, private _route: Router) {
  }

  ngOnInit(): void {

    this.builForm()

  }

  builForm(){
    this.profileForm = this._fb.group({
      complete_name: [this.currentUser?.complete_name, Validators.required],
      email: [this.currentUser?.email, Validators.email],
      schooling: [this.currentUser?.schooling, Validators.required],
      institution: [this.currentUser?.institution, Validators.required],
    });

    this._auth.getCurrentUser().subscribe(
      res => {
        let currentUser: { complete_name: string; email: string; premium: true, schooling: string, institution: string }
        currentUser = res as { complete_name: string; email: string; premium: true, schooling: string, institution: string }
        this.currentUser = currentUser
        this.profileForm.value.complete_name = currentUser.complete_name
        this.profileForm.value.email = currentUser.email
        this.profileForm.value.schooling = currentUser.schooling
        this.profileForm.value.institution = currentUser.institution
        console.log(currentUser.institution);
      },
      error => console.log(error)
    )
  }

  handleSubmit() {
    this._auth.updateUser(this.profileForm.value).subscribe(
      res => {
        console.log(res)
        this.builForm
      },
      error => console.log(error)
    )
  }
  logout() {
    this._auth.logout()
  }
}
