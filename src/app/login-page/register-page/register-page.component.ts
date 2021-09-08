import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['../login-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  registerForm!: FormGroup
  viewPass: boolean = false
  error: boolean = false

  constructor(private _fb: FormBuilder, private _route: Router) { }

  ngOnInit(): void {

    this.registerForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    })
  }

  get password(){
    return this.registerForm.get('password')?.value
  }

  get confirmPassword(){
    return this.registerForm.get('confirmPassword')?.value
  }

  submitRegister(){
    if(!this.passMatch() || this.registerForm.invalid){
      this.error = true
    } else {
      this._route.navigate([('/home')])
    }
  }

  passMatch(){
    if(this.password === this.confirmPassword){
      return true
    } else {
      return false
    }
  }

}
