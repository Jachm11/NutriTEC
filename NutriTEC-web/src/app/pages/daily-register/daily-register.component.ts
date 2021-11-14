import { Component, OnInit } from '@angular/core';
import { Ficha } from 'src/interfaces/ficha';

import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import { GlobalService } from 'src/app/services/global.service';
import { MatDialog } from '@angular/material/dialog';
import { FichaComponent } from 'src/app/components/ficha/ficha.component';
import { Product_Consumption } from 'src/interfaces/product';
import { AddEditComponent } from 'src/app/components/add-edit/add-edit.component';

@Component({
  selector: 'app-daily-register',
  templateUrl: './daily-register.component.html',
  styleUrls: ['./daily-register.component.css']
})

/**
 * Pagina para el registro diario de consumo
 */
export class DailyRegisterComponent implements OnInit {

  fichas: Ficha[];
  rows: number;
  ready: boolean;

  public events: any[];
  public options: any;
 
  constructor(private global:GlobalService, private dialog:MatDialog ) { }



  ngOnInit(): void { 

    this.options = {
      plugins : [dayGridPlugin,timeGridPlugin,interactionPlugin],
      defaultDate : new Date(),
      locale: esLocale,
      themeSystem: 'bootstrap4',
      header:{
        left: 'prev,next',
        center:'title',
        right:'dayGridMonth,timeGridWeek,timeGridDay'
      },
      dateClick: (e) =>  {
        console.log(e)
        this.onClickDate();
      },
      eventClick: (e) =>  {
        console.log(e.event.id)
        this.onClickEvent(e.event);
      }
    }

    this.events = [
      {
        title:"Plan de jose",
        start: new Date(),
        groupId: "plan",
        id:12
      },
      {
        title:"Consumo",
        start: new Date(),
        groupId: "consumo",
        color : "#000000",
        id:13
      },
      {
        title:"Plan de jose",
        start: "2021-11-09",
        groupId: "plan",
        id:15
      }
    ]


    this.update();
  }

   /**
   * Funcion que se llama una vez que el proceso asincronico de recupercion de
   * datos ha terminado 
   */
    update(){
      this.ready = true;
      this.addEvent();
  
    }



  onClickEvent(event){

    let tipo = event.groupId;

    console.log(tipo);

    switch (tipo) {
      case "plan":
        
        break;

      case "consumo":
        this.global.startEditing();
        break;
    
      default:
        break;
    }

    this.open_plan_dialog();


  }

  onClickDate(){

    this.global.startAdding();
    this.open_plan_dialog();

  }

  open_plan_dialog(){

    const dialogRef = this.dialog.open(AddEditComponent);
    const subscribeDialog = dialogRef.componentInstance.apply.subscribe((consumed) => {
      this.edit_consumed(consumed);
    })

    dialogRef.afterClosed().subscribe(result =>{
      subscribeDialog.unsubscribe();
      this.global.cancel();
    })

  }

  edit_consumed(cosumed:Product_Consumption[]){

    window.location.reload();

  }



  addEvent() {
    this.events = this.events.concat( // creates a new array!
      { title: 'event 2', date: '2021-12-08' }
    );
  }


  

}
