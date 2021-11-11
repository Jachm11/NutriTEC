import { Component, OnInit } from '@angular/core';
import { Consume_event, Ficha, Plan_event } from 'src/interfaces/ficha';

import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import { GlobalService } from 'src/app/services/global.service';
import { MatDialog } from '@angular/material/dialog';
import { FichaComponent } from 'src/app/components/ficha/ficha.component';
import { Product_Consumption } from 'src/interfaces/product';
import { AddEditComponent } from 'src/app/components/add-edit/add-edit.component';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-daily-register',
  templateUrl: './daily-register.component.html',
  styleUrls: ['./daily-register.component.css']
})
export class DailyRegisterComponent implements OnInit {

  fichas: Ficha[];
  rows: number;
  ready: boolean;

  plan_events: any[] = [];
  consume_events: any[] = [];
  
  has_nutri: boolean;

  nutricionista: string;

  public events: any[];
  public options: any;
  ready_consume = false;
  ready_plans = false;

  constructor(private global: GlobalService, private dialog: MatDialog, private apiService: ApiService) { }

  ngOnInit(): void {

    this.options = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      defaultDate: new Date(),
      locale: esLocale,
      themeSystem: 'bootstrap4',
      header: {
        left: 'prev,next',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      dateClick: (e) => {
        console.log(e)
        this.onClickDate();
      },
      eventClick: (e) => {
        console.log(e.event.id)
        this.onClickEvent(e.event);
      }
    }

    this.apiService.get_client().subscribe((client)=>{ 
      this.global.full_client = client;
      if(client.id_nutricionista != null && client.id_nutricionista != undefined ){
        this.has_nutri = true;
        this.populate_calendar();
      }

    })


  }



  /**
  * Funcion que se llama una vez que el proceso asincronico de recupercion de
  * datos ha terminado 
  */
  update() {

    if (this.ready_consume && this.ready_plans) {

      this.events = this.plan_events.concat(this.consume_events);
      this.ready = true;

      //this.addEvent();

    }




  }


  populate_calendar(){

    this.apiService.get_client_consume_dates().subscribe((dates) => {
      console.log(dates);
      dates.forEach(date => {

        let event: Consume_event = {
          title: "Consumo diario",
          start: date.fecha,
          groupId: "consumo",
          color: "#000000"
        };
        this.consume_events.push(event);
      });
      this.ready_consume = true;
      this.update();
    })

    if (this.has_nutri) {
      this.apiService.get_client_plan_dates().subscribe((dates) => {
        console.log(dates);
        dates.forEach(date => {

          let event: Plan_event = {
            title: date.nombre,
            start: date.fecha,
            groupId: "plan",
            color: "#5218fa",
            id: date.id_plan
          }
          this.plan_events.push(event);
        });
        this.ready_plans = true;
        this.update();
      })
    }


  }



  onClickEvent(event) {

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

  onClickDate() {

    this.global.startAdding();
    this.open_plan_dialog();

  }

  open_plan_dialog() {

    const dialogRef = this.dialog.open(AddEditComponent);
    const subscribeDialog = dialogRef.componentInstance.apply.subscribe((consumed) => {
      this.edit_consumed(consumed);
    })

    dialogRef.afterClosed().subscribe(result => {
      subscribeDialog.unsubscribe();
      this.global.cancel();
    })

  }

  edit_consumed(cosumed: Product_Consumption[]) {

    window.location.reload();

  }



  addEvent() {
    this.events = this.events.concat( // creates a new array!
      { title: 'event 2', date: '2021-12-08' }
    );
  }




}
