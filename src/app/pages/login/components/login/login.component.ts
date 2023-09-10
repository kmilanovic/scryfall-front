import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthProvider } from "../../../../app-core/providers/auth.provider";
import { Router } from "@angular/router";
import { UserModel } from "../../model/dto/user.model";
import {tap} from "rxjs";
import {NzMessageService} from "ng-zorro-antd/message";

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
    private message: NzMessageService
  ) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  onSubmit() {
    this.authProvider
      .login(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value)
      .pipe(
        tap((response: UserModel) => {
          this.user.email = response.email;
          localStorage.setItem('userId', String(response.id));
          localStorage.setItem('token', response.token);
          localStorage.setItem('email', response.email);
          this.router.navigate(['/card-list']);

          this.message.success('Login successful!');
        })
      )
      .subscribe({
        next: () => {},
        error: (error) => {
          if (error.status === 401) {
            this.error = 'Bad credentials. Please use a different email address.';
          } else {
            this.error = 'An error has occurred while registering.';
          }
        }
      });
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
