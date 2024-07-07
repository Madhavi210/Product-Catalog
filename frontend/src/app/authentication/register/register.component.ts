import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/core/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registrationForm!: FormGroup;
  userId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['CUSTOMER', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.registrationForm.valid) {
      const formData = this.registrationForm.value;
      this.userService.createUser(formData).subscribe(
        (response) => {
          console.log("Registration is successful");
          Swal.fire('Success', 'Registration successful', 'success');
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error("Error in creating user", error);
          Swal.fire('Error', 'Registration failed', 'error');
        }
      );
    } else {
      console.error("Error in submitting");
      Swal.fire('Error', 'Invalid form data', 'error');
    }
  }
}
