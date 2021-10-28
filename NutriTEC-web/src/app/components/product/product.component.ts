import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() product;

  showMe:boolean = false;

  constructor(private global:GlobalService) { }

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




}
