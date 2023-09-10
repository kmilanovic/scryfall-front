import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserModel} from "../../../login/model/dto/user.model";
import {AuthProvider} from "../../../../app-core/providers/auth.provider";
import {Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
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
    this.registerForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  onSubmit() {
    this.authProvider.register(this.registerForm.get('email')?.value, this.registerForm.get('password')?.value)
      .subscribe({
        next: () => {
          this.message.success('Register successful!');
          this.router.navigate(['/login']);
        },
        error: (error) => {
          if (error.status === 409) {
            this.error = 'Email already exists. Please use a different email address.';
          } else {
            this.error = 'An error has occurred while registering.';
          }
        }
      });
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
