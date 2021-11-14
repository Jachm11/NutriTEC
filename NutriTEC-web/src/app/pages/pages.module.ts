import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { ComponentsModule } from '../components/components.module';
import { LoginClientComponent } from './login-client/login-client.component';
import { LoginNutritionistComponent } from './login-nutritionist/login-nutritionist.component';
import { RegisterProductsComponent } from './register-products/register-products.component';
import { SignupNutritionistComponent } from './signup-nutritionist/signup-nutritionist.component';
import { SignupClientComponent } from './signup-client/signup-client.component';
import { ProductsApprovalComponent } from './products-approval/products-approval.component';
import { GlobalService } from '../services/global.service';
import { ManagerRecipeComponent } from './manager-recipe/manager-recipe.component';
import { AssignClientComponent } from './assign-client/assign-client.component';
import { FilterClientsPipe } from '../pipe/filter-clients.pipe';
import { ManagerPlanComponent } from './manager-plan/manager-plan.component';
import { MeasurementRegisterComponent } from './measurement-register/measurement-register.component';
import { HomeNutritionistComponent } from './home-nutritionist/home-nutritionist.component';
import { ApiService } from '../services/api.service';
import { PersonalRecordComponent } from './personal-record/personal-record.component';
import { DailyRegisterComponent } from './daily-register/daily-register.component';
import { PatientOverviewComponent } from './patient-overview/patient-overview.component';
import { AssingPlanComponent } from './assing-plan/assing-plan.component';
import { BillingComponent } from './billing/billing.component';

import { FullCalendarModule } from 'primeng/fullcalendar'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { HomePatientComponent } from './home-patient/home-patient.component';
import { PatientCalendarComponent } from './patient-calendar/patient-calendar.component'; // a plugin!
//import { FilterRecipesPipe } from '../pipe/filter-recipes.filter';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        ComponentsModule,
        FullCalendarModule,
    ],
    declarations: [
        ProfileComponent,
        LoginClientComponent,
        LoginNutritionistComponent,
        RegisterProductsComponent,
        SignupClientComponent,
        SignupNutritionistComponent,
        ProductsApprovalComponent,
        ManagerRecipeComponent,
        AssignClientComponent,
        FilterClientsPipe,
        ManagerPlanComponent,
        MeasurementRegisterComponent,
        HomeNutritionistComponent,
        PersonalRecordComponent,
        DailyRegisterComponent,
        PatientOverviewComponent,
        AssingPlanComponent,
        BillingComponent,
        LoginAdminComponent,
        HomePatientComponent,
        PatientCalendarComponent,
        //FilterRecipesPipe
        
       
    ],
    exports:[FilterClientsPipe],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PagesModule { }