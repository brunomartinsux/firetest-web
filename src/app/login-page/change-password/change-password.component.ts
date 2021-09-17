import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['../login-page.component.css']
})
export class ChangePasswordComponent implements OnInit {
  registerForm!: FormGroup;
  viewPass: boolean = false;
  error: boolean = false;

  constructor(private _fb: FormBuilder, private _route: Router, private _auth: AuthService, private _activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.registerForm = this._fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  get password() {
    return this.registerForm.get('password')?.value;
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword')?.value;
  }

  submitRegister() {
    if (!this.passMatch() || this.registerForm.invalid) {
      this.error = true;
    } else {
      console.log('match');
      
    }
  }

  passMatch() {
    if (this.password === this.confirmPassword) {
      return true;
    } else {
      return false;
    }
  }
}