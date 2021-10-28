import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { RegisterComponent } from './register/register.component';
import { ProductComponent } from './product/product.component';
import { AlertsComponent } from './alerts/alerts.component';
import { GlobalService } from '../services/global.service';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
    ],
    declarations: [
        RegisterComponent,
        ProductComponent,
        AlertsComponent
  
        
    ],
    providers:[GlobalService],
    entryComponents: [],
    exports: [RegisterComponent, ProductComponent, AlertsComponent],
})
export class ComponentsModule { }