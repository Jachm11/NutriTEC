import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assign-client-item',
  templateUrl: './assign-client-item.component.html',
  styleUrls: ['./assign-client-item.component.css']
})
export class AssignClientItemComponent implements OnInit {

  @Input() client:any;
  @Output() assign_client: EventEmitter<any> = new EventEmitter();
  @Output() unassign_client: EventEmitter<any> = new EventEmitter();
  @Output() overview: EventEmitter<any> = new EventEmitter();

  url:string;


  constructor(private router:Router) {

    this.url = router.url;


   }

  ngOnInit(): void {



  }

  assignClient() {
    this.assign_client.emit(this.client);
  }

  
  unassignClient(){
    this.unassign_client.emit(this.client);

  }

  showOverview(){
    this.overview.emit(this.client);

  }

}
