import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, Input } from '@angular/core';
import { TouchSequence } from 'selenium-webdriver';
import { isThisTypeNode } from 'typescript';
import { GlobalService } from 'src/app/services/global.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-register-products',
  templateUrl: './register-products.component.html',
  styleUrls: ['./register-products.component.css']
})
export class RegisterProductsComponent implements OnInit {



  
  codigo_barras:number;
  descripcion:string;
  porcion:number;
  energia:number;
  grasa:number;
  sodio:number;
  carbohidratos:number;
  proteina:number;
  vitaminas:number;
  calcio:number;
  hierro:number;

  url = "/branches";

  product:any;


  constructor(private global : GlobalService, private apiService:ApiService) { }
  ngOnInit(): void {
  }



  onSubmit(){

    if(!this.codigo_barras){
      this.global.transactionFailed("Ingrese el código de barras del producto");
      return;
    }

    if(!this.descripcion){
      this.global.transactionFailed("Ingrese una descripción para el producto");
      return;
    }

    if(!this.porcion){
      this.global.transactionFailed("Ingrese una porción para el producto");
      return;
    }

    if(!this.energia){
      this.global.transactionFailed("Ingrese la cantidad de energía del producto");
      return;
    }

    if(!this.grasa){
      this.global.transactionFailed("Ingrese la cantiddad de grasa del producto");
      return;
    }

    if(!this.proteina){
      this.global.transactionFailed("Ingrese la cantidad de proteína del producto");
      return;
    }

    if(!this.carbohidratos){
      this.global.transactionFailed("Ingresa la cantidad de carbohidratos del producto");
      return;
    }

    if(!this.sodio){
      this.global.transactionFailed("Ingrese la cantidad de sodio del producto");
      return;
    }

    if(!this.vitaminas){
      this.global.transactionFailed("Ingrese la cantidad de vitaminas del producto");
      return;
    }

    if(!this.calcio){
      this.global.transactionFailed("Ingrese la cantidad de calcio del producto");
      return;
    }

    if(!this.hierro){
      this.global.transactionFailed("Ingrese la cantidad de calcio del hierro");
      return;
    }


    this.product = {
      barcode: String(this.codigo_barras),
      descripcion:this.descripcion,
      tamano_porcion:this.porcion,
      sodio:this.sodio,
      grasa:this.grasa,
      energia:this.energia,
      hierro:this.hierro,
      calcio:this.calcio,
      proteina:this.proteina,
      vitamina:this.vitaminas,
      carbohidratos:this.carbohidratos
    }


    this.apiService.post_product(this.product).subscribe(()=> {

            this.global.transactionSuccess("Producto agregado exitosamente");
        this.setDefaultValues();
    }, (err)=>{


 
        this.global.transactionFailed(err.error);

 
    });



  }






  setDefaultValues(){

    this.codigo_barras = null;
    this.descripcion = null;
    this.porcion = null;
    this.energia = null;
    this.grasa = null;
    this.sodio = null;
    this.carbohidratos = null;
    this.proteina = null;
    this.vitaminas = null;
    this.calcio = null;
    this.hierro = null;
  



  }

}
