import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './authentication/register/register.component';
import { LoginComponent } from './authentication/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { PageNotFoundComponentComponent } from './pages/page-not-found-component/page-not-found-component.component';


const routes: Routes = [
  {path:'', redirectTo:"home", pathMatch:'full'},
  {path: 'home', component:HomeComponent}, 
  {path: 'register', component:RegisterComponent},
  {path: 'login', component:LoginComponent},
  { path: 'product/:id', component: ProductDetailComponent },
  {path: 'admin', loadChildren: () => import('../app/pages/admin/admin.module').then(m => m.AdminModule)},
 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
