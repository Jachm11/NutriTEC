import { Component, OnInit } from '@angular/core';
import { Consume_event, Ficha, Plan_event } from 'src/interfaces/ficha';

import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import { GlobalService } from 'src/app/services/global.service';
import { MatDialog } from '@angular/material/dialog';
import { AddEditComponent } from 'src/app/components/add-edit/add-edit.component';
import { ApiService } from 'src/app/services/api.service';
import { ChatComponent } from 'src/app/components/chat/chat.component';
import { PlanItemComponent } from 'src/app/components/plan/plan-item/plan-item.component';


@Component({
  selector: 'app-patient-calendar',
  templateUrl: './patient-calendar.component.html',
  styleUrls: ['./patient-calendar.component.css']
})
export class PatientCalendarComponent implements OnInit {

  plan_events: any[] = [];
  consume_events: any[] = [];

  cliente: string;

  public events: any[];
  public options: any;
  ready_consume = false;
  ready_plans = false;
  ready = false;


  constructor(private global: GlobalService, private dialog: MatDialog, private apiService: ApiService) { }

  ngOnInit(): void {

    this.cliente = this.global.current_client;

    this.options = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      defaultDate: '2021-10-18',
      locale: esLocale,
      themeSystem: 'bootstrap4',
      header: {
        left: 'prev,next',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      eventClick: (e) => {
        let str = e.event.start.toString()
        let yourDate = str[11] + str[12] + str[13] + str[14] + '-' + Months[str[4] + str[5] + str[6]] + '-' + str[8] + str[9];
        this.onClickEvent(e.event, yourDate);
      }
    }

    this.populate_calendar();

  }


  /**
  * Funcion que se llama una vez que el proceso asincronico de recupercion de
  * datos ha terminado 
  */
  update() {

    if (this.ready_consume && this.ready_plans) {

      this.events = this.plan_events.concat(this.consume_events);
      console.log(this.events);
      this.ready = true;

    }


  }

  populate_calendar() {

    this.apiService.get_client_consume_dates().subscribe((dates) => {
      dates.forEach(date => {

        let event: Consume_event = {
          title: "Consumo diario",
          start: date.fecha,
          groupId: "consumo",
          color: "#06D6A0"
        };
        this.consume_events.push(event);
      });
      this.ready_consume = true;
      this.update();
    })

    this.apiService.get_client_plan_dates().subscribe((dates) => {
      console.log(dates);
      dates.forEach(date => {

        let event: Plan_event = {
          title: date.nombre,
          start: date.fecha,
          groupId: "plan",
          color: "#508AA8",
          id: date.id_plan
        }
        this.plan_events.push(event);
      });
      this.ready_plans = true;
      this.update();
    })


  }

  onClickEvent(event, date) {

    let tipo = event.groupId;

    console.log(tipo);

    switch (tipo) {
      case "plan":
        this.global.view_plan = true;
        this.open_plan_item_dialog(event.id);
        break;

      case "consumo":
        this.global.startEditing();
        this.open_plan_dialog(date, event.id, event.title);
        break;

      default:
        break;
    }

 

  }


  open_plan_item_dialog(id_plan:number){

    this.apiService.get_plan_by_id(id_plan).subscribe((plan)=>{

      const dialogRef = this.dialog.open(PlanItemComponent);

      dialogRef.componentInstance.plan = plan;


    });

  }



  open_plan_dialog(date: string, id_plan: number, name: string) {

    const dialogRef = this.dialog.open(AddEditComponent);
    dialogRef.componentInstance.date = date;
    this.global.current_plan_id = id_plan;
    dialogRef.componentInstance.id_plan = id_plan;
    dialogRef.componentInstance.name_consumo = name;
    dialogRef.componentInstance.disable = true;
    const subscribeDialog = dialogRef.componentInstance.apply.subscribe((consumed) => {
      this.edit_consumed(consumed);
    })
    


  
    

    dialogRef.afterClosed().subscribe(result => {
      subscribeDialog.unsubscribe();
      this.global.cancel();
      this.global.view_plan = false;
    })

  }

  edit_consumed(consumed: Consume_event) {

    this.events = this.events.concat(consumed)


  }

  addEvent(datee) {
    this.events = this.events.concat( // creates a new array!
      { title: 'event 2', date: datee }
    );
  }

  openChat(){

    const dialogRef = this.dialog.open(ChatComponent);
    dialogRef.componentInstance.client = this.cliente;


  }


}

enum Months {
  "Jan" = "01",
  "Feb" = "02",
  "Mar" = "03",
  "Apr" = "04",
  "May" = "05",
  "Jun" = "06",
  "Jul" = "07",
  "Aug" = "08",
  "Sep" = "09",
  "Oct" = "10",
  "Nov" = "11",
  "Dec" = "12",
}


