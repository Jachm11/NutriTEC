import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { LandingComponent } from './landing/landing.component';
import { ComponentsModule } from '../components/components.module';
import { LoginClientComponent } from './login-client/login-client.component';
import { LoginNutritionistComponent } from './login-nutritionist/login-nutritionist.component'

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        ComponentsModule,
  
    ],
    declarations: [
        HomeComponent,
        ProfileComponent,
        LandingComponent,
        LoginClientComponent,
        LoginNutritionistComponent,
          
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PagesModule { }