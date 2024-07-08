import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/core/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  productForm!: FormGroup;
  isEditMode = false;
  productId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route : ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      imageUrl: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      categoryId: ['', Validators.required]
    });

    this.route.paramMap.subscribe(params => {
      this.productId = params.get('id');
      if (this.productId) {
        this.isEditMode = true;
        this.productService.getProductById(this.productId).subscribe(
          (product) => {
            this.productForm.patchValue({
              name: product.name,
              description: product.description,
              imageUrl: product.imageUrl,
              price: product.price,
              categoryId: product.categoryId
            });
          },
          (error) => {
            console.error('Error fetching product:', error);
          }
        );
      }
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      if (this.isEditMode) {
        // Update existing product
        this.productService.updateProduct(this.productId!, this.productForm.value).subscribe(
          response => {
            Swal.fire("success","Product updated successfully!","success");
            this.router.navigate(['/adminDashboard'])
          },
          error => {
            console.error('Error updating product:', error);
          }
        );
      } else {
        // Create new product
        this.productService.createProduct(this.productForm.value).subscribe(
          response => {
            Swal.fire("success","Product created successfully!","success");
            this.router.navigate(['/adminDashboard'])
          },
          error => {
            console.error('Error creating product:', error);
          }
        );
      }
      this.productForm.reset();
    }
  }

}
