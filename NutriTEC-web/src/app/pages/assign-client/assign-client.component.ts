import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-assign-client',
  templateUrl: './assign-client.component.html',
  styleUrls: ['./assign-client.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssignClientComponent implements OnInit {

  filterClient = '';

  clients = [];

  constructor(private global:GlobalService, private apiService:ApiService) { }

  ngOnInit() : void {

    this.apiService.get_clients().subscribe((clients)=>  this.clients = clients);




  }

  assign_client(client:any){

    this.global.transactionSuccess("Cliente agregado exitosamente");
    console.log(client);
    //Se realiza el post



  }

}
