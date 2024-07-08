import { Component , OnInit} from '@angular/core';
import { CategoryService } from 'src/app/core/services/category.service';
import { ProductService } from 'src/app/core/services/product.service';
import { forkJoin } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import Swal from 'sweetalert2';
import { LoginService } from 'src/app/core/services/login.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit{

  products: any[] = [];
  categoryName: string | null = null;
  searchForm: FormGroup;

  constructor(private fb: FormBuilder, private router:Router,private loginService:LoginService,private productService: ProductService, private categoryService: CategoryService) { 
    this.searchForm = fb.group({
      searchTerm : ['']
    })
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getAllProducts().subscribe(
      (data) => {
        this.products = data;
        this.fetchCategoryName();
      },
      (error) => {
        console.error('Error fetching categorized products:', error);
      }
    );
  }

  
  fetchCategoryName() :void{
    const categoryRequests = this.products.map(product => 
      this.categoryService.getCategoryById(product.categoryId)
    );
    forkJoin(categoryRequests).subscribe(
      (categories) => {
        this.products = this.products.map((product, index) => {
          product.categoryName = categories[index].name;
          return product;
        });
      },
      (error) => {
        console.error('Error fetching category details:', error);
      }
    );
  }

  onSearch(): void {
    const searchTerm = this.searchForm.value.searchTerm;
    if (searchTerm) {
      this.products = this.products.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      this.getProducts();
    }
  }

  onClear(): void {
    this.searchForm.reset();
    this.getProducts();
  }

  editProduct(product: any): void {
    this.router.navigate(['/adminDashboard/addProduct' , product._id]);
  }

  deleteProduct(productId: string): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(productId).subscribe(
        () => {
          this.products = this.products.filter(product => product._id !== productId);
          Swal.fire("seccess","Product deleted successfully","success")
        },
        (error) => {
          console.error('Error deleting product:', error);
        }
      );
    }
  }

  logout():void {
    this.loginService.logout();
  }
}
