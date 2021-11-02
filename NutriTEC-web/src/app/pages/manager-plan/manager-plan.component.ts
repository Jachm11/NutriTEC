import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddEditComponent } from 'src/app/components/add-edit/add-edit.component';
import { ShowPlanInfoComponent } from 'src/app/components/plan/show-plan-info/show-plan-info.component';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-manager-plan',
  templateUrl: './manager-plan.component.html',
  styleUrls: ['./manager-plan.component.css']
})
export class ManagerPlanComponent implements OnInit {

  url:string;


  plans = [
    {
      nombre:"dieta keto",
      nutricionista:"Sebastian Mora Godinez",
      calorias:12122,
      desayuno: {

       productos: [
          {
            nombre:"manzana",
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
            nombre:"manzana",
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
            nombre:"manzana",
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

      }

    }
  ]

  constructor(private global:GlobalService, private dialog:MatDialog, private router:Router) {

    this.url = this.router.url;

   }

  ngOnInit(): void {
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

    this.plans.push(plan);
    this.global.transactionSuccess("Se agregó el plan exitosamente");
    this.global.cancel();

  }

  edit_plan(plan:any){

    this.plans = this.plans.filter(p => p.nombre !== plan.nombre);
    this.plans.push(plan);
    this.global.transactionSuccess("Se editó el plan exitosamente");
    this.global.cancel();

  }

  delete_plan(plan:any){

    this.plans = this.plans.filter(p => p.nombre !== plan.nombre);
    console.log("Se debe eliminar el plan");
  }

 


  

}
