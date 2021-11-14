import { Injectable } from '@angular/core';

import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Client } from 'src/interfaces/client';
import { isThisTypeNode } from 'typescript';


@Injectable({
  providedIn: 'root'
})

/**
 * Servicio globlal para control de variables de ejecucion, funciones multicomponente y control de interfaz
 */
export class GlobalService {


  alert_message:string = "";
  private success_alert: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private danger_alert: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private editing: boolean = false;
  private adding: boolean = false;

  current_recipe:any;
  current_plan:any;

  full_client:any;

  current_client:any = {
    "id": 1,
    "id_nutricionista": 1,
    "id_conversacion": -1,
    "primer_nombre": "Sebastian",
    "segundo_nombre": "",
    "primer_apellido": "Mora",
    "segundo_apellido": "Godinez",
    "email": "sebas@gmail.com",
    "clave": "4D6993543CD9203435AA92560D5AABA1",
    "fecha_nacimiento": "21/06/1999",
    "edad": 22,
    "meta_consumo_diario": 100,
    "pais": "Costa Rica",
    "estatus": "ACTIVO"
};


  current_nutritionist:any = {
    "id": 1,
    "id_usuario": 5,
    "codigo_nutricionista": 1234,
    "estatus": "ACTIVO",
    "primer_nombre": "Juan",
    "segundo_nombre": "Pedro",
    "primer_apellido": "Perico",
    "segundo_apellido": "Gonzales",
    "email": "pedro@gmail.com",
    "clave": "FD001EA34060B68520EB05BE55C7B7F5",
    "cedula": "502340221",
    "fecha_nacimiento": "11/02/1980",
    "edad": 41,
    "direccion": "Heredia",
    "foto": "profile.png",
    "tarjeta": "123-412-124",
    "tipo_cobro": "Semanal"
};


  current_admin:any = {
    "id": 1,
    "id_usuario": 1,
    "primer_nombre": "Carlos",
    "segundo_nombre": "Adrian",
    "primer_apellido": "Araya",
    "segundo_apellido": "Ramirez",
    "email": "adrian@gmail.com",
    "clave": "1234"
  };
  current_plan_id: number;
  view_plan: boolean;

  hideAlert(){
    this.success_alert.next(false);
    this.danger_alert.next(false);

  }

  transactionSuccess(message:string){

    this.success_alert.next(true);
    this.danger_alert.next(false);
    this.alert_message = message;

    setTimeout(()=> {
      this.success_alert.next(false);
      this.danger_alert.next(false);
    },2000);



  }

  transactionFailed(message:string){
    this.success_alert.next(false);
    this.danger_alert.next(true);
    this.alert_message = message;

    setTimeout(()=> {
      this.success_alert.next(false);
      this.danger_alert.next(false);
    },2000);


  }


  is_success_alert(){
    return this.success_alert.asObservable();
  }

  is_danger_alert(){
    return this.danger_alert.asObservable();
  }



  startEditing(){
    this.editing = true;
    this.adding = false;

  }

  startAdding(){
    this.adding = true;
    this.editing = false;;
  }

  isEditing(){
    return this.editing;
  }

  isAdding(){
    return this.adding;
  }

  cancel(){
    this.adding = false;
    this.editing = false;
  }





}