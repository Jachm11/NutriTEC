import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-product',
  templateUrl: './item-product.component.html',
  styleUrls: ['./item-product.component.css']
})
export class ItemProductComponent implements OnInit {

  @Input() product_selected:any;
  @Output() update_porcion: EventEmitter<any> = new EventEmitter();
  @Output() delete_product: EventEmitter<any> = new EventEmitter();
  url = "";
  @Input() porcion:number;
  @Input() disable: boolean;

  constructor(private router : Router) { }

  ngOnInit(): void {
    console.log(this.disable)
    this.url = this.router.url.toString();
    this.updatePorcion();
  }

  updatePorcion(){
    this.product_selected.porciones = this.porcion;
    this.product_selected.cantidad_porciones = this.porcion;
    this.update_porcion.emit(this.product_selected);
  }

  deleteProduct(){
    this.delete_product.emit(this.product_selected);
  }

}
