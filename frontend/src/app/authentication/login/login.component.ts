import { roleGuard } from './../../core/guards/role.guard';
import { userRole } from './../../../../../backend/src/enum/userRole';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  ngOnInit(): void {}

  onLogin(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.loginService.login(email, password).subscribe({
        next: (response) => {
          console.log('user logged in successfully', response);
          // const role = localStorage.getItem('role');          
          if(response.role === 'admin') {
            this.router.navigate(['/adminDashboard']);
          } else {
            this.router.navigate(['/home']);
          }
        },
        error: (error) => {
          console.error('login failed', error);
        }
      });
    }
  }
}
