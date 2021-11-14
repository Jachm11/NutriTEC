import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupClientComponent} from './pages/signup-client/signup-client.component';
import { SignupNutritionistComponent} from './pages/signup-nutritionist/signup-nutritionist.component';
import { LoginClientComponent } from './pages/login-client/login-client.component';
import { LoginNutritionistComponent } from './pages/login-nutritionist/login-nutritionist.component';
import { ProductsApprovalComponent } from './pages/products-approval/products-approval.component';
import { RegisterProductsComponent } from './pages/register-products/register-products.component';
import { ManagerRecipeComponent } from './pages/manager-recipe/manager-recipe.component';
import { AssignClientComponent } from './pages/assign-client/assign-client.component';
import { ManagerPlanComponent } from './pages/manager-plan/manager-plan.component';
import { MeasurementRegisterComponent } from './pages/measurement-register/measurement-register.component';
import { HomeNutritionistComponent } from './pages/home-nutritionist/home-nutritionist.component';
import { DailyRegisterComponent } from './pages/daily-register/daily-register.component';
import { PersonalRecordComponent } from './pages/personal-record/personal-record.component';
import { PatientOverviewComponent } from './pages/patient-overview/patient-overview.component';
import { AssingPlanComponent } from './pages/assing-plan/assing-plan.component';
import { BillingComponent } from './pages/billing/billing.component';
import { LoginAdminComponent } from './pages/login-admin/login-admin.component';
import { Component } from '@fullcalendar/core';
import { HomePatientComponent } from './pages/home-patient/home-patient.component';

const routes: Routes =[
    { path: '', redirectTo: 'login-client', pathMatch: 'full' },
    { path: 'home',                   component:HomeComponent },
    { path: 'home-nutritionist',      component:HomeNutritionistComponent},
    { path: 'user-profile',           component:ProfileComponent },
    { path: 'register-client',        component:SignupClientComponent },
    { path: 'register-nutritionist',  component:SignupNutritionistComponent },
    { path: 'login-client',           component:LoginClientComponent},
    { path: 'login-nutritionist',     component:LoginNutritionistComponent},
    { path: 'products-approval',      component:ProductsApprovalComponent},
    { path: 'register-product',       component:RegisterProductsComponent},
    { path: 'manager-recipe',         component:ManagerRecipeComponent},
    { path: 'assign-client',          component:AssignClientComponent},
    { path: 'manager-plan',           component:ManagerPlanComponent},
    { path: 'measurement-register',   component:MeasurementRegisterComponent},
    { path: 'daily-register',         component:DailyRegisterComponent},
    { path: 'personal-record',        component:PersonalRecordComponent},
    { path: 'patient-overview',       component:PatientOverviewComponent},
    { path: 'assign-plan',            component:AssingPlanComponent},
    { path: 'billing',                component:BillingComponent},
    { path: 'login-admin',            component:LoginAdminComponent},
    { path: 'home-patient',           component:HomePatientComponent},
    { path: 'profile',                component:ProfileComponent}
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
