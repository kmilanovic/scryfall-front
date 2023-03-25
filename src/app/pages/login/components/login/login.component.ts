import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthProvider } from "../../../../app-core/providers/auth.provider";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  invalidLogin = false;

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


  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.authProvider.login(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value).subscribe(
      (response) => {
        this.router.navigate(['/dashboard'])
      },
      error => {
        this.invalidLogin = true;
        this.error = error.message;
      }
    )
  }

}
