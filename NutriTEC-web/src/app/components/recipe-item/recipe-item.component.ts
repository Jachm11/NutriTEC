import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { GlobalService } from 'src/app/services/global.service';
import { Product } from 'src/interfaces/product';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input() recipe:any;
  @Input() url;
  @Output() add_product: EventEmitter<any> = new EventEmitter();

  products:Product[];
  showMe:boolean = false;

  constructor(private global:GlobalService, private matDialog:MatDialog,private apiService: ApiService) { }

  proteina:number = 0;
  vitamina:number = 0;
  calcio:number = 0;
  hierro:number = 0;
  energia:number = 0;
  grasa:number = 0;
  sodio:number = 0;
  carbohidratos:number = 0;
  
  ngOnInit(): void {

 

    this.apiService.get_product_by_recipe(this.recipe.id).subscribe((products) => {

      console.log(products)
      this.products = products;

      for (let product of products) {
        this.proteina += product.proteina;
        this.vitamina += product.vitamina;
        this.calcio += product.calcio;
        this.hierro += product.hierro;
        this.energia += product.energia;
        this.grasa += product.grasa;
        this.sodio += product.sodio;
        this.carbohidratos += product.carbohidratos;
  
      }


    })
  
  }

  toggleShowMe()
  {
    this.showMe = !this.showMe;
  }



  addProduct(){
    this.add_product.emit(this.products);

  }


}
