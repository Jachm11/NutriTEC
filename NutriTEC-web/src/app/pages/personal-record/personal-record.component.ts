import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-personal-record',
  templateUrl: './personal-record.component.html',
  styleUrls: ['./personal-record.component.css']
})
export class PersonalRecordComponent implements OnInit {

  musculo:number;
  grasa:number;
  cadera:number;
  peso:number;
  cintura:number;
  cuello:number;

  fechas: any = ["18-11-2011", "2-12-2011", "25-12-2011", "16-1-2012"];

  pesos_chart: any = [];
    pesos_data: any = [54 , 55 , 60 , 54];

  medidas_chart: any = [];
    cintura_data: any = [20 , 21 , 23 , 19 ];
    cadera_data: any = [30, 31 , 35 , 32];
    cuello_data: any = [12, 13 , 15 , 13];
    
  indices_chart: any = [];
    grasa_data: any = [3, 4 , 5 , 2];
    musculo_data: any = [16, 15 , 15 , 16];

  show_pesos: boolean = true;
  show_medidas: boolean = false;
  show_indices: boolean = false;


  constructor() {
    Chart.register(...registerables)
   }

  ngOnInit(): void {

    this.pesos_chart = new Chart('pesos_canvas', {
      type: 'line',
      data: {
          labels: this.fechas,
          datasets: [{
              label: 'Peso',
              data: this.pesos_data,
              backgroundColor: 
                'rgba(255, 99, 132, 0.2)',
            
            borderColor: 
                'rgba(255, 99, 132, 1)',
            borderWidth: 1
              
            }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });


    this.medidas_chart = new Chart('medidas_canvas', {
        type: 'line',
        data: {
            labels: this.fechas,
            datasets: [{
                label: 'Medida de cintura',
                data: this.cintura_data,
                backgroundColor: 
                    'rgba(255, 99, 132, 0.2)'
                ,
                borderColor: 
                    'rgba(255, 99, 132, 1)'
                ,
                borderWidth: 1
            },
            {
                label: 'Medida de cadera',
                data: this.cadera_data,
                backgroundColor: 
                    'rgba(255, 9, 132, 0.2)'
                ,
                borderColor: 
                    'rgba(255, 9, 132, 1)'
                ,
                borderWidth: 1
            },
            {
                label: 'Medida de cuello',
                data: this.cuello_data,
                backgroundColor: 
                    'rgba(255, 99, 13, 0.2)'
                ,
                borderColor: 
                    'rgba(255, 99, 13, 1)'
                ,
                borderWidth: 1
            }
            
        ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    this.indices_chart = new Chart('indices_canvas', {
        type: 'line',
        data: {
            labels: this.fechas,
            datasets: [{
                label: 'Porcentaje de grasa',
                data: this.grasa_data,
                backgroundColor: 
                    'rgba(25, 99, 132, 0.2)'
                ,
                borderColor: 
                    'rgba(25, 99, 132, 1)'
                ,
                borderWidth: 1
            },
            {
                label: 'Porcentaje de músculo',
                data: this.musculo_data,
                backgroundColor: 
                    'rgba(255, 99, 132, 0.2)'
                ,
                borderColor: 
                    'rgba(255, 99, 132, 1)'
                ,
                borderWidth: 1
            }
        ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });


  }



  toggle_graph(num){

    switch (num) {
        case 0:

            this.show_pesos = true;
            this.show_medidas = false;
            this.show_indices = false;
            
            break;

        case 1:

            this.show_pesos = false;
            this.show_medidas = true;
            this.show_indices = false;
            
            break;

        case 2:

            this.show_pesos = false;
            this.show_medidas = false;
            this.show_indices = true;

            
            break;
    
        default:
            break;
    }

  }
   

}
