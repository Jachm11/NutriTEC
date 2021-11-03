import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

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

  constructor(private global : GlobalService) { }

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

    if(!this.cintura){
      this.global.transactionFailed("Ingrese la medida de su cintura");
      return;
    }

    if(!this.grasa){
      this.global.transactionFailed("Ingrese su porcentaje de grasa actual");
      return;
    }

    this.global.transactionSuccess("Medidas registradas exitosamente");
    //Se realiza la consulta al API
    this.setDefaultValues();

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
