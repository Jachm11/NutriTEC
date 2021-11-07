import { Component, Input, OnInit } from '@angular/core';
import { Ficha } from 'src/interfaces/ficha';

@Component({
  selector: 'app-ficha',
  templateUrl: './ficha.component.html',
  styleUrls: ['./ficha.component.css']
})
export class FichaComponent implements OnInit {

  @Input() ficha: Ficha;

  constructor() { }

  ngOnInit(): void {
  }

}
