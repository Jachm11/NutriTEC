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

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        MatDialogModule
    ],
    declarations: [
        RegisterComponent,
        ProductComponent,
        AlertsComponent,
        ItemRecipeComponent,
        ItemRecipeAddComponent, 
        FilterPipe, ItemProductComponent,
    ],
    providers:[GlobalService],
    entryComponents: [],
    exports: [RegisterComponent, ProductComponent, AlertsComponent, ItemRecipeAddComponent, ItemRecipeComponent, FilterPipe],
})
export class ComponentsModule { }