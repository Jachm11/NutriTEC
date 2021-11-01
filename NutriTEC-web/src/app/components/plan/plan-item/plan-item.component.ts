import { Component, OnInit, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditPlanComponent } from '../add-edit-plan/add-edit-plan.component';
import { ShowPlanInfoComponent } from '../show-plan-info/show-plan-info.component';

@Component({
  selector: 'app-plan-item',
  templateUrl: './plan-item.component.html',
  styleUrls: ['./plan-item.component.css']
})
export class PlanItemComponent implements OnInit {

  @Input() plan:any;
  
  constructor(private dialog:MatDialog) { }

  ngOnInit(): void {
  }


  openEditDialog(){

    const dialogRef = this.dialog.open(AddEditPlanComponent);


  }



  showBreakfastInfo(){

    const dialogRef = this.dialog.open(ShowPlanInfoComponent, {
      data : { products : this.plan.desayuno.productos, time_food : "Desayuno"}
    });


    const subscribeDialog = dialogRef.componentInstance.emitter.subscribe((data) => {
      console.log(data);
    })


    dialogRef.afterClosed().subscribe(result =>{
      subscribeDialog.unsubscribe();
    })

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
