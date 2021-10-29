import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { textChangeRangeIsUnchanged } from 'typescript';



@Component({
  selector: 'app-item-recipe-add',
  templateUrl: './item-recipe-add.component.html',
  styleUrls: ['./item-recipe-add.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemRecipeAddComponent implements OnInit {


  url:string;
  name_recipe:string;
  filterProducts = '';

  products_selected = [];


  products = [

    {
      name:"manzana con uva",
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

    {
      name:"uvas",
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

    {
      name:"carne",
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

    {
      name:"pollo",
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

    {
      name:"arroz",
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

    {
      name:"frijoles",
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
    }

  ]



  total_proteinas:number = 0;
  total_vitaminas:number = 0;
  total_calcio:number = 0;
  total_hierro:number = 0;
  total_energia:number = 0 ;
  total_grasa:number = 0;
  total_sodio:number = 0;
  total_carbohidratos:number = 0;


  constructor(private router:Router, private global:GlobalService, private matDialog:MatDialog) {

    this.url = router.url;
   }

  ngOnInit(): void {

    console.log(this.global.isEditing());
    if(this.global.isEditing()){


      this.name_recipe = this.global.current_recipe.name;
      this.products_selected = this.global.current_recipe.products;
      this.updateNutritionalInfo();

    }

  
  }



  addProductRecipe(product:any){

    this.products_selected.push({product: product, porcion: null});

    this.products = this.products.filter(ps => ps.name !== product.name);

  }


  update_porcion(event:any){

    this.products_selected.forEach(ps => {

      if(ps.product.name === event.product.name){
        ps.porcion = event.porcion;
        

      }

    });

    this.updateNutritionalInfo();

    
  }

  delete_product(product:any){

    this.products_selected =  this.products_selected.filter(ps => ps.product.name !== product.name);
    this.products.push(product);
    this.updateNutritionalInfo();


  }


  updateNutritionalInfo(){

    this.setDefaultInfoNutritionalValues();

    this.products_selected.forEach(ps => {

      this.total_proteinas += ps.product.proteina * ps.porcion;
      this.total_vitaminas += ps.product.vitamina * ps.porcion;
      this.total_calcio += ps.product.calcio * ps.porcion;
      this.total_hierro += ps.product.hierro * ps.porcion;
      this.total_energia += ps.product.energia * ps.porcion;
      this.total_grasa += ps.product.grasa * ps.porcion;
      this.total_sodio += ps.product.sodio * ps.porcion;
      this.total_carbohidratos += ps.product.carbohidratos * ps.porcion;
    })

  }


  apply(){

    if(this.global.isEditing){
      //Aplica los cambios realizados 

    }

    else if (this.global.isAdding){
      
      //Se agrega una nueva receta
    }


    this.global.cancel();
    this.setDefaultValues();
    this.matDialog.closeAll();

    
  }

  cancel(){
    this.global.cancel();
    this.setDefaultValues();
    console.log(this.products_selected);
    this.matDialog.closeAll();
  }


  setDefaultValues(){
    this.products_selected = [];
    this.name_recipe = null;
    this.setDefaultInfoNutritionalValues();

  }


  setDefaultInfoNutritionalValues(){
    this.total_proteinas = 0;
    this.total_vitaminas = 0;
    this.total_calcio = 0;
    this.total_hierro = 0;
    this.total_energia = 0;
    this.total_grasa = 0;
    this.total_sodio = 0;
    this.total_carbohidratos = 0;
  }
}
