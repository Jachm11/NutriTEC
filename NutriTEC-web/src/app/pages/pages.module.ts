import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { LandingComponent } from './landing/landing.component';
import { ComponentsModule } from '../components/components.module';
import { LoginClientComponent } from './login-client/login-client.component';
import { LoginNutritionistComponent } from './login-nutritionist/login-nutritionist.component';
import { RegisterProductsComponent } from './register-products/register-products.component';
import { SignupNutritionistComponent } from './signup-nutritionist/signup-nutritionist.component';
import { SignupClientComponent } from './signup-client/signup-client.component';
import { ProductsApprovalComponent } from './products-approval/products-approval.component';
import { GlobalService } from '../services/global.service';
import { ManagerRecipeComponent } from './manager-recipe/manager-recipe.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        ComponentsModule,
  
    ],
    declarations: [
        ProfileComponent,
        LandingComponent,
        LoginClientComponent,
        LoginNutritionistComponent,
        RegisterProductsComponent,
        SignupClientComponent,
        SignupNutritionistComponent,
        ProductsApprovalComponent,
        ManagerRecipeComponent
        
       
    ],
    providers:[GlobalService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PagesModule { }