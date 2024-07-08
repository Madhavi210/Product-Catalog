import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/core/services/category.service';
import { ProductService } from 'src/app/core/services/product.service';
// import { Pipe, PipeTransform } from '@angular/core';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent {

  product: any;
  categoryName: string | null = null;
  liked!: false;

  constructor(private categoryService:CategoryService,private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if(productId){
      this.productService.getProductById(productId).subscribe(
        (data) => {
          this.product = data;
          if (this.product.categoryId) {
            this.fetchCategoryName(this.product.categoryId)
          }
        },
        (error) => {
          console.error('Error fetching product details:', error);
        }
      );
    } else{
      console.error('Product ID not found in route parameters.');
    }
   
  }

  fetchCategoryName(categoryId: string) :void{
    this.categoryService.getCategoryById(categoryId).subscribe(
      (data) => {
        this.categoryName = data.name;
      }, (error) => {
        console.error('Error fetching category details:', error);
      }
    )
  }

  // toggleLike():void {
  //   this.liked += this.liked
  // }
}
