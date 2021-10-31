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
    this.porcion = this.product_selected.porcion;

  }

  updatePorcion(){
    this.update_porcion.emit({producto: this.product_selected.producto, porcion: this.porcion});
  }

  deleteProduct(){
    this.delete_product.emit(this.product_selected.producto);
  }

}
