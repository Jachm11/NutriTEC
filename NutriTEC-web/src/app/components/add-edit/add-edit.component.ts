import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {

  url:string;
  @Output() apply : EventEmitter<any> = new EventEmitter();
  filterProducts = '';

  selected_products = [];


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

  current_products = this.products;


  //RECETAS
  name_recipe:string;

  total_proteinas:number = 0;
  total_vitaminas:number = 0;
  total_calcio:number = 0;
  total_hierro:number = 0;
  total_energia:number = 0 ;
  total_grasa:number = 0;
  total_sodio:number = 0;
  total_carbohidratos:number = 0;


  //PLANES
  name_plan:string;
  nutritionist:string;
  total_calorias:number  = 0;
  current_time_food:string = 'breakfast';
  previous_time_food:string = 'breakfast';

  breakfast = [];
  morning_snack = [];
  launch = [];
  afternoon_snack = [];
  dinner = [];

  constructor(private router:Router, private global:GlobalService, private matDialog:MatDialog) {
    
    this.url = this.router.url;
  
   }

  ngOnInit(): void {

    console.log(this.url);
    if(this.url == '/manager-recipe'){

      if(this.global.isEditing()){
        this.name_recipe = this.global.current_recipe.nombre;
        this.selected_products = this.global.current_recipe.productos;
        this.update_product_list();
        this.updateNutritionalInfo();
      }
    }

    if(this.url == '/manager-plan'){

      if(this.global.isEditing()){

        this.name_plan = this.global.current_plan.nombre;
        this.nutritionist = this.global.current_plan.nutritionista;
        this.total_calorias = this.global.current_plan.calorias;

      }

    }
  }


  update_time_food(){

    if(this.previous_time_food != this.current_time_food){
      if(this.previous_time_food == 'breakfast'){
        this.breakfast = this.selected_products;
      }
  
      if(this.previous_time_food == 'morning_snack'){
        this.morning_snack = this.selected_products;
      }

      if(this.previous_time_food == 'launch'){
        this.launch = this.selected_products;
      }
      
      if(this.previous_time_food == 'afternoon_snack'){
        this.afternoon_snack = this.selected_products;
      }
      if(this.previous_time_food == 'dinner'){
        this.dinner = this.selected_products;
      }
  
  
      if(this.current_time_food == 'breakfast'){
        this.selected_products = this.breakfast;
      }
      if(this.current_time_food == 'morning_snack'){
        this.selected_products= this.morning_snack;
      }
      if(this.current_time_food == 'launch'){
        this.selected_products= this.launch;
      }
      if(this.current_time_food == 'afternoon_snack'){
        this.selected_products= this.afternoon_snack;
      }
      if(this.current_time_food == 'dinner'){
        this.selected_products= this.dinner;
      }
  
      this.update_product_list();
      this.previous_time_food = this.current_time_food;
        
    }
   

  }

  add_product_to_selected_products(producto:any){

    console.log(producto);
    this.selected_products.push({producto: producto, porcion: null});
    this.current_products = this.current_products.filter(ps => ps.nombre !== producto.nombre);
    
  }
  update_porcion(event:any){
    this.selected_products.forEach(ps => {
      if(ps.producto.nombre === event.producto.nombre){
        ps.porcion = event.porcion;
      }

    });

    if(this.url == '/manager-recipe'){
      this.updateNutritionalInfo();
    }

    if(this.url == '/manager-plan'){
      this.update_total_kcal();

    }


  }

  delete_product(producto:any){
    this.selected_products =  this.selected_products.filter(ps => ps.producto.nombre !== producto.nombre);
    this.current_products.push(producto);
    this.updateNutritionalInfo();


  }


  update_total_kcal(){
    this.setDefaultInfoNutritionalValues();
    this.selected_products.forEach(ps =>{
      this.total_calorias += ps.producto.energia + ps.porcion;
    })

  }


  updateNutritionalInfo(){
    this.setDefaultInfoNutritionalValues();
    this.selected_products.forEach(ps => {
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

  update_product_list(){
    this.current_products = this.products.filter(pr => {
      for(let ps of this.selected_products){
        if(pr.nombre === ps.producto.nombre){
          console.log
          return false;
        }
      }
      return true;
    });

  }


  apply_changes(){

    if(this.url === "/manager-recipe"){

      if(!this.name_recipe){
        this.global.transactionFailed("Ingrese un nombre a la receta");
        return;
      }
  
      if(this.selected_products.length < 2){
        this.global.transactionFailed("La receta debe tener al menos dos productos");
        return;
      }
  
      this.apply.emit({nombre: this.name_recipe, nutricionista: 'Sebastian', calorias : 1232, productos : this.selected_products});
      this.setDefaultValues();
  
    }

    if(this.url === "/manager-plan"){

      if(!this.name_plan){
        this.global.transactionFailed("Ingrese un nombre al plan");
        return;
      }

      this.apply.emit("Aqui se ingresa el plan");

    }




    this.matDialog.closeAll();


   
  }



  cancel(){
    this.global.cancel();
    this.setDefaultValues();
    this.matDialog.closeAll();
  }


  setDefaultValues(){
    this.selected_products = [];
    this.name_recipe = null;
    this.setDefaultInfoNutritionalValues();

  }


  setDefaultInfoNutritionalValues(){
    this.total_calcio = 0;
    this.total_proteinas = 0;
    this.total_vitaminas = 0;
    this.total_calcio = 0;
    this.total_hierro = 0;
    this.total_energia = 0;
    this.total_grasa = 0;
    this.total_sodio = 0;
    this.total_carbohidratos = 0;
  }


  isConsume(){

    console.log("url", this.url == "/daily-register", "Editando" , this.global.isEditing(),"Agregando",this.global.isAdding())
    if(this.url == "/daily-register" && (this.global.isEditing() || this.global.isAdding())){
      //console.log("consume")
      return true;
    }
    else{
      //console.log("not consume")
      return false;
    }
  }

}
