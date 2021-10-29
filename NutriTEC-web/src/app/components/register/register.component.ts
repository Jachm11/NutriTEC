import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, Input } from '@angular/core';
import {Router} from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';


@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    @Input() url:string;
    registerAs:string;
    registerAsClient:boolean;
    registerAsNutritionist:boolean;


    nombre:string;
    primer_apellido:string;
    segundo_apellido:string;
    cedula:string;
    fecha_de_nacimiento:string;
    altura:number;
    pais:string;
    peso:number;
    imc:number;
    medida_cadera:number;
    medida_cuello:number;
    medida_cintura:number;
    porcentaje_musculo:number;
    porcentaje_grasa:number;
    consumo_maximo_calorias:number;

    direccion:string;
    foto:string;
    tarjeta:number;
    tipo_cobro:string;


    email:string;
    password:string;

    constructor(private global : GlobalService) {}


    ngOnInit() {

      console.log(this.url);

      if (this.url == "/register-client"){
        this.registerAsClient = true; this.registerAsNutritionist = false;
        this.registerAs = "cliente";
      }

      else if (this.url == "/register-nutritionist")
      {
        this.registerAsClient = false; this.registerAsNutritionist = true;
        this.registerAs = "nutricionista"
      }

    }


    createAccount()
    {

      console.log("entraaa")

      if(this.url == "/register-client"){

        this.createClientAccount();

      }

      else if (this.url == "/register-nutritionist"){

        this.createNutritionistAccount();

      
      }

    }


    createClientAccount(){

      if(!this.nombre){
        this.global.transactionFailed("Ingrese su nombre");
        return; 

      }
      if(!this.primer_apellido){
        this.global.transactionFailed("Ingrese su primer apellido");
        return;
      }

      if(!this.segundo_apellido){
        this.global.transactionFailed("Ingrese su segundo apellido");
        alert("Ingrese su segundo apellido");
        return;
      }

      if(!this.fecha_de_nacimiento){
        this.global.transactionFailed("ingrese su fecha de nacimiento");
        return;
      }

      if(!this.altura){
        this.global.transactionFailed("Ingrese su altura");
        return;
      }

      if(!this.peso){
        this.global.transactionFailed("Ingrese su peso");
        return;
      }

      if(!this.direccion){
        this.global.transactionFailed("Ingrese su direccion");
        return;
      }
      if(!this.medida_cadera){
        this.global.transactionFailed("Ingrese su medida de cadera");
        return;
      }

      if(!this.medida_cintura){
        this.global.transactionFailed("Ingrese su medida de cintura");
        return; 
      }

      if(!this.medida_cuello){
        this.global.transactionFailed("Ingrese su medida de cuello");
      }

      if(!this.porcentaje_grasa){
        this.global.transactionFailed("Ingrese su porcentaje de grasa");
      }
      
      if(!this.porcentaje_musculo){
        this.global.transactionFailed("Ingrese su porcentaje de musculo");
        return;
      }

      if(!this.consumo_maximo_calorias){
        this.global.transactionFailed("Ingrese su consumo maximo de calorias");
        return;
      }

      if(!this.email){
        this.global.transactionFailed("Ingrese su correo electronico");
        return;
      }

      if(!this.password){
        this.global.transactionFailed("Ingrese su contraseña");
        return;
      }

      else {

        //Se realiza la consulta al API

      }

    }


    createNutritionistAccount(){

      if(!this.nombre){
        this.global.transactionFailed("Ingrese su nombre");
        return; 
      }
      if(!this.primer_apellido){
        this.global.transactionFailed("Ingrese su primer apellido");
        return;
      }

      if(!this.segundo_apellido){
        this.global.transactionFailed("Ingrese su segundo apellido");
        return;
      }

      if(!this.fecha_de_nacimiento){
        this.global.transactionFailed("ingrese su fecha de nacimiento");
        return;
      }

      if(!this.altura){
        this.global.transactionFailed("Ingrese su altura");
        return;
      }

      if(!this.peso){
        this.global.transactionFailed("Ingrese su peso");
        return;
      }

      if(!this.direccion){
        this.global.transactionFailed("Ingrese su direccion");
        return;
      }
      
      if(!this.foto){
        this.global.transactionFailed("Suba su foto de perfil");
        return;
      }

      if(!this.tarjeta){
        this.global.transactionFailed("Ingrese su numero de tarjeta");
        return; 

      }

      if(!this.tipo_cobro){
        this.global.transactionFailed("Ingrese el tipo de cobro");
        return;
      }

      if(!this.email){
        this.global.transactionFailed("Ingrese su correo electronico");
        return;
      }

      if(!this.password){
        this.global.transactionFailed("Ingrese su contraseña");
        return;
      }

      else {

        //Se realiza la consulta al API

      }



    }


  }



