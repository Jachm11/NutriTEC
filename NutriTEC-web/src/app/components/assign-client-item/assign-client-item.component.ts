import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-assign-client-item',
  templateUrl: './assign-client-item.component.html',
  styleUrls: ['./assign-client-item.component.css']
})
export class AssignClientItemComponent implements OnInit {

  @Input() client:any;
  @Output() assign_client: EventEmitter<any> = new EventEmitter();


  constructor() { }

  ngOnInit(): void {
  }


  assignClient() {
    this.assign_client.emit(this.client);


  }

}
