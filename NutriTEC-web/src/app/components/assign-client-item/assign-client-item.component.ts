import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-assign-client-item',
  templateUrl: './assign-client-item.component.html',
  styleUrls: ['./assign-client-item.component.css']
})
export class AssignClientItemComponent implements OnInit {

  @Input() client:any;

  constructor() { }

  ngOnInit(): void {
  }

}
