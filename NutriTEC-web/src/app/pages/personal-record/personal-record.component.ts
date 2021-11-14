import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ApiService } from 'src/app/services/api.service';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-personal-record',
  templateUrl: './personal-record.component.html',
  styleUrls: ['./personal-record.component.css']
})
export class PersonalRecordComponent implements OnInit {

  measures: any;
  
  @ViewChild('pdfTable', {static: false}) pdfTable: ElementRef;

  plain_data = [];

  fechas: any;

  pesos_chart: any = [];
    pesos_data: any;

  medidas_chart: any = [];
    cintura_data: any;
    cadera_data: any;
    cuello_data: any;
    
  indices_chart: any = [];
    grasa_data: any;
    musculo_data: any;

  show_pesos: boolean = true;
  show_medidas: boolean = false;
  show_indices: boolean = false;


  ready_table = false;
  ready_medidas = false;

  to_date:any;
  from_date:any;


  constructor( private apiService: ApiService) {
    Chart.register(...registerables)
   }

  ngOnInit(): void {

    this.apiService.get_historial().subscribe((data)=>{
        console.log(data)

        this.plain_data = data;

        this.fechas = this.for_data(0);

        this.pesos_data = this.for_data(1);

        this.cintura_data = this.for_data(2);
        this.cadera_data = this.for_data(3);
        this.cuello_data = this.for_data(4);
            
        this.grasa_data = this.for_data(5);
        this.musculo_data = this.for_data(6);

        this.create_graphics();
        console.log(this.plain_data[1]);
        this.ready_table = true;
    })

    this.apiService.get_current_stats().subscribe((current_measures)=>{
        this.measures = current_measures;
        this.ready_medidas = true;
    });

  }


  search(){

    this.apiService.get_historial_by_dates(this.from_date, this.to_date).subscribe((data)=>{

        this.destroyCharts();
        
        this.plain_data = data;

        this.fechas = this.for_data(0);

        this.pesos_data = this.for_data(1);

        this.cintura_data = this.for_data(2);
        this.cadera_data = this.for_data(3);
        this.cuello_data = this.for_data(4);
            
        this.grasa_data = this.for_data(5);
        this.musculo_data = this.for_data(6);

        this.create_graphics();
        console.log(this.plain_data[1]);
        this.ready_table = true;
    }, (error)=>{

        console.log(error);
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

  for_data(i:number): number[] {
    let list = [];

    for (let item of this.plain_data) {
 
        let data : any;

        switch (i) {

            case 0:
                data = item.fecha;
                break;
            case 1:
                data = item.peso;
                break;
            case 2:
                data = item.cintura;
                break;
            case 3:
                data = item.cadera;
                break;
            case 4:
                data = item.cuello;
                break;
            case 5:
                data = item.porcentaje_grasa;
                break;
            case 6:
                data = item.porcentaje_musculo;
                break;
        
            default:
                break;
        }
            
        list.push(data);
    }

    return list;
}

    create_graphics(){

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


    destroyCharts(){

        this.medidas_chart.destroy();
        this.indices_chart.destroy();
        this.pesos_chart.destroy();
    }



    /**
   * Funcion que crea y descarga el PDF de la factura
   */
   public downloadAsPDF() {

    const doc = new jsPDF('p', 'pt', [1000, 1000]);

    const specialElementHandlers = {
      '#editor': function (element, renderer) {
        return true;
      }
    };

    const pdfTable = this.pdfTable.nativeElement;

    doc.fromHTML(pdfTable.innerHTML, 15, 15, {
      width: 500,
      'elementHandlers': specialElementHandlers
    });

    doc.save('Historial NutriTEC.pdf');

  }
   

}
