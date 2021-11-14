import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { GlobalService } from 'src/app/services/global.service';  
import { ShowPlanInfoComponent } from '../show-plan-info/show-plan-info.component';

@Component({
  selector: 'app-plan-item',
  templateUrl: './plan-item.component.html',
  styleUrls: ['./plan-item.component.css']
})

/**
 * Componente que muestra el item de un producto
 */
export class PlanItemComponent implements OnInit {

  @Input() plan:any;
  @Output() edit_plan: EventEmitter<any> = new EventEmitter();
  @Output() delete_plan: EventEmitter<any> = new EventEmitter();


  products = new BehaviorSubject<any[]>([]);

  name_nutritionist:string;
  


  constructor(private dialog:MatDialog, private global:GlobalService, private apiService:ApiService) { }

  ngOnInit(): void {

    
    this.name_nutritionist = `${this.global.current_nutritionist.primer_nombre}  ${this.global.current_nutritionist.primer_apellido}` 

    this.get_products();


  }


  /**
   * Funcion que realiza el llamado al API para obtener los productos del plan dado
   */
  get_products(){
    this.apiService.get_product_by_plan(this.plan.id).subscribe((products) => {

      this.products.next(products);
  
    });
  }


  /**
   * Funcion que se llama cuando el usuario desea elimiar un plan
   */
  delete(){
    this.delete_plan.emit(this.plan);
  }


  /**
   * Funcion que se llama para aplicar los cambios realizados a la receta
   */
  edit(){
    this.global.current_plan = this.plan;
    this.edit_plan.emit(this.plan);

  }


  /**
   * Funcion que obtiene los productos del desayuno y abre un dialog para mostrarlos
   */
  showBreakfastInfo(){

    this.dialog.open(ShowPlanInfoComponent, {
      data : { products : this.products.getValue().filter(pr => pr.tiempo_comida == "Desayuno"), time_food:"Desayuno"}
    });

  }


  
  /**
   * Funcion que obtiene los productos de la merienda de la mañana y abre un dialog para mostrarlos
   */
  showMorningSnackInfo(){
    this.dialog.open(ShowPlanInfoComponent, {
      data : { products : this.products.getValue().filter(pr => pr.tiempo_comida == "Merienda manana"), time_food:"Merienda mañana"}
    });
  }

  
  /**
   * Funcion que obtiene los productos del almuerzo y abre un dialog para mostrarlos
   */
  showLaunchInfo(){
    this.dialog.open(ShowPlanInfoComponent, {
      data : { products : this.products.getValue().filter(pr => pr.tiempo_comida == "Almuerzo"), time_food:"Almuerzo"}

    })
  }


  
  /**
   * Funcion que obtiene los productos de la merienda de la tarde y abre un dialog para mostrarlos
   */
  showAfternoonSnackInfo(){
    this.dialog.open(ShowPlanInfoComponent, {
      data: { products : this.products.getValue().filter(pr => pr.tiempo_comida == "Merienda tarde"), time_food:"Merienda tarde"}
    })
  }


  
  /**
   * Funcion que obtiene los productos de la cena y abre un dialog para mostrarlos
   */
  showDinnerInfo(){
    const dialogRef = this.dialog.open(ShowPlanInfoComponent, {
      data : { products : this.products.getValue().filter(pr => pr.tiempo_comida == "Cena"), time_food:"Cena"}
    })



  }

}
