import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AddEditComponent } from 'src/app/components/add-edit/add-edit.component';
import { ShowPlanInfoComponent } from 'src/app/components/plan/show-plan-info/show-plan-info.component';
import { GlobalService } from 'src/app/services/global.service';
import { Plan } from 'src/interfaces/plan';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-manager-plan',
  templateUrl: './manager-plan.component.html',
  styleUrls: ['./manager-plan.component.css']
})
export class ManagerPlanComponent implements OnInit {

  url:string;

  plans = new BehaviorSubject<Plan[]>([]);

  constructor(private global:GlobalService, private dialog:MatDialog, private router:Router, private apiService:ApiService) {

    this.url = this.router.url;

   }

  ngOnInit(): void {

    this.get_plans();

 


  }



  get_plans(){

    this.apiService.get_plans_by_id(this.global.current_nutritionist.id).subscribe((plans) => {

      this.plans.next(plans);
      console.log(plans);



    }, (error) => {

      console.log(error);
    })

  }


  open_add_dialog(){

    this.global.startAdding();

    const dialogRef = this.dialog.open(AddEditComponent);
    const subscribeDialog = dialogRef.componentInstance.apply.subscribe((plan) => {
      this.add_plan(plan);
    })

    dialogRef.afterClosed().subscribe(result =>{
      subscribeDialog.unsubscribe();
    })

  }


  open_edit_dialog(){

    this.global.startEditing(); 
    const dialogRef = this.dialog.open(AddEditComponent);

    const subscribeDialog = dialogRef.componentInstance.apply.subscribe((plan) => {
      this.edit_plan(plan);
    })

    dialogRef.afterClosed().subscribe(result =>{
      subscribeDialog.unsubscribe();
    })

    
  }



  add_plan(plan:any){

    this.apiService.post_plan({name: plan.name, id_nutricionista: this.global.current_nutritionist.id}).subscribe((new_plan) => {
      
      
      console.log(new_plan);
      
      plan.breakfast.forEach(pr => {

        this.apiService.add_product_to_plan({id_producto:pr.id, id_plan:new_plan.id, tiempo_comida:"Desayuno", porciones:pr.porciones}).subscribe();
      });

      plan.morning_snack.forEach(pr => {
        this.apiService.add_product_to_plan({id_producto:pr.id, id_plan:new_plan.id, tiempo_comida:"Merienda manana", porciones:pr.porciones}).subscribe();
   
      });

      plan.launch.forEach(pr => {
        this.apiService.add_product_to_plan({id_producto:pr.id, id_plan:new_plan.id, tiempo_comida:"Almuerzo", porciones:pr.porciones}).subscribe();
      });

      plan.afternoon_snack.forEach(pr => {
        this.apiService.add_product_to_plan({id_producto:pr.id, id_plan:new_plan.id, tiempo_comida:"Merienda tarde", porciones:pr.porciones}).subscribe();
      });
      plan.dinner.forEach(pr => {
        this.apiService.add_product_to_plan({id_producto:pr.id, id_plan:new_plan.id, tiempo_comida:"Cena", porciones:pr.porciones}).subscribe();
      });


      this.get_plans();

    }, (err)=> {

      this.global.transactionFailed(err.error);
      

    });
 
  }


  delete_plan(plan:any){

    console.log(plan);
    this.apiService.delete_plan(plan.id).subscribe(() => {
      this.global.transactionSuccess("Se ha eliminado exitosamente");
      this.get_plans();


    }, (err) =>{

    })

  }

  edit_plan(plan:any){
    let body = {id_recipe: this.global.current_plan.id, id_client:this.global.current_client.id, name:plan.name}
    this.apiService.update_recipe(body).subscribe(()=>{

      this.global.transactionSuccess("Se ha actualizado el plan correctamente")
      this.get_plans();

    }, (err)=> {

      this.global.transactionSuccess(err.error);

    })

  }

 


  

}
