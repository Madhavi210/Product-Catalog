import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/core/services/product.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  products: any[] = [];
  searchForm: FormGroup;


  constructor(private fb: FormBuilder,private router:Router, private productService: ProductService) { 
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
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  viewProduct(productId: string): void {
    console.log("card cick");
    if(productId){
      this.router.navigate(['/product', productId]);
    } else {
      console.error('Product id is undefined')
    }
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
}
