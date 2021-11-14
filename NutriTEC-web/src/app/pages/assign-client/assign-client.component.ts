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

/**
 * Pagina para asignar un cliente a un nutricionista
 */
export class AssignClientComponent implements OnInit {

  filterClient = '';

  clients = [];
  clients_emitter = new BehaviorSubject<any[]>(this.clients);
  show = true;

  constructor(private global:GlobalService, private apiService:ApiService, private ngZone : NgZone) { }

  ngOnInit() : void {
    this.upload_clients();
  }




  /**
   * Funcion que se encarga de obtener la informacion de los clientes sin nutricionista 
   * a traves de un request al API. Se llama cada vez que da un cambio para obtener la lista 
   * mas actualizada de clientes
   */
  upload_clients(){
    this.apiService.get_clients().subscribe((clients) =>{

      this.clients = clients;
      console.log(this.clients);
      this.clients_emitter.next(this.clients);

    });

  }


  /**
   * Funcion que se ejecuta cuando se asigna un cliente al nutricionista. Realiza el llamado al api
   * para dicha accion.
   * @param client 
   */
  assign_client(client:any){
    this.apiService.assign_client(client.id, this.global.current_nutritionist.id).subscribe(()=>
    {
      this.global.transactionSuccess("Cliente asignado exitosamente");
      this.upload_clients();

      
    });


  }

}
