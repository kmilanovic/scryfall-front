import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthProvider } from "../../../../app-core/providers/auth.provider";
import { Router } from "@angular/router";
import { UserModel } from "../../model/dto/user.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  user: UserModel = {email: '', token: '', id: 0};

  @Input() error!: string;

  constructor(
    private fb: FormBuilder,
    private authProvider: AuthProvider,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  /*onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.authProvider.login(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value).subscribe(
      (response) => {
        this.router.navigate(['/card-list'])
      },
      error => {
        this.invalidLogin = true;
        this.error = error.message;
      }
    )
  }*/

  onSubmit() {
    this.authProvider.login(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value).subscribe(
      (response: UserModel) => {
        this.user.email = response.email;
        localStorage.setItem('userId', String(response.id));
        localStorage.setItem('token', response.token);
        localStorage.setItem('email', response.email);
        this.router.navigate(['/card-list']);
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
