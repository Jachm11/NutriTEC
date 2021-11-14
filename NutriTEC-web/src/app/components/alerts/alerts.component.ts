import { Component, Input, OnInit, Output, EventEmitter  } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})

/**
 * Componente para mostrar las alertas
 */
export class AlertsComponent implements OnInit {


  constructor(public global:GlobalService) { }

  ngOnInit(): void {
  }









}
