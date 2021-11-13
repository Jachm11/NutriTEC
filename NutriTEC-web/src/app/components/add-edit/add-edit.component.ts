import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
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
  products = [];
  current_products = []; //new BehaviorSubject<any[]>(this.products);


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
  total_calorias = 0;
  current_time_food:string = 'Desayuno';
  previous_time_food:string = 'Desayuno';

  breakfast = [];
  morning_snack = [];
  launch = [];
  afternoon_snack = [];
  dinner = [];


  request = [];

  constructor(private router:Router, private global:GlobalService, private matDialog:MatDialog, private apiService:ApiService) {
    
    this.url = this.router.url;
  
   }

  ngOnInit(): void {

    this.apiService.get_products_approved().subscribe((products) => {
      this.products = products;
      this.current_products = products;

    });

    if(this.url == '/manager-recipe'){

      if(this.global.isEditing()){
        this.name_recipe = this.global.current_recipe.nombre;
        this.selected_products = this.global.current_recipe.productos;
  
        this.apiService.get_product_by_recipe(this.global.current_recipe.id).subscribe((products) =>{
          this.selected_products = products;
          this.update_product_list();
          this.updateNutritionalInfo();

        });
    
      }
    }

    if(this.url == '/manager-plan'){

      if(this.global.isEditing()){

        this.name_plan = this.global.current_plan.nombre;
        this.nutritionist = this.global.current_plan.nutritionista;
        this.total_calorias = this.global.current_plan.calorias;

        this.apiService.get_product_by_plan(this.global.current_plan.id).subscribe((products) => {
          this.breakfast = products.filter(pr => pr.tiempo_comida == 'Desayuno');
          this.morning_snack = products.filter(pr => pr.tiempo_comida == 'Merienda manana');
          this.launch = products.filter(pr => pr.tiempo_comida == 'Almuerzo');
          this.afternoon_snack  = products.filter(pr => pr.tiempo_comida == 'Merienda tarde');
          this.dinner = products.filter(pr => pr.tiempo_comida == 'Cena');

          this.selected_products = this.breakfast;

          this.update_total_kcal();
          this.update_product_list();

          
        })

      }

    }
  }


  update_time_food(){

    if(this.previous_time_food != this.current_time_food){
      if(this.previous_time_food == 'Desayuno'){
        this.breakfast = this.selected_products;
      }
      if(this.previous_time_food == 'Merienda manana'){
        this.morning_snack = this.selected_products;
      }
      if(this.previous_time_food == 'Almuerzo'){
        this.launch = this.selected_products;
      }  
      if(this.previous_time_food == 'Merienda tarde'){
        this.afternoon_snack = this.selected_products;
      }
      if(this.previous_time_food == 'Cena'){
        this.dinner = this.selected_products;
      }
  
  
      if(this.current_time_food == 'Desayuno'){
        this.selected_products = this.breakfast;
      }
      if(this.current_time_food == 'Merienda manana'){
        this.selected_products= this.morning_snack;
      }
      if(this.current_time_food == 'Almuerzo'){
        this.selected_products= this.launch;
      }
      if(this.current_time_food == 'Merienda tarde'){
        this.selected_products= this.afternoon_snack;
      }
      if(this.current_time_food == 'Cena'){
        this.selected_products= this.dinner;
      }
  
      this.update_product_list();
      this.previous_time_food = this.current_time_food;
        
    }
   

  }

  add_product_to_selected_products(product:any){

    if(this.url == '/manager-plan'){
      if(this.global.isEditing()){
        let body = {id_producto: product.id, id_plan:this.global.current_plan.id, tiempo_comida:this.current_time_food, porciones: 0};
        this.apiService.add_product_to_plan(body).subscribe();

      }

    }


    if(this.url == '/manager-recipe'){
      if(this.global.isEditing()){
        let body = {id_product: product.id, id_recipe: this.global.current_recipe.id, porciones : 0};
        this.apiService.add_product_to_recipe(body).subscribe();
      }

    }
    product.porciones = 0;
    this.selected_products.push(product);
    this.current_products = this.current_products.filter(ps => ps.descripcion !== product.descripcion);
    
  }



  update_porcion(event:any){
    this.selected_products.forEach(ps => {
      if(ps.descripcion === event.descripcion){
        ps.porciones = event.porciones;
      }

    });
    if(this.url == '/manager-recipe'){

      if(this.global.isEditing()){

        let body = {id_recipe: this.global.current_recipe.id, id_producto:event.id, porciones: event.porciones};
        this.apiService.update_product_porcion_recipe(body).subscribe();  


      }
      this.updateNutritionalInfo();
    }
    if(this.url == '/manager-plan'){
      if(this.global.isEditing()){ 
        let body = {id_plan: this.global.current_plan.id, id_producto:event.id, tiempo_comida:this.current_time_food, porciones: event.porciones};
        this.apiService.update_product_porcion_plan(body).subscribe();    
      }
      this.update_total_kcal();
    }
  }


  delete_product(product:any){


    if(this.url == '/manager-plan'){  
      if(this.global.isEditing()){
        let body = {id_plan: this.global.current_plan.id, id_producto: product.id, tiempo_comida:this.current_time_food};
        this.apiService.delete_product_from_plan(body).subscribe(()=> {});
      }
    }

    if(this.url == '/manager-recipe'){
      if(this.global.isEditing()){
        let body = {id_recipe: this.global.current_recipe.id, id_product: product.id}
        this.apiService.delete_product_from_recipe(body).subscribe();
      }
    }  
    this.selected_products =  this.selected_products.filter(ps => ps.descripcion !== product.descripcion);
    this.current_products.push(product);
    this.updateNutritionalInfo();

  }






  update_total_kcal(){
    let current_total = 0;
    this.setDefaultInfoNutritionalValues();
    this.selected_products.forEach(ps =>{
      current_total += ps.energia + ps.porciones;
    });

    this.total_calorias = current_total;

  }


  updateNutritionalInfo(){
    this.setDefaultInfoNutritionalValues();
    this.selected_products.forEach(ps => {
      this.total_proteinas += ps.proteina * ps.porciones;
      this.total_vitaminas += ps.vitamina * ps.porciones;
      this.total_calcio += ps.calcio * ps.porciones;
      this.total_hierro += ps.hierro * ps.porciones;
      this.total_energia += ps.energia * ps.porciones;
      this.total_grasa += ps.grasa * ps.porciones;
      this.total_sodio += ps.sodio * ps.porciones;
      this.total_carbohidratos += ps.carbohidratos * ps.porciones;
    })

  }

  update_product_list(){
    
    this.current_products = this.products.filter(pr => {
      for(let ps of this.selected_products){


        if(pr.descripcion == ps.descripcion){
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
      else {

        if(this.global.isAdding()){
          let body = {name: this.name_recipe, products : this.selected_products};
          this.apply.emit(body);
        }


        if(this.global.isEditing()){
          let body = {name:this.name_recipe};
          this.apply.emit(body);


        }

      
      }

  
    }

    if(this.url === "/manager-plan"){

      if(this.current_time_food == "Desayuno"){ this.breakfast = this.selected_products};
      if(this.current_time_food == "Merienda manana"){ this.morning_snack = this.selected_products};
      if(this.current_time_food == "Almuerzo"){ this.launch = this.selected_products};
      if(this.current_time_food == "Merienda tarde"){ this.afternoon_snack = this.selected_products};
      if(this.current_time_food == "Cena"){ this.dinner = this.selected_products};


      if(!this.name_plan){
        this.global.transactionFailed("Ingrese un nombre al plan");
        return;
      }
      if(this.breakfast.length == 0){
        this.global.transactionFailed("Debe ingresar productos para el desayuno");
        return; 
      }
      if(this.morning_snack.length == 0){
        this.global.transactionFailed("Debe ingresar productos para la merienda de la manaña");
        return;
      }
      if(this.launch.length == 0){
        this.global.transactionFailed("Debe ingresar productos para el almuerzo");
        return;
      }
      if(this.afternoon_snack.length == 0){
        this.global.transactionFailed("Debe ingresar productos para la merienda de la tardeee");
        return;
      }
      if(this.dinner.length == 0){
        this.global.transactionFailed("Debe ingresar productos para la merienda de la cena");
        return;
      }

      else {

  
        if(this.global.isAdding()){
          this.apply.emit({name: this.name_plan, breakfast: this.breakfast, morning_snack: this.morning_snack, launch : this.launch, afternoon_snack: this.morning_snack, dinner: this.dinner});

        }

        if(this.global.isEditing()){

          this.apply.emit({name: this.name_plan});

          
        }


      }

    
    }
    this.setDefaultValues();
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

    //console.log("url", this.url == "/daily-register", "Editando" , this.global.isEditing(),"Agregando",this.global.isAdding())
    if(this.url == "/daily-register" && (this.global.isEditing() || this.global.isAdding())){
      //console.log("consume")
      return true;
    }
    else{
      //console.log("not consume")
      return false;
    }
  }

  showCancelButton(){

    if(this.url == '/manager-recipe' && this.global.isAdding()){
      return true;
    }

    if(this.url == '/manager-plan' && this.global.isAdding()){
      return true;
    }

    return false;
    



  }

}
