import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog'; 

@Component({
  selector: 'app-show-plan-info',
  templateUrl: './show-plan-info.component.html',
  styleUrls: ['./show-plan-info.component.css']
})
export class ShowPlanInfoComponent implements OnInit {

  filterProducts = [];
  emitter = new EventEmitter();

  constructor(@Inject(MAT_DIALOG_DATA) public data :any, private dialog:MatDialog) { 

  }

  ngOnInit(): void {

    console.log(this.data.products);

  }


  close(){
    this.emitter.emit("hola");
    this.dialog.closeAll();

  }

}