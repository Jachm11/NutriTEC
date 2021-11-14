import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-login-client',
  templateUrl: './login-client.component.html',
  styleUrls: ['./login-client.component.css']
})
/**
 * Pagina que muestra el login del cliente
 */

export class LoginClientComponent implements OnInit {

  email:string;
  password:string;

  new_client:any;



  constructor(private global:GlobalService, private apiService:ApiService, private router:Router) { }

  ngOnInit(): void {
  }



  /**
   * Funcion que se ejecuta cuando se desea realizar el login. Recoge la informacion de ingresada 
   * por el usuario y realiza el llamado al API
   */
  login(){

    this.apiService.loginClient(this.email, this.password).subscribe((current_client)=>{
        this.global.transactionSuccess("Ingresó correctamente");
        this.global.current_client = current_client;
        console.log(this.global.current_client);
        this.router.navigateByUrl("/home-patient");


    }, (error)=> {
    
        this.global.transactionFailed("Datos inválidos, ingrese nuevamente su usuario");
    });
  
  }

}
