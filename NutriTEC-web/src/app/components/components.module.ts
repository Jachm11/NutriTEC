import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { RegisterComponent } from './register/register.component';
import { ProductComponent } from './product/product.component';
import { AlertsComponent } from './alerts/alerts.component';
import { GlobalService } from '../services/global.service';
import { ItemRecipeComponent } from './recipe/item-recipe/item-recipe.component';
import { FilterPipe } from '../pipe/filter.pipe';
import { ItemProductComponent } from './recipe/item-product/item-product.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AssignClientItemComponent } from './assign-client-item/assign-client-item.component';
import { FilterClientsPipe } from '../pipe/filter-clients.pipe';
import { PlanItemComponent } from './plan/plan-item/plan-item.component';
import { ShowPlanInfoComponent } from './plan/show-plan-info/show-plan-info.component';
import { ShowRecipeInfoComponent } from './recipe/show-recipe-info/show-recipe-info.component';
import { AddEditComponent } from './add-edit/add-edit.component';
import { ApiService } from '../services/api.service';
import { FichaRowHolderComponent } from './ficha-row-holder/ficha-row-holder.component';
import { FichaComponent } from './ficha/ficha.component';
import { ChatComponent } from './chat/chat.component';
import { RecipeItemComponent } from './recipe-item/recipe-item.component';
import { FilterRecipesPipe } from '../pipe/filter-recipes.filter';

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
        FilterPipe, 
        ItemProductComponent, 
        AssignClientItemComponent, 
        PlanItemComponent, 
        ShowPlanInfoComponent,
        ShowRecipeInfoComponent,
        AddEditComponent,
        FichaRowHolderComponent,
        FichaComponent,
        ChatComponent,
        RecipeItemComponent,
        FilterRecipesPipe
    ],
    entryComponents: [],
    exports: [
        RegisterComponent, 
        ProductComponent, 
        AlertsComponent,  
        ItemRecipeComponent, 
        FilterPipe, 
        AssignClientItemComponent,
        PlanItemComponent,
        AddEditComponent,
        FichaRowHolderComponent
        ],
})
export class ComponentsModule { }