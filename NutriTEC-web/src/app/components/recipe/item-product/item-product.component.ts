import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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

  porcion:number;

  constructor() { }

  ngOnInit(): void {
    this.porcion = this.product_selected.porciones;
  }

  /**
   * Funcion para actualiza la porcion del producto una vez que haya sido seleccionado 
   */
  updatePorcion(){
    this.product_selected.porciones = this.porcion;
    this.update_porcion.emit(this.product_selected);
  }


  /**
   * Funcion que elimina el producto de los productos seleccionados
   */
  deleteProduct(){
    this.delete_product.emit(this.product_selected);
  }

}
