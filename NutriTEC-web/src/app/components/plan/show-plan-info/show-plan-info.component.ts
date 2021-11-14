import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog'; 
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-show-plan-info',
  templateUrl: './show-plan-info.component.html',
  styleUrls: ['./show-plan-info.component.css']
})

/**
 * Componente que muestra la informacion nutricional de un plan
 */
export class ShowPlanInfoComponent implements OnInit {

  filterProducts = '';
  emitter = new EventEmitter();

  constructor(@Inject(MAT_DIALOG_DATA) public data :any, private dialog:MatDialog, private global:GlobalService) { 

  }

  ngOnInit(): void {
  }


  /**
   * Funcion que se llama al cerrar el dialog de muestra los productos
   */
  close(){
    this.dialog.closeAll();
  

  }

}
