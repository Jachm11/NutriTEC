import { Injectable } from '@angular/core';

import { Observable, Subject, BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

/**
 * Servicio globlal para control de variables de ejecucion, funciones multicomponente y control de interfaz
 */
export class GlobalService {




  //success_alert:boolean = false;
  //danger_alert:boolean  = false;
  alert_message:string = "";

  private success_alert: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private danger_alert: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isSuccessAlert: Observable<boolean> = this.success_alert.asObservable();
  public isDangerAlert: Observable<boolean> = this.danger_alert.asObservable();


  hideAlert(){
    console.log("Entra");
    this.success_alert.next(false);
    this.danger_alert.next(false);

  }

  transactionSuccess(message:string){

    this.success_alert.next(true);
    this.danger_alert.next(false);
    this.alert_message = message;



  }

  transactionFail(message:string){
    this.success_alert.next(false);
    this.danger_alert.next(true);
    this.alert_message = message;

  }





}