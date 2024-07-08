import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/core/services/category.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss']
})
export class CategoryDetailComponent implements OnInit{

  categories!: any[];
  searchForm!: FormGroup;

  constructor(private fb: FormBuilder, private router:Router , private categoryService:CategoryService){
    this.searchForm = fb.group({
      searchTerm : ['']
    })
  }

  ngOnInit(): void {
    this.getAllCategory();
  }

  getAllCategory():void {
    this.categoryService.getAllCategories().subscribe(
      response => {
        this.categories = response
      }, error => {
        console.error(error);
      }
    )
  }

  editCategory(categoryId: string): void {
    this.router.navigate(['/adminDashboard/addCategory', categoryId]); 
  }

  deleteCategory(categoryId: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this category!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryService.deleteCategory(categoryId).subscribe(
          response => {
            Swal.fire('Deleted!', 'Category has been deleted.', 'success');
            this.getAllCategory();
          },
          error => {
            Swal.fire('Error!', 'Failed to delete category.', 'error');
          }
        );
      }
    });
  }

  navigateToAddCategory(): void {
    this.router.navigate(['/adminDashboard/addCategory']); 
  }

  onSearch(): void {
    const searchTerm = this.searchForm.value.searchTerm;
    if (searchTerm) {
      this.categories = this.categories.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      this.getAllCategory();
    }
  }

  onClear(): void {
    this.searchForm.reset();
    this.getAllCategory();
  }

}
