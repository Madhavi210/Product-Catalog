import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/core/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit{

  categoryForm: FormGroup;
  categoryId: string | null = null;
  isEdit : boolean = false;

  constructor(private fb: FormBuilder, private categoryService: CategoryService, private router:Router, private route:ActivatedRoute) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required]
    });    
  }

  ngOnInit(): void { 
    this.categoryId = this.route.snapshot.paramMap.get('id');
    if(this.categoryId){
      this.isEdit = true;
      this.categoryService.getCategoryById(this.categoryId).subscribe(
        (category) => {
          this.categoryForm.patchValue({
            name: category.name
          });
        }, 
        (error) => {
          console.error(error)
        }
      );
    }
  }

  onSubmit(): void {
    if (this.categoryForm.valid) {
      const formData = this.categoryForm.value;
      if( this.categoryId && this.isEdit) {
        this.categoryService.updateCategory(this.categoryId, formData).subscribe(
          response => {            
            console.log(response);
            Swal.fire("Success", "Category Updated SuccessFully", "success");
            this.categoryForm.reset();
            this.router.navigate(['/adminDashboard/category'])
          }, error => {
            Swal.fire("Error", "Failed to add category", "error");
          }
        )
      } else {
        this.categoryService.createCategory(this.categoryForm.value).subscribe(
          response => {
            Swal.fire("Success", "Category added successfully", "success");
            this.categoryForm.reset();
            this.router.navigate(['/adminDashboard/category'])
          },
          error => {
            Swal.fire("Error", "Failed to add category", "error");
          }
        );
      }
    }
  }


}
