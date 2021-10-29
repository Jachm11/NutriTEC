import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() product;
  @Input() url;
  @Output() addProductRecipe: EventEmitter<any> = new EventEmitter();

  showMe:boolean = false;

  constructor(private global:GlobalService, private matDialog:MatDialog) { }

  ngOnInit(): void {
  
  }

  toggleShowMe()
  {
    this.showMe = !this.showMe;
  }


  acceptProduct(){

    this.global.transactionSuccess("Producto aprobado exitosamente");


  }


  rejectProduct(){

    this.global.transactionSuccess("Producto rechazado exitosamente");


  }


  addProductToRecipe(){
    this.addProductRecipe.emit(this.product);

  }




}
