import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})


/**
 * Este componente es una abstraccion de un producto de la base de datos, posee todos los 
 * atributos posibles y los muestra
 */
export class ProductComponent implements OnInit {

  @Input() product;
  @Input() url;
  @Output() add_product: EventEmitter<any> = new EventEmitter();
  @Output() accept_product: EventEmitter<any> = new EventEmitter();
  @Output() reject_product: EventEmitter<any> = new EventEmitter();
  @Output() add_product_time_food_plan : EventEmitter<any> = new EventEmitter();

  showMe:boolean = false;

  constructor(private global:GlobalService, private matDialog:MatDialog) { }

  ngOnInit(): void {
  
  }


  /**
   * Funcion que decide si se debe mostrar el contendor con la informacion del producto
   */
  toggleShowMe()
  {
    this.showMe = !this.showMe;
  }


  /**
   * Funcion que se llama al momento en que el administrador acepta un producto
   */
  acceptProduct(){
    this.accept_product.emit(this.product);

  }


  /**
   * Esta funcion se llama cuando el adminitrador rechazada un producto
   */
  rejectProduct(){

  
    this.reject_product.emit(this.product);

  }


  /**
   * Funcion para agregar un producto cuando se esta creando o editando un plan o receta
   */
  addProduct(){
    this.add_product.emit(this.product);

  }



}
