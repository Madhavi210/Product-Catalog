import { Component , OnInit} from '@angular/core';
import { CategoryService } from 'src/app/core/services/category.service';
import { ProductService } from 'src/app/core/services/product.service';
import { forkJoin } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import Swal from 'sweetalert2';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit{

  products: any[] = [];
  categoryName: string | null = null;

  constructor(private loginService:LoginService,private productService: ProductService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.fetchCategorizedProducts();
  }

  fetchCategorizedProducts(): void {
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


  editProduct(product: any): void {
    // Implement logic to open a modal or navigate to an edit page with product details
    console.log('Edit product:', product);
  }

  deleteProduct(productId: string): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(productId).subscribe(
        () => {
          this.products = this.products.filter(product => product._id !== productId);
          console.log('Product deleted successfully');
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
