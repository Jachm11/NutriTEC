import { Component, Input, OnInit } from '@angular/core';
import { Ficha } from 'src/interfaces/ficha';

@Component({
  selector: 'app-ficha-row-holder',
  templateUrl: './ficha-row-holder.component.html',
  styleUrls: ['./ficha-row-holder.component.css']
})
export class FichaRowHolderComponent implements OnInit {

  @Input() row: number;
  @Input() all_fichas: Ficha[];
  fichas: Ficha[];
  start: number;
  end: number;
  ready = false;

  constructor() { }

  ngOnInit(): void {

    this.start = this.row * 7;
    this.end = ((this.row + 1) * 7);
    this.fichas = this.all_fichas.slice(this.start, this.end);
    this.ready = true;

  }

}
