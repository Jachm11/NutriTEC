import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { RegisterComponent } from './register/register.component';
import { ProductComponent } from './product/product.component';
import { AlertsComponent } from './alerts/alerts.component';
import { GlobalService } from '../services/global.service';
import { ItemRecipeComponent } from './recipe/item-recipe/item-recipe.component';
import { ItemRecipeAddComponent } from './recipe/item-recipe-add/item-recipe-add.component';
import { FilterPipe } from '../pipe/filter.pipe';
import { ItemProductComponent } from './recipe/item-product/item-product.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AssignClientItemComponent } from './assign-client-item/assign-client-item.component';
import { FilterClientsPipe } from '../pipe/filter-clients.pipe';
import { PlanItemComponent } from './plan/plan-item/plan-item.component';
import { ShowPlanInfoComponent } from './plan/show-plan-info/show-plan-info.component';
import { AddEditPlanComponent } from './plan/add-edit-plan/add-edit-plan.component';
import { ShowRecipeInfoComponent } from './recipe/show-recipe-info/show-recipe-info.component';
import { AddEditComponent } from './add-edit/add-edit.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        MatDialogModule,

    ],
    declarations: [
        RegisterComponent,
        ProductComponent,
        AlertsComponent,
        ItemRecipeComponent,
        ItemRecipeAddComponent, 
        FilterPipe, ItemProductComponent, AssignClientItemComponent, PlanItemComponent, ShowPlanInfoComponent, AddEditPlanComponent, ShowRecipeInfoComponent, AddEditComponent,
    ],
    providers:[GlobalService],
    entryComponents: [],
    exports: [
        RegisterComponent, 
        ProductComponent, 
        AlertsComponent, 
        ItemRecipeAddComponent, 
        ItemRecipeComponent, 
        FilterPipe, 
        AssignClientItemComponent,
        PlanItemComponent,
        ],
})
export class ComponentsModule { }