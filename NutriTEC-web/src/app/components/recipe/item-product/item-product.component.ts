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

    console.log("-----------------");
    console.log(this.product_selected);
    this.porcion = this.product_selected.porcion;
    console.log("-----------------")


  }

  updatePorcion(){
    this.update_porcion.emit({product: this.product_selected.product, porcion: this.porcion});
  }

  deleteProduct(){
    this.delete_product.emit(this.product_selected.product);
  }

}
