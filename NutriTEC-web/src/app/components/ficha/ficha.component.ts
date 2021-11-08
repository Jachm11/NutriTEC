import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Ficha } from 'src/interfaces/ficha';

@Component({
  selector: 'app-ficha',
  templateUrl: './ficha.component.html',
  styleUrls: ['./ficha.component.css']
})
export class FichaComponent implements OnInit {

  @Output() apply : EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
