import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assign-client-item',
  templateUrl: './assign-client-item.component.html',
  styleUrls: ['./assign-client-item.component.css']
})

/**
 * Componente para asignar los clientes a un nutricionista
 */
export class AssignClientItemComponent implements OnInit {

  @Input() client:any;
  @Output() assign_client: EventEmitter<any> = new EventEmitter();
  @Output() unassign_client: EventEmitter<any> = new EventEmitter();

  url:string;


  constructor(private router:Router) {

    this.url = router.url;


   }

  ngOnInit(): void {



  }


  /**
   * Funcion que se llama cuando se desea asignar un cliente especifico a un nutricionista
   */
  assignClient() {
    this.assign_client.emit(this.client);
  }


  /**
   * Funcion que se llama cuando se desea desasociar un cliente especifico a un nutricionista
   */
  unassignClient(){
    this.unassign_client.emit(this.client);

  }

}
