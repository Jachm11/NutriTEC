import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ItemRecipeAddComponent } from '../item-recipe-add/item-recipe-add.component';
import { GlobalService } from 'src/app/services/global.service';
import { ShowRecipeInfoComponent } from '../show-recipe-info/show-recipe-info.component';
@Component({
  selector: 'app-item-recipe',
  templateUrl: './item-recipe.component.html',
  styleUrls: ['./item-recipe.component.css']
})
export class ItemRecipeComponent implements OnInit {

  @Input() recipe:any;
  @Output() delete_recipe: EventEmitter<any> = new EventEmitter();
  @Output() edit_recipe : EventEmitter<any> = new EventEmitter();

  constructor(private dialog:MatDialog, private global:GlobalService) { }

  ngOnInit(): void {

    console.log(this.recipe);
  }


  edit(){

    this.global.current_recipe = this.recipe;
    this.edit_recipe.emit();
    
  }

  delete(){
    this.delete_recipe.emit(this.recipe);


  }

  show_recipe_info(){
    this.dialog.open(ShowRecipeInfoComponent);
  }

}
