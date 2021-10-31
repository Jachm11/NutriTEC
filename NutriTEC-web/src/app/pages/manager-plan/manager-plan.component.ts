import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ShowPlanInfoComponent } from 'src/app/components/plan/show-plan-info/show-plan-info.component';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-manager-plan',
  templateUrl: './manager-plan.component.html',
  styleUrls: ['./manager-plan.component.css']
})
export class ManagerPlanComponent implements OnInit {


  plans = [
    {
      nombre:"dieta keto",
      nutricionista:"Sebastian Mora Godinez",
      calorias:12122,
      desayuno: {

       productos: [
          {
            nombre:"Manzana",
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
            nombre:"Manzana",
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
            nombre:"Manzana",
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

  constructor(private global:GlobalService, private dialog:MatDialog) { }

  ngOnInit(): void {
  }

}
