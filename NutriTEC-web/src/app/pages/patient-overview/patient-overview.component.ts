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
export class PatientOverviewComponent implements OnInit {

  filterClient = '';


  clients = [];
  clients_emitter = new BehaviorSubject<any[]>(this.clients);
  show = true;

  constructor(private global:GlobalService, private apiService:ApiService,  private router : Router ) { }

  ngOnInit() : void {
    this.upload_clients();
  }


  upload_clients(){

    let body = {id_nutricionist: this.global.current_nutritionist.id}
    this.apiService.get_clients_by_nutritionist(body).subscribe((clients) =>{

      this.clients = clients;
      this.clients_emitter.next(this.clients);

    });

  }


  unassign_client(event){

  
    let body = {id_client: event.id}
    this.apiService.unassign_client(body).subscribe(()=>{

      this.global.transactionSuccess("Se desasoció el cliente");
      this.upload_clients();
      this.apiService.delete_chat(event.id);



    }, (err)=> {

      this.global.transactionFailed(err.error);

    })


  }

  openOverview(client){

    console.log(client)
    this.global.current_client = client
    this.router.navigateByUrl("patient-calendar")
    
  }

}
