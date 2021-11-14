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
export class PlanItemComponent implements OnInit {

  @Input() plan:any;
  @Input() url: string;
  @Output() edit_plan: EventEmitter<any> = new EventEmitter();
  @Output() delete_plan: EventEmitter<any> = new EventEmitter();


  products = new BehaviorSubject<any[]>([]);

  name_nutritionist:string;
  


  constructor(private dialog:MatDialog, private global:GlobalService, private apiService:ApiService) { }

  ngOnInit(): void {

    
    this.name_nutritionist = `${this.global.current_nutritionist.primer_nombre}  ${this.global.current_nutritionist.primer_apellido}` 

    this.get_products();


  }

  get_products(){
    this.apiService.get_product_by_plan(this.plan.id).subscribe((products) => {

      this.products.next(products);
  
    });
  }


  delete(){
    this.delete_plan.emit(this.plan);
  }


  edit(){
    this.global.current_plan = this.plan;
    this.edit_plan.emit(this.plan);

  }

  showBreakfastInfo(){

    this.dialog.open(ShowPlanInfoComponent, {
      data : { products : this.products.getValue().filter(pr => pr.tiempo_comida == "Desayuno"), time_food:"Desayuno"}
    });

  }

  showMorningSnackInfo(){
    this.dialog.open(ShowPlanInfoComponent, {
      data : { products : this.products.getValue().filter(pr => pr.tiempo_comida == "Merienda manana"), time_food:"Merienda mañana"}
    });
  }

  showLaunchInfo(){
    this.dialog.open(ShowPlanInfoComponent, {
      data : { products : this.products.getValue().filter(pr => pr.tiempo_comida == "Almuerzo"), time_food:"Almuerzo"}

    })
  }

  showAfternoonSnackInfo(){
    this.dialog.open(ShowPlanInfoComponent, {
      data: { products : this.products.getValue().filter(pr => pr.tiempo_comida == "Merienda tarde"), time_food:"Merienda tarde"}
    })
  }

  showDinnerInfo(){
    const dialogRef = this.dialog.open(ShowPlanInfoComponent, {
      data : { products : this.products.getValue().filter(pr => pr.tiempo_comida == "Cena"), time_food:"Cena"}
    })



  }

}
