import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  constructor(private _fb: FormBuilder, private _authService: AuthService, private _router: Router) { }

  viewPass: boolean = false
  loginForm!: FormGroup;
  error: boolean = false

  ngOnInit(): void {

     this.loginForm = this._fb.group({
      email:['', [Validators.required, Validators.email]],
      password:['', Validators.required]
    })
  }

  get email(){
    return this.loginForm.get('email')
  }

  onSubmit(){
    this._authService.login(this.loginForm.value).subscribe(
      () => this._router.navigate([('/home')]),
      () => this.error = true, 
    )
  }

}
