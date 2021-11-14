import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-product',
  templateUrl: './item-product.component.html',
  styleUrls: ['./item-product.component.css']
})

/**
 * Componente que modela un producto una vez que este haya sido seleccionado para una receta o plan.
 * Permite actualizar la porcion del producto o bien eliminarlos de los productos seleccionados
 */
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

  /**
   * Funcion para actualiza la porcion del producto una vez que haya sido seleccionado 
   */
  updatePorcion(){
    this.product_selected.porciones = this.porcion;
    this.product_selected.cantidad_porciones = this.porcion;
    this.update_porcion.emit(this.product_selected);
  }


  /**
   * Funcion que elimina el producto de los productos seleccionados
   */
  deleteProduct(){
    this.delete_product.emit(this.product_selected);
  }

}
