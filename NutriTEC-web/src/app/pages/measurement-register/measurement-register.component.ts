import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { GlobalService } from 'src/app/services/global.service';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-measurement-register',
  templateUrl: './measurement-register.component.html',
  styleUrls: ['./measurement-register.component.css']
})

/**
 * Pagina que muestra el registro de medidas
 */
export class MeasurementRegisterComponent implements OnInit {

  musculo:number;
  grasa:number;
  cadera:number;
  peso:number;
  cintura:number;
  cuello:number;
  altura:number;


  current_date:any;


  constructor(private global : GlobalService, private apiService:ApiService) { }

  ngOnInit(): void {


    this.current_date = formatDate(new Date, 'dd-MM-yyyy', 'en-US');
  }


  /**
   * Funcion que recoge la informacion ingresada por el usuario y realiza el llamado 
   * el API 
   * @returns 
   */
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


 
      
    this.apiService.register_measures(measures).subscribe(() => {

      this.global.transactionSuccess("Medidas registradas exitosamente");
      this.setDefaultValues();

    }, 
    (err) => {

      this.global.transactionFailed(err.error);
    });



  }

  /**
   * Funcion que reinicia los valores ingresados por el usuario
   */
  setDefaultValues(){

    this.musculo = null;
    this.cadera = null;
    this.peso = null;
    this.cintura = null;
    this.grasa = null;
    this.cuello = null;
    this.altura = null;
  
  }

}
