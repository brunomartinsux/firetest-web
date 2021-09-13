import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['../login-page.component.css'],
})
export class RegisterPageComponent implements OnInit {
  registerForm!: FormGroup;
  viewPass: boolean = false;
  error: boolean = false;

  constructor(private _fb: FormBuilder, private _route: Router, private _auth: AuthService) {}

  ngOnInit(): void {
    this.registerForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      complete_name: ['Bruno Martins', Validators.required],
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
      this._auth.register({
        email: this.registerForm.value.email,
        complete_name: this.registerForm.value.complete_name,
        hashed_password: this.registerForm.value.password,
      }).subscribe(
        () => {
          console.log('sucesso no cadastro')
          this._route.navigate([('/login')])
        },
        () => this.error = true,
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
