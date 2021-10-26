import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LandingComponent } from './pages/landing/landing.component';
import { SignupClientComponent} from './pages/signup-client/signup-client.component';
import { SignupNutritionistComponent} from './pages/signup-nutritionist/signup-nutritionist.component';
import { LoginClientComponent } from './pages/login-client/login-client.component';
import { LoginNutritionistComponent } from './pages/login-nutritionist/login-nutritionist.component';
import { ProductsApprovalComponent } from './pages/products-approval/products-approval.component';

const routes: Routes =[
    { path: 'home',             component: HomeComponent },
    { path: 'user-profile',     component: ProfileComponent },
    { path: 'register-client',  component: SignupClientComponent },
    { path: 'register-nutritionist',  component: SignupNutritionistComponent },
    { path: 'landing',          component: LandingComponent },
    { path: 'login-client',     component:LoginClientComponent},
    { path: 'login-nutritionist', component:LoginNutritionistComponent},
    { path: 'products-approval', component:ProductsApprovalComponent},
    { path: '', redirectTo: 'login-client', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    })
  ],
  exports: [ 
  ],
})
export class AppRoutingModule { }
