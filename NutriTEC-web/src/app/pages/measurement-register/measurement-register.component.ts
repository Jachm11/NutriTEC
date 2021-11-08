import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { GlobalService } from 'src/app/services/global.service';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-measurement-register',
  templateUrl: './measurement-register.component.html',
  styleUrls: ['./measurement-register.component.css']
})
export class MeasurementRegisterComponent implements OnInit {

  musculo:number;
  grasa:number;
  cadera:number;
  peso:number;
  cintura:number;
  cuello:number;
  altura:number;


  date = new Date();

  constructor(private global : GlobalService, private apiService:ApiService) { }

  ngOnInit(): void {
  }


  onSubmit(){

    if(!this.musculo){
      this.global.transactionFailed("Ingrese su porcentaje de musculo actual");
      return;
    }

    if(!this.cadera){
      this.global.transactionFailed("Ingrese la medida de su cadera");
      return;
    }

    if(!this.peso){
      this.global.transactionFailed("Ingrese su peso actual");
      return;
    }

    if(!this.altura){
      this.global.transactionFailed("Ingrese su altura actual");
      return;
    }

    if(!this.cintura){
      this.global.transactionFailed("Ingrese la medida de su cintura");
      return;
    }

    if(!this.grasa){
      this.global.transactionFailed("Ingrese su porcentaje de grasa actual");
      return;
    }

    if(!this.cuello){
      this.global.transactionFailed("Ingrese su medida de cuello");
      return;
    }


    let measures = 
      {
        id_cliente: this.global.current_client.id,
        fecha: formatDate(new Date, 'yyyy-MM-dd', 'en-US'),
        porcentaje_musculo: this.musculo,
        porcentaje_grasa: this.grasa,
        cadera: this.cadera,
        peso: this.peso,
        altura: this.altura,
        cintura: this.cintura,
        cuello: this.cuello
      }


      console.log(measures);
      




    this.apiService.register_measures(measures).subscribe(() => {}, (err) => {

      console.log(err);
      if (err.statusText == "OK"){
        this.global.transactionSuccess("Medidas registradas exitosamente");
        this.setDefaultValues();

      }

    });



  }

  setDefaultValues(){

    this.musculo = null;
    this.cadera = null;
    this.peso = null;
    this.cintura = null;
    this.grasa = null;
    this.cuello = null;
  
  }

}
