import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { GlobalService } from 'src/app/services/global.service';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-patient-overview',
  templateUrl: './patient-overview.component.html',
  styleUrls: ['./patient-overview.component.css']
})

/**
 * Pagina que los clientes asociados a un nutricionista
 */
export class PatientOverviewComponent implements OnInit {

  filterClient = '';


  clients = [];
  clients_emitter = new BehaviorSubject<any[]>(this.clients);
  show = true;

  constructor(private global:GlobalService, private apiService:ApiService,  private router : Router ) { }

  ngOnInit() : void {
    this.upload_clients();
  }



  /**
   * Funcion que obtiene los pacientes asociados al nutricionista que 
   * se encuentra en sesion
   */
  upload_clients(){

    let body = {id_nutricionist: this.global.current_nutritionist.id}
    this.apiService.get_clients_by_nutritionist(body).subscribe((clients) =>{

      this.clients = clients;
      this.clients_emitter.next(this.clients);

    });

  }



  /**
   * Funcion que desasocia un paciente del nutricionista que se encuentra en sesion
   * @param event 
   */
  unassign_client(event){

    let body = {id_client: event.id}
    this.apiService.unassign_client(body).subscribe(()=>{

      this.global.transactionSuccess("Se desasoció el cliente");
      this.upload_clients();
      this.apiService.delete_chat(event.id).subscribe(()=>{
        console.log("Se elimino el chat")
      });



    }, (err)=> {

      this.global.transactionFailed(err.error);

    })


  }

  openOverview(client){

    this.global.current_client = client
    this.router.navigateByUrl("patient-calendar")
    
  }

  openAssing(client){

    this.global.current_client = client
    this.router.navigateByUrl("assign-plan")
    
  }

}
