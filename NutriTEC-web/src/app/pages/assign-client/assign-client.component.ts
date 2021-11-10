import { Component, OnInit, ChangeDetectionStrategy, NgZone } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { GlobalService } from 'src/app/services/global.service';
import { Subscription } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Client } from 'src/interfaces/client';

@Component({
  selector: 'app-assign-client',
  templateUrl: './assign-client.component.html',
  styleUrls: ['./assign-client.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssignClientComponent implements OnInit {

  filterClient = '';


  clients = [];
  clients_emitter = new BehaviorSubject<any[]>(this.clients);
  show = true;

  constructor(private global:GlobalService, private apiService:ApiService, private ngZone : NgZone) { }

  ngOnInit() : void {
    this.upload_clients();
  }


  upload_clients(){
    this.apiService.get_clients().subscribe((clients) =>{

      this.clients = clients;
      this.clients_emitter.next(this.clients);

    });

  }


  assign_client(client:any){
    this.apiService.assign_client(client.id, this.global.current_nutrionist.id).subscribe(()=>
    {
      this.global.transactionSuccess("Cliente asignado exitosamente");
      this.upload_clients();

      
    });


  }

}
