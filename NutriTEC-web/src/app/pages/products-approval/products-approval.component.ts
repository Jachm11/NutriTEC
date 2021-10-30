import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-products-approval',
  templateUrl: './products-approval.component.html',
  styleUrls: ['./products-approval.component.css']
})
export class ProductsApprovalComponent implements OnInit {

  url:string;
  filter_option:string = "Aprobado";

  products = [

    {
      name:"Manzana",
      descripcion:"Fruta con gran cantidad de nutrientes",
      porcion:"1 pieza",
      barcode:"121232323232",
      proteina: 300,
      vitamina: 300,
      calcio:200,
      hierro:130,
      energia:200,
      grasa:220,
      sodio:100,
      carbohidratos:200
    },

    {
      name:"Manzana",
      descripcion:"Fruta con gran cantidad de nutrientes",
      porcion:"1 pieza",
      barcode:"121232323232",
      proteina: 300,
      vitamina: 300,
      calcio:200,
      hierro:130,
      energia:200,
      grasa:220,
      sodio:100,
      carbohidratos:200
    },

    {
      name:"Manzana",
      descripcion:"Fruta con gran cantidad de nutrientes",
      porcion:"1 pieza",
      barcode:"121232323232",
      proteina: 300,
      vitamina: 300,
      calcio:200,
      hierro:130,
      energia:200,
      grasa:220,
      sodio:100,
      carbohidratos:200
    }



  ]

  constructor(private router:Router) { 

    this.url = this.router.url;
  }

  ngOnInit(): void {
  }



  filter(){

    //Se filtra los items

  }


  accept_product(product:any){

    console.log(product);
    //Se realiza la consulta al API


  }

  reject_product(product:any){

    console.log(product);
    //Se realiza la consulta al API

  }

}
