import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-item-product',
  templateUrl: './item-product.component.html',
  styleUrls: ['./item-product.component.css']
})
export class ItemProductComponent implements OnInit {

  @Input() product_selected:any;
  @Output() update_porcion: EventEmitter<any> = new EventEmitter();
  @Output() delete_product: EventEmitter<any> = new EventEmitter();

  porcion:number;

  constructor() { }

  ngOnInit(): void {
    this.porcion = this.product_selected.porciones;
    console.log(this.porcion);

  }

  updatePorcion(){
    this.product_selected.porciones = this.porcion;
    this.update_porcion.emit(this.product_selected);
  }

  deleteProduct(){
    this.delete_product.emit(this.product_selected);
  }

}
