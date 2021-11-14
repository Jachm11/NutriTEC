import { Component, OnInit, Input } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { GlobalService } from 'src/app/services/global.service';
import { Nutritionist } from 'src/interfaces/nutritionist';
import { formatDate } from '@angular/common';
import { BlobServiceClient }  from '@azure/storage-blob';
@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})


/**
 * Este componente permite registar un cliente o nutricionista para la aplicacion. Contiene los espacios necesarios
 * para ingresar la informacion y los muestra dependiendo del rol que se este registrando.
 */
export class RegisterComponent implements OnInit {

    @Input() url:string;
    registerAs:string;
    registerAsClient:boolean;
    registerAsNutritionist:boolean;
    new_client:any;
    new_nutritionist:any;


    primer_nombre:string;
    segundo_nombre:string;
    primer_apellido:string;
    segundo_apellido:string;
    cedula:string;
    fecha_nacimiento:string;
    altura:number;
    pais:string;
    peso:number;
    medida_cadera:number;
    medida_cuello:number;
    medida_cintura:number;
    porcentaje_musculo:number;
    porcentaje_grasa:number;
    consumo_maximo_calorias:number;
    codigo_nutricionista:number;

    direccion:string;
    foto:string;
    tarjeta:string;
    tipo_cobro:string;


    email:string;
    password:string;

    constructor(private global : GlobalService, private api:ApiService, private router:Router) {}


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



    /**
     * Funcion que se ejecuta para al momento de crear un cuenta. Decide dependiendo del URL 
     * si se crear un cliente o un nutricionista.
     */
    createAccount()
    {

      if(this.url == "/register-client"){
        this.createClientAccount();
      }

      else if (this.url == "/register-nutritionist"){
        this.createNutritionistAccount();
      }
    }



    /**
     * Funcion que recoge la informacion de un cliente, verifica que todos los campos hayan sido llenado y emite 
     * el evento para que el cliente sea creado
     * @returns 
     */
    createClientAccount(){

      if(!this.primer_nombre){
        this.global.transactionFailed("Ingrese su primer nombre");
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

      if(!this.fecha_nacimiento){
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


    
        this.new_client = {
          primer_nombre: this.primer_nombre,
          segundo_nombre:this.segundo_nombre,
          primer_apellido:this.primer_apellido,
          segundo_apellido:this.segundo_apellido,
          fecha_nacimiento:this.fecha_nacimiento,
          email:this.email,
          clave:this.password,
          meta_consumo_diario:this.consumo_maximo_calorias,
          altura:this.altura,
          pais:this.pais,
          estatus:"no tomado",
      
        };

        this.register_client();
  
      }

    }


      /**
     * Funcion que recoge la informacion de un nutricionista, verifica que todos los campos hayan sido llenado y emite 
     * el evento para que el nutricionista sea creado
     * @returns 
     */
    createNutritionistAccount(){

      if(!this.primer_nombre){
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

      if(!this.fecha_nacimiento){
        this.global.transactionFailed("ingrese su fecha de nacimiento");
        return;
      }

      if(!this.direccion){
        this.global.transactionFailed("Ingrese su direccion");
        return;
      }
      
      //if(!this.foto){
      //  this.global.transactionFailed("Suba su foto de perfil");
      //  return;
      //}

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


        this.new_nutritionist = {
          codigo_nutricionista:this.codigo_nutricionista,
          primer_nombre:this.primer_nombre,
          segundo_nombre:this.segundo_nombre,
          primer_apellido:this.primer_apellido,
          segundo_apellido:this.segundo_apellido,
          email:this.email,
          clave:this.password,
          cedula:this.cedula,
          fecha_nacimiento:this.fecha_nacimiento,
          direccion:this.direccion,
          foto:"foto",
          tarjeta:this.tarjeta,
          tipo_cobro:this.tipo_cobro,
        }

        this.register_nutritionist();

      }
    }



    /**
     * Funcion que reinicia los valores ingresados por el usuario
     */
    setDefaultValues(){

      this.primer_nombre = null;
      this.segundo_nombre = null;
      this.primer_apellido = null;
      this.segundo_apellido = null;
      this.cedula = null;
      this.fecha_nacimiento = null;
      this.altura = null;
      this.pais = null;
      this.peso = null;
      this.medida_cadera = null;
      this.medida_cuello = null;
      this.medida_cintura = null;
      this.porcentaje_musculo = null;
      this.porcentaje_grasa =  null;
      this.consumo_maximo_calorias = null;
      this.codigo_nutricionista = null;
  
      this.direccion = null;
      this.foto = null;
      this.tarjeta = null;
      this.tipo_cobro = null;
  
  
      this.email = null;
      this.password = null;
    }
  

    /**
     * Funcion que realiza el llamado al API para registar un cliente. Enviar la informacion ingresada 
     * por el usario a traves de un JSON
     */
    register_client(){
              
      this.api.post_client(this.new_client).subscribe((cliente)=>{
        this.global.current_client = cliente;
        console.log(cliente);
        this.global.transactionSuccess("Se ha registrado como cliente exitosamente");
        this.register_measures();
        this.setDefaultValues();
        this.router.navigateByUrl("/home");
      },   
      (err) => {
          this.global.transactionFailed(err.error);
      });

    }

    
    /**
     * Funcion que realiza el llamado al API para registar un nutricionista. Enviar la informacion ingresada 
     * por el usario a traves de un JSON
     */
    register_nutritionist(){

      console.log(this.new_nutritionist);
      this.api.post_nutritionist(this.new_nutritionist).subscribe(()=>{
        this.global.transactionSuccess("Se ha registrado como nutricionista exitosamente");
          this.setDefaultValues();
          this.router.navigateByUrl("/home-nutritionist");

      },         
      (err) => {
        this.global.transactionFailed(err.error);
      });
    }



    
    /**
     * Funcion que realiza el llamado al API para registar las medidas iniciales del cliente cuando se registra. Enviar la informacion ingresada 
     * por el usario a traves de un JSON
     */
    register_measures(){

      let measures = 
        {
          id_cliente: this.global.current_client.id,
          fecha: formatDate(new Date, 'yyyy-MM-dd', 'en-US'),
          porcentaje_musculo: this.porcentaje_musculo,
          porcentaje_grasa: this.porcentaje_grasa,
          cadera: this.medida_cadera,
          peso: this.peso,
          altura: this.altura,
          cintura: this.medida_cintura,
          cuello: this.medida_cuello
        }


        this.api.register_measures(measures).subscribe();

    }

  }



