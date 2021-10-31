import { Component, OnInit, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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

  showBreakfastInfo(){

    const dialogRef = this.dialog.open(ShowPlanInfoComponent, {
      data : { products : this.plan.desayuno.products, time_food : "Desayuno"}
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
      data : { products : this.plan.merienda_manana.products, time_food : "Merienda mañana"}
    }
  }

  showLaunchInfo(){
    this.dialog.open(ShowPlanInfoComponent, {
      data : { products : this.plan.almuerzo.products, time_food : "Almuerzo"}

    })
  }

  showAfternoonSnackInfo(){
    this.dialog.open(ShowPlanInfoComponent, {
      data: { products : this.plan.merienda_tarde.products, time_food : "Merienda tarde"}
    })
  }

  showDinnerInfo(){
    const dialogRef = this.dialog.open(ShowPlanInfoComponent, {
      data : { products : this.plan.cena.products, time_food : "Cena"}
    })



  }

}
