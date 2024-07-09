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
  // selectFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      name: ['',[Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['customer', Validators.required],
      profilePic: [null, Validators.required]
    });
   }

  onSubmit(): void {
    if (this.registrationForm.valid ) {
      const formData = new FormData();
      formData.append('name', this.registrationForm.get('name')?.value);
      formData.append('email', this.registrationForm.get('email')?.value);
      formData.append('password', this.registrationForm.get('password')?.value);
      formData.append('role', this.registrationForm.get('role')?.value);
      const profilePicFile = this.registrationForm.get('profilePic')?.value;
      if (profilePicFile) {
        formData.append('profilePic', profilePicFile);
      }
      
      this.userService.createUser(formData).subscribe(
        (response) => {          
          Swal.fire('Success', 'Registration successful', 'success');
          this.router.navigate(['/login']);
        },
        (error) => {
          Swal.fire('Error', 'Registration failed', 'error');
        }
      );
    } else {
      Swal.fire('Error', 'Invalid form data', 'error');
    }
  }

  onFileChange(event: any): void {
    const file =( event.target as HTMLInputElement).files?.[0];
      this.registrationForm.patchValue({
        profilePic: file
      });
    
  }
  
}
