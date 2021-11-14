import { Component, Input, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-show-recipe-info',
  templateUrl: './show-recipe-info.component.html',
  styleUrls: ['./show-recipe-info.component.css']
})


/**
 * Este componente es utiliza para mostrar la informacion nutrcional de la receta
 */
export class ShowRecipeInfoComponent implements OnInit {


  @Input() recipe:any;

  proteina:number = 0;
  vitamina:number = 0;
  calcio:number = 0;
  hierro:number = 0;
  energia:number = 0;
  grasa:number = 0;
  sodio:number = 0;
  carbohidratos:number = 0;



  constructor(@Inject(MAT_DIALOG_DATA) public data :any, private dialog:MatDialog, private apiService:ApiService) { }

  ngOnInit(): void {

    console.log(this.data);


    this.apiService.get_product_by_recipe(this.data.id).subscribe((products)=> {

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


   /**
    * Funcion que se llama al momento de cerrar el dialog
    */
  close(){

    this.dialog.closeAll();

  }

}
