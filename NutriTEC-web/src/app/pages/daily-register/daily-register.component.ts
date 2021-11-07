import { Component, OnInit } from '@angular/core';
import { Ficha } from 'src/interfaces/ficha';

@Component({
  selector: 'app-daily-register',
  templateUrl: './daily-register.component.html',
  styleUrls: ['./daily-register.component.css']
})
export class DailyRegisterComponent implements OnInit {

  fichas: Ficha[];
  rows: number;
  ready: boolean;
 
  constructor() { }

  ngOnInit(): void { 

    this.fichas = 
    [
      {
        fecha: "11/7/21",
        nombre_plan:  "Plan para Jose viernes",
        productos_plan: [	
          {
            producto:"pasta",
            tiempo_comida: "Almuerzo",
            porcion: 2
          },
          {
            producto:"carne",
            tiempo_comida: "Cena",
            porcion: 2
          }
        ],
        total_plan: 
        {
          sodio:213,
          grasa:23,
          energia:455,
          hierro:23,
          calcio:76,
          proteina:323,
          vitamina:23,
          carbohidratos:4500
        },
        productos_consumo:[
          {
            producto:"pesto",
            tiempo_comida: "Almuerzo",
            porcion: 2
          },
          {
            producto:"lomito",
            tiempo_comida: "Cena",
            porcion: 2
          }
        ],
        total_consumo:
        {
          sodio:213,
          grasa:23,
          energia:455,
          hierro:23,
          calcio:76,
          proteina:323,
          vitamina:23,
          carbohidratos:4500
        }
      },
      {
        fecha: "12/7/21",
        nombre_plan:  "Plan para Jose sabado",
        productos_plan: [	
          {
            producto:"arrroz",
            tiempo_comida: "Almuerzo",
            porcion: 2
          },
          {
            producto:"pescado",
            tiempo_comida: "Cena",
            porcion: 2
          }
        ],
        total_plan: 
        {
          sodio:213,
          grasa:23,
          energia:455,
          hierro:23,
          calcio:76,
          proteina:323,
          vitamina:23,
          carbohidratos:4500
        },
        productos_consumo:[
          {
            producto:"cantones",
            tiempo_comida: "Almuerzo",
            porcion: 2
          },
          {
            producto:"galleta",
            tiempo_comida: "merienda",
            porcion: 2
          },
          {
            producto:"salmon",
            tiempo_comida: "Cena",
            porcion: 2
          }
        ],
        total_consumo:
        {
          sodio:213,
          grasa:23,
          energia:455,
          hierro:23,
          calcio:76,
          proteina:323,
          vitamina:23,
          carbohidratos:4500
        }
      }
    ]

    this.update();
  }



   /**
   * Funcion que se llama una vez que el proceso asincronico de recupercion de
   * datos ha terminado 
   */
    update(){

      this.rows = Math.floor(this.fichas.length/7) + 1 ;
      this.ready = true;
  
    }

}
