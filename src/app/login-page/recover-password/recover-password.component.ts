import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['../login-page.component.css']
})
export class RecoverPasswordComponent implements OnInit {

  recoverForm!: FormGroup;
  error? = false
  success? = false

  constructor(private _fb: FormBuilder, private _auth: AuthService) { }

  ngOnInit(): void {

    this.recoverForm = this._fb.group({
      email: ['', [Validators.email, Validators.required]]
    })

  }

  submitForm(){
    console.log(this.recoverForm.value.email);

    this._auth.sendRecoverEmail(this.recoverForm.value).subscribe(
      res => {
        this.success = true
      },
      error => this.recoverForm.value.email = ''
    )
    
  }

}
