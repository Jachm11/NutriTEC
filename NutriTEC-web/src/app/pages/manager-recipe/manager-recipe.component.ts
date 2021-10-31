import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ItemRecipeAddComponent } from 'src/app/components/recipe/item-recipe-add/item-recipe-add.component';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-manager-recipe',
  templateUrl: './manager-recipe.component.html',
  styleUrls: ['./manager-recipe.component.css']
})
export class ManagerRecipeComponent implements OnInit {



  recipes = [

    {
      nombre: "receta1",
      productos: [

        {
          producto: {
            nombre:"manzana con uva",
            descripcion:"Fruta con gran cantidad de nutrientes",
            porcion:"1 pieza",
            barcode:"121232323232",
            proteina: 300,
            vitamina: 300,
            calcio:200,
            hierro:130,
            energia:200,
            grasa:220,
            sodio:100,
            carbohidratos:200
          },
          porcion: 3
        }

       

      ]
    },
    {
      nombre: "receta2",
      productos: [

        {
          producto: {
            nombre:"manzana con uva",
            descripcion:"Fruta con gran cantidad de nutrientes",
            porcion:"1 pieza",
            barcode:"121232323232",
            proteina: 300,
            vitamina: 300,
            calcio:200,
            hierro:130,
            energia:200,
            grasa:220,
            sodio:100,
            carbohidratos:200
          },
          porcion: 3
        }

       

      ]
    },
    {
      nombre: "receta3",
      productos: [

        {
          producto: {
            nombre:"manzana con uva",
            descripcion:"Fruta con gran cantidad de nutrientes",
            porcion:"1 pieza",
            barcode:"121232323232",
            proteina: 300,
            vitamina: 300,
            calcio:200,
            hierro:130,
            energia:200,
            grasa:220,
            sodio:100,
            carbohidratos:200
          },
          porcion: 3
        }

       

      ]
    }

  ]

  constructor(private global:GlobalService,private matDialog:MatDialog) { }

  ngOnInit(): void {
  }


  openDialog(){

    this.matDialog.open(ItemRecipeAddComponent);

  }

  delete_recipe(recipe:any){
    //Se realiza la consulta al API
    this.recipes = this.recipes.filter(r => r.nombre !== recipe.nombre);

  }


  addRecipe(){
    
    this.global.startAdding();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.matDialog.open(ItemRecipeAddComponent, dialogConfig);

  }



}
