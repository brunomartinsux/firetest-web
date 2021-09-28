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

  currentRoute!: ActivatedRoute

  constructor(private _fb: FormBuilder, private _route: Router, private _auth: AuthService, private _activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.registerForm = this._fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });

    let queryId: any
    this._activatedRoute.params.subscribe(
      res => queryId = res.id
    )
    this._auth.verifyQueryId(queryId).subscribe(
      res => {
        let resToken 
        resToken = res as {token: string}
        this._auth.storeToken(resToken.token)
      },
      error => {
        this._route.navigate([('/login')])
      }
    )
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
      this._auth.updateUser({
        account: {
          password: this.registerForm.value.password
        },
      }).subscribe(
        res => {
          this._route.navigate([('/login')])
        },
        error => this.error = true
      )
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