import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { retry } from 'rxjs-compat/operator/retry';
import { GlobalService } from 'src/app/services/global.service';;



@Component({
  selector: 'app-item-recipe-add',
  templateUrl: './item-recipe-add.component.html',
  styleUrls: ['./item-recipe-add.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemRecipeAddComponent implements OnInit {

  url:string;
  @Output() apply : EventEmitter<any> = new EventEmitter();
  name_recipe:string;
  filterProducts = '';

  products_selected = [];


  products = [

    {
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

    {
      nombre:"uvas",
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
      nombre:"carne",
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
      nombre:"pollo",
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
      nombre:"arroz",
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
      nombre:"frijoles",
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

    if(this.global.isEditing()){
      this.name_recipe = this.global.current_recipe.nombre;
      this.products_selected = this.global.current_recipe.productos;
      this.products = this.products.filter(pr => {
        for(let ps of this.products_selected){
          if(pr.nombre === ps.producto.nombre){
            return false;
          }
        }
        return true;
      });
      this.updateNutritionalInfo();
    }
  }

  addProductRecipe(producto:any){
    this.products_selected.push({producto: producto, porcion: null});
    this.products = this.products.filter(ps => ps.nombre !== producto.nombre);

  }

  update_porcion(event:any){

    this.products_selected.forEach(ps => {

      if(ps.producto.nombre === event.producto.nombre){
        ps.porcion = event.porcion;
      }

    });
    this.updateNutritionalInfo();


  }
  delete_product(producto:any){
    this.products_selected =  this.products_selected.filter(ps => ps.producto.nombre !== producto.nombre);
    this.products.push(producto);
    this.updateNutritionalInfo();


  }


  updateNutritionalInfo(){

    this.setDefaultInfoNutritionalValues();

    this.products_selected.forEach(ps => {

      this.total_proteinas += ps.producto.proteina * ps.porcion;
      this.total_vitaminas += ps.producto.vitamina * ps.porcion;
      this.total_calcio += ps.producto.calcio * ps.porcion;
      this.total_hierro += ps.producto.hierro * ps.porcion;
      this.total_energia += ps.producto.energia * ps.porcion;
      this.total_grasa += ps.producto.grasa * ps.porcion;
      this.total_sodio += ps.producto.sodio * ps.porcion;
      this.total_carbohidratos += ps.producto.carbohidratos * ps.porcion;
    })

  }


  apply_changes(){

    if(!this.name_recipe){
      this.global.transactionFailed("Ingrese un nombre a la receta");
      return;
    }

    if(this.products_selected.length < 2){
      this.global.transactionFailed("La receta debe tener al menos dos productos");
      return;
    }

    this.apply.emit({nombre: this.name_recipe, nutricionista: 'Sebastian', calorias : 1232, productos : this.products_selected});
    this.setDefaultValues();
    this.matDialog.closeAll();
   
  }



  cancel(){
    this.global.cancel();
    this.setDefaultValues();
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
