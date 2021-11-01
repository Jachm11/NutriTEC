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
  @Output() add_product: EventEmitter<any> = new EventEmitter();
  @Output() accept_product: EventEmitter<any> = new EventEmitter();
  @Output() reject_product: EventEmitter<any> = new EventEmitter();
  @Output() add_product_time_food_plan : EventEmitter<any> = new EventEmitter();

  showMe:boolean = false;

  constructor(private global:GlobalService, private matDialog:MatDialog) { }

  ngOnInit(): void {
  
  }

  toggleShowMe()
  {
    this.showMe = !this.showMe;
  }


  acceptProduct(){
    this.accept_product.emit(this.product);

  }


  rejectProduct(){

  
    this.reject_product.emit(this.product);

  }

  addProduct(){
    this.add_product.emit(this.product);

  }



}
