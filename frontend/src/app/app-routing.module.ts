import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './authentication/register/register.component';
import { LoginComponent } from './authentication/login/login.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { AddCategoryComponent } from './pages/add-category/add-category.component';

const routes: Routes = [
  {path:'', redirectTo:"register", pathMatch:'full'},
  {path: 'register', component:RegisterComponent},
  {path: 'login', component:LoginComponent},
  {path: 'adminDashboard', component:AdminDashboardComponent},
  {path: 'home', component:HomeComponent}, 
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'adminDashboard/addProduct', component: AddProductComponent },
  { path: 'adminDashboard/addCategory', component: AddCategoryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
