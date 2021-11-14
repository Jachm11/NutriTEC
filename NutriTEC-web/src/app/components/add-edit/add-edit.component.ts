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

/**
 * Componente para crear o editar recetas o planes
 */
export class AddEditComponent implements OnInit {

  url:string;
  @Output() apply : EventEmitter<any> = new EventEmitter();
  filterProducts = '';
  filterRecipes = '';

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
  lunch = [];
  afternoon_snack = [];
  dinner = [];


  request = [];


  //Calendario
  date = "";
  id_plan: number;
  full_plan: any;
  name_consumo:string;
  ready_plan: boolean;
  added_products = [];
  current_recipes = [];
  disable = false;

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
          this.lunch = products.filter(pr => pr.tiempo_comida == 'Almuerzo');
          this.afternoon_snack  = products.filter(pr => pr.tiempo_comida == 'Merienda tarde');
          this.dinner = products.filter(pr => pr.tiempo_comida == 'Cena');

          this.selected_products = this.breakfast;

          this.update_total_kcal();
          this.update_product_list();

          
        })

      }

    }

    if(this.date != ""){

      //CONSUMO
      if(this.isConsume()){
        this.name_consumo = "Consumo de: "+ this.date;

        if(!this.isNutri()){

        this.apiService.get_recipes().subscribe((recetas)=>{

          this.current_recipes = recetas;
        

        })
      }


        this.apiService.get_one_consume_day(this.date).subscribe((prods)=>{
    
          prods.forEach(prod => {

            switch (prod.tiempo_comida) {
              case "Desayuno":
                this.selected_products.push(prod);  
                break;

              case "Merienda manana":
                this.morning_snack.push(prod);  
                break;
              
              case "Almuerzo":
                this.lunch.push(prod);  
                break;
              
              case "Merienda tarde":
                this.afternoon_snack.push(prod);  
                break;

              case "Cena":
                this.dinner.push(prod);  
                break;
            
              default:
                break;
            }
            
          });
          
        })


      }

      //PLAN
      else{

        this.apiService.get_plans_by_id(this.id_plan).subscribe((plan)=>{

          plan.forEach(plan_unico => {

            if (plan_unico.nombre == this.name_consumo){
              this.full_plan = plan_unico;
            }
            
          });
          this.ready_plan = true;          
         })
        
      }

    }
    

  }



  /**
   * Funcion que actualiza el tiempo de comida actual tal como lo selecciono el usuario 
   */
  update_time_food(){

    if(this.previous_time_food != this.current_time_food){
      if(this.previous_time_food == 'Desayuno'){
        this.breakfast = this.selected_products;
      }
      if(this.previous_time_food == 'Merienda manana'){
        this.morning_snack = this.selected_products;
      }
      if(this.previous_time_food == 'Almuerzo'){
        this.lunch = this.selected_products;
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
        this.selected_products= this.lunch;
      }
      if(this.current_time_food == 'Merienda tarde'){
        this.selected_products= this.afternoon_snack;
      }
      if(this.current_time_food == 'Cena'){
        this.selected_products= this.dinner;
      }
  
      this.update_product_list();
      this.updateNutritionalInfo();
      this.previous_time_food = this.current_time_food;
        
    }
   

  }



  /**
   * Funcion que agrega un producto a la lista de los productos seleccionados
   * @param product 
   */
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
    product.tiempo_comida = this.current_time_food;
    product.porciones = 1;
    product.cantidad_porciones = 1;
    this.selected_products.push(product);
    this.added_products.push(product);
    this.current_products = this.current_products.filter(ps => ps.descripcion !== product.descripcion);
    
  }

  add_recipe_to_selected_products(products:any[]){
    products.forEach(product => {

      let listed = false;
      this.selected_products.forEach(prod => {

        if (prod.descripcion == product.descripcion){
          listed = true;
        }
        
      });
      if(!listed){
        this.add_product_to_selected_products(product);
      }
    });
  }




  /**
   * Funcion que actualiza la porcion de uno de los productos que se encuentra 
   * en la lista de productos seleccionados
   * @param event 
   */
  update_porcion(event:any){
    this.selected_products.forEach(ps => {
      if(ps.descripcion === event.descripcion && ps.tiempo_comida === event.tiempo_comida){
        ps.cantidad_porciones = event.cantidad_porciones;
        console.log("Actualizado",ps.cantidad_porciones)
      }

    });
    if(this.url == '/manager-recipe'){

      if(this.global.isEditing()){

        let body = {id_recipe: this.global.current_recipe.id, id_producto:event.id, porciones: event.porciones};
        this.apiService.update_product_porcion_recipe(body).subscribe();  


      }
      this.updateNutritionalInfo();
    }

    if(this.url == '/daily-register' || this.url == '/patient-calendar'){
      this.updateNutritionalInfo();
    }
    if(this.url == '/manager-plan'){
      if(this.global.isEditing()){ 
        let body = {id_plan: this.global.current_plan.id, id_producto:event.id, tiempo_comida:this.current_time_food, porciones: event.porciones};
        this.apiService.update_product_porcion_plan(body).subscribe(()=>{
          console.log("Se actualizó exitosamente el producto");
        },(err) => console.log(err));    
      }
      this.update_total_kcal();
    }
  }




  /**
   * Funcion que elimina un producto de la lista de productos seleccionados y lo devuelve a la lista de productos disponibles 
   * @param product 
   */
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
    this.added_products = this.added_products.filter(added_P => {
      return added_P.id != product.id || added_P.tiempo_comida != product.tiempo_comida
    });
    this.current_products.push(product);
    this.updateNutritionalInfo();

  }






  /**
   * Funcion que calcula el total de las calorias a partir de los productos de la lista 
   * de productos seleccionados
   */
  update_total_kcal(){
    let current_total = 0;
    this.setDefaultInfoNutritionalValues();
    this.selected_products.forEach(ps =>{
      current_total += ps.energia + ps.porciones;
    });

    this.total_calorias = current_total;

  }


  /**
   * Funcion que calcula el total de la informacion nutricional de un plan a partir de los productos 
   * seleccionados
   */
  updateNutritionalInfo(){
    this.setDefaultInfoNutritionalValues();
    this.selected_products.forEach(ps => {
      this.total_proteinas     += Math.round(ps.proteina * ps.porciones);
      this.total_vitaminas     += Math.round(ps.vitamina * ps.porciones);
      this.total_calcio        += Math.round(ps.calcio * ps.porciones);
      this.total_hierro        += Math.round(ps.hierro * ps.porciones);
      this.total_energia       += Math.round(ps.energia * ps.porciones);
      this.total_grasa         += Math.round(ps.grasa * ps.porciones);
      this.total_sodio         += Math.round(ps.sodio * ps.porciones);
      this.total_carbohidratos += Math.round(ps.carbohidratos * ps.porciones);
    })

  }



  /**
   * Funcion que actualiza la lista de productos disponibles
   */
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


  /**
   * Funcion que se llama cuando se desea guardar los cambios realizados, ya sea crear o editar un plan o receta  
   * @returns 
   */
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
      if(this.current_time_food == "Almuerzo"){ this.lunch = this.selected_products};
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
      if(this.lunch.length == 0){
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
          this.apply.emit({name: this.name_plan, breakfast: this.breakfast, morning_snack: this.morning_snack, launch : this.lunch, afternoon_snack: this.morning_snack, dinner: this.dinner});

        }

        if(this.global.isEditing()){

          this.apply.emit({name: this.name_plan});

          
        }


      }

    
    }

    if(this.url == "/daily-register"){

      console.log(this.added_products);

      this.added_products.forEach(prod => {

        let body = {
          "id_cliente": this.global.current_client.id,
          "id_producto": prod.id,
          "tiempo_comida": prod.tiempo_comida,
          "fecha": this.date,
          "cantidad_porciones": prod.cantidad_porciones
        }
        console.log(body)
        this.apiService.post_consume(body).subscribe(()=>{

        })
        
      });

      if (this.global.isAdding()){

        let body = {
          title:"Consumo diario",
          start:this.date,
          groupId:"consumo",
          color : "#06D6A0"
        }
  
        this.apply.emit(body); 
 
      }
      
    }
    this.setDefaultValues();
    this.matDialog.closeAll();


   
  }



  /**
   * Funcion que se llama cuando el usuario cierra el dialog del componente 
   */
  cancel(){
    this.global.cancel();
    this.setDefaultValues();
    this.matDialog.closeAll();
  }




  /**
   * Funcion que reinicia los valores de las varaibles usadas a lo largo del componente
   */
  setDefaultValues(){
    this.selected_products = [];
    this.name_recipe = null;
    this.setDefaultInfoNutritionalValues();

  }


  /**
   * Funcion que reinicia los valores de la informacion de nutricional
   */
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


  /**
   * 
   * @returns 
   */
  isPlan(){

    if( (this.url == "/daily-register")  && (!this.global.isEditing() && !this.global.isAdding())){
      //console.log("consume")
      return true;
    }

    if (this.url == "/patient-calendar" && this.global.view_plan){
      return true
    }
    else{
      return false;
    }
  }

  /**
   * Funcion que verifica si se encuentra la vista de registro diario
   * @returns 
   */
  isConsume(){

    //console.log("url", this.url == "/daily-register", "Editando" , this.global.isEditing(),"Agregando",this.global.isAdding())
    if((this.url == "/daily-register")  && (this.global.isEditing() || this.global.isAdding())){
      //console.log("consume")
      return true;
    }
    if (this.url == "/patient-calendar" && !this.global.view_plan){
      return true
    }
    else{
      //console.log("not consume")
      return false;
    }
  }

  isNutri(){
    if (this.url == "/patient-calendar"){
      return true
    }
    return false
  }


  /**
   * Funcion que decide si se debe mostrar el biton cancelar
   * @returns 
   */
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
