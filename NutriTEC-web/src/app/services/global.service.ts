import { Injectable } from '@angular/core';

import { Observable, Subject, BehaviorSubject } from 'rxjs';
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
  public isSuccessAlert: Observable<boolean> = this.success_alert.asObservable();
  public isDangerAlert: Observable<boolean> = this.danger_alert.asObservable();


  private editing: boolean = false;
  private adding: boolean = false;

  current_recipe:any;


  hideAlert(){
    this.success_alert.next(false);
    this.danger_alert.next(false);

  }

  transactionSuccess(message:string){

    this.success_alert.next(true);
    this.danger_alert.next(false);
    this.alert_message = message;



  }

  transactionFailed(message:string){
    this.success_alert.next(false);
    this.danger_alert.next(true);
    this.alert_message = message;

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