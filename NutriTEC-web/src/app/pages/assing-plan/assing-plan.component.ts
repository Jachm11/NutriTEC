import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import { GlobalService } from 'src/app/services/global.service';
import { ApiService } from 'src/app/services/api.service';



@Component({
  selector: 'app-assing-plan',
  templateUrl: './assing-plan.component.html',
  styleUrls: ['./assing-plan.component.css']
})

/**
 * Pagina para asignar un plan a un paciente
 */
export class AssingPlanComponent implements OnInit {

  plan_dates: any[] = [];

  current_cliente_id: string;
  current_plan: any;
  plan_selected = false;
  plans: any[];

  ready = false;

  public events: any[] = [];
  public options: any;


  constructor(private global: GlobalService, private apiService: ApiService) { }

  ngOnInit(): void {

    this.current_cliente_id = this.global.current_client.id;

    this.apiService.get_plans_by_id(this.global.current_nutritionist.id).subscribe((planes)=>{
      this.plans = planes;
      this.ready = true;
      console.log(planes);
    })

    this.options = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      defaultDate: '2021-10-18',
      locale: esLocale,
      themeSystem: 'bootstrap4',
      header: {
        left: 'prev,next',
        center: 'title',
        right: 'dayGridMonth'
      },
      dateClick: (e) => {
        let str = e.date.toString()
        let yourDate = str[11] + str[12] + str[13] + str[14] + '-' + Months[str[4] + str[5] + str[6]] + '-' + str[8] + str[9];
        this.onClickDate(yourDate);
      }
    }

  }

  onClickDate(new_date: string) {


     if (this.current_plan == undefined || this.current_plan == null) {
       this.global.transactionFailed("Seleccione un plan")
       return
    }


    let already_selected = false;

    this.plan_dates.forEach(date => {

      if (new_date === date.fecha) {
        already_selected = true;
      }

    });

    if (!already_selected) {

      let current_plan_nombre = "";

      this.plans.forEach(plan => {

        if(this.current_plan == plan.id){
          current_plan_nombre = plan.nombre
        }
        
      });

      this.events = this.events.concat(
        { title: current_plan_nombre, date: new_date}
      );
      let body = {
        "id_plan": this.current_plan,
        "id_cliente": this.current_cliente_id,
        "fecha": new_date
      }
      this.plan_dates.push(body)
    }
    else{
      this.plan_dates = this.plan_dates.filter(date => date.fecha != new_date);
      this.events = this.events.filter(event => event.date != new_date );
    }

    
  }

  submit() {

    console.log(this.plan_dates);

    this.plan_dates.forEach(date => {

      this.apiService.post_plan_client(date).subscribe(()=>{
        this.global.transactionSuccess("Plan asignado exitosamente")
      },(error)=>{
        this.global.transactionFailed(error);
      })
      
    });

    this.plan_dates = [];
    this.events = [];
    


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


