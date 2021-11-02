import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GlobalService } from 'src/app/services/global.service';
import { ShowPlanInfoComponent } from '../show-plan-info/show-plan-info.component';

@Component({
  selector: 'app-plan-item',
  templateUrl: './plan-item.component.html',
  styleUrls: ['./plan-item.component.css']
})
export class PlanItemComponent implements OnInit {

  @Input() plan:any;
  @Output() edit_plan: EventEmitter<any> = new EventEmitter();
  @Output() delete_plan: EventEmitter<any> = new EventEmitter();
  
  constructor(private dialog:MatDialog, private global:GlobalService) { }

  ngOnInit(): void {
  }


  delete(){
    this.delete_plan.emit(this.plan);
  }


  edit(){
    this.global.current_plan = this.plan;
    this.edit_plan.emit(this.plan);

  }

  showBreakfastInfo(){

    const dialogRef = this.dialog.open(ShowPlanInfoComponent, {
      data : { products : this.plan.desayuno.productos, time_food : "Desayuno"}
    });

  }

  showMorningSnackInfo(){
    this.dialog.open(ShowPlanInfoComponent), {
      data : { products : this.plan.merienda_manana.productos, time_food : "Merienda mañana"}
    }
  }

  showLaunchInfo(){
    this.dialog.open(ShowPlanInfoComponent, {
      data : { products : this.plan.almuerzo.productos, time_food : "Almuerzo"}

    })
  }

  showAfternoonSnackInfo(){
    this.dialog.open(ShowPlanInfoComponent, {
      data: { products : this.plan.merienda_tarde.productos, time_food : "Merienda tarde"}
    })
  }

  showDinnerInfo(){
    const dialogRef = this.dialog.open(ShowPlanInfoComponent, {
      data : { products : this.plan.cena.productos, time_food : "Cena"}
    })



  }

}
